import { draftMode } from "next/headers";
import type { ReactNode } from "react";
import { CMSClientProvider } from "@/contexts/cms-context";

/**
 * FUTURE CMS PREVIEW ARCHITECTURE
 * ---------------------------------------------------------------------------
 * Server Component wrapper - `draftMode()` is only readable on the server.
 * Reads Next.js's real Draft Mode state today (always `false` until a
 * `/api/preview` route handler enabling it is built alongside WordPress
 * preview links) and threads it into `CMSClientProvider` for anything
 * client-side that needs to know it's in preview.
 */
export async function CMSProvider({ children }: { children: ReactNode }) {
  const { isEnabled } = await draftMode();

  return <CMSClientProvider isPreview={isEnabled}>{children}</CMSClientProvider>;
}
