import { SEO_FRAGMENT } from "../fragments/seo.fragment";

export const GET_PAGE_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      slug
      seo {
        ...SeoFields
      }
    }
  }
`;

export const GET_ALL_PAGE_SLUGS_QUERY = /* GraphQL */ `
  query GetAllPageSlugs {
    pages(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;
