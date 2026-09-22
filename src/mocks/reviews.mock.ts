import type { Review } from "@/types";

/**
 * MOCK DATA - stands in for a reviews plugin exposed through WPGraphQL
 * (e.g. WooCommerce product reviews or a dedicated reviews CPT).
 */
export const mockReviews: Review[] = [
  {
    id: "review-1",
    productId: "prod-mgo-263-250g",
    authorName: "Sarah T.",
    rating: 5,
    title: "Exactly as described",
    content: "Rich flavour and clearly high quality. Will reorder.",
    createdAt: "2026-05-01T00:00:00.000Z",
    verifiedPurchase: true,
  },
  {
    id: "review-2",
    productId: "prod-mgo-263-500g",
    authorName: "James K.",
    rating: 4,
    content: "Great everyday honey, a little pricier than I expected but worth it.",
    createdAt: "2026-04-18T00:00:00.000Z",
    verifiedPurchase: true,
  },
];
