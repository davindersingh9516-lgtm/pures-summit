import type { IReviewRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: call `graphqlRequest(GET_PRODUCT_REVIEWS_QUERY)`
 * and map onto `Paginated<Review>`.
 */
export class GraphQLReviewRepository implements IReviewRepository {
  async getReviewsForProduct(_productId: string): ReturnType<IReviewRepository["getReviewsForProduct"]> {
    notImplemented("getReviewsForProduct", "GET_PRODUCT_REVIEWS_QUERY");
  }
}
