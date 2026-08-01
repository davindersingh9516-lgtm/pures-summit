import type { ISearchRepository } from "../interfaces";
import { mockSearchSuggestions } from "@/mocks";

export class MockSearchRepository implements ISearchRepository {
  async getSearchSuggestions() {
    return mockSearchSuggestions;
  }
}
