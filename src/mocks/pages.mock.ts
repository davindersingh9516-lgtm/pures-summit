import type { Page } from "@/types";
import { createMockSEO } from "./seo.mock";

/**
 * MOCK DATA - stands in for WPGraphQL `pages` (generic CMS pages composed
 * of ACF Flexible Content blocks). Only a couple of representative pages
 * are seeded here; the repository interface supports arbitrary slugs.
 */
export const mockPages: Page[] = [
  {
    id: "page-our-story",
    slug: "our-story",
    title: "Our Story",
    updatedAt: "2026-01-10T00:00:00.000Z",
    blocks: [
      {
        id: "our-story-rich-text",
        type: "rich-text",
        order: 1,
        data: { html: "<p>Founded in 2012 by a third-generation apiarist family in Northland...</p>" },
      },
    ],
    seo: createMockSEO({
      path: "/our-story",
      title: "Our Story | Pure Summit",
      description: "The story behind a third-generation New Zealand Manuka honey apiary.",
    }),
  },
  {
    id: "page-contact",
    slug: "contact",
    title: "Contact",
    updatedAt: "2026-01-10T00:00:00.000Z",
    blocks: [
      {
        id: "contact-rich-text",
        type: "rich-text",
        order: 1,
        data: { html: "<p>We'd love to hear from you.</p>" },
      },
    ],
    seo: createMockSEO({
      path: "/contact",
      title: "Contact Us | Pure Summit",
      description: "Get in touch with the Pure Summit team.",
    }),
  },
];
