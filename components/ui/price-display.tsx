"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { formatCAD, unitSuffix } from "@/lib/format";
import { cn } from "@/lib/cn";

type Unit = "one-time" | "per-month" | "per-project";

type Props = {
  price: number;
  /** Optional original price (rendered as strikethrough — used for bundle savings). */
  originalPrice?: number;
  unit?: Unit;
  emphasis?: "lg" | "xl";
  className?: string;
};

const EMPHASIS = {
  lg: "text-3xl sm:text-4xl",
  xl: "text-4xl sm:text-5xl md:text-6xl",
};

export function PriceDisplay({ price, originalPrice, unit, emphasis = "lg", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? price : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 700;
    const startTs = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setShown(Math.round(price * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, price, reduced]);

  if (price === 0) {
    return (
      <span ref={ref} className={cn("font-display font-semibold", EMPHASIS[emphasis], className)}>
        Custom quote
      </span>
    );
  }

  const suffix = unitSuffix(unit);

  return (
    <span ref={ref} className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display leading-none", className)}>
      <span className={cn("font-semibold tabular-nums text-foreground", EMPHASIS[emphasis])}>
        {formatCAD(shown)}
      </span>
      {suffix ? <span className="text-sm font-medium text-muted">{suffix}</span> : null}
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">CAD</span>
      {originalPrice && originalPrice > price ? (
        <span className="ml-1 text-sm font-medium text-muted-2 line-through tabular-nums">
          {formatCAD(originalPrice)}
        </span>
      ) : null}
    </span>
  );
}

export function StartingAt({
  price,
  unit,
  className,
}: {
  price: number;
  unit?: Unit;
  className?: string;
}) {
  if (price === 0) {
    return (
      <span className={cn("font-display text-xl font-semibold text-foreground", className)}>
        Custom quote
      </span>
    );
  }
  const suffix = unitSuffix(unit);
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">From</span>
      <span className="font-display text-xl font-semibold text-foreground tabular-nums">
        {formatCAD(price)}
        {suffix}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">CAD</span>
    </span>
  );
}
