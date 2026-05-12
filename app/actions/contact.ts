"use server";

import { render } from "@react-email/components";
import { contactSchema, type ContactActionState, BUDGET_VALUES } from "@/lib/schemas";
import { getResend } from "@/lib/resend";
import { siteConfig } from "@/lib/site-config";
import ContactNotification from "@/emails/contact-notification";
import ContactConfirmation from "@/emails/contact-confirmation";

/**
 * Resend's `emails.send()` resolves with `{ data, error }` — it does NOT
 * reject on API errors (invalid recipient, unverified domain, rate limit,
 * etc.). So a Promise.allSettled result with status:"fulfilled" can still
 * contain a failure in `.value.error`. This helper normalizes both shapes.
 */
type ResendSendResult = { data?: { id: string } | null; error?: { message: string; name?: string } | null };

function pickError(result: PromiseSettledResult<ResendSendResult>): string | null {
  if (result.status === "rejected") {
    const reason = result.reason as unknown;
    if (reason instanceof Error) return reason.message;
    return typeof reason === "string" ? reason : JSON.stringify(reason);
  }
  if (result.value && result.value.error) {
    return result.value.error.message;
  }
  return null;
}

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  const budgetRaw = raw.budget?.trim();
  const budget = budgetRaw && (BUDGET_VALUES as readonly string[]).includes(budgetRaw) ? budgetRaw : "";

  const parsed = contactSchema.safeParse({
    name: raw.name ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    company: raw.company ?? "",
    service: raw.service ?? "",
    budget,
    message: raw.message ?? "",
    website: raw.website ?? "",
    consent: raw.consent === "on" || raw.consent === "true",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot tripped → pretend success.
  if (parsed.data.website) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const resend = getResend();

  if (!resend) {
    console.warn("[contact] RESEND_API_KEY not set; skipping send.", { name: parsed.data.name });
    return {
      status: "success",
      message: "Thanks — your message was received (dev mode: no email sent).",
    };
  }

  // Step 1: pre-render both templates to HTML. Doing this before send()
  // surfaces render errors clearly (separate from delivery errors) and
  // avoids any quirks of the Resend SDK trying to render React elements
  // inside a Server Action context.
  let notificationHtml: string;
  let confirmationHtml: string;
  try {
    [notificationHtml, confirmationHtml] = await Promise.all([
      render(ContactNotification({ data: parsed.data })),
      render(ContactConfirmation({ data: parsed.data })),
    ]);
  } catch (err) {
    console.error(
      "[contact] email render failed:",
      err instanceof Error ? `${err.message}\n${err.stack}` : err,
    );
    return {
      status: "error",
      message: "We couldn't prepare your message. Please email us directly.",
    };
  }

  // Step 2: send both emails in parallel. Resend resolves with `{data, error}`,
  // it does NOT throw on API errors — we have to inspect `.value.error`.
  try {
    const [notify, confirm] = await Promise.allSettled<ResendSendResult>([
      resend.emails.send({
        from: siteConfig.resend.fromEmail,
        to: siteConfig.resend.toEmail,
        replyTo: parsed.data.email,
        subject: `New inquiry — ${parsed.data.name}${parsed.data.service ? ` (${parsed.data.service})` : ""}`,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: siteConfig.resend.fromEmail,
        to: parsed.data.email,
        subject: `Thanks for reaching out to ${siteConfig.company.name}`,
        html: confirmationHtml,
      }),
    ]);

    const notifyError = pickError(notify);
    const confirmError = pickError(confirm);

    if (notifyError) {
      // The business notification is the one that has to land — if it fails,
      // surface a real error to the user.
      console.error("[contact] business notification failed:", notifyError);
      return {
        status: "error",
        message: `We couldn't send your message right now. Please email ${siteConfig.contact.email} directly.`,
      };
    }
    if (confirmError) {
      // Confirmation to the user is non-blocking — log and move on. (Common
      // cause: using onboarding@resend.dev as `from` can only send to your own
      // Resend account address.)
      console.warn("[contact] user confirmation failed (non-blocking):", confirmError);
    }

    if (notify.status === "fulfilled" && notify.value?.data?.id) {
      console.log("[contact] notification sent. Resend id:", notify.value.data.id);
    }

    return {
      status: "success",
      message: "Thanks — we'll be in touch within one business day.",
    };
  } catch (err) {
    console.error(
      "[contact] unexpected send error:",
      err instanceof Error ? `${err.message}\n${err.stack}` : err,
    );
    return {
      status: "error",
      message: "Something went wrong. Please email us directly.",
    };
  }
}
