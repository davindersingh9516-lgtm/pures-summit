import type { ISettingsRepository } from "../interfaces";
import { mockSiteSettings } from "@/mocks";

export class MockSettingsRepository implements ISettingsRepository {
  async getSettings() {
    return mockSiteSettings;
  }
}
