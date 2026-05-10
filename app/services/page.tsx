import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesFull } from "@/components/sections/services-full";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: `Transparent pricing for every service ${siteConfig.company.name} offers — websites, booking, AI, automation, marketing, and more.`,
};

export default function ServicesPage() {
  return (
    <>
      <Section padding="lg" className="pt-32 md:pt-40">
        <div className="max-w-3xl">
          <SectionHeading
            as="h1"
            eyebrow="Pricing in CAD"
            title="Every service, every package, every price."
            description="No hidden retainers, no surprise upsells. Pick a tier, mix services, or ask for a custom quote — all prices are starting ranges and quoted on a fixed basis after a short discovery call."
          />
        </div>
      </Section>

      <Container>
        <ServicesFull />
      </Container>

      <CtaBanner />
    </>
  );
}
