import type { Product, ProductListFilterOption, ProductListFilters } from "@/types";

/** Shared between mock and graphql product repositories so filter-facet
 * computation (category/grade counts, price range) stays identical
 * regardless of data source - only how `products` is fetched differs. */
const GRADE_TAG_PATTERN = /^mgo(\d+)$/i;

export function gradeLabelFromTag(tag: string): string | null {
  const match = GRADE_TAG_PATTERN.exec(tag);
  if (!match) return null;
  return `MGO ${match[1]}+`;
}

export function computeProductFilters(products: Product[]): ProductListFilters {
  const categoryCounts = new Map<string, ProductListFilterOption>();
  const gradeCounts = new Map<string, ProductListFilterOption>();

  for (const product of products) {
    for (const category of product.categories) {
      const existing = categoryCounts.get(category.slug);
      if (existing) {
        existing.count += 1;
      } else {
        categoryCounts.set(category.slug, { id: category.slug, label: category.name, count: 1 });
      }
    }

    for (const tag of product.tags) {
      const label = gradeLabelFromTag(tag);
      if (!label) continue;
      const existing = gradeCounts.get(tag);
      if (existing) {
        existing.count += 1;
      } else {
        gradeCounts.set(tag, { id: tag, label, count: 1 });
      }
    }
  }

  const prices = products.map((product) => product.price.amount);

  return {
    categories: Array.from(categoryCounts.values()).sort((a, b) => a.label.localeCompare(b.label)),
    grades: Array.from(gradeCounts.values()).sort((a, b) => a.label.localeCompare(b.label)),
    attributes: {},
    priceRange: {
      min: prices.length ? Math.min(...prices) / 100 : 0,
      max: prices.length ? Math.max(...prices) / 100 : 0,
    },
  };
}
