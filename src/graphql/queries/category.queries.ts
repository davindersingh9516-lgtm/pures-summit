import { SEO_TAXONOMY_FRAGMENT } from "../fragments/seo.fragment";
import { CATEGORY_FIELDS } from "../fragments/category.fragment";

export const GET_CATEGORY_QUERY = /* GraphQL */ `
  ${SEO_TAXONOMY_FRAGMENT}
  ${CATEGORY_FIELDS}
  query GetCategory($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      ...CategoryFields
    }
  }
`;

export const GET_CATEGORIES_QUERY = /* GraphQL */ `
  ${SEO_TAXONOMY_FRAGMENT}
  ${CATEGORY_FIELDS}
  query GetCategories {
    productCategories(first: 100, where: { hideEmpty: false }) {
      nodes {
        ...CategoryFields
      }
    }
  }
`;
