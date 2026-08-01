import type { ISEORepository } from "../interfaces";
import { mockBlogPosts, mockHomepageData, mockPages, mockProducts } from "@/mocks";

export class MockSEORepository implements ISEORepository {
  async getSEOByUri(uri: string) {
    const normalized = uri.replace(/^\/|\/$/g, "");

    if (normalized === "" || normalized === "/") return mockHomepageData.seo;

    const product = mockProducts.find((item) => item.slug === normalized);
    if (product) return product.seo;

    const post = mockBlogPosts.find((item) => item.slug === normalized);
    if (post) return post.seo;

    const page = mockPages.find((item) => item.slug === normalized);
    if (page) return page.seo;

    return null;
  }
}
