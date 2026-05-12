import { render } from "@react-email/components";
import { getResend } from "@/lib/resend";
import { checkRateLimit, getRequestIp } from "@/lib/leo-rate-limit";
import { leoLeadSchema } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";
import LeoLead from "@/emails/leo-lead";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = getRequestIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: "rate_limited", retryAfterSec: limit.retryAfterSec }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsed = leoLeadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "invalid_request", details: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Honeypot tripped — pretend success without emailing.
  if (parsed.data.website) {
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = getResend();
  if (!resend) {
    // Dev mode without RESEND_API_KEY — log and pretend success so the UI can
    // be tested without a live email account.
    console.warn("[leo/lead] RESEND_API_KEY not set; skipping send.", {
      email: parsed.data.email,
    });
    return new Response(JSON.stringify({ status: "ok", devMode: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  let html: string;
  try {
    html = await render(LeoLead({ data: parsed.data }));
  } catch (err) {
    console.error("[leo/lead] render failed", err);
    return new Response(JSON.stringify({ error: "render_failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const displayName = parsed.data.name?.trim() || "a visitor";
  const langTag = parsed.data.language ? ` (${parsed.data.language})` : "";

  try {
    const { error } = await resend.emails.send({
      from: siteConfig.resend.fromEmail,
      to: siteConfig.resend.toEmail,
      replyTo: parsed.data.email,
      subject: `Leo chat lead — ${displayName}${langTag}`,
      html,
    });
    if (error) {
      console.error("[leo/lead] resend error", error);
      return new Response(JSON.stringify({ error: "send_failed" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error("[leo/lead] send failed", err);
    return new Response(JSON.stringify({ error: "send_failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
