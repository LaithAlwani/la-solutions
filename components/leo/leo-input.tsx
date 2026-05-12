"use client";

import { useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { leoStrings, type Locale } from "@/lib/leo-strings";
import { cn } from "@/lib/cn";

type Props = {
  locale: Locale;
  disabled: boolean;
  onSend: (text: string) => void;
};

export function LeoInput({ locale, disabled, onSend }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const strings = leoStrings(locale);

  function autosize() {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 140);
    el.style.height = `${next}px`;
    // Only enable the scrollbar when content actually overflows the cap.
    // Otherwise an empty/short textarea would render a flickering scrollbar.
    el.style.overflowY = el.scrollHeight > 140 ? "auto" : "hidden";
  }

  function submit() {
    const el = ref.current;
    if (!el) return;
    const text = el.value.trim();
    if (!text || disabled) return;
    onSend(text);
    el.value = "";
    autosize();
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="flex items-end gap-2 border-t border-border bg-surface/80 p-3">
      <textarea
        ref={ref}
        rows={1}
        placeholder={strings.inputPlaceholder}
        onInput={autosize}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className="leo-textarea max-h-35 min-h-10 flex-1 resize-none overflow-y-hidden rounded-lg border border-border bg-ink/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:border-brand-orange focus:outline-none disabled:opacity-60"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled}
        aria-label={strings.sendLabel}
        className={cn(
          "grid h-10 w-10 flex-none place-items-center rounded-lg bg-brand-orange text-white transition-colors hover:bg-brand-orange-soft",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}
