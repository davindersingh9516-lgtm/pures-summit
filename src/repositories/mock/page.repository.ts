import type { IPageRepository } from "../interfaces";
import { mockPages } from "@/mocks";

export class MockPageRepository implements IPageRepository {
  async getPage(slug: string) {
    return mockPages.find((page) => page.slug === slug) ?? null;
  }

  async getAllPageSlugs() {
    return mockPages.map((page) => page.slug);
  }
}
