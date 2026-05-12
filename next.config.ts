import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF cuts bytes ~30% over WebP on photographic content; Next.js falls
    // back to WebP and then the original automatically for older clients.
    formats: ["image/avif", "image/webp"],
    // One year — optimized variants are immutable per source hash.
    minimumCacheTTL: 31_536_000,
  },
};

export default nextConfig;
