import { Hero } from "@/components/sections/hero";
import { ServicesTeaser } from "@/components/sections/services-teaser";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Process } from "@/components/sections/process";
import { ContactSection } from "@/components/sections/contact-section";
import { siteConfig } from "@/lib/site-config";

type Props = {
  searchParams?: Promise<{ service?: string; package?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const serviceMatch =
    sp.service ? siteConfig.services.find((s) => s.id === sp.service) : undefined;
  const pkgMatch =
    sp.package && serviceMatch ? serviceMatch.packages.find((p) => p.id === sp.package) : undefined;

  return (
    <>
      <Hero />
      <ServicesTeaser />
      <WhyChooseUs />
      <Process />
      <ContactSection defaultService={serviceMatch?.id} defaultPackage={pkgMatch?.name} />
    </>
  );
}
