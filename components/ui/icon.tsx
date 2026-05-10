"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  Bot,
  CalendarClock,
  Check,
  CheckCircle2,
  CreditCard,
  Globe,
  Headphones,
  LayoutDashboard,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageSquareDashed,
  Phone,
  Search,
  Send,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

const REGISTRY = {
  ArrowRight,
  BadgeDollarSign,
  Bot,
  CalendarClock,
  Check,
  CheckCircle2,
  CreditCard,
  Globe,
  Headphones,
  LayoutDashboard,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageSquareDashed,
  Phone,
  Search,
  Send,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} as const;

export type IconName = keyof typeof REGISTRY;

type Props = {
  name: string;
  className?: string;
  strokeWidth?: number;
  size?: number;
};

/**
 * Lookup-friendly icon component. Accepts string names (from site-config) and
 * falls back to Sparkles if the icon isn't in the registry.
 */
export function Icon({ name, className, strokeWidth = 1.75, size }: Props) {
  const Cmp: LucideIcon = (REGISTRY as Record<string, LucideIcon>)[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} size={size} aria-hidden />;
}
