import type { Review } from "@/types";

interface WPReviewAuthorNode {
  name?: string | null;
  avatar?: { url?: string | null } | null;
}

interface WPReviewCommentNode {
  id: string;
  databaseId: number;
  content?: string | null;
  date?: string | null;
  author?: { node?: WPReviewAuthorNode | null } | null;
}

export interface WPReviewEdge {
  rating?: number | null;
  node: WPReviewCommentNode;
}

function toStarRating(rating: number | null | undefined): Review["rating"] {
  const rounded = Math.round(rating ?? 0);
  if (rounded >= 5) return 5;
  if (rounded <= 1) return 1;
  return rounded as Review["rating"];
}

export function mapWooReview(edge: WPReviewEdge, productId: string): Review {
  const author = edge.node.author?.node;
  return {
    id: edge.node.id,
    productId,
    authorName: author?.name || "Anonymous",
    authorAvatar: author?.avatar?.url ? { id: `${edge.node.id}-avatar`, url: author.avatar.url, altText: author?.name ?? "" } : undefined,
    rating: toStarRating(edge.rating),
    content: (edge.node.content ?? "").replace(/<[^>]+>/g, "").trim(),
    createdAt: edge.node.date ?? new Date().toISOString(),
    // WooCommerce's "verified purchase" flag is stored as comment meta,
    // which WPGraphQL doesn't expose without a custom field registration
    // on the WordPress backend - defaults to false until that's added.
    verifiedPurchase: false,
  };
}
