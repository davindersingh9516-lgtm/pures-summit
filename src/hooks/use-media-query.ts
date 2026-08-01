"use client";

import { useSyncExternalStore } from "react";
import { BREAKPOINTS, type BreakpointToken } from "@/constants/breakpoints.constants";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

/**
 * SSR-safe media query hook built on `useSyncExternalStore` (no hydration
 * flash, no effect-based mount dance).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Convenience wrapper around the shared breakpoint token scale. */
export function useBreakpoint(token: BreakpointToken): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[token]}px)`);
}
