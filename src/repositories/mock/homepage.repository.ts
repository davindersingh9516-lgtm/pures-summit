import type { IHomepageRepository } from "../interfaces";
import {
  mockBlogPosts,
  mockCategories,
  mockCertificates,
  mockCollections,
  mockFAQs,
  mockHero,
  mockHomepageData,
  mockHomepageNewsletter,
  mockHomepageSections,
  mockInstagramPosts,
  mockProducts,
  mockStatistics,
  mockTestimonials,
  mockTrustBadges,
  mockVideos,
} from "@/mocks";

export class MockHomepageRepository implements IHomepageRepository {
  async getHomepage() {
    return mockHomepageData;
  }

  async getHero() {
    return mockHero;
  }

  async getHomepageSections() {
    return mockHomepageSections;
  }

  async getFeaturedProducts(limit = 4) {
    return mockProducts.slice(0, limit);
  }

  async getCollections() {
    return mockCollections;
  }

  async getCategories() {
    return mockCategories;
  }

  async getTrustBadges() {
    return mockTrustBadges;
  }

  async getTestimonials() {
    return mockTestimonials;
  }

  async getStatistics() {
    return mockStatistics;
  }

  async getBlogPreview(limit = 3) {
    return mockBlogPosts.slice(0, limit);
  }

  async getNewsletter() {
    return mockHomepageNewsletter;
  }

  async getInstagramFeed() {
    return mockInstagramPosts;
  }

  async getFAQPreview(limit = 5) {
    return mockFAQs.slice(0, limit);
  }

  async getCertificates() {
    return mockCertificates;
  }

  async getVideos() {
    return mockVideos;
  }
}
