import type { SiteConfig } from "./types";

// ----------------------------------------------------------------------------
// LA Solutions — Single source of truth.
// Edit company / contact / socials / Resend addresses here. All pages and
// components read from this file.
// Placeholders are marked PLACEHOLDER — replace before going live.
//
// Pricing is in CAD. Bundle packages list both `price` (the discounted bundle
// price) and `originalPrice` (the sum of à-la-carte prices) so the savings
// render as a strikethrough beside the price.
// ----------------------------------------------------------------------------

export const siteConfig: SiteConfig = {
  company: {
    name: "LA Solutions",
    legalName: "LA Solutions",
    tagline: "Web Developer",
    description: "Premium websites, automation, and AI for ambitious businesses.",
    heroHeadline: "Websites that convert. Software that scales.",
    heroSubheadline:
      "We design and build full-stack websites, desktop and mobile apps, and digital advertising — with transparent pricing in CAD.",
    foundedYear: 2024,
    locale: "en-CA",
  },

  contact: {
    email: "info@lasolutions.ca", // PLACEHOLDER
    phone: "+1 (613) 884-1155", // PLACEHOLDER
    city: "Ottawa", // PLACEHOLDER
    region: "Ontario, Canada",
    addressLine: "Ottawa, ON, Canada",
    businessHours: "Mon–Fri, 9am–6pm ET",
  },

  socials: [
    { platform: "instagram", url: "https://instagram.com/", handle: "@lasolutions" }, // PLACEHOLDER
    { platform: "youtube", url: "https://youtube.com/", handle: "@lasolutions" }, // PLACEHOLDER
    { platform: "tiktok", url: "https://tiktok.com/", handle: "@lasolutions" }, // PLACEHOLDER
    { platform: "facebook", url: "https://facebook.com/", handle: "lasolutions" }, // PLACEHOLDER
  ],

  valueProps: [
    {
      iconName: "BadgeDollarSign",
      title: "Transparent pricing",
      description:
        "Every package, every fee — published in CAD. No hidden surprises in the proposal.",
    },
    {
      iconName: "Zap",
      title: "Built for results",
      description:
        "Performance-first builds with SEO, analytics, and conversion patterns baked in from day one.",
    },
    {
      iconName: "Headphones",
      title: "Real support",
      description:
        "Direct access to the team that built your site. Same-day responses during business hours.",
    },
  ],

  services: [
    // ====================================================================
    // BUNDLES — pre-built combos at a discount. Featured first on /services
    // and on the home teaser so they catch the eye.
    // ====================================================================
    {
      id: "bundles",
      name: "Bundles",
      summary: "Pre-built combos that save you money — and headaches.",
      longDescription:
        "Most clients buy more than one service anyway. Bundles combine the most-requested combinations at a meaningful discount, with one project, one timeline, and one invoice.",
      iconName: "Sparkles",
      image: "/5.jpg",
      featured: true,
      packages: [
        {
          id: "complete-business",
          name: "Complete Business Site",
          tagline: "Everything you need to launch online.",
          price: 4800,
          originalPrice: 5800,
          currency: "CAD",
          unit: "one-time",
          highlight: true,
          features: [
            "Pro custom website (multi-page, custom design)",
            "Online appointment booking",
            "Stripe payment integration",
            "User accounts & secure login",
            "Performance & SEO foundation",
            "Analytics setup",
          ],
          notes: ["Save $1,000 vs. buying à la carte."],
        },
        {
          id: "marketing-growth",
          name: "Marketing Growth Bundle",
          tagline: "SEO + Social + Paid Ads, managed monthly.",
          price: 1800,
          originalPrice: 2200,
          currency: "CAD",
          unit: "per-month",
          features: [
            "Social media content management",
            "Facebook & Instagram ads management",
            "Google Ads management",
            "Monthly reporting & optimization",
            "Free SEO setup ($750 value)",
          ],
          notes: [
            "Save $400/mo + free SEO setup ($750).",
            "Ad spend on Meta and Google is paid separately by the client.",
          ],
        },
        {
          id: "ai-automation",
          name: "AI & Automation Bundle",
          tagline: "Smart chat + automated messaging, working together.",
          price: 1000,
          originalPrice: 1250,
          currency: "CAD",
          unit: "one-time",
          features: [
            "AI chat agent on your website",
            "FAQ automation & lead capture",
            "SMS appointment reminders",
            "Email confirmations & follow-ups",
            "Auto-responses tuned to your brand",
          ],
          notes: ["Save $250 vs. buying separately."],
        },
      ],
      cta: { label: "See bundles", href: "/services#bundles" },
    },

    // ====================================================================
    // WEBSITES & APPS
    // ====================================================================
    {
      id: "websites",
      name: "Websites & Apps",
      summary: "Fast, beautifully designed sites that turn visitors into customers.",
      longDescription:
        "From a clean small-business site to a fully custom platform — built on the latest stack, optimized for speed and SEO, and designed to convert.",
      iconName: "Globe",
      image: "/1.jpg",
      featured: true,
      packages: [
        {
          id: "starter",
          name: "Starter Website",
          tagline: "Mobile-first site for small businesses.",
          price: 1200,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Up to 5 pages, responsive design",
            "Contact form with email notifications",
            "Social media links & Google Maps",
            "Basic on-page SEO",
            "Domain & hosting setup",
          ],
        },
        {
          id: "pro",
          name: "Pro Website",
          tagline: "Custom design with advanced functionality.",
          price: 3500,
          currency: "CAD",
          unit: "one-time",
          highlight: true,
          features: [
            "Custom UI/UX design",
            "Up to 10 pages with dynamic content",
            "Booking & contact integrations",
            "Advanced SEO structure",
            "Analytics setup & performance tuning",
          ],
        },
        {
          id: "ecommerce",
          name: "E-commerce / Custom App",
          tagline: "Full online store or custom-built application.",
          price: 0, // → "Custom quote"
          currency: "CAD",
          unit: "per-project",
          features: [
            "Product catalog & cart",
            "Checkout with Stripe",
            "Inventory & order management",
            "Mobile app companion (optional)",
            "Custom integrations (CRM, ERP, APIs)",
          ],
          ctaLabel: "Request a quote",
        },
      ],
      cta: { label: "See website packages", href: "/services#websites" },
    },

    // ====================================================================
    // OPERATIONS — booking + payments + login (the "make it work" tier)
    // ====================================================================
    {
      id: "operations",
      name: "Bookings, Payments & Logins",
      summary: "The operational pieces that run your business online.",
      longDescription:
        "Add the systems your customers expect — schedule appointments, take payments, and let users have their own accounts. Plug each one into an existing site or include them in a new build.",
      iconName: "CalendarClock",
      image: "/7.jpg",
      featured: true,
      packages: [
        {
          id: "booking",
          name: "Online Booking",
          tagline: "Customers schedule themselves.",
          price: 1200,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Calendar with availability rules",
            "Email confirmations & reminders",
            "Customer & appointment dashboard",
            "Service-level pricing & duration",
            "Mobile-friendly booking flow",
          ],
        },
        {
          id: "payments",
          name: "Payment Integration",
          tagline: "Take money online, securely.",
          price: 600,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Stripe checkout",
            "One-time, deposit, or subscription billing",
            "Invoice generation",
            "Payment receipts & order history",
            "PCI-compliant by default",
          ],
          notes: ["Stripe processor fees (~2.9% + $0.30 per transaction) are billed by Stripe."],
        },
        {
          id: "auth",
          name: "User Accounts & Login",
          tagline: "Email/password + Google + Facebook sign-in.",
          price: 500,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Email/password authentication",
            "Google & Facebook social login",
            "Password recovery flow",
            "Role-based access (customer / staff / admin)",
            "Session security & rate limiting",
          ],
        },
      ],
      cta: { label: "See operations packages", href: "/services#operations" },
    },

    // ====================================================================
    // MARKETING — SEO + Social + Paid Ads
    // ====================================================================
    {
      id: "marketing",
      name: "Marketing Services",
      summary: "Get found, get followed, get clicks.",
      longDescription:
        "Three levers that work better together: SEO to be found organically, social to stay top-of-mind, and paid ads to drive demand on demand. Buy them separately or save with the Marketing Growth bundle.",
      iconName: "Target",
      image: "/2.jpg",
      featured: true,
      packages: [
        {
          id: "seo",
          name: "SEO Setup",
          tagline: "On-page + technical + Google Business.",
          price: 750,
          currency: "CAD",
          unit: "one-time",
          features: [
            "On-page SEO across all pages",
            "Technical SEO audit & fixes",
            "Google Business Profile optimization",
            "Keyword targeting & meta data",
            "Performance & Core Web Vitals tuning",
          ],
        },
        {
          id: "social",
          name: "Social Media Management",
          tagline: "Done-for-you content across your channels.",
          price: 600,
          currency: "CAD",
          unit: "per-month",
          features: [
            "Content creation (posts, reels, captions)",
            "Posting schedule across platforms",
            "Brand-consistent visuals",
            "Engagement support",
            "Monthly performance recap",
          ],
        },
        {
          id: "paid-ads",
          name: "Paid Ads (per platform)",
          tagline: "Meta or Google — managed monthly.",
          price: 800,
          currency: "CAD",
          unit: "per-month",
          features: [
            "Ad creative & copy",
            "Audience or keyword targeting",
            "Conversion tracking setup",
            "Weekly optimization",
            "Monthly reporting",
          ],
          notes: [
            "Per platform (Meta or Google). Choose one or run both.",
            "Ad spend is paid separately by the client.",
          ],
        },
      ],
      cta: { label: "See marketing options", href: "/services#marketing" },
    },

    // ====================================================================
    // AI & AUTOMATION
    // ====================================================================
    {
      id: "ai",
      name: "AI & Automation",
      summary: "Round-the-clock assistance and customer messaging on autopilot.",
      longDescription:
        "An AI agent that knows your business and an automated messaging stack that follows up so you don't have to.",
      iconName: "Bot",
      image: "/3.jpg",
      featured: true,
      packages: [
        {
          id: "ai-chat",
          name: "AI Chat Agent",
          tagline: "Trained on your business. Always on.",
          price: 750,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Custom-trained on your content",
            "FAQ automation",
            "Booking & lead capture",
            "Brand-tuned tone of voice",
            "Hand-off to human when needed",
          ],
        },
        {
          id: "messaging",
          name: "Automated Messaging",
          tagline: "SMS + email automation.",
          price: 500,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Appointment reminders (SMS)",
            "Email confirmations & receipts",
            "Follow-up sequences",
            "Auto-responses to common questions",
            "Two-way SMS support",
          ],
        },
      ],
      cta: { label: "See AI options", href: "/services#ai" },
    },

    // ====================================================================
    // ADMIN DASHBOARDS
    // ====================================================================
    {
      id: "dashboards",
      name: "Admin Dashboards",
      summary: "A custom command center for your team.",
      longDescription:
        "Manage appointments, customers, employees, inventory, and analytics from one purpose-built dashboard — wired to your existing site or app.",
      iconName: "LayoutDashboard",
      image: "/4.jpg",
      packages: [
        {
          id: "admin",
          name: "Staff & Admin Dashboard",
          tagline: "Operations, all in one place.",
          price: 2500,
          currency: "CAD",
          unit: "one-time",
          features: [
            "Employee & schedule management",
            "Customer database & history",
            "Appointment & order tracking",
            "Analytics & reporting",
            "Custom internal tools on request",
          ],
        },
      ],
      cta: { label: "See dashboard options", href: "/services#dashboards" },
    },

    // ====================================================================
    // HOSTING & MAINTENANCE
    // ====================================================================
    {
      id: "hosting",
      name: "Hosting & Maintenance",
      summary: "Hosting, backups, updates, and ongoing support.",
      longDescription:
        "Keep your site fast, secure, and up to date — without thinking about it. Two tiers depending on how much support you need.",
      iconName: "Server",
      packages: [
        {
          id: "standard",
          name: "Standard Maintenance",
          tagline: "Hosting, security, backups, support.",
          price: 150,
          currency: "CAD",
          unit: "per-month",
          features: [
            "Website hosting",
            "Security updates",
            "Daily backups",
            "Technical support",
            "Minor edits & content updates",
            "Performance monitoring",
          ],
        },
        {
          id: "growth",
          name: "Growth Package",
          tagline: "Standard + ongoing growth services.",
          price: 450,
          currency: "CAD",
          unit: "per-month",
          highlight: true,
          features: [
            "Everything in Standard",
            "SEO monitoring & monthly tweaks",
            "Social media support",
            "Monthly analytics report",
            "Priority support",
            "Automated systems monitoring",
          ],
        },
      ],
      cta: { label: "See maintenance plans", href: "/services#hosting" },
    },

    // ====================================================================
    // CUSTOM SOLUTIONS
    // ====================================================================
    {
      id: "custom",
      name: "Custom Solutions",
      summary: "Custom databases, CRMs, SaaS platforms, and AI automation — built to fit.",
      longDescription:
        "When off-the-shelf can't do it, we build it. Internal tools, CRMs, SaaS platforms, mobile apps, API integrations, AI-powered workflows.",
      iconName: "Wrench",
      packages: [
        {
          id: "custom",
          name: "Custom Project",
          tagline: "Scoped to your needs.",
          price: 0,
          currency: "CAD",
          unit: "per-project",
          features: [
            "Custom databases",
            "Internal business tools",
            "Mobile app (iOS / Android)",
            "API integrations",
            "CRM systems",
            "SaaS platforms",
            "AI-powered automation",
          ],
          notes: ["Custom quote based on project scope."],
          ctaLabel: "Request a quote",
        },
      ],
      cta: { label: "Request a quote", href: "/#contact" },
    },
  ],

  process: [
    { number: "01", title: "Discovery", description: "A short call to understand goals, audience, and scope." },
    { number: "02", title: "Proposal", description: "Fixed-price quote and timeline within 48 hours." },
    { number: "03", title: "Design", description: "Wireframes and a clickable preview for your feedback." },
    { number: "04", title: "Build", description: "Development with weekly check-ins and live previews." },
    { number: "05", title: "Launch", description: "Domain, hosting, and analytics live within the agreed timeline." },
    { number: "06", title: "Support", description: "30 days of post-launch tweaks included." },
  ],

  seo: {
    defaultTitle: "LA Solutions — Websites, Automation & AI",
    titleTemplate: "%s | LA Solutions",
    defaultDescription:
      "LA Solutions builds premium websites, booking systems, AI chat agents, and digital advertising for businesses. Transparent pricing in CAD.",
    ogImage: "/logo_300dpi.png",
    siteUrl: "https://lasolutions.ca", // PLACEHOLDER
    keywords: [
      "web development",
      "Canadian web developer",
      "Ottawa web design",
      "AI chat agent",
      "booking system",
      "Stripe integration",
      "SEO",
      "Google Ads",
      "Facebook Ads",
      "social media management",
    ],
  },

  resend: {
    fromEmail: "LA Solutions <onboarding@resend.dev>", // PLACEHOLDER — replace once domain is verified
    toEmail: "info@lasolutions.ca", // PLACEHOLDER
  },
};

/** Categories shown on the home "Services" teaser grid. */
export const featuredServices = siteConfig.services.filter((s) => s.featured);
