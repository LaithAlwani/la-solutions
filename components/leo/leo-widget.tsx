import { LeoLauncher } from "./leo-launcher";

/**
 * Server component shell mounted once in `app/layout.tsx`. Keeping the seam
 * here so we can later gate the widget server-side (feature flag, locale,
 * route allowlist) without touching the client tree.
 */
export function LeoWidget() {
  return <LeoLauncher />;
}
