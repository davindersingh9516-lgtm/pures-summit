"use client";

import { usePathname } from "next/navigation";
import type { MenuItem } from "@/types";
import { AppLink } from "./app-link";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  item: MenuItem;
  variant?: "primary" | "secondary" | "footer";
  className?: string;
}

const variantClassName: Record<NonNullable<NavItemProps["variant"]>, string> = {
  primary: "text-sm font-medium tracking-(--tracking-wide)",
  secondary: "text-xs text-(--color-foreground-muted)",
  footer: "text-sm text-(--color-foreground-muted) hover:text-(--color-foreground)",
};

/** A single nav link with automatic active-route styling - the shared
 * building block behind the desktop nav, mobile drawer, and footer columns. */
export function NavItem({ item, variant = "primary", className }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  return (
    <AppLink
      href={item.url}
      target={item.target}
      className={cn(
        "transition-colors hover:text-(--color-foreground)",
        variantClassName[variant],
        isActive ? "text-(--color-foreground)" : "text-(--color-foreground-muted)",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </AppLink>
  );
}
