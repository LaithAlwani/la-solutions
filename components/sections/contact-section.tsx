import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";

type Props = {
  defaultService?: string;
  defaultPackage?: string;
};

export function ContactSection({ defaultService, defaultPackage }: Props) {
  return (
    <Section id="contact" className="scroll-mt-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Book a discovery call"
            title="Find the plan that fits your business."
            description="Tell us a little about your business and goals. We'll recommend the right plan, add-ons, and growth services — and reply within one business day."
          />

          <ul className="mt-10 flex flex-col gap-4">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 rounded-card border border-border bg-surface/40 p-4 transition-colors hover:border-brand-orange/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-orange/12 text-brand-orange ring-1 ring-brand-orange/30">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    Email
                  </span>
                  <span className="text-sm text-foreground">{siteConfig.contact.email}</span>
                </div>
              </a>
            </li>
            {siteConfig.contact.phone ? (
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 rounded-card border border-border bg-surface/40 p-4 transition-colors hover:border-brand-orange/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-orange/12 text-brand-orange ring-1 ring-brand-orange/30">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      Phone
                    </span>
                    <span className="text-sm text-foreground">{siteConfig.contact.phone}</span>
                  </div>
                </a>
              </li>
            ) : null}
            <li className="flex items-center gap-3 rounded-card border border-border bg-surface/40 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-orange/12 text-brand-orange ring-1 ring-brand-orange/30">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                  Location
                </span>
                <span className="text-sm text-foreground">
                  {siteConfig.contact.city}, {siteConfig.contact.region}
                </span>
              </div>
            </li>
            {siteConfig.contact.businessHours ? (
              <li className="flex items-center gap-3 rounded-card border border-border bg-surface/40 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-orange/12 text-brand-orange ring-1 ring-brand-orange/30">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    Hours
                  </span>
                  <span className="text-sm text-foreground">{siteConfig.contact.businessHours}</span>
                </div>
              </li>
            ) : null}
          </ul>

          {/* <div className="mt-8 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Follow</span>
            <SocialIcons socials={siteConfig.socials} size="sm" />
          </div> */}
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm defaultService={defaultService} defaultPackage={defaultPackage} />
        </Reveal>
      </div>
    </Section>
  );
}
