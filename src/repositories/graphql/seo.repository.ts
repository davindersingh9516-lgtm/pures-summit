import type { ISEORepository } from "../interfaces";
import type { SEOData } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_SEO_BY_URI_QUERY } from "@/graphql/queries/seo.queries";
import { mapWooSEO, type WPYoastSEO } from "@/graphql/mappers/seo.mapper";
import { env } from "@/config/env";
import { siteConfig } from "@/config/site.config";

interface WPNodeByUriResult {
  __typename: string;
  title?: string | null;
  name?: string | null;
  seo?: WPYoastSEO | null;
}

function buildCanonical(uri: string): string {
  const normalized = uri.startsWith("/") ? uri : `/${uri}`;
  if (normalized === "/") return `${env.NEXT_PUBLIC_SITE_URL}/`;
  return `${env.NEXT_PUBLIC_SITE_URL}${normalized.replace(/\/+$/, "")}`;
}

/**
 * Resolves the `seo` field for an arbitrary URI via WPGraphQL core's
 * `nodeByUri` - works across pages, posts, products, and category
 * archives in a single query (see graphql/queries/seo.queries.ts). Returns
 * `null` when the URI doesn't resolve to a node at all, a legitimate
 * "no override for this route" answer per `ISEORepository`'s own
 * `Promise<SEOData | null>` signature.
 */
export class GraphQLSEORepository implements ISEORepository {
  async getSEOByUri(uri: string): Promise<SEOData | null> {
    const data = await graphqlRequest<{ nodeByUri: WPNodeByUriResult | null }>(
      GET_SEO_BY_URI_QUERY,
      { uri },
      { next: { revalidate: siteConfig.revalidateSeconds.page } },
    );

    const node = data.nodeByUri;
    if (!node) return null;

    const fallbackTitle = node.title || node.name || "Pure Summit";
    return mapWooSEO(node.seo, {
      title: `${fallbackTitle} | Pure Summit`,
      description: "",
      canonical: buildCanonical(uri),
    });
  }
}
