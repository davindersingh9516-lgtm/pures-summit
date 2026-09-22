import { SEO_FRAGMENT } from "../fragments/seo.fragment";

/**
 * WordPress has no ACF Flexible Content field group configured on
 * pure-summit for generic pages yet, so there's no real "blocks" source -
 * `content` (rendered Gutenberg HTML) is wrapped into a single `rich-text`
 * block by the mapper, matching the shape `mockPages` already uses.
 */
export const GET_PAGE_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query GetPage($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      slug
      title
      content
      modified
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
