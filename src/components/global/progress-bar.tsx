"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let imperativeStart: (() => void) | null = null;

/**
 * Called by `<AppLink>` right before an internal navigation. Deliberately
 * NOT a React state update - the bar's width/opacity are driven by direct
 * DOM style mutation inside effects (the same technique real progress-bar
 * libraries like NProgress use), so there's no React state to keep in sync
 * across the two effects below and no render-cascade risk.
 */
export function startProgressBar() {
  imperativeStart?.();
}

/**
 * Slim top-of-viewport route-change progress indicator. Mount once, near
 * the root of the app (see `SiteShell`).
 */
export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    imperativeStart = () => {
      const el = barRef.current;
      if (!el) return;
      el.style.transition = "none";
      el.style.width = "0%";
      el.style.opacity = "1";
      // Force a reflow so the width transition below animates from 0%.
      void el.offsetWidth;
      el.style.transition = "width 4s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.width = "80%";
    };

    return () => {
      imperativeStart = null;
    };
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.transition = "width 0.2s ease, opacity 0.3s ease 0.2s";
    el.style.width = "100%";
    el.style.opacity = "0";
  }, [pathname, searchParams]);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed inset-x-0 top-0 z-(--z-index-toast) h-0.5 bg-(--color-primary) opacity-0"
    />
  );
}
