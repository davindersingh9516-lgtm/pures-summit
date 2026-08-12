import type { IProductRepository, ProductListParams } from "../interfaces";
import type { Paginated, Product, ProductListFilterOption, ProductListFilters } from "@/types";
import { mockProducts } from "@/mocks";
import { siteConfig } from "@/config/site.config";

const GRADE_TAG_PATTERN = /^(umf|mgo)(\d+)$/i;

function gradeLabelFromTag(tag: string): string | null {
  const match = GRADE_TAG_PATTERN.exec(tag);
  if (!match) return null;
  return `${match[1].toUpperCase()} ${match[2]}+`;
}

function sortProducts(products: Product[], sortBy?: ProductListParams["sortBy"]) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price.amount - b.price.amount);
    case "price-desc":
      return sorted.sort((a, b) => b.price.amount - a.price.amount);
    case "rating":
      return sorted.sort((a, b) => b.reviewSummary.averageRating - a.reviewSummary.averageRating);
    case "newest":
    default:
      return sorted;
  }
}

function filterProducts(params: ProductListParams): Product[] {
  let filtered = mockProducts;

  if (params.categorySlug) {
    filtered = filtered.filter((product) =>
      product.categories.some((category) => category.slug === params.categorySlug),
    );
  }

  if (params.categorySlugs?.length) {
    const slugs = new Set(params.categorySlugs);
    filtered = filtered.filter((product) => product.categories.some((category) => slugs.has(category.slug)));
  }

  if (params.tags?.length) {
    const tags = new Set(params.tags);
    filtered = filtered.filter((product) => product.tags.some((tag) => tags.has(tag)));
  }

  if (params.maxPrice !== undefined) {
    const maxMinorUnits = params.maxPrice * 100;
    filtered = filtered.filter((product) => product.price.amount <= maxMinorUnits);
  }

  if (params.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter((product) => product.name.toLowerCase().includes(query));
  }

  return filtered;
}

export class MockProductRepository implements IProductRepository {
  async getProduct(slug: string) {
    return mockProducts.find((product) => product.slug === slug) ?? null;
  }

  async getProducts(params: ProductListParams = {}): Promise<Paginated<Product>> {
    const perPage = params.perPage ?? siteConfig.pagination.productsPerPage;
    const page = params.page ?? 1;

    const filtered = filterProducts(params);
    const sorted = sortProducts(filtered, params.sortBy);
    const start = (page - 1) * perPage;
    const nodes = sorted.slice(start, start + perPage);

    return {
      nodes,
      pageInfo: {
        hasNextPage: start + perPage < sorted.length,
        hasPreviousPage: page > 1,
        totalCount: sorted.length,
      },
    };
  }

  async getProductFilters(categorySlug?: string): Promise<ProductListFilters> {
    const scoped = categorySlug
      ? mockProducts.filter((product) => product.categories.some((category) => category.slug === categorySlug))
      : mockProducts;

    const categoryCounts = new Map<string, ProductListFilterOption>();
    const gradeCounts = new Map<string, ProductListFilterOption>();

    for (const product of scoped) {
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

    const prices = scoped.map((product) => product.price.amount);

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

  async getRelatedProducts(productId: string) {
    const product = mockProducts.find((item) => item.id === productId);
    if (!product) return [];
    return mockProducts.filter((item) => product.relatedProductIds.includes(item.id));
  }

  async getAllProductSlugs() {
    return mockProducts.map((product) => product.slug);
  }
}
