import { SEO_FRAGMENT, SEO_TAXONOMY_FRAGMENT } from "../fragments/seo.fragment";

/**
 * Generic "resolve any URI to its SEO" query, backing
 * `ISEORepository.getSEOByUri` - a fallback for routes not covered by a more
 * specific repository. WPGraphQL core's `nodeByUri` resolves any front-end
 * URI to a `UniformResourceIdentifiable` node; verified via introspection
 * that `Page`, `Post`, the product types, `Category`, and `ProductCategory`
 * are all possible types and each carries its own `seo` field (`PostTypeSEO`
 * for post-type nodes, `TaxonomySEO` for taxonomy terms - same split as
 * product/category queries elsewhere in this app).
 */
export const GET_SEO_BY_URI_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${SEO_TAXONOMY_FRAGMENT}
  query GetSeoByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page {
        title
        seo {
          ...SeoFields
        }
      }
      ... on Post {
        title
        seo {
          ...SeoFields
        }
      }
      ... on SimpleProduct {
        name
        seo {
          ...SeoFields
        }
      }
      ... on VariableProduct {
        name
        seo {
          ...SeoFields
        }
      }
      ... on ExternalProduct {
        name
        seo {
          ...SeoFields
        }
      }
      ... on GroupProduct {
        name
        seo {
          ...SeoFields
        }
      }
      ... on Category {
        name
        seo {
          ...SeoTaxonomyFields
        }
      }
      ... on ProductCategory {
        name
        seo {
          ...SeoTaxonomyFields
        }
      }
    }
  }
`;
