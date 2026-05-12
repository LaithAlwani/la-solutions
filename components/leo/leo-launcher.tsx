"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { detectLocale, leoStrings, type Locale } from "@/lib/leo-strings";
import { LeoPanel } from "./leo-panel";

export function LeoLauncher() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const strings = leoStrings(locale);

  return (
    <>
      <LeoPanel open={open} onClose={() => setOpen(false)} />
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? strings.closeLabel : strings.launcherLabel}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={reduced ? undefined : { y: -2 }}
        className="fixed bottom-5 right-4 z-[55] inline-flex items-center gap-2 rounded-pill bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-glow ring-1 ring-brand-orange/40 transition-colors hover:bg-brand-orange-soft sm:right-6"
      >
        {open ? (
          <X className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {open ? strings.closeLabel : strings.launcherLabel}
        </span>
        <MessageCircle className="h-4 w-4 sm:hidden" />
      </motion.button>
    </>
  );
}
