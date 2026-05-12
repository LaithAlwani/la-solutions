/**
 * Canonical FAQ content. Lives in code so it stays in sync with `siteConfig`,
 * and so the FAQPage JSON-LD on `/services` and the rendered <Faq /> section
 * are always identical (Google penalizes mismatches between visible text and
 * structured data).
 *
 * Keep answers tight (1–2 short sentences). Reference real plan names and
 * the $499 setup detail so the rich snippet reads as a real answer, not
 * marketing fluff.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What is LA Digital, and how is it different from hiring a web developer?",
    answer:
      "LA Digital is a subscription business platform, not a one-time project. You pick a monthly plan — Presence, Growth, or Scale — and we run your website, hosting, maintenance, support, and (optionally) marketing as an ongoing partnership. No surprise invoices, no scope creep.",
  },
  {
    question: "Is the setup fee really $0 with an annual commitment?",
    answer:
      "Yes. The standard $499 onboarding fee is waived when you sign a 12-month agreement on any Platform Plan. Month-to-month customers pay the one-time $499 setup.",
  },
  {
    question: "What's the difference between Presence, Growth, and Scale?",
    answer:
      "Presence ($199/mo) is a professional website with hosting, support, and basic SEO. Growth ($399/mo) adds customer accounts, online booking, payments, and a dashboard. Scale ($799/mo) layers in an admin dashboard, CRM, AI assistant, automations, and marketing infrastructure.",
  },
  {
    question: "Do you offer SEO, social media, and paid ads?",
    answer:
      "Yes — those are our Growth Services, billed separately from the Platform Plans. SEO starts at $500/mo, Social Media at $600/mo, and Paid Advertising at $800/mo (ad spend paid separately by the client).",
  },
  {
    question: "Can I get a mobile app or desktop app for my business?",
    answer:
      "Yes, as Platform Add-ons. The Mobile App add-on ($199/mo) ships an iOS and Android app for your existing platform. The Desktop App add-on ($299/mo) covers Windows and macOS for in-house staff and offline workflows.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Most platforms go live within 2–4 weeks of the discovery call, depending on scope and how quickly we receive your content. We work in weekly check-ins with a live preview link so there are no surprises at launch.",
  },
  {
    question: "What if I want to cancel my subscription?",
    answer:
      "Month-to-month plans can cancel at any time. Annual plans run for the full 12 months; after that, they convert to month-to-month and can be cancelled with 30 days' notice. Your data is yours — we hand over what you need on the way out.",
  },
  {
    question: "Do you work with clients outside Ottawa?",
    answer:
      "Yes. We're based in Ottawa, Ontario but onboard and support clients across Canada (and beyond) entirely remotely. All collaboration happens via video calls, shared previews, and email — no on-site visits required.",
  },
  {
    question: "Is the AI assistant on the Scale plan trained on my business?",
    answer:
      "Yes. The AI assistant is configured with your business information, services, and FAQs so it answers customer questions correctly, captures leads, and helps with support workflows. It improves over time as you add knowledge.",
  },
  {
    question: "What kind of support is included?",
    answer:
      "Every plan includes ongoing maintenance, security updates, hosting, and same-day responses during business hours (Mon–Fri, 9am–4pm ET). Higher tiers also include monthly analytics reports, priority support, and small feature updates.",
  },
];
