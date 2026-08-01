export const GET_FOOTER_QUERY = /* GraphQL */ `
  query GetFooter {
    themeOptions {
      footer {
        columns {
          title
          links {
            label
            url
          }
        }
        socialLinks {
          platform
          url
        }
        newsletter {
          enabled
          title
          description
        }
        copyrightText
      }
    }
  }
`;
