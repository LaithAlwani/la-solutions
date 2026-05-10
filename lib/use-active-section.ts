"use client";

import { useEffect, useState } from "react";

/**
 * Track which of the given DOM section ids is currently most prominent in
 * the viewport. Returns the id of the active section, or null if none of the
 * sections are in the active band.
 *
 * The "active band" is the middle ~20% of the viewport (top 30% and bottom
 * 50% are excluded via rootMargin), which matches what feels like the
 * "currently reading" region without flickering as users scroll.
 */
export function useActiveSection(ids: string[], enabled = true): string | null {
  const key = ids.join(",");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || ids.length === 0) {
      setActive(null);
      return;
    }
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setActive(null);
      return;
    }

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.intersectionRatio);
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
    // key represents the array contents; intentional to avoid array identity issues
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  return active;
}
