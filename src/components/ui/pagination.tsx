import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { AppLink } from "@/components/global/app-link";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a given page number - callers own how filter/sort
   * params are preserved across page links. */
  buildHref: (page: number) => string;
  className?: string;
}

const ELLIPSIS = "ellipsis" as const;

function getPageList(currentPage: number, totalPages: number): Array<number | typeof ELLIPSIS> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  const sorted = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result: Array<number | typeof ELLIPSIS> = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push(ELLIPSIS);
    }
    result.push(page);
  });
  return result;
}

const pageLinkClassName =
  "flex size-10 items-center justify-center rounded-(--radius-md) text-sm font-medium transition-colors duration-(--duration-fast)";

/** Real `<a>`/`AppLink` navigation, not client-side state - each page is its
 * own crawlable, shareable URL, matching the URL-driven shop filter pattern. */
export function Pagination({ currentPage, totalPages, buildHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1.5", className)}>
      {currentPage > 1 ? (
        <AppLink
          href={buildHref(currentPage - 1)}
          aria-label="Previous page"
          className={cn(pageLinkClassName, "text-(--color-foreground-muted) hover:bg-(--color-muted) hover:text-(--color-foreground)")}
        >
          <ChevronLeft className="size-4" />
        </AppLink>
      ) : (
        <span aria-hidden className={cn(pageLinkClassName, "text-(--color-foreground-muted)/30")}>
          <ChevronLeft className="size-4" />
        </span>
      )}

      {pages.map((page, index) =>
        page === ELLIPSIS ? (
          <span key={`ellipsis-${index}`} className={cn(pageLinkClassName, "text-(--color-foreground-muted)")}>
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <AppLink
            key={page}
            href={buildHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              pageLinkClassName,
              page === currentPage
                ? "bg-[#12291d] text-(--color-neutral-0)"
                : "text-(--color-foreground) hover:bg-(--color-muted)",
            )}
          >
            {page}
          </AppLink>
        ),
      )}

      {currentPage < totalPages ? (
        <AppLink
          href={buildHref(currentPage + 1)}
          aria-label="Next page"
          className={cn(pageLinkClassName, "text-(--color-foreground-muted) hover:bg-(--color-muted) hover:text-(--color-foreground)")}
        >
          <ChevronRight className="size-4" />
        </AppLink>
      ) : (
        <span aria-hidden className={cn(pageLinkClassName, "text-(--color-foreground-muted)/30")}>
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
