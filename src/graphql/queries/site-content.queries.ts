/**
 * `siteContent` is a single root field exposed by the
 * `pure-summit-site-content.php` mu-plugin. It returns a JSON-ENCODED STRING
 * (not a typed GraphQL object) - the same "JSON textarea" workaround already
 * used for the per-product `specifications` field, because the installed
 * wp-graphql-acf v0.6.x has a known bug where ACF repeater sub-fields
 * resolve to null over GraphQL, but plain string/textarea fields resolve
 * fine. Parse the returned string client-side - see
 * graphql/mappers/site-content.mapper.ts.
 */
export const GET_SITE_CONTENT_QUERY = /* GraphQL */ `
  query GetSiteContent {
    siteContent
  }
`;
