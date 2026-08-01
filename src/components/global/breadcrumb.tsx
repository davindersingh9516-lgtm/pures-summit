import { Fragment } from "react";
import type { BreadcrumbItem } from "@/types";
import { AppLink } from "./app-link";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Reusable breadcrumb trail. Visual/accessible only - the matching
 * `BreadcrumbList` JSON-LD is expected to arrive pre-built inside the
 * page's `SEOData.jsonLd` graph (Yoast generates it from the same page
 * hierarchy), so this component never derives its own schema and can't
 * drift from what's actually indexed.
 */
export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-(--color-foreground-muted)">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <Icon name="chevron-right" className="size-3.5 shrink-0" aria-hidden />}
              <li className="flex items-center">
                {item.url && !isLast ? (
                  <AppLink href={item.url} className="transition-colors hover:text-(--color-foreground)">
                    {item.label}
                  </AppLink>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-(--color-foreground)">
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
