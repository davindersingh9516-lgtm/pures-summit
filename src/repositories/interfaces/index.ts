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
  Address,
  AnnouncementBarData,
  AuthSession,
  BlogPost,
  Cart,
  Certificate,
  CheckoutInput,
  Collection,
  CreateAccountInput,
  Currency,
  Customer,
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
  Order,
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
  /** MGO grade filter - matches against `product.tags` (e.g. "mgo263"),
   * since grade isn't its own field in this data model. */
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

/** `sessionToken` is the opaque WooCommerce session identifier (WooGraphQL's
 * `woocommerce-session` header, JWT-shaped). Every mutating call returns the
 * (possibly rotated) token alongside the updated cart so the caller - always
 * a `src/app/api/cart/*` route handler, never a client component directly -
 * can persist it back into the `ps_woo_session` httpOnly cookie. Pass
 * `undefined` for a brand new, cart-less visitor. */
export interface CartResult {
  cart: Cart;
  sessionToken: string;
}

export interface ICartRepository {
  getCart(sessionToken?: string): Promise<CartResult>;
  addItem(sessionToken: string | undefined, productId: string, quantity: number, variantId?: string): Promise<CartResult>;
  updateItemQuantity(sessionToken: string, itemKey: string, quantity: number): Promise<CartResult>;
  removeItem(sessionToken: string, itemKey: string): Promise<CartResult>;
  clearCart(sessionToken: string): Promise<CartResult>;
  applyCoupon(sessionToken: string, code: string): Promise<CartResult>;
  removeCoupon(sessionToken: string, code: string): Promise<CartResult>;
  /** Also re-selects a matching shipping rate for the new address's zone -
   * WooCommerce doesn't do this automatically (see graphql/cart.repository.ts). */
  updateShippingAddress(sessionToken: string, address: Address): Promise<CartResult>;
  selectShippingRate(sessionToken: string, rateId: string): Promise<CartResult>;
}

/** Places the order and marks it paid - called only after a Stripe
 * PaymentIntent has actually succeeded (see /api/webhooks/stripe), never
 * from the client directly. */
export interface ICheckoutRepository {
  placeOrder(sessionToken: string, input: CheckoutInput): Promise<Order>;
  /** Registers a WP customer on the current cart session (so the guest cart
   * carries over) and returns the resulting (now-authenticated) session
   * token - called from /api/checkout/create-payment-intent when the
   * shopper checks "Create an account", before payment. */
  createAccount(sessionToken: string, input: CreateAccountInput): Promise<CartResult>;
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

/** Login only - registration happens as part of `ICheckoutRepository.placeOrder`
 * (WooGraphQL's `checkout` mutation creates the account inline when the
 * customer checks "Create an account"), not through a separate signup form. */
export interface IAuthRepository {
  login(username: string, password: string): Promise<AuthSession>;
  getCurrentCustomer(authToken: string): Promise<Customer | null>;
  getOrders(authToken: string): Promise<Order[]>;
}
