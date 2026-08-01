"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Country } from "@/data";
import { COUNTRIES } from "@/data";
import { useLocalStorage } from "@/hooks/use-local-storage";

/**
 * Shipping-region selection. Backed by `data/countries.ts` (a static ISO
 * reference list - never CMS content, see that file's header comment), not
 * a repository. This is genuinely just "which of these fixed countries do
 * you want prices/shipping estimated for", unlike locale/currency which the
 * backend will eventually own.
 */
interface RegionContextValue {
  countryCode: string;
  availableCountries: Country[];
  setCountryCode: (code: string) => void;
}

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCode] = useLocalStorage<string>("region", COUNTRIES[0].code);

  const value = useMemo<RegionContextValue>(
    () => ({ countryCode, availableCountries: COUNTRIES, setCountryCode }),
    [countryCode, setCountryCode],
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) throw new Error("useRegion must be used within a RegionProvider");
  return context;
}
