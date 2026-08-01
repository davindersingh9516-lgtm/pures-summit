import type { INavigationRepository } from "../interfaces";
import { mockNavigationData } from "@/mocks";

export class MockNavigationRepository implements INavigationRepository {
  async getNavigation() {
    return mockNavigationData;
  }
}
