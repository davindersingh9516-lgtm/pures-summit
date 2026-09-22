import type { IReviewRepository } from "../interfaces";
import type { Paginated, Review } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_PRODUCT_REVIEWS_QUERY } from "@/graphql/queries/review.queries";
import { mapWooReview, type WPReviewEdge } from "@/graphql/mappers/review.mapper";
import { siteConfig } from "@/config/site.config";

export class GraphQLReviewRepository implements IReviewRepository {
  async getReviewsForProduct(productId: string, page = 1): Promise<Paginated<Review>> {
    const perPage = siteConfig.pagination.reviewsPerPage;

    // WPGraphQL only supports cursor pagination - fetch up to the requested
    // page and slice client-side, same tradeoff as product/blog lists.
    const data = await graphqlRequest<{
      product: { reviews: { pageInfo: { hasNextPage: boolean }; edges: WPReviewEdge[] } } | null;
    }>(
      GET_PRODUCT_REVIEWS_QUERY,
      { productId, first: page * perPage },
      { next: { revalidate: siteConfig.revalidateSeconds.product } },
    );

    const edges = data.product?.reviews.edges ?? [];
    const allMapped = edges.map((edge) => mapWooReview(edge, productId));
    const start = (page - 1) * perPage;
    const nodes = allMapped.slice(start, start + perPage);

    return {
      nodes,
      pageInfo: {
        hasNextPage: (data.product?.reviews.pageInfo.hasNextPage ?? false) || start + perPage < allMapped.length,
        hasPreviousPage: page > 1,
        totalCount: allMapped.length,
      },
    };
  }
}
