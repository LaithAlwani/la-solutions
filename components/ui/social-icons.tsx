"use client";

import Link from "next/link";
import type { Social } from "@/lib/types";
import { cn } from "@/lib/cn";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48" fill="#0d0f12" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.9h-2.33v6.98A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21 8.51a8.39 8.39 0 0 1-4.91-1.56v7.32a6.23 6.23 0 1 1-6.23-6.22 6.31 6.31 0 0 1 1 .08v3.2a3.06 3.06 0 1 0 2.06 2.89V2h3.16a5.22 5.22 0 0 0 4.92 4.66Z" />
    </svg>
  );
}

const ICON_MAP = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

const LABEL_MAP = {
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
  tiktok: "TikTok",
} as const;

type Props = {
  socials: Social[];
  size?: "sm" | "md";
  className?: string;
};

export function SocialIcons({ socials, size = "sm", className }: Props) {
  const iconClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnClass = size === "sm" ? "h-9 w-9" : "h-10 w-10";

  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {socials.map((s) => {
        const Icon = ICON_MAP[s.platform];
        return (
          <li key={s.platform}>
            <Link
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LA Solutions on ${LABEL_MAP[s.platform]}`}
              className={cn(
                "grid place-items-center rounded-full border border-border bg-surface/40 text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:text-brand-orange hover:shadow-glow-soft",
                btnClass,
              )}
            >
              <Icon className={iconClass} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
