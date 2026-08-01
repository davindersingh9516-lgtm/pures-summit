import type { IFooterRepository } from "../interfaces";
import { mockFooterData } from "@/mocks";

export class MockFooterRepository implements IFooterRepository {
  async getFooter() {
    return mockFooterData;
  }
}
