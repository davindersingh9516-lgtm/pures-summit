import type { SearchSuggestionArticle, SearchSuggestionCategory, SearchSuggestionProduct } from "@/types";
import { env } from "@/config/env";

interface WPImageNode {
  id: string;
  sourceUrl: string;
  altText?: string | null;
}

const FALLBACK_IMAGE = { id: "search-fallback", url: "/mocks/hero-1.webp", altText: "Pure Summit" };

export interface WPTrendingProductNode {
  id: string;
  slug: string;
  name: string;
  image?: WPImageNode | null;
  price?: string | null;
  formattedPrice?: string | null;
}

export function mapTrendingProduct(node: WPTrendingProductNode): SearchSuggestionProduct {
  const amount = node.price ? Math.round(parseFloat(node.price) * 100) : 0;
  return {
    id: node.id,
    name: node.name,
    slug: node.slug,
    image: node.image?.sourceUrl
      ? { id: node.image.id, url: node.image.sourceUrl, altText: node.image.altText || node.name }
      : FALLBACK_IMAGE,
    price: { amount: Number.isFinite(amount) ? amount : 0, currencyCode: env.NEXT_PUBLIC_STORE_CURRENCY, formatted: node.formattedPrice ?? "" },
  };
}

export interface WPSuggestedCategoryNode {
  id: string;
  slug: string;
  name?: string | null;
}

export function mapSuggestedCategory(node: WPSuggestedCategoryNode): SearchSuggestionCategory {
  return { id: node.id, name: node.name ?? node.slug, slug: node.slug };
}

export interface WPSuggestedArticleNode {
  id: string;
  slug: string;
  title?: string | null;
  featuredImage?: { node?: WPImageNode | null } | null;
}

export function mapSuggestedArticle(node: WPSuggestedArticleNode): SearchSuggestionArticle {
  return {
    id: node.id,
    title: node.title ?? "",
    slug: node.slug,
    image: node.featuredImage?.node?.sourceUrl
      ? { id: node.featuredImage.node.id, url: node.featuredImage.node.sourceUrl, altText: node.featuredImage.node.altText || node.title || "" }
      : FALLBACK_IMAGE,
  };
}
