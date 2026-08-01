import { cache } from "react";
import { seoRepository } from "@/repositories";

/**
 * Fallback SEO lookup by URI. Prefer reading `.seo` directly off whatever
 * entity a page already fetched (product, post, page, homepage) - this is
 * for routes that don't map to a single entity fetch.
 */
export const getSEOByUri = cache(async (uri: string) => seoRepository.getSEOByUri(uri));
