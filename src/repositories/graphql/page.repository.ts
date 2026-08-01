import type { IPageRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_PAGE_QUERY /
 * GET_ALL_PAGE_SLUGS_QUERY)` and map onto `Page`.
 */
export class GraphQLPageRepository implements IPageRepository {
  async getPage(_slug: string): ReturnType<IPageRepository["getPage"]> {
    notImplemented("getPage", "GET_PAGE_QUERY");
  }

  async getAllPageSlugs(): ReturnType<IPageRepository["getAllPageSlugs"]> {
    notImplemented("getAllPageSlugs", "GET_ALL_PAGE_SLUGS_QUERY");
  }
}
