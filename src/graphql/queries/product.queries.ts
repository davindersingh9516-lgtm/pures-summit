import { SEO_FRAGMENT } from "../fragments/seo.fragment";

/** WooGraphQL product query reference. */
export const GET_PRODUCT_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      slug
      name
      shortDescription
      description
      sku
      ... on SimpleProduct {
        price
        salePrice
        stockStatus
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  query GetProducts($first: Int, $after: String, $category: [String]) {
    products(first: $first, after: $after, where: { categoryIn: $category }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        slug
        name
      }
    }
  }
`;

export const GET_ALL_PRODUCT_SLUGS_QUERY = /* GraphQL */ `
  query GetAllProductSlugs {
    products(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;
