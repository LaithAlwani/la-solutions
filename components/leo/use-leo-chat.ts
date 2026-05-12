"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { detectLocale, leoStrings, type Locale } from "@/lib/leo-strings";
import type { LeoTurn } from "@/lib/schemas";

// Soft cap on client-side history sent per turn. The server still validates.
const HISTORY_CAP = 12;

export type LeoUiMessage = {
  id: string;
  role: "user" | "assistant" | "system-greeting";
  content: string;
  pending?: boolean;
  showLeadForm?: boolean;
  leadFormStatus?: "open" | "submitting" | "sent";
};

export type LeoChatState = {
  messages: LeoUiMessage[];
  isStreaming: boolean;
  error: string | null;
  locale: Locale;
};

export type LeoChatApi = LeoChatState & {
  send: (text: string) => Promise<void>;
  submitLead: (input: { email: string; name?: string }) => Promise<void>;
  dismissLeadForm: (messageId: string) => void;
  clearError: () => void;
};

const LEAD_TOKEN = "<LEAD_CAPTURE>";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

function trimHistoryForServer(messages: LeoUiMessage[]): LeoTurn[] {
  // Drop the greeting, any pending placeholders, and empty content. Empty
  // assistant messages happen when Leo's reply was only the lead-capture
  // sentinel — the zod schema rejects empty content, so we'd 400 next turn.
  const real = messages.filter(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      !m.pending &&
      m.content.trim().length > 0,
  );
  return real
    .slice(-HISTORY_CAP)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
}

export function useLeoChat(): LeoChatApi {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<LeoUiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const loc = detectLocale();
    setLocale(loc);
    setMessages([
      {
        id: "greeting",
        role: "system-greeting",
        content: leoStrings(loc).greeting,
      },
    ]);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;
      setError(null);

      const userMsg: LeoUiMessage = { id: newId(), role: "user", content: trimmed };
      const assistantId = newId();
      const assistantMsg: LeoUiMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        pending: true,
      };

      // Build the server-bound history from current state + the new user
      // message synchronously — DO NOT capture this inside a setMessages
      // updater. React 18 batches state updates, so the updater runs after
      // this turn's fetch fires, leaving serverHistory empty (→ 400).
      const serverHistory = trimHistoryForServer([...messages, userMsg]);
      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      setIsStreaming(true);
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const resp = await fetch("/api/leo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: serverHistory, website: "" }),
          signal: ac.signal,
        });

        if (!resp.ok) {
          const isRate = resp.status === 429;
          throw new Error(isRate ? "rate_limited" : "request_failed");
        }
        if (!resp.body) throw new Error("no_body");

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let acc = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let idx: number;
          while ((idx = buffer.indexOf("\n\n")) !== -1) {
            const raw = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 2);
            const line = raw.trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;

            let evt: { type: string; text?: string; message?: string };
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }

            if (evt.type === "delta" && evt.text) {
              acc += evt.text;
              const cleaned = acc.replace(LEAD_TOKEN, "").trimEnd();
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: cleaned } : m,
                ),
              );
            } else if (evt.type === "error") {
              throw new Error(evt.message ?? "server_error");
            }
          }
        }

        const hasLead = acc.includes(LEAD_TOKEN);
        const finalContent = acc.replace(LEAD_TOKEN, "").trim();

        setMessages((prev) => {
          // If Leo's only "content" was the lead sentinel, drop the empty
          // bubble and attach the lead form to the last visible turn instead.
          if (!finalContent && hasLead) {
            const withoutPlaceholder = prev.filter((m) => m.id !== assistantId);
            if (withoutPlaceholder.length === 0) return withoutPlaceholder;
            const last = withoutPlaceholder[withoutPlaceholder.length - 1]!;
            return withoutPlaceholder.map((m) =>
              m.id === last.id
                ? { ...m, showLeadForm: true, leadFormStatus: "open" as const }
                : m,
            );
          }
          if (!finalContent) {
            // Empty reply with no lead intent — just remove the placeholder.
            return prev.filter((m) => m.id !== assistantId);
          }
          return prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: finalContent,
                  pending: false,
                  showLeadForm: hasLead,
                  leadFormStatus: hasLead ? "open" : undefined,
                }
              : m,
          );
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg = (err as Error).message;
        const strings = leoStrings(locale);
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setError(msg === "rate_limited" ? strings.rateLimited : strings.errorGeneric);
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    // `messages` must be in deps so the snapshot above stays fresh between turns.
    [messages, isStreaming, locale],
  );

  const submitLead = useCallback(
    async ({ email, name }: { email: string; name?: string }) => {
      const target = messages.find(
        (m) => m.showLeadForm && m.leadFormStatus !== "sent",
      );
      if (!target) return;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === target.id ? { ...m, leadFormStatus: "submitting" } : m,
        ),
      );

      try {
        const resp = await fetch("/api/leo/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: name ?? "",
            language: locale,
            conversation: messages
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => ({ role: m.role, content: m.content })),
            website: "",
          }),
        });
        if (!resp.ok) throw new Error("lead_failed");
        setMessages((prev) =>
          prev.map((m) =>
            m.id === target.id ? { ...m, leadFormStatus: "sent" } : m,
          ),
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === target.id ? { ...m, leadFormStatus: "open" } : m,
          ),
        );
        setError(leoStrings(locale).errorGeneric);
      }
    },
    [messages, locale],
  );

  const dismissLeadForm = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, showLeadForm: false } : m,
      ),
    );
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { messages, isStreaming, error, locale, send, submitLead, dismissLeadForm, clearError };
}
