import type { ID, Image, Money } from "./common.types";

export interface SearchSuggestionProduct {
  id: ID;
  name: string;
  slug: string;
  image: Image;
  price: Money;
}

export interface SearchSuggestionCategory {
  id: ID;
  name: string;
  slug: string;
}

export interface SearchSuggestionArticle {
  id: ID;
  title: string;
  slug: string;
  image: Image;
}

/**
 * Everything here is backend-driven (WPGraphQL/WooGraphQL analytics or a
 * merchandising field later). "Recent searches" is deliberately absent -
 * that's per-visitor client state, handled by
 * `hooks/use-recent-searches.ts` + localStorage, not a repository.
 */
export interface SearchSuggestions {
  popularSearches: string[];
  trendingProducts: SearchSuggestionProduct[];
  suggestedCategories: SearchSuggestionCategory[];
  suggestedArticles: SearchSuggestionArticle[];
}
