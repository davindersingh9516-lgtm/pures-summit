import type { BlogListParams, IBlogRepository } from "../interfaces";
import type { BlogPost, Paginated } from "@/types";
import { mockBlogPosts } from "@/mocks";
import { siteConfig } from "@/config/site.config";

export class MockBlogRepository implements IBlogRepository {
  async getBlogPost(slug: string) {
    return mockBlogPosts.find((post) => post.slug === slug) ?? null;
  }

  async getBlogPosts(params: BlogListParams = {}): Promise<Paginated<BlogPost>> {
    const perPage = params.perPage ?? siteConfig.pagination.blogPostsPerPage;
    const page = params.page ?? 1;

    let filtered = mockBlogPosts;
    if (params.categorySlug) {
      filtered = filtered.filter((post) =>
        post.categories.some((category) => category.slug === params.categorySlug),
      );
    }

    const start = (page - 1) * perPage;
    const nodes = filtered.slice(start, start + perPage);

    return {
      nodes,
      pageInfo: {
        hasNextPage: start + perPage < filtered.length,
        hasPreviousPage: page > 1,
        totalCount: filtered.length,
      },
    };
  }

  async getAllBlogPostSlugs() {
    return mockBlogPosts.map((post) => post.slug);
  }
}
