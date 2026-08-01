/**
 * Cache/query key factory. Consumed by the service layer today for simple
 * memoization and, later, by a data-fetching layer (e.g. React Query or
 * the Next.js `fetch` cache tags) once GraphQL is wired up - so cache
 * invalidation keys don't need to be invented twice.
 */
export const QUERY_KEYS = {
  navigation: () => ["navigation"] as const,
  footer: () => ["footer"] as const,
  settings: () => ["settings"] as const,
  homepage: () => ["homepage"] as const,
  page: (slug: string) => ["page", slug] as const,
  product: (slug: string) => ["product", slug] as const,
  products: (params?: Record<string, unknown>) => ["products", params ?? {}] as const,
  category: (slug: string) => ["category", slug] as const,
  categories: () => ["categories"] as const,
  blogPost: (slug: string) => ["blog-post", slug] as const,
  blogPosts: (params?: Record<string, unknown>) => ["blog-posts", params ?? {}] as const,
  reviews: (productId: string) => ["reviews", productId] as const,
  seo: (uri: string) => ["seo", uri] as const,
} as const;
