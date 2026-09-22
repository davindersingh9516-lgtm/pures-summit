import type { IContentRepository } from "../interfaces";
import type { FAQItem, Testimonial } from "@/types";
import { getSiteContent } from "../shared/site-content";
import { mapSiteContentFAQ, mapSiteContentTestimonial } from "@/graphql/mappers/site-content.mapper";

/**
 * Same `siteContent.faqs` / `siteContent.testimonials` arrays the homepage
 * repository's preview methods use (see graphql/homepage.repository.ts and
 * repositories/shared/site-content.ts), just returned as full, uncapped
 * lists for a dedicated /faqs-style consumer rather than a homepage preview.
 */
export class GraphQLContentRepository implements IContentRepository {
  async getFAQs(): Promise<FAQItem[]> {
    const content = await getSiteContent();
    return content.faqs.map(mapSiteContentFAQ);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const content = await getSiteContent();
    return content.testimonials.map(mapSiteContentTestimonial);
  }
}
