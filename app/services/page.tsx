import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesFull } from "@/components/sections/services-full";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd, faqPageLd, serviceLd } from "@/lib/seo";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Plans & Pricing — Subscription business platform",
  description: `Compare every plan and add-on ${siteConfig.company.name} offers. Three Platform Plans, three Growth Services, five Add-ons. Transparent monthly pricing in CAD. $0 setup with annual commitment.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Plans & Pricing | ${siteConfig.company.name}`,
    description:
      "Three Platform Plans, Growth Services, and Add-ons. Transparent monthly subscription pricing.",
    url: "/services",
    images: [siteConfig.seo.ogImage],
  },
};

export default function ServicesPage() {
  const plans = siteConfig.services.find((s) => s.id === "plans");
  const planSchemas = (plans?.packages ?? []).map((pkg) =>
    serviceLd(pkg, `/plans/${pkg.id}`),
  );

  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Plans & Pricing", path: "/services" },
  ]);

  return (
    <>
      <JsonLd data={[...planSchemas, crumbs, faqPageLd(faqItems)]} />

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

      <Faq />

      <CtaBanner />
    </>
  );
}
