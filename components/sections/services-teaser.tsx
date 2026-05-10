"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { featuredServices } from "@/lib/site-config";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { stagger } from "@/lib/motion";

export function ServicesTeaser() {
  const reduced = useReducedMotion();

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we build"
        title="Everything your business needs, under one roof."
        description="From your first landing page to a custom internal CRM — websites, apps, automation, AI, and digital ads. Pick a package or mix-and-match."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={reduced ? undefined : stagger(0.05, 0.08)}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featuredServices.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Button href="/services" variant="outline" size="lg">
          See all services & pricing
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
