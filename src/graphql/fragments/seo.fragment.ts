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
