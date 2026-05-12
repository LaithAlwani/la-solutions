import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Lists every URL Google should crawl. Static export — runs at build time
 * and on dev hits. Plan slugs come from siteConfig so adding/removing a plan
 * automatically updates the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const plansCategory = siteConfig.services.find((s) => s.id === "plans");
  const planRoutes: MetadataRoute.Sitemap = (plansCategory?.packages ?? []).map(
    (pkg) => ({
      url: `${base}/plans/${pkg.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...planRoutes,
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
