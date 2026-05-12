import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesFull } from "@/components/sections/services-full";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description: `Subscription pricing for every plan ${siteConfig.company.name} offers — Platform Plans, Growth Services, and Add-ons. $0 setup with annual commitment.`,
};

export default function ServicesPage() {
  return (
    <>
      <Section padding="lg" className="pt-32 md:pt-40">
        <div className="max-w-3xl">
          <SectionHeading
            as="h1"
            eyebrow="Subscription pricing · CAD"
            title="Pick a plan, scale on your terms."
            description="Three Platform Plans, three Growth Services, and five Add-ons — all on a simple monthly subscription. The standard $499 setup is waived with an annual commitment."
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
