/**
 * Fields needed for a blog post card/detail. Depends on `SeoFields` but does
 * not embed it - callers must compose `SEO_FRAGMENT` + this fragment (each
 * exactly once) in the final query string, same rule as product/category
 * fragments (see product.fragment.ts header comment).
 */
export const BLOG_POST_FIELDS = /* GraphQL */ `
  fragment BlogPostFields on Post {
    id
    databaseId
    slug
    title
    excerpt
    content
    date
    modified
    featuredImage {
      node {
        id
        sourceUrl
        altText
      }
    }
    author {
      node {
        id
        slug
        name
        description
        avatar {
          url
        }
      }
    }
    categories(first: 10) {
      nodes {
        id
        databaseId
        slug
        name
      }
    }
    tags(first: 20) {
      nodes {
        slug
      }
    }
    seo {
      ...SeoFields
    }
  }
`;
