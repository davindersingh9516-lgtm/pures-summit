import { SEO_FRAGMENT } from "../fragments/seo.fragment";

export const GET_CATEGORY_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query GetCategory($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      slug
      name
      description
      count
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_CATEGORIES_QUERY = /* GraphQL */ `
  query GetCategories {
    productCategories(first: 100) {
      nodes {
        id
        slug
        name
        count
      }
    }
  }
`;
