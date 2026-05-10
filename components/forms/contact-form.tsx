"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { INITIAL_CONTACT_STATE, BUDGET_VALUES, type ContactFieldErrors } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

type Props = {
  defaultService?: string;
  defaultPackage?: string;
};

const inputBase =
  "w-full rounded-lg border border-border bg-ink/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-2 transition-colors focus:border-brand-orange focus:bg-ink/60 focus:outline-none";

const labelBase = "text-xs font-medium uppercase tracking-[0.14em] text-muted";

export function ContactForm({ defaultService, defaultPackage }: Props) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL_CONTACT_STATE);
  const formRef = useRef<HTMLFormElement>(null);
  const [serviceValue, setServiceValue] = useState(defaultService ?? "");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const fieldErrors: ContactFieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const messagePrefill =
    defaultPackage && defaultService
      ? `I'm interested in the "${defaultPackage}" package under ${defaultService}.`
      : "";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-4 rounded-card border border-success/30 bg-success/5 p-8"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-success/20 text-success">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-xl font-semibold text-foreground">Message sent.</h3>
              <p className="text-sm text-muted">{state.message}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-soft"
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={formAction}
            initial={false}
            className="flex flex-col gap-5 rounded-card border border-border bg-surface/40 p-6 md:p-8"
            noValidate
          >
            {state.status === "error" ? (
              <div
                role="alert"
                className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger"
              >
                {state.message}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field
                label="Name"
                name="name"
                required
                autoComplete="name"
                error={fieldErrors.name?.[0]}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={fieldErrors.email?.[0]}
              />
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                error={fieldErrors.phone?.[0]}
              />
              <Field
                label="Company (optional)"
                name="company"
                autoComplete="organization"
                error={fieldErrors.company?.[0]}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service" className={labelBase}>
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={serviceValue}
                  onChange={(e) => setServiceValue(e.target.value)}
                  className={inputBase}
                >
                  <option value="">Not sure yet</option>
                  {siteConfig.services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="budget" className={labelBase}>
                  Budget (optional)
                </label>
                <select id="budget" name="budget" defaultValue="" className={inputBase}>
                  <option value="">No preference</option>
                  {BUDGET_VALUES.map((b) => (
                    <option key={b} value={b}>
                      {b} CAD
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className={labelBase}>
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                minLength={10}
                maxLength={2000}
                defaultValue={messagePrefill}
                placeholder="What are you trying to build? Any timeline or constraints?"
                className={cn(inputBase, "resize-y")}
              />
              {fieldErrors.message?.[0] ? (
                <p className="text-xs text-danger">{fieldErrors.message[0]}</p>
              ) : null}
            </div>

            <label className="flex items-start gap-2.5 text-xs text-muted">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 rounded border-border bg-ink/40 accent-brand-orange"
              />
              <span>
                I agree to be contacted about my inquiry. Read our{" "}
                <a href="/privacy" className="text-brand-orange hover:underline">
                  privacy policy
                </a>
                .
              </span>
            </label>
            {fieldErrors.consent?.[0] ? (
              <p className="-mt-3 text-xs text-danger">{fieldErrors.consent[0]}</p>
            ) : null}

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-medium text-white transition-all hover:bg-brand-orange-soft hover:shadow-glow disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelBase}>
        {label}
        {required ? <span className="ml-1 text-brand-orange">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={inputBase}
      />
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
