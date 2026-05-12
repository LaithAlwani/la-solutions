"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LeoUiMessage } from "./use-leo-chat";

type Props = {
  message: LeoUiMessage;
};

const ALLOWED_COMPONENTS = {
  // Override <a> to enforce branded styling and safe target behaviour.
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const url = href ?? "#";
    const isInternal = url.startsWith("/") || url.startsWith("#");
    return (
      <a
        href={url}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noreferrer"}
        className="text-brand-orange underline-offset-2 hover:underline"
      >
        {children}
      </a>
    );
  },
  // Drop block-level elements we don't want Leo emitting.
  h1: ({ children }: { children?: React.ReactNode }) => <p className="font-semibold">{children}</p>,
  h2: ({ children }: { children?: React.ReactNode }) => <p className="font-semibold">{children}</p>,
  h3: ({ children }: { children?: React.ReactNode }) => <p className="font-semibold">{children}</p>,
  h4: ({ children }: { children?: React.ReactNode }) => <p className="font-semibold">{children}</p>,
  pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  img: () => null,
  table: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
};

export function LeoMessage({ message }: Props) {
  const isUser = message.role === "user";
  const isGreeting = message.role === "system-greeting";

  return (
    <div className={cn("flex gap-2.5", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-1 grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-orange/15 text-brand-orange ring-1 ring-brand-orange/40">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      ) : null}

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-brand-orange text-white"
            : isGreeting
              ? "rounded-bl-sm bg-surface/70 text-foreground ring-1 ring-border"
              : "rounded-bl-sm bg-surface-2 text-foreground ring-1 ring-border",
        )}
      >
        {message.pending && !message.content ? (
          <span className="inline-flex items-center gap-1.5 text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
          </span>
        ) : isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div className="leo-markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={ALLOWED_COMPONENTS}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
