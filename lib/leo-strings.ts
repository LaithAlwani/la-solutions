export type Locale = "en" | "fr";

type Strings = {
  launcherLabel: string;
  greeting: string;
  inputPlaceholder: string;
  sendLabel: string;
  closeLabel: string;
  errorGeneric: string;
  rateLimited: string;
  leadFormPrompt: string;
  leadFormNamePlaceholder: string;
  leadFormEmailPlaceholder: string;
  leadFormSubmit: string;
  leadFormSubmitting: string;
  leadFormSuccess: string;
  leadFormSkip: string;
  poweredBy: string;
};

const dict: Record<Locale, Strings> = {
  en: {
    launcherLabel: "Ask Leo",
    greeting:
      "Hi, I'm Leo 👋 Ask me anything about LA Digital's plans, services, or how it all works.",
    inputPlaceholder: "Ask about plans, pricing, add-ons…",
    sendLabel: "Send",
    closeLabel: "Close",
    errorGeneric: "Something went wrong. Please try again in a moment.",
    rateLimited: "You're sending messages a little too fast. Try again in a few minutes.",
    leadFormPrompt:
      "Want a quick follow-up from the team? Drop your details and we'll be in touch.",
    leadFormNamePlaceholder: "Your name (optional)",
    leadFormEmailPlaceholder: "Email address",
    leadFormSubmit: "Send to team",
    leadFormSubmitting: "Sending…",
    leadFormSuccess: "Thanks — the team will reach out within one business day.",
    leadFormSkip: "No thanks, keep chatting",
    poweredBy: "Powered by Claude",
  },
  fr: {
    launcherLabel: "Parler à Leo",
    greeting:
      "Bonjour, je suis Leo 👋 Posez-moi vos questions sur les forfaits, services et fonctionnement de LA Digital.",
    inputPlaceholder: "Posez une question sur les forfaits, prix, modules…",
    sendLabel: "Envoyer",
    closeLabel: "Fermer",
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer dans un instant.",
    rateLimited: "Vous envoyez des messages un peu trop vite. Réessayez dans quelques minutes.",
    leadFormPrompt:
      "Voulez-vous un suivi rapide par l'équipe? Laissez vos coordonnées et nous vous contacterons.",
    leadFormNamePlaceholder: "Votre nom (facultatif)",
    leadFormEmailPlaceholder: "Adresse courriel",
    leadFormSubmit: "Envoyer à l'équipe",
    leadFormSubmitting: "Envoi…",
    leadFormSuccess: "Merci — l'équipe vous contactera d'ici un jour ouvrable.",
    leadFormSkip: "Non merci, continuer la conversation",
    poweredBy: "Propulsé par Claude",
  },
};

export function leoStrings(locale: Locale): Strings {
  return dict[locale] ?? dict.en;
}

/** Reads `navigator.language` and returns "fr" if it starts with fr, else "en". */
export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language?.toLowerCase() ?? "";
  return lang.startsWith("fr") ? "fr" : "en";
}
