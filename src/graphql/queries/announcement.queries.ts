export const GET_ANNOUNCEMENT_BAR_QUERY = /* GraphQL */ `
  query GetAnnouncementBar {
    themeOptions {
      announcementBar {
        enabled
        dismissible
        autoRotateSeconds
        items {
          message
          icon
          url
          ctaLabel
          startsAt
          endsAt
        }
      }
    }
  }
`;
