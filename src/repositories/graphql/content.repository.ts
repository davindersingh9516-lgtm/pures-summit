import type { IContentRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/**
 * Future implementation: FAQs and testimonials will each need a dedicated
 * WPGraphQL query once their CPTs/ACF field groups are registered on the
 * backend (not yet defined in graphql/queries).
 */
export class GraphQLContentRepository implements IContentRepository {
  async getFAQs(): ReturnType<IContentRepository["getFAQs"]> {
    notImplemented("getFAQs", "GET_FAQS_QUERY");
  }

  async getTestimonials(): ReturnType<IContentRepository["getTestimonials"]> {
    notImplemented("getTestimonials", "GET_TESTIMONIALS_QUERY");
  }
}
