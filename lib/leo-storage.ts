import type { Locale } from "./leo-strings";

/**
 * localStorage persistence for the Leo chat.
 *
 * - 7-day TTL: an entry older than that is treated as expired and dropped.
 * - Versioned key: bumping `VERSION` invalidates all stored conversations,
 *   which is what we want when LeoUiMessage's shape changes incompatibly.
 * - Caps stored history at MAX_PERSISTED messages so a chatty user can't
 *   silently fill the 5 MB localStorage quota.
 * - Pending assistant placeholders and in-flight lead-form state are
 *   stripped on save — they represent transient UI state that should not
 *   resurrect after a page reload.
 */

const VERSION = 1;
const STORAGE_KEY = `leo-chat-v${VERSION}`;
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_PERSISTED = 20;

// We only depend on the shape of a chat message — not on the hook's exports —
// to avoid an import cycle (use-leo-chat.ts imports from this file).
export type PersistedMessage = {
  id: string;
  role: "user" | "assistant" | "system-greeting";
  content: string;
  showLeadForm?: boolean;
  leadFormStatus?: "open" | "sent";
};

type StoredEntry = {
  version: number;
  savedAt: number;
  locale: Locale;
  messages: PersistedMessage[];
};

export type LoadedChat = {
  messages: PersistedMessage[];
  locale: Locale;
};

export function loadChat(): LoadedChat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredEntry>;
    if (parsed.version !== VERSION) return null;
    if (!parsed.savedAt || Date.now() - parsed.savedAt > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (!Array.isArray(parsed.messages)) return null;
    return {
      locale: parsed.locale ?? "en",
      messages: parsed.messages,
    };
  } catch {
    return null;
  }
}

export function saveChat(
  messages: PersistedMessage[],
  locale: Locale,
): void {
  if (typeof window === "undefined") return;
  try {
    const entry: StoredEntry = {
      version: VERSION,
      savedAt: Date.now(),
      locale,
      messages: messages.slice(-MAX_PERSISTED),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // Quota exceeded or storage disabled (private mode in some browsers) —
    // chat still works in memory, we just lose the persistence.
  }
}

export function clearChat(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
