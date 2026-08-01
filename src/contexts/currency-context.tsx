"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Currency } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { siteConfig } from "@/config/site.config";

/**
 * MULTI-CURRENCY ARCHITECTURE (readiness only). `availableCurrencies` will
 * come from `SiteSettings.currencies` (backend-driven) once a multi-currency
 * WooCommerce setup exists.
 */
interface CurrencyContextValue {
  currencyCode: string;
  availableCurrencies: Currency[];
  setCurrencyCode: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
  availableCurrencies = [{ code: siteConfig.defaultCurrency, symbol: "$", decimalDigits: 2 }],
}: {
  children: ReactNode;
  availableCurrencies?: Currency[];
}) {
  const [currencyCode, setCurrencyCode] = useLocalStorage<string>("currency", siteConfig.defaultCurrency);

  const value = useMemo<CurrencyContextValue>(
    () => ({ currencyCode, availableCurrencies, setCurrencyCode }),
    [currencyCode, availableCurrencies, setCurrencyCode],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
}
