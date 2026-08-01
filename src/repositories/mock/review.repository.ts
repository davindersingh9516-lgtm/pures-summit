import type { IReviewRepository } from "../interfaces";
import type { Paginated, Review } from "@/types";
import { mockReviews } from "@/mocks";
import { siteConfig } from "@/config/site.config";

export class MockReviewRepository implements IReviewRepository {
  async getReviewsForProduct(productId: string, page = 1): Promise<Paginated<Review>> {
    const perPage = siteConfig.pagination.reviewsPerPage;
    const filtered = mockReviews.filter((review) => review.productId === productId);
    const start = (page - 1) * perPage;
    const nodes = filtered.slice(start, start + perPage);

    return {
      nodes,
      pageInfo: {
        hasNextPage: start + perPage < filtered.length,
        hasPreviousPage: page > 1,
        totalCount: filtered.length,
      },
    };
  }
}
