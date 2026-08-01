import { SEO_FRAGMENT } from "../fragments/seo.fragment";

export const GET_BLOG_POST_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      date
      modified
      seo {
        ...SeoFields
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

export const GET_BLOG_POSTS_QUERY = /* GraphQL */ `
  query GetBlogPosts($first: Int, $after: String, $category: String) {
    posts(first: $first, after: $after, where: { categoryName: $category }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        slug
        title
        excerpt
        date
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
