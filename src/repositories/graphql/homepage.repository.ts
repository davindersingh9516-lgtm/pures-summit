import type { IHomepageRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: each method calls its own focused WPGraphQL/
 * WooGraphQL query (see graphql/queries/homepage.queries.ts) and maps the
 * response onto its corresponding type - kept as separate queries (not one
 * giant `getHomepage` query) so each homepage section can stream in
 * independently. See `app/page.tsx` for how Suspense boundaries line up
 * with these methods.
 */
export class GraphQLHomepageRepository implements IHomepageRepository {
  async getHomepage(): ReturnType<IHomepageRepository["getHomepage"]> {
    notImplemented("getHomepage", "GET_HOMEPAGE_QUERY");
  }

  async getHero(): ReturnType<IHomepageRepository["getHero"]> {
    notImplemented("getHero", "GET_HOMEPAGE_HERO_QUERY");
  }

  async getHomepageSections(): ReturnType<IHomepageRepository["getHomepageSections"]> {
    notImplemented("getHomepageSections", "GET_HOMEPAGE_SECTIONS_QUERY");
  }

  async getFeaturedProducts(): ReturnType<IHomepageRepository["getFeaturedProducts"]> {
    notImplemented("getFeaturedProducts", "GET_FEATURED_PRODUCTS_QUERY");
  }

  async getCollections(): ReturnType<IHomepageRepository["getCollections"]> {
    notImplemented("getCollections", "GET_COLLECTIONS_QUERY");
  }

  async getCategories(): ReturnType<IHomepageRepository["getCategories"]> {
    notImplemented("getCategories", "GET_PRODUCT_CATEGORIES_QUERY");
  }

  async getTrustBadges(): ReturnType<IHomepageRepository["getTrustBadges"]> {
    notImplemented("getTrustBadges", "GET_TRUST_BADGES_QUERY");
  }

  async getTestimonials(): ReturnType<IHomepageRepository["getTestimonials"]> {
    notImplemented("getTestimonials", "GET_TESTIMONIALS_QUERY");
  }

  async getStatistics(): ReturnType<IHomepageRepository["getStatistics"]> {
    notImplemented("getStatistics", "GET_STATISTICS_QUERY");
  }

  async getBlogPreview(): ReturnType<IHomepageRepository["getBlogPreview"]> {
    notImplemented("getBlogPreview", "GET_BLOG_PREVIEW_QUERY");
  }

  async getNewsletter(): ReturnType<IHomepageRepository["getNewsletter"]> {
    notImplemented("getNewsletter", "GET_NEWSLETTER_SETTINGS_QUERY");
  }

  async getInstagramFeed(): ReturnType<IHomepageRepository["getInstagramFeed"]> {
    notImplemented("getInstagramFeed", "GET_INSTAGRAM_FEED_QUERY");
  }

  async getFAQPreview(): ReturnType<IHomepageRepository["getFAQPreview"]> {
    notImplemented("getFAQPreview", "GET_FAQ_PREVIEW_QUERY");
  }

  async getCertificates(): ReturnType<IHomepageRepository["getCertificates"]> {
    notImplemented("getCertificates", "GET_CERTIFICATES_QUERY");
  }

  async getVideos(): ReturnType<IHomepageRepository["getVideos"]> {
    notImplemented("getVideos", "GET_VIDEOS_QUERY");
  }
}
