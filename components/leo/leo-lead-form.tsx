"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { leoStrings, type Locale } from "@/lib/leo-strings";
import { cn } from "@/lib/cn";

type Props = {
  locale: Locale;
  status: "open" | "submitting" | "sent";
  onSubmit: (input: { email: string; name?: string }) => void;
  onDismiss: () => void;
};

export function LeoLeadForm({ locale, status, onSubmit, onDismiss }: Props) {
  const strings = leoStrings(locale);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (status === "sent") {
    return (
      <div className="ml-9 flex items-start gap-2 rounded-card border border-success/40 bg-success/10 px-3.5 py-2.5 text-sm text-foreground">
        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-success" />
        <span>{strings.leadFormSuccess}</span>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email || submitting) return;
        onSubmit({ email, name: name || undefined });
      }}
      className="ml-9 flex flex-col gap-2 rounded-card border border-brand-orange/40 bg-brand-orange/8 p-3"
    >
      <p className="text-xs text-foreground/90">{strings.leadFormPrompt}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={strings.leadFormNamePlaceholder}
        autoComplete="name"
        disabled={submitting}
        className="w-full rounded-lg border border-border bg-ink/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-2 focus:border-brand-orange focus:outline-none disabled:opacity-60"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={strings.leadFormEmailPlaceholder}
        autoComplete="email"
        disabled={submitting}
        className="w-full rounded-lg border border-border bg-ink/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-2 focus:border-brand-orange focus:outline-none disabled:opacity-60"
      />
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={onDismiss}
          disabled={submitting}
          className="text-xs text-muted hover:text-foreground disabled:opacity-60"
        >
          {strings.leadFormSkip}
        </button>
        <button
          type="submit"
          disabled={submitting || !email}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg bg-brand-orange px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-orange-soft",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {strings.leadFormSubmitting}
            </>
          ) : (
            <>
              {strings.leadFormSubmit}
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
