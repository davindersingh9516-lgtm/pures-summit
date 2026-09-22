/**
 * Reference fragment for the WPGraphQL for Yoast SEO addon. Not executed
 * yet - copied here so every future query in graphql/queries/* can spread
 * it consistently once the addon is installed on the WordPress backend.
 *
 * @see https://github.com/ashhitch/wp-graphql-yoast-seo
 */
export const SEO_FRAGMENT = /* GraphQL */ `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      altText
    }
    schema {
      raw
    }
  }
`;

/** Same shape as `SeoFields`, but for taxonomy terms (categories, tags) -
 * the addon exposes a distinct `TaxonomySEO` type for those, not
 * `PostTypeSEO`, even though the field selection is identical. */
export const SEO_TAXONOMY_FRAGMENT = /* GraphQL */ `
  fragment SeoTaxonomyFields on TaxonomySEO {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      altText
    }
    schema {
      raw
    }
  }
`;
