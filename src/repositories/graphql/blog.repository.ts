import type { BlogListParams, IBlogRepository } from "../interfaces";
import type { BlogPost, Paginated } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import {
  GET_ALL_BLOG_POST_SLUGS_QUERY,
  GET_BLOG_POST_QUERY,
  GET_BLOG_POSTS_QUERY,
  GET_POST_CATEGORIES_BY_ID_QUERY,
  GET_RELATED_BLOG_POSTS_QUERY,
} from "@/graphql/queries/blog.queries";
import { mapWooBlogPost, type WPBlogPostNode } from "@/graphql/mappers/blog.mapper";
import { siteConfig } from "@/config/site.config";

export class GraphQLBlogRepository implements IBlogRepository {
  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const data = await graphqlRequest<{ post: WPBlogPostNode | null }>(
      GET_BLOG_POST_QUERY,
      { slug },
      { next: { revalidate: siteConfig.revalidateSeconds.blogPost } },
    );
    return data.post ? mapWooBlogPost(data.post) : null;
  }

  async getBlogPosts(params: BlogListParams = {}): Promise<Paginated<BlogPost>> {
    const perPage = params.perPage ?? siteConfig.pagination.blogPostsPerPage;
    const page = params.page ?? 1;

    // Same cursor-vs-page-number tradeoff as GraphQLProductRepository.getProducts:
    // fetch up to the requested page and slice client-side.
    const data = await graphqlRequest<{
      posts: { pageInfo: { hasNextPage: boolean }; nodes: WPBlogPostNode[] };
    }>(
      GET_BLOG_POSTS_QUERY,
      { first: page * perPage, category: params.categorySlug },
      { next: { revalidate: siteConfig.revalidateSeconds.blogList } },
    );

    const allMapped = data.posts.nodes.map(mapWooBlogPost);
    const start = (page - 1) * perPage;
    const nodes = allMapped.slice(start, start + perPage);

    return {
      nodes,
      pageInfo: {
        hasNextPage: data.posts.pageInfo.hasNextPage || start + perPage < allMapped.length,
        hasPreviousPage: page > 1,
        totalCount: allMapped.length,
      },
    };
  }

  async getRelatedBlogPosts(postId: string): Promise<BlogPost[]> {
    // WordPress core has no built-in "related posts" field. Approximate it
    // by fetching the post's categories, then other posts sharing at least
    // one, excluding itself - same approach the mock repository uses.
    // Callers pass `BlogPost.id` (the WPGraphQL global id), so resolve
    // databaseId + category databaseIds via idType ID first.
    const current = await graphqlRequest<{
      post: { databaseId: number; categories: { nodes: { databaseId: number }[] } } | null;
    }>(GET_POST_CATEGORIES_BY_ID_QUERY, { id: postId }, { next: { revalidate: siteConfig.revalidateSeconds.blogPost } });

    const post = current.post;
    if (!post) return [];

    const categoryIds = post.categories.nodes.map((category) => category.databaseId);
    if (!categoryIds.length) return [];

    const data = await graphqlRequest<{ posts: { nodes: WPBlogPostNode[] } }>(
      GET_RELATED_BLOG_POSTS_QUERY,
      { categoryIn: categoryIds, notIn: [post.databaseId], first: 4 },
      { next: { revalidate: siteConfig.revalidateSeconds.blogPost } },
    );

    return data.posts.nodes.map(mapWooBlogPost);
  }

  async getAllBlogPostSlugs(): Promise<string[]> {
    const data = await graphqlRequest<{ posts: { nodes: { slug: string }[] } }>(
      GET_ALL_BLOG_POST_SLUGS_QUERY,
      undefined,
      { next: { revalidate: siteConfig.revalidateSeconds.blogList } },
    );
    return data.posts.nodes.map((node) => node.slug);
  }
}
