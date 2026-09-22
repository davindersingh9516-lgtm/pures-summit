import { SEO_FRAGMENT, SEO_TAXONOMY_FRAGMENT } from "../fragments/seo.fragment";
import { CATEGORY_FIELDS } from "../fragments/category.fragment";
import { PRODUCT_CARD_FIELDS, PRODUCT_DETAIL_FIELDS } from "../fragments/product.fragment";

/**
 * Every query below composes its fragment dependencies exactly once, in
 * dependency order (leaf -> branch -> query). Fragments never embed their
 * own dependencies (see product.fragment.ts) - nesting them would duplicate
 * `fragment SeoFields on ...` etc. across the final document, which GraphQL
 * rejects as "there can be only one fragment named X".
 */

export const GET_PRODUCT_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${SEO_TAXONOMY_FRAGMENT}
  ${CATEGORY_FIELDS}
  ${PRODUCT_CARD_FIELDS}
  ${PRODUCT_DETAIL_FIELDS}
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ...ProductDetailFields
    }
  }
`;

export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${SEO_TAXONOMY_FRAGMENT}
  ${CATEGORY_FIELDS}
  ${PRODUCT_CARD_FIELDS}
  query GetProducts(
    $first: Int
    $after: String
    $category: String
    $categoryIn: [String]
    $tagIn: [String]
    $maxPrice: Float
    $search: String
    $orderby: [ProductsOrderbyInput]
  ) {
    products(
      first: $first
      after: $after
      where: {
        category: $category
        categoryIn: $categoryIn
        tagIn: $tagIn
        maxPrice: $maxPrice
        search: $search
        orderby: $orderby
        visibility: CATALOG
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      nodes {
        ...ProductCardFields
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

export const GET_RELATED_PRODUCTS_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  ${SEO_TAXONOMY_FRAGMENT}
  ${CATEGORY_FIELDS}
  ${PRODUCT_CARD_FIELDS}
  query GetRelatedProducts($id: ID!) {
    product(id: $id, idType: ID) {
      related(first: 8) {
        nodes {
          ...ProductCardFields
        }
      }
    }
  }
`;
