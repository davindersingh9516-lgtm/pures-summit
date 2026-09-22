/**
 * `RootQuery` has no ACF Options Page ("Site Settings") registered on
 * pure-summit - confirmed via `__schema` introspection (only the built-in
 * `generalSettings`/`allSettings` exist, no custom root field). This query
 * only pulls what WordPress core actually exposes; everything else on
 * `SiteSettings` (contact info, business info, social links, multi-locale/
 * currency) has no backend source yet and is defaulted by the mapper.
 */
export const GET_SETTINGS_QUERY = /* GraphQL */ `
  query GetSettings {
    generalSettings {
      title
      description
      email
      url
      siteIconUrl
    }
  }
`;
