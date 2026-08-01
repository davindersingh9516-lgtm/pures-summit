import type { IBlogRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_BLOG_POST_QUERY /
 * GET_BLOG_POSTS_QUERY / GET_ALL_BLOG_POST_SLUGS_QUERY)` and map onto
 * `BlogPost` / `Paginated<BlogPost>`.
 */
export class GraphQLBlogRepository implements IBlogRepository {
  async getBlogPost(_slug: string): ReturnType<IBlogRepository["getBlogPost"]> {
    notImplemented("getBlogPost", "GET_BLOG_POST_QUERY");
  }

  async getBlogPosts(): ReturnType<IBlogRepository["getBlogPosts"]> {
    notImplemented("getBlogPosts", "GET_BLOG_POSTS_QUERY");
  }

  async getAllBlogPostSlugs(): ReturnType<IBlogRepository["getAllBlogPostSlugs"]> {
    notImplemented("getAllBlogPostSlugs", "GET_ALL_BLOG_POST_SLUGS_QUERY");
  }
}
