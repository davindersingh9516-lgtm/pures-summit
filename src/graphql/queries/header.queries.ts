export const GET_HEADER_QUERY = /* GraphQL */ `
  query GetHeader {
    themeOptions {
      header {
        logo {
          sourceUrl
          altText
        }
        primaryNav {
          label
          url
          megaMenu {
            columns {
              title
              links {
                label
                url
              }
            }
            featuredCards {
              title
              description
              url
              image {
                sourceUrl
                altText
              }
            }
            promo {
              heading
              subheading
              url
              image {
                sourceUrl
                altText
              }
            }
          }
        }
        secondaryNav {
          label
          url
        }
        utilityLinks {
          label
          url
        }
        cta {
          label
          url
        }
      }
    }
  }
`;
