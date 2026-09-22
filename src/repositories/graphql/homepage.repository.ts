import type { IHomepageRepository } from "../interfaces";
import type {
  BlogPost,
  Certificate,
  Collection,
  FAQItem,
  FeaturedVideo,
  HeroSectionData,
  HomepageData,
  HomepageSection,
  InstagramPost,
  NewsletterSignup,
  Product,
  ProductCategory,
  Statistic,
  Testimonial,
  TrustBadge,
} from "@/types";
import { mockHero, mockHomepageSections } from "@/mocks/homepage.mock";
import { createMockSEO } from "@/mocks/seo.mock";
import { getSiteContent } from "../shared/site-content";
import {
  mapSiteContentCertificate,
  mapSiteContentFAQ,
  mapSiteContentNewsletter,
  mapSiteContentStatistic,
  mapSiteContentTestimonial,
  mapSiteContentTrustBadge,
  type RawSiteContentHero,
} from "@/graphql/mappers/site-content.mapper";
import { GraphQLProductRepository } from "./product.repository";
import { GraphQLCategoryRepository } from "./category.repository";
import { GraphQLBlogRepository } from "./blog.repository";

// Self-contained sibling repositories rather than the `@/repositories`
// singleton factory - importing that barrel here would create a circular
// import (repositories/index.ts -> graphql/index.ts -> this file ->
// repositories/index.ts). Same reasoning as the rest of graphql/* staying
// import-independent of each other where possible.
const productRepository = new GraphQLProductRepository();
const categoryRepository = new GraphQLCategoryRepository();
const blogRepository = new GraphQLBlogRepository();

/**
 * `getHomepageSections()`/`getHomepage()` reuse `mockHomepageSections` as-is:
 * that array is bespoke, hand-authored page-builder/creative content (the
 * NZ origin map SVG paths, beekeeper bios, batch-lookup records, the MGO
 * explainer copy, ...) that was a deliberate scope decision to keep as
 * static code rather than invent an ACF/siteContent schema for it - nobody
 * asked for a CMS field for a hand-drawn map. The one exception is the hero
 * section's own copy (eyebrow/heading/subheading/media), which DOES have a
 * real counterpart in `siteContent.hero` and is swapped in below.
 */
function buildHeroSectionData(content: RawSiteContentHero): HeroSectionData {
  return {
    ...mockHero,
    eyebrow: content.eyebrow || mockHero.eyebrow,
    heading: content.heading || mockHero.heading,
    subheading: content.subheading || mockHero.subheading,
    media: content.mediaUrl
      ? { ...mockHero.media, url: content.mediaUrl, altText: content.mediaAlt || mockHero.media.altText }
      : mockHero.media,
  };
}

export class GraphQLHomepageRepository implements IHomepageRepository {
  async getHomepage(): Promise<HomepageData> {
    const sections = await this.getHomepageSections();
    // No Yoast "front page" config exists in this schema (`nodeByUri("/")`
    // resolves to the generic `ContentType` "post", not a Page with `seo`) -
    // verified live via introspection. Keep the same hardcoded homepage SEO
    // copy the mock used, built through the same `createMockSEO` helper.
    return {
      seo: createMockSEO({
        path: "/",
        title: "Pure Summit | Raw New Zealand Manuka Honey",
        description: "Raw, lab-tested New Zealand Manuka honey, cold-extracted from remote Northland groves.",
      }),
      sections,
    };
  }

  async getHero(): Promise<HeroSectionData> {
    const content = await getSiteContent();
    return buildHeroSectionData(content.hero);
  }

  async getHomepageSections(): Promise<HomepageSection[]> {
    const hero = await this.getHero();
    return mockHomepageSections.map((section) => (section.type === "hero" ? hero : section));
  }

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    const result = await productRepository.getProducts({ perPage: limit });
    return result.nodes.slice(0, limit);
  }

  async getCollections(): Promise<Collection[]> {
    // No real source: Collection is explicitly a manually-curated
    // merchandising grouping distinct from WooCommerce categories - nothing
    // in `siteContent` covers it and nothing was asked for it.
    return [];
  }

  async getCategories(): Promise<ProductCategory[]> {
    return categoryRepository.getCategories();
  }

  async getTrustBadges(): Promise<TrustBadge[]> {
    const content = await getSiteContent();
    return content.trustBadges.map(mapSiteContentTrustBadge);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const content = await getSiteContent();
    return content.testimonials.map(mapSiteContentTestimonial);
  }

  async getStatistics(): Promise<Statistic[]> {
    const content = await getSiteContent();
    return content.statistics.map(mapSiteContentStatistic);
  }

  async getBlogPreview(limit = 3): Promise<BlogPost[]> {
    const result = await blogRepository.getBlogPosts({ perPage: limit });
    return result.nodes.slice(0, limit);
  }

  async getNewsletter(): Promise<NewsletterSignup> {
    const content = await getSiteContent();
    return mapSiteContentNewsletter(content.newsletter);
  }

  async getInstagramFeed(): Promise<InstagramPost[]> {
    // No real source: stands in for the Instagram Graph API feed, a
    // third-party integration requiring Instagram credentials, not a
    // WordPress content type - out of scope here, same as Stripe keys.
    return [];
  }

  async getFAQPreview(limit = 5): Promise<FAQItem[]> {
    const content = await getSiteContent();
    return content.faqs.slice(0, limit).map(mapSiteContentFAQ);
  }

  async getCertificates(): Promise<Certificate[]> {
    const content = await getSiteContent();
    return content.certificates.map(mapSiteContentCertificate);
  }

  async getVideos(): Promise<FeaturedVideo[]> {
    // No real source: no video CMS field exists, nothing in `siteContent`
    // covers it, and no one asked for a video field.
    return [];
  }
}
