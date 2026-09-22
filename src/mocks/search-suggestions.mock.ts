import type { SearchSuggestions } from "@/types";
import { mockProducts } from "./products.mock";
import { mockCategories } from "./categories.mock";
import { mockBlogPosts } from "./blog.mock";

/**
 * MOCK DATA - stands in for a merchandising/analytics-driven search
 * suggestions query (trending products, popular search terms, suggested
 * categories/articles). "Recent searches" is intentionally absent - see
 * `types/search.types.ts`.
 */
export const mockSearchSuggestions: SearchSuggestions = {
  popularSearches: ["MGO 263+", "Value packs", "Raw honey", "Lab reports"],
  trendingProducts: mockProducts.slice(0, 3).map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    image: product.images[0],
    price: product.price,
  })),
  suggestedCategories: mockCategories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
  })),
  suggestedArticles: mockBlogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    image: post.featuredImage,
  })),
};
