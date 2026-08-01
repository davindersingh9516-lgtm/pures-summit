import type { IContentRepository } from "../interfaces";
import { mockFAQs, mockTestimonials } from "@/mocks";

export class MockContentRepository implements IContentRepository {
  async getFAQs() {
    return mockFAQs;
  }

  async getTestimonials() {
    return mockTestimonials;
  }
}
