"use client";

import { useTranslations } from "@/hooks/use-translations";

/**
 * WCAG 2.4.1 "Bypass Blocks" - the first focusable element in the DOM,
 * visually hidden until it receives keyboard focus. Points at `#main`,
 * which `SiteShell` renders as the `<main>` wrapper around page content.
 */
export function SkipToContent() {
  const t = useTranslations();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-index-max) focus:rounded-(--radius-md) focus:bg-(--color-primary) focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-(--color-primary-foreground) focus:shadow-(--shadow-elevation-3) focus:outline-none focus:ring-2 focus:ring-(--color-ring) focus:ring-offset-2"
    >
      {t("skipToContent")}
    </a>
  );
}
