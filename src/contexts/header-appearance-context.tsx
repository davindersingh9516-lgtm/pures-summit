"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface HeaderAppearanceContextValue {
  /** True while a page has mounted a `<TransparentHeroBoundary />` and the
   * header hasn't scrolled past it yet - lets the header render transparent
   * over a full-bleed hero instead of always being solid. */
  transparentOverHero: boolean;
  setTransparentOverHero: (value: boolean) => void;
}

const HeaderAppearanceContext = createContext<HeaderAppearanceContextValue | null>(null);

export function HeaderAppearanceProvider({ children }: { children: ReactNode }) {
  const [transparentOverHero, setTransparentOverHero] = useState(false);

  const value = useMemo<HeaderAppearanceContextValue>(
    () => ({ transparentOverHero, setTransparentOverHero }),
    [transparentOverHero],
  );

  return <HeaderAppearanceContext.Provider value={value}>{children}</HeaderAppearanceContext.Provider>;
}

export function useHeaderAppearance() {
  const context = useContext(HeaderAppearanceContext);
  if (!context) throw new Error("useHeaderAppearance must be used within a HeaderAppearanceProvider");
  return context;
}

/**
 * Mount this once inside a page's hero section to opt the global header
 * into its transparent-over-hero variant for as long as this component
 * stays mounted (e.g. the homepage hero in the next build phase). Header
 * itself still switches to solid once the visitor scrolls past the hero.
 */
export function TransparentHeroBoundary() {
  const { setTransparentOverHero } = useHeaderAppearance();

  useEffect(() => {
    setTransparentOverHero(true);
    return () => setTransparentOverHero(false);
  }, [setTransparentOverHero]);

  return null;
}
