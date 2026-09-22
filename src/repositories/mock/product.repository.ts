import type { IProductRepository, ProductListParams } from "../interfaces";
import type { Paginated, Product, ProductListFilters } from "@/types";
import { mockProducts } from "@/mocks";
import { siteConfig } from "@/config/site.config";
import { computeProductFilters } from "../shared/product-facets";

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

    return computeProductFilters(scoped);
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
