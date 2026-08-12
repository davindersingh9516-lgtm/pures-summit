/**
 * REPOSITORY CONTRACTS
 * ---------------------------------------------------------------------------
 * Every UI-facing piece of data flows through one of these interfaces. Pages
 * and components never import mock data or a GraphQL client directly - they
 * call a service (src/services), which calls a repository resolved by
 * src/repositories/index.ts based on the active data source.
 *
 * Two implementations exist per interface:
 *   - src/repositories/mock/*      (implemented now, returns src/mocks data)
 *   - src/repositories/graphql/*   (stubbed now, will call WPGraphQL/WooGraphQL)
 *
 * Adding the real backend later means implementing the `graphql/` classes
 * and flipping NEXT_PUBLIC_DATA_SOURCE - nothing above the repository layer
 * changes.
 */

import type {
  AnnouncementBarData,
  BlogPost,
  Cart,
  Certificate,
  Collection,
  Currency,
  FAQItem,
  FeaturedVideo,
  FooterData,
  HeaderData,
  HeroSectionData,
  HomepageData,
  HomepageSection,
  InstagramPost,
  Locale,
  NavigationData,
  NewsletterSignup,
  Page,
  Paginated,
  Product,
  ProductCategory,
  ProductListFilters,
  Review,
  SearchSuggestions,
  SEOData,
  SiteSettings,
  Statistic,
  Testimonial,
  TrustBadge,
} from "@/types";

export interface ProductListParams {
  page?: number;
  perPage?: number;
  /** Single-category scope - set by the `/shop/category/[slug]` route itself
   * rather than a sidebar filter, so it stays exclusive of `categorySlugs`. */
  categorySlug?: string;
  /** Multi-select category filter, as offered by the shop sidebar. */
  categorySlugs?: string[];
  /** UMF/MGO grade filter - matches against `product.tags` (e.g. "umf10",
   * "mgo550"), since grade isn't its own field in this data model. */
  tags?: string[];
  maxPrice?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "newest" | "rating";
  attributes?: Record<string, string[]>;
}

export interface BlogListParams {
  page?: number;
  perPage?: number;
  categorySlug?: string;
}

export interface INavigationRepository {
  getNavigation(): Promise<NavigationData>;
}

export interface IFooterRepository {
  getFooter(): Promise<FooterData>;
}

export interface ISettingsRepository {
  getSettings(): Promise<SiteSettings>;
}

export interface IHomepageRepository {
  getHomepage(): Promise<HomepageData>;
  getHero(): Promise<HeroSectionData>;
  getHomepageSections(): Promise<HomepageSection[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getCategories(): Promise<ProductCategory[]>;
  getTrustBadges(): Promise<TrustBadge[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getStatistics(): Promise<Statistic[]>;
  getBlogPreview(limit?: number): Promise<BlogPost[]>;
  getNewsletter(): Promise<NewsletterSignup>;
  getInstagramFeed(): Promise<InstagramPost[]>;
  getFAQPreview(limit?: number): Promise<FAQItem[]>;
  getCertificates(): Promise<Certificate[]>;
  getVideos(): Promise<FeaturedVideo[]>;
}

export interface IPageRepository {
  getPage(slug: string): Promise<Page | null>;
  getAllPageSlugs(): Promise<string[]>;
}

export interface IProductRepository {
  getProduct(slug: string): Promise<Product | null>;
  getProducts(params?: ProductListParams): Promise<Paginated<Product>>;
  getProductFilters(categorySlug?: string): Promise<ProductListFilters>;
  getRelatedProducts(productId: string): Promise<Product[]>;
  getAllProductSlugs(): Promise<string[]>;
}

export interface ICategoryRepository {
  getCategory(slug: string): Promise<ProductCategory | null>;
  getCategories(): Promise<ProductCategory[]>;
}

export interface IBlogRepository {
  getBlogPost(slug: string): Promise<BlogPost | null>;
  getBlogPosts(params?: BlogListParams): Promise<Paginated<BlogPost>>;
  getRelatedBlogPosts(postId: string): Promise<BlogPost[]>;
  getAllBlogPostSlugs(): Promise<string[]>;
}

export interface IReviewRepository {
  getReviewsForProduct(productId: string, page?: number): Promise<Paginated<Review>>;
}

export interface IContentRepository {
  getFAQs(): Promise<FAQItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
}

export interface ISEORepository {
  /** Resolves SEO data for an arbitrary site URI, mirroring Yoast's
   * `seo` field being queryable by URI via WPGraphQL. Used as a fallback
   * for routes not covered by a more specific repository. */
  getSEOByUri(uri: string): Promise<SEOData | null>;
}

/** Not yet consumed by any page - reserved for the checkout/cart feature
 * module so the repository contract exists before the UI does. */
export interface ICartRepository {
  getCart(cartId: string): Promise<Cart | null>;
}

export interface IHeaderRepository {
  getHeader(): Promise<HeaderData>;
}

export interface IAnnouncementRepository {
  getAnnouncementBar(): Promise<AnnouncementBarData>;
}

export interface ISearchRepository {
  /** Popular/trending/suggested only - "recent searches" is per-visitor
   * client state, see hooks/use-recent-searches.ts. */
  getSearchSuggestions(): Promise<SearchSuggestions>;
}

export interface ILanguageRepository {
  getLanguages(): Promise<Locale[]>;
}

export interface ICurrencyRepository {
  getCurrencies(): Promise<Currency[]>;
}
