"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { env } from "@/config/env";
import { useCookieConsent } from "@/contexts/cookie-consent-context";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

interface AnalyticsContextValue {
  track: (event: string, payload?: AnalyticsPayload) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * FUTURE ANALYTICS ARCHITECTURE
 * ---------------------------------------------------------------------------
 * A single, provider-agnostic `track()` call site for the whole app.
 * Today it pushes to `window.dataLayer` (consumed by GTMProvider's
 * container) when a GTM ID is configured AND the visitor has accepted
 * cookies; otherwise it's a real no-op, not a stub - swapping to a
 * different analytics vendor later only means changing this file's body.
 */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const { status } = useCookieConsent();

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      track: (event, payload) => {
        if (!env.NEXT_PUBLIC_GTM_ID || status !== "accepted") return;
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({ event, ...payload });
      },
    }),
    [status],
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error("useAnalytics must be used within an AnalyticsProvider");
  return context;
}
