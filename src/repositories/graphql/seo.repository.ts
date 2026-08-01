import type { ISEORepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: resolve the `seo` field for an arbitrary URI via
 * WPGraphQL's `nodeByUri` query (works across pages, posts, products, and
 * archives in a single shape).
 */
export class GraphQLSEORepository implements ISEORepository {
  async getSEOByUri(_uri: string): ReturnType<ISEORepository["getSEOByUri"]> {
    notImplemented("getSEOByUri", "nodeByUri { ...SeoFields }");
  }
}
