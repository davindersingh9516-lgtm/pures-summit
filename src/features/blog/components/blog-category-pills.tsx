"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/types";

export function BlogCategoryPills({ categories }: { categories: BlogCategory[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category");

  function selectCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => selectCategory(null)}
        className={cn(
          "rounded-(--radius-full) px-4 py-2 text-sm font-medium transition-colors duration-(--duration-fast)",
          !activeSlug
            ? "bg-[#12291d] text-(--color-neutral-0)"
            : "bg-(--color-muted) text-(--color-foreground-muted) hover:text-(--color-foreground)",
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => selectCategory(category.slug)}
          className={cn(
            "rounded-(--radius-full) px-4 py-2 text-sm font-medium transition-colors duration-(--duration-fast)",
            activeSlug === category.slug
              ? "bg-[#12291d] text-(--color-neutral-0)"
              : "bg-(--color-muted) text-(--color-foreground-muted) hover:text-(--color-foreground)",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
