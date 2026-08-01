"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { siteConfig } from "@/config/site.config";

/**
 * MULTI-LANGUAGE ARCHITECTURE (readiness only - no translations yet).
 * `availableLocales` will come from `SiteSettings.locales` (backend-driven)
 * once more than one locale exists; the fallback here only covers local
 * development before that data is fetched.
 */
interface LocaleContextValue {
  locale: string;
  availableLocales: Locale[];
  setLocale: (code: string) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  availableLocales = [{ code: siteConfig.defaultLocale, label: siteConfig.defaultLocale, isDefault: true }],
}: {
  children: ReactNode;
  availableLocales?: Locale[];
}) {
  const [locale, setLocale] = useLocalStorage<string>("locale", siteConfig.defaultLocale);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, availableLocales, setLocale }),
    [locale, availableLocales, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a LocaleProvider");
  return context;
}
