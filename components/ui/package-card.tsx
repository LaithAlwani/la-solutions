"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ServiceCategory, ServicePackage } from "@/lib/types";
import { Badge } from "./badge";
import { Button } from "./button";
import { FeatureList } from "./feature-list";
import { PriceDisplay } from "./price-display";
import { cn } from "@/lib/cn";
import { fadeUp, fadeInstant } from "@/lib/motion";

type Props = {
  service: ServiceCategory;
  pkg: ServicePackage;
};

export function PackageCard({ service, pkg }: Props) {
  const reduced = useReducedMotion();
  const href = `/#contact?service=${encodeURIComponent(service.id)}&package=${encodeURIComponent(pkg.id)}`;

  return (
    <motion.article
      variants={reduced ? fadeInstant : fadeUp}
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-card border bg-surface p-6 shadow-card transition-shadow duration-300",
        pkg.highlight
          ? "border-brand-orange/40 shadow-glow-soft hover:shadow-glow"
          : "border-border hover:border-border-strong hover:shadow-card-hover",
      )}
    >
      {pkg.highlight ? (
        <Badge variant="orange" className="absolute -top-2.5 left-6">
          Most popular
        </Badge>
      ) : null}

      <header className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl font-semibold text-foreground">{pkg.name}</h3>
        {pkg.tagline ? <p className="text-sm text-muted">{pkg.tagline}</p> : null}
      </header>

      <div className="border-y border-border py-5">
        <PriceDisplay
          price={pkg.price}
          originalPrice={pkg.originalPrice}
          unit={pkg.unit}
          emphasis="lg"
        />
      </div>

      <FeatureList items={pkg.features} className="flex-1" />

      {pkg.notes && pkg.notes.length > 0 ? (
        <ul className="space-y-1 text-xs text-muted-2">
          {pkg.notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      ) : null}

      <Button
        variant={pkg.highlight ? "primary" : "outline"}
        size="md"
        href={href}
        fullWidth
        className="mt-2"
      >
        {pkg.ctaLabel ?? "Start this package"}
      </Button>
    </motion.article>
  );
}
