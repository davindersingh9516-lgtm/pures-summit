import type { ICategoryRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_CATEGORY_QUERY /
 * GET_CATEGORIES_QUERY)` from WooGraphQL and map onto `ProductCategory`.
 */
export class GraphQLCategoryRepository implements ICategoryRepository {
  async getCategory(_slug: string): ReturnType<ICategoryRepository["getCategory"]> {
    notImplemented("getCategory", "GET_CATEGORY_QUERY");
  }

  async getCategories(): ReturnType<ICategoryRepository["getCategories"]> {
    notImplemented("getCategories", "GET_CATEGORIES_QUERY");
  }
}
