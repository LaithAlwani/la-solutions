export type PriceUnit = "one-time" | "per-month" | "per-project";

export type ServicePackage = {
  id: string;
  name: string;
  tagline?: string;
  /** Single fair price in CAD. Use 0 to render "Custom quote". */
  price: number;
  /** Optional crossed-out original price (used for bundle savings). */
  originalPrice?: number;
  currency: "CAD" | "USD";
  unit?: PriceUnit;
  features: string[];
  notes?: string[];
  highlight?: boolean;
  ctaLabel?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  summary: string;
  longDescription?: string;
  iconName: string;
  image?: string;
  packages: ServicePackage[];
  cta: { label: string; href: string };
  /** show on the home services teaser grid (cap to 6). */
  featured?: boolean;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Social = {
  platform: "instagram" | "youtube" | "tiktok" | "facebook";
  url: string;
  handle: string;
};

export type ValueProp = {
  iconName: string;
  title: string;
  description: string;
};

export type SiteConfig = {
  company: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    heroHeadline: string;
    heroSubheadline: string;
    foundedYear: number;
    locale: "en-CA";
  };
  contact: {
    email: string;
    phone?: string;
    city: string;
    region: string;
    addressLine?: string;
    businessHours?: string;
  };
  socials: Social[];
  valueProps: ValueProp[];
  services: ServiceCategory[];
  process: ProcessStep[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    siteUrl: string;
    keywords: string[];
  };
  resend: {
    fromEmail: string;
    toEmail: string;
    replyTo?: string;
  };
};
