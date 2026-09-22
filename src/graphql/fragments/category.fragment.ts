/**
 * Maps 1:1 onto `ProductCategory` (src/types/product.types.ts). Depends on
 * `SeoTaxonomyFields` (seo.fragment.ts) but does not embed it - callers must
 * include `SEO_TAXONOMY_FRAGMENT` alongside this in the final query string
 * exactly once, or GraphQL will reject the document for a duplicate
 * fragment definition.
 */
export const CATEGORY_FIELDS = /* GraphQL */ `
  fragment CategoryFields on ProductCategory {
    id
    slug
    name
    description
    count
    image {
      id
      sourceUrl
      altText
    }
    parent {
      node {
        id
      }
    }
    seo {
      ...SeoTaxonomyFields
    }
  }
`;
