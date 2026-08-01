import type { ILanguageRepository } from "../interfaces";
import { mockLanguages } from "@/mocks";

export class MockLanguageRepository implements ILanguageRepository {
  async getLanguages() {
    return mockLanguages;
  }
}
