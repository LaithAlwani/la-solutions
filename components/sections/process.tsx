"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { fadeUp, stagger } from "@/lib/motion";

export function Process() {
  const reduced = useReducedMotion();

  return (
    <Section id="process">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-card border border-border shadow-card">
            <Image
              src="/6.jpg"
              alt="Wooden cubes spelling Step By Step"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              quality={75}
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-tr from-ink/50 via-ink/20 to-transparent" />
          </div>
          <div className="mt-6 lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="Our process"
              title="A simple, predictable path from idea to launch."
              description="No mystery, no surprise invoices. Every project follows the same six steps."
            />
          </div>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={reduced ? undefined : stagger(0.05, 0.1)}
          className="relative flex flex-col gap-5"
        >
          <span
            aria-hidden
            className="absolute left-[1.65rem] top-2 bottom-2 w-px bg-linear-to-b from-brand-orange/60 via-brand-orange/20 to-transparent"
          />
          {siteConfig.process.map((step) => (
            <motion.li
              key={step.number}
              variants={reduced ? undefined : fadeUp}
              className="relative flex items-start gap-5 rounded-card border border-border bg-surface/50 p-5 transition-colors hover:border-border-strong"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-ink-2 font-display text-sm font-semibold text-brand-orange ring-1 ring-brand-orange/40">
                {step.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
}
