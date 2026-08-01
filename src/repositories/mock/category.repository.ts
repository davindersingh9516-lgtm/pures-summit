import type { ICategoryRepository } from "../interfaces";
import { mockCategories } from "@/mocks";

export class MockCategoryRepository implements ICategoryRepository {
  async getCategory(slug: string) {
    return mockCategories.find((category) => category.slug === slug) ?? null;
  }

  async getCategories() {
    return mockCategories;
  }
}
