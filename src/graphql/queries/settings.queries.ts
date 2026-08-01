export const GET_SETTINGS_QUERY = /* GraphQL */ `
  query GetSettings {
    generalSettings {
      title
      description
    }
    themeOptions {
      siteSettings {
        logo {
          sourceUrl
          altText
        }
        contactEmail
        contactPhone
        socialLinks {
          label
          url
        }
      }
    }
  }
`;
