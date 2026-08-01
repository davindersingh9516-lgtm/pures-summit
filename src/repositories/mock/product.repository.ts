import type {
  IProductRepository,
  ProductListParams,
} from "../interfaces";
import type { Paginated, Product, ProductListFilters } from "@/types";
import { mockProducts } from "@/mocks";
import { siteConfig } from "@/config/site.config";

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

export class MockProductRepository implements IProductRepository {
  async getProduct(slug: string) {
    return mockProducts.find((product) => product.slug === slug) ?? null;
  }

  async getProducts(params: ProductListParams = {}): Promise<Paginated<Product>> {
    const perPage = params.perPage ?? siteConfig.pagination.productsPerPage;
    const page = params.page ?? 1;

    let filtered = mockProducts;

    if (params.categorySlug) {
      filtered = filtered.filter((product) =>
        product.categories.some((category) => category.slug === params.categorySlug),
      );
    }

    if (params.search) {
      const query = params.search.toLowerCase();
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(query));
    }

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

    const prices = scoped.map((product) => product.price.amount);

    return {
      categories: [],
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
