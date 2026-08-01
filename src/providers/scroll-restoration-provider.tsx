"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * The browser/Next.js already restores scroll position on back/forward
 * navigation. This only handles the complementary case: scrolling to the
 * top of the page on a *forward* (link-click) navigation to a new route,
 * unless the destination includes a hash (in which case the browser's own
 * anchor-scroll behavior should win).
 */
export function ScrollRestorationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return <>{children}</>;
}
