import type { BlogPost } from "@/types";
import { createMockSEO } from "./seo.mock";

const author = {
  id: "author-1",
  name: "Aroha Ngata",
  bio: "Beekeeper and third-generation apiarist in Northland, New Zealand.",
};

/**
 * MOCK DATA - stands in for a WPGraphQL `posts` query.
 */
export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-batch-traceability",
    slug: "how-we-verify-every-batch",
    title: "How We Verify Every Batch, Region to Jar",
    excerpt: "Behind our origin map and batch lookup tool - the lab work and record-keeping that make every jar traceable.",
    content: "<p>Traceability sounds simple until you try to actually build it...</p>",
    featuredImage: { id: "post-img-3", url: "/mocks/umf-mgo-media.jpg", altText: "A jar of Pure Summit honey beside its lab certificate of analysis, viewed through a magnifying glass" },
    author,
    categories: [{ id: "blog-cat-sourcing", slug: "sourcing-quality", name: "Sourcing & Quality" }],
    tags: ["traceability", "lab-testing"],
    publishedAt: "2026-04-18T00:00:00.000Z",
    updatedAt: "2026-04-18T00:00:00.000Z",
    readingTimeMinutes: 5,
    seo: createMockSEO({
      path: "/blog/how-we-verify-every-batch",
      title: "How We Verify Every Batch, Region to Jar | Pure Summit",
      description: "The lab work and record-keeping behind our origin map and batch lookup tool.",
      type: "article",
    }),
  },
  {
    id: "post-harvest-season",
    slug: "inside-a-northland-harvest-season",
    title: "Inside a Northland Harvest Season",
    excerpt: "From hive to jar - a season with our apiary partners, six weeks that decide the whole year's honey.",
    content: "<p>Every harvest season begins long before the first frame is lifted...</p>",
    featuredImage: { id: "post-img-2", url: "/mocks/hero-1.webp", altText: "A jar of raw Manuka honey on a wooden table at golden hour in the Northland bush" },
    author,
    categories: [{ id: "blog-cat-behind-scenes", slug: "behind-the-scenes", name: "Behind the Scenes" }],
    tags: ["harvest", "apiary"],
    publishedAt: "2026-02-02T00:00:00.000Z",
    updatedAt: "2026-02-02T00:00:00.000Z",
    readingTimeMinutes: 8,
    seo: createMockSEO({
      path: "/blog/inside-a-northland-harvest-season",
      title: "Inside a Northland Harvest Season | Pure Summit",
      description: "From hive to jar - a season with our New Zealand apiary partners.",
      type: "article",
    }),
  },
  {
    id: "post-what-is-umf",
    slug: "what-is-umf-rating",
    title: "What Does the UMF Rating Actually Mean?",
    excerpt: "A plain-language guide to the Unique Manuka Factor grading system, and why the number on your jar matters more than the price.",
    content:
      "<p>The UMF (Unique Manuka Factor) rating is an independent grading system that verifies the natural markers found in genuine Manuka honey...</p>",
    featuredImage: { id: "post-img-1", url: "/mocks/why-manuka-poster.png", altText: "A jar of Pure Summit Manuka honey surrounded by Manuka flowers in bloom" },
    author,
    categories: [{ id: "blog-cat-education", slug: "education", name: "Education" }],
    tags: ["umf", "grading"],
    publishedAt: "2026-03-12T00:00:00.000Z",
    updatedAt: "2026-03-12T00:00:00.000Z",
    readingTimeMinutes: 6,
    seo: createMockSEO({
      path: "/blog/what-is-umf-rating",
      title: "What Does the UMF Rating Actually Mean? | Pure Summit",
      description: "A plain-language guide to the Unique Manuka Factor (UMF) grading system.",
      type: "article",
    }),
  },
  {
    id: "post-choosing-strength",
    slug: "choosing-your-umf-strength",
    title: "Choosing Your UMF Strength: A Beginner's Guide",
    excerpt: "UMF 5+ or UMF 20+? A short guide to picking a potency that actually matches how you'll use it.",
    content: "<p>The strength number on a jar of Manuka honey is not a scale of quality...</p>",
    featuredImage: { id: "post-img-4", url: "/mocks/category-umf.svg", altText: "Rows of Manuka honey jars graded by UMF strength" },
    author,
    categories: [{ id: "blog-cat-education", slug: "education", name: "Education" }],
    tags: ["umf", "beginners"],
    publishedAt: "2026-01-20T00:00:00.000Z",
    updatedAt: "2026-01-20T00:00:00.000Z",
    readingTimeMinutes: 4,
    seo: createMockSEO({
      path: "/blog/choosing-your-umf-strength",
      title: "Choosing Your UMF Strength: A Beginner's Guide | Pure Summit",
      description: "A short guide to picking a Manuka honey potency that matches how you'll use it.",
      type: "article",
    }),
  },
];
