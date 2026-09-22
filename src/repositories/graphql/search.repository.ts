import type { ISearchRepository } from "../interfaces";
import type { SearchSuggestions } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_SEARCH_SUGGESTIONS_QUERY } from "@/graphql/queries/search.queries";
import {
  mapSuggestedArticle,
  mapSuggestedCategory,
  mapTrendingProduct,
  type WPSuggestedArticleNode,
  type WPSuggestedCategoryNode,
  type WPTrendingProductNode,
} from "@/graphql/mappers/search.mapper";
import { siteConfig } from "@/config/site.config";

/** See GET_SEARCH_SUGGESTIONS_QUERY header comment - `popularSearches` has
 * no real backend source (no search-analytics plugin installed) and is
 * always empty until one is added. */
export class GraphQLSearchRepository implements ISearchRepository {
  async getSearchSuggestions(): Promise<SearchSuggestions> {
    const data = await graphqlRequest<{
      products: { nodes: WPTrendingProductNode[] };
      productCategories: { nodes: WPSuggestedCategoryNode[] };
      posts: { nodes: WPSuggestedArticleNode[] };
    }>(
      GET_SEARCH_SUGGESTIONS_QUERY,
      { productsFirst: 5, categoriesFirst: 6, articlesFirst: 4 },
      { next: { revalidate: siteConfig.revalidateSeconds.productList } },
    );

    return {
      popularSearches: [],
      trendingProducts: data.products.nodes.map(mapTrendingProduct),
      suggestedCategories: data.productCategories.nodes.map(mapSuggestedCategory),
      suggestedArticles: data.posts.nodes.map(mapSuggestedArticle),
    };
  }
}
