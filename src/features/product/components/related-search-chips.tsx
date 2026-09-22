import { AppLink } from "@/components/global/app-link";
import { ROUTES } from "@/constants/routes.constants";
import type { Product } from "@/types";

function titleCase(tag: string) {
  return tag.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function RelatedSearchChips({ product }: { product: Product }) {
  const chips: { label: string; href: string }[] = [
    ...product.categories.map((category) => ({ label: category.name, href: ROUTES.category(category.slug) })),
    ...product.tags
      .filter((tag) => !/^mgo\d/.test(tag))
      .map((tag) => ({ label: titleCase(tag), href: `${ROUTES.productList()}?q=${encodeURIComponent(tag)}` })),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
        Related Searches
      </span>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <AppLink
            key={chip.href}
            href={chip.href}
            className="rounded-(--radius-full) border border-(--color-border) px-3.5 py-1.5 text-sm text-(--color-foreground-muted) transition-colors hover:border-(--color-border-strong) hover:text-(--color-foreground)"
          >
            {chip.label}
          </AppLink>
        ))}
      </div>
    </div>
  );
}
