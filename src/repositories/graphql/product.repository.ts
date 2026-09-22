import type { IProductRepository, ProductListParams } from "../interfaces";
import type { Paginated, Product, ProductListFilters } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import {
  GET_ALL_PRODUCT_SLUGS_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCTS_QUERY,
  GET_RELATED_PRODUCTS_QUERY,
} from "@/graphql/queries/product.queries";
import { mapWooProductCard, mapWooProductDetail, type WPProductCardNode, type WPProductDetailNode } from "@/graphql/mappers/product.mapper";
import { computeProductFilters } from "../shared/product-facets";
import { siteConfig } from "@/config/site.config";

function toOrderby(sortBy: ProductListParams["sortBy"]) {
  switch (sortBy) {
    case "price-asc":
      return [{ field: "PRICE", order: "ASC" }];
    case "price-desc":
      return [{ field: "PRICE", order: "DESC" }];
    case "rating":
      return [{ field: "RATING", order: "DESC" }];
    case "newest":
    default:
      return [{ field: "DATE", order: "DESC" }];
  }
}

export class GraphQLProductRepository implements IProductRepository {
  async getProduct(slug: string): Promise<Product | null> {
    const data = await graphqlRequest<{ product: WPProductDetailNode | null }>(
      GET_PRODUCT_QUERY,
      { slug },
      { next: { revalidate: siteConfig.revalidateSeconds.product } },
    );
    return data.product ? mapWooProductDetail(data.product) : null;
  }

  async getProducts(params: ProductListParams = {}): Promise<Paginated<Product>> {
    const perPage = params.perPage ?? siteConfig.pagination.productsPerPage;
    const page = params.page ?? 1;

    // WPGraphQL only supports cursor pagination (`after`), not page numbers.
    // For this catalog's size, fetching up to the requested page and slicing
    // the tail client-side is simpler and correct; a cursor-based "load
    // more" UI would be more efficient for a much larger catalog.
    const data = await graphqlRequest<{
      products: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: WPProductCardNode[] };
    }>(
      GET_PRODUCTS_QUERY,
      {
        first: page * perPage,
        category: params.categorySlug,
        categoryIn: params.categorySlugs?.length ? params.categorySlugs : undefined,
        tagIn: params.tags?.length ? params.tags : undefined,
        maxPrice: params.maxPrice,
        search: params.search,
        orderby: toOrderby(params.sortBy),
      },
      { next: { revalidate: siteConfig.revalidateSeconds.productList } },
    );

    const allMapped = data.products.nodes.map(mapWooProductCard);
    const start = (page - 1) * perPage;
    const nodes = allMapped.slice(start, start + perPage);

    return {
      nodes,
      pageInfo: {
        hasNextPage: data.products.pageInfo.hasNextPage || start + perPage < allMapped.length,
        hasPreviousPage: page > 1,
        totalCount: allMapped.length,
      },
    };
  }

  async getProductFilters(categorySlug?: string): Promise<ProductListFilters> {
    const data = await graphqlRequest<{ products: { nodes: WPProductCardNode[] } }>(
      GET_PRODUCTS_QUERY,
      { first: 200, category: categorySlug },
      { next: { revalidate: siteConfig.revalidateSeconds.productList } },
    );
    return computeProductFilters(data.products.nodes.map(mapWooProductCard));
  }

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const data = await graphqlRequest<{ product: { related: { nodes: WPProductCardNode[] } } | null }>(
      GET_RELATED_PRODUCTS_QUERY,
      { id: productId },
      { next: { revalidate: siteConfig.revalidateSeconds.product } },
    );
    return (data.product?.related.nodes ?? []).map(mapWooProductCard);
  }

  async getAllProductSlugs(): Promise<string[]> {
    const data = await graphqlRequest<{ products: { nodes: { slug: string }[] } }>(
      GET_ALL_PRODUCT_SLUGS_QUERY,
      undefined,
      { next: { revalidate: siteConfig.revalidateSeconds.productList } },
    );
    return data.products.nodes.map((node) => node.slug);
  }
}
