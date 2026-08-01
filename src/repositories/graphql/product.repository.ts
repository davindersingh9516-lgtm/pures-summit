import type { IProductRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_PRODUCT_QUERY /
 * GET_PRODUCTS_QUERY / GET_ALL_PRODUCT_SLUGS_QUERY)` from WooGraphQL and map
 * onto `Product` / `Paginated<Product>`.
 */
export class GraphQLProductRepository implements IProductRepository {
  async getProduct(_slug: string): ReturnType<IProductRepository["getProduct"]> {
    notImplemented("getProduct", "GET_PRODUCT_QUERY");
  }

  async getProducts(): ReturnType<IProductRepository["getProducts"]> {
    notImplemented("getProducts", "GET_PRODUCTS_QUERY");
  }

  async getProductFilters(): ReturnType<IProductRepository["getProductFilters"]> {
    notImplemented("getProductFilters", "GET_PRODUCTS_QUERY");
  }

  async getRelatedProducts(_productId: string): ReturnType<IProductRepository["getRelatedProducts"]> {
    notImplemented("getRelatedProducts", "GET_PRODUCT_QUERY");
  }

  async getAllProductSlugs(): ReturnType<IProductRepository["getAllProductSlugs"]> {
    notImplemented("getAllProductSlugs", "GET_ALL_PRODUCT_SLUGS_QUERY");
  }
}
