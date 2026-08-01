"use client";

import { createContext, useContext, type ReactNode } from "react";

interface CMSContextValue {
  /** True when Next.js Draft Mode is enabled - the real mechanism a future
   * WordPress "Preview" button will use (hit a route handler that calls
   * `draftMode().enable()`, then redirects here) to preview unpublished
   * content. Components can use this to bypass ISR caching assumptions. */
  isPreview: boolean;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSClientProvider({ isPreview, children }: { isPreview: boolean; children: ReactNode }) {
  return <CMSContext.Provider value={{ isPreview }}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within a CMSProvider");
  return context;
}
