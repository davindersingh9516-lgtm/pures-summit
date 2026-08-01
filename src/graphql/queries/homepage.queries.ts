import { SEO_FRAGMENT } from "../fragments/seo.fragment";

/**
 * Homepage data is split into focused queries (one per `IHomepageRepository`
 * method) rather than one giant query - each backs an independently
 * Suspense-streamed section on the page. `GET_HOMEPAGE_QUERY` remains for
 * the rare case something needs the whole payload (e.g. a static export).
 */
export const GET_HOMEPAGE_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query GetHomepage {
    page(id: "homepage", idType: URI) {
      seo {
        ...SeoFields
      }
      homepageFields {
        sections {
          __typename
          ... on HeroSection {
            heading
            subheading
          }
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_HERO_QUERY = /* GraphQL */ `
  query GetHomepageHero {
    homepageHero {
      eyebrow
      heading
      subheading
      media {
        sourceUrl
        altText
      }
      buttons {
        label
        url
        variant
      }
    }
  }
`;

export const GET_HOMEPAGE_SECTIONS_QUERY = /* GraphQL */ `
  query GetHomepageSections {
    homepageFields {
      sections {
        __typename
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS_QUERY = /* GraphQL */ `
  query GetFeaturedProducts($limit: Int) {
    products(first: $limit, where: { featured: true }) {
      nodes {
        id
        slug
        name
      }
    }
  }
`;

export const GET_COLLECTIONS_QUERY = /* GraphQL */ `
  query GetCollections {
    collections {
      id
      slug
      name
    }
  }
`;

export const GET_TRUST_BADGES_QUERY = /* GraphQL */ `
  query GetTrustBadges {
    themeOptions {
      trustBadges {
        icon
        label
        description
      }
    }
  }
`;

export const GET_STATISTICS_QUERY = /* GraphQL */ `
  query GetStatistics {
    themeOptions {
      statistics {
        value
        prefix
        suffix
        label
      }
    }
  }
`;

export const GET_BLOG_PREVIEW_QUERY = /* GraphQL */ `
  query GetBlogPreview($limit: Int) {
    posts(first: $limit) {
      nodes {
        id
        slug
        title
      }
    }
  }
`;

export const GET_NEWSLETTER_SETTINGS_QUERY = /* GraphQL */ `
  query GetNewsletterSettings {
    themeOptions {
      newsletter {
        enabled
        title
        description
        consentText
      }
    }
  }
`;

export const GET_INSTAGRAM_FEED_QUERY = /* GraphQL */ `
  query GetInstagramFeed {
    instagramFeed {
      id
      permalink
      caption
      likeCount
      media {
        sourceUrl
        altText
      }
    }
  }
`;

export const GET_FAQ_PREVIEW_QUERY = /* GraphQL */ `
  query GetFaqPreview($limit: Int) {
    faqs(first: $limit) {
      nodes {
        id
        question
        answer
      }
    }
  }
`;

export const GET_CERTIFICATES_QUERY = /* GraphQL */ `
  query GetCertificates {
    certificates {
      id
      name
      description
      url
      image {
        sourceUrl
        altText
      }
    }
  }
`;

export const GET_VIDEOS_QUERY = /* GraphQL */ `
  query GetVideos {
    videos {
      id
      title
      description
      asset {
        url
        caption
        poster {
          sourceUrl
          altText
        }
      }
    }
  }
`;
