import { cache } from "react";
import { graphqlRequest } from "@/graphql/client";
import { GET_SITE_CONTENT_QUERY } from "@/graphql/queries/site-content.queries";
import { parseSiteContent, type SiteContent } from "@/graphql/mappers/site-content.mapper";
import { siteConfig } from "@/config/site.config";

/**
 * Shared by GraphQLHomepageRepository and GraphQLContentRepository - both
 * read from the same `siteContent` JSON blob (see
 * graphql/queries/site-content.queries.ts) but expose it through different,
 * more focused repository methods. Wrapped in React's `cache()` (the same
 * per-request dedup mechanism the service layer already uses) so a single
 * page render that touches many independent siteContent-backed sections
 * (hero, trust badges, testimonials, statistics, FAQ preview, newsletter)
 * issues exactly one `siteContent` request instead of one per section.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const data = await graphqlRequest<{ siteContent: string }>(GET_SITE_CONTENT_QUERY, undefined, {
    next: { revalidate: siteConfig.revalidateSeconds.homepage },
  });
  return parseSiteContent(data.siteContent);
});
