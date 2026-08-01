"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { startProgressBar } from "./progress-bar";

export type AppLinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

/**
 * The only way internal navigation should happen in this codebase - wraps
 * `next/link` so every internal link triggers the top progress bar and
 * external/absolute URLs (which may come straight from the CMS) safely fall
 * back to a plain anchor with the right `rel`/`target`, without the caller
 * needing to know the difference.
 */
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, onClick, children, ...props }, ref) => {
    const pathname = usePathname();
    const hrefString = typeof href === "string" ? href : href.pathname ?? "";
    const isExternal = /^https?:\/\//.test(hrefString) || hrefString.startsWith("//");

    if (isExternal) {
      return (
        <a ref={ref} href={hrefString} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        onClick={(event) => {
          if (hrefString !== pathname) startProgressBar();
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);
AppLink.displayName = "AppLink";
