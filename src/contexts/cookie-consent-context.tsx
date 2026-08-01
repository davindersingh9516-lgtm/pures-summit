"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export type ConsentStatus = "pending" | "accepted" | "declined";

interface CookieConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

/**
 * FUTURE COOKIE CONSENT ARCHITECTURE
 * ---------------------------------------------------------------------------
 * Persists the visitor's consent choice. A consent banner UI isn't built in
 * this pass (not requested), but `AnalyticsProvider`/`GTMProvider` already
 * read `useCookieConsent().status` and stay inert until it's "accepted" -
 * so dropping a `<CookieConsentBanner />` in later just needs to call
 * `accept()`/`decline()`.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useLocalStorage<ConsentStatus>("cookie-consent", "pending");

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      status,
      accept: () => setStatus("accepted"),
      decline: () => setStatus("declined"),
    }),
    [status, setStatus],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return context;
}
