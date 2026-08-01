import type { ID, Image } from "./common.types";

export interface Review {
  id: ID;
  productId: ID;
  authorName: string;
  authorAvatar?: Image;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  content: string;
  createdAt: string;
  verifiedPurchase: boolean;
  images?: Image[];
}
