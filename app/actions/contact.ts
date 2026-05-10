"use server";

import { contactSchema, type ContactActionState, BUDGET_VALUES } from "@/lib/schemas";
import { getResend } from "@/lib/resend";
import { siteConfig } from "@/lib/site-config";
import ContactNotification from "@/emails/contact-notification";
import ContactConfirmation from "@/emails/contact-confirmation";

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

  try {
    const [notify, confirm] = await Promise.allSettled([
      resend.emails.send({
        from: siteConfig.resend.fromEmail,
        to: siteConfig.resend.toEmail,
        replyTo: parsed.data.email,
        subject: `New inquiry — ${parsed.data.name}${parsed.data.service ? ` (${parsed.data.service})` : ""}`,
        react: ContactNotification({ data: parsed.data }),
      }),
      resend.emails.send({
        from: siteConfig.resend.fromEmail,
        to: parsed.data.email,
        subject: `Thanks for reaching out to ${siteConfig.company.name}`,
        react: ContactConfirmation({ data: parsed.data }),
      }),
    ]);

    if (notify.status === "rejected") {
      console.error("[contact] business notification failed:", notify.reason);
      return {
        status: "error",
        message: "We couldn't send your message right now. Please email us directly.",
      };
    }
    if (confirm.status === "rejected") {
      console.warn("[contact] user confirmation failed:", confirm.reason);
    }

    return {
      status: "success",
      message: "Thanks — we'll be in touch within one business day.",
    };
  } catch (err) {
    console.error("[contact] send threw:", err);
    return {
      status: "error",
      message: "Something went wrong. Please email us directly.",
    };
  }
}
