import { cache } from "react";
import { reviewRepository } from "@/repositories";

export const getReviewsForProduct = cache(async (productId: string, page?: number) =>
  reviewRepository.getReviewsForProduct(productId, page),
);
