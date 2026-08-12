/**
 * Centralized, type-safe route builders. No UI component should ever
 * hand-write a URL string - this is the single place route SHAPES live
 * (not the content that fills them, which stays backend-driven).
 */
export const ROUTES = {
  home: () => "/",
  page: (slug: string) => `/${slug}`,
  ourStory: () => "/our-story",
  labReports: () => "/lab-reports",
  productList: () => "/shop",
  category: (slug: string) => `/shop/category/${slug}`,
  collection: (slug: string) => `/shop/collection/${slug}`,
  product: (slug: string) => `/shop/product/${slug}`,
  search: (query?: string) => (query ? `/search?q=${encodeURIComponent(query)}` : "/search"),
  blogList: () => "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  blogCategory: (slug: string) => `/blog/category/${slug}`,
  blogAuthor: (slug: string) => `/blog/author/${slug}`,
  cart: () => "/cart",
  checkout: () => "/checkout",
  account: () => "/account",
  accountOrders: () => "/account/orders",
  wishlist: () => "/account/wishlist",
  compare: () => "/compare",
} as const;

export type RouteBuilders = typeof ROUTES;
