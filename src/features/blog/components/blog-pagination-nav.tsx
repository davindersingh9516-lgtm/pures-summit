import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { ROUTES } from "@/constants/routes.constants";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogPaginationNav({
  prevPost,
  nextPost,
  className,
}: {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
  className?: string;
}) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className={cn("grid grid-cols-1 gap-4 border-t border-(--color-border) pt-8 sm:grid-cols-2", className)}>
      {prevPost ? (
        <AppLink
          href={ROUTES.blogPost(prevPost.slug)}
          className="group flex items-center gap-3 rounded-(--radius-lg) border border-(--color-border) p-5 transition-colors hover:border-(--color-border-strong)"
        >
          <Icon
            name="chevron-left"
            className="size-4 shrink-0 text-(--color-foreground-muted) transition-colors group-hover:text-(--color-foreground)"
            aria-hidden
          />
          <span className="flex flex-col gap-1">
            <span className="text-xs tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Previous
            </span>
            <span className="line-clamp-2 text-sm font-medium text-(--color-foreground)">{prevPost.title}</span>
          </span>
        </AppLink>
      ) : (
        <div />
      )}

      {nextPost ? (
        <AppLink
          href={ROUTES.blogPost(nextPost.slug)}
          className="group flex flex-row-reverse items-center gap-3 rounded-(--radius-lg) border border-(--color-border) p-5 text-right transition-colors hover:border-(--color-border-strong)"
        >
          <Icon
            name="chevron-right"
            className="size-4 shrink-0 text-(--color-foreground-muted) transition-colors group-hover:text-(--color-foreground)"
            aria-hidden
          />
          <span className="flex flex-col gap-1">
            <span className="text-xs tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Next
            </span>
            <span className="line-clamp-2 text-sm font-medium text-(--color-foreground)">{nextPost.title}</span>
          </span>
        </AppLink>
      ) : (
        <div />
      )}
    </div>
  );
}
