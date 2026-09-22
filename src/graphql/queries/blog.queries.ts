import { SEO_FRAGMENT } from "../fragments/seo.fragment";
import { BLOG_POST_FIELDS } from "../fragments/blog.fragment";

/**
 * Every query below composes its fragment dependencies exactly once, in
 * dependency order - see product.queries.ts header comment for why.
 */

export const GET_BLOG_POST_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${BLOG_POST_FIELDS}
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...BlogPostFields
    }
  }
`;

export const GET_BLOG_POSTS_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${BLOG_POST_FIELDS}
  query GetBlogPosts($first: Int, $category: String) {
    posts(first: $first, where: { categoryName: $category, orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      nodes {
        ...BlogPostFields
      }
    }
  }
`;

/** Minimal lookup used only to resolve a post's `databaseId` + category
 * `databaseId`s from its global id (`BlogPost.id`), as a precursor to
 * `GET_RELATED_BLOG_POSTS_QUERY` - callers pass `Post.id`, not a slug, so
 * `GET_BLOG_POST_QUERY` (idType SLUG) can't be reused here. */
export const GET_POST_CATEGORIES_BY_ID_QUERY = /* GraphQL */ `
  query GetPostCategoriesById($id: ID!) {
    post(id: $id, idType: ID) {
      databaseId
      categories(first: 10) {
        nodes {
          databaseId
        }
      }
    }
  }
`;

/** Related-posts fallback: WordPress core has no built-in "related" field on
 * `Post` (unlike WooCommerce's `Product.related`), so this approximates it
 * by fetching other posts sharing at least one of the given category IDs,
 * excluding the current post. `categoryIn`/`notIn` both take *databaseId*
 * (numeric), not slug or the base64 global id - verified via introspection. */
export const GET_RELATED_BLOG_POSTS_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${BLOG_POST_FIELDS}
  query GetRelatedBlogPosts($categoryIn: [ID], $notIn: [ID], $first: Int) {
    posts(first: $first, where: { categoryIn: $categoryIn, notIn: $notIn, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...BlogPostFields
      }
    }
  }
`;

export const GET_ALL_BLOG_POST_SLUGS_QUERY = /* GraphQL */ `
  query GetAllBlogPostSlugs {
    posts(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;
