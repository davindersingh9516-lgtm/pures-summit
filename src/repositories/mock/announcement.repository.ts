import type { IAnnouncementRepository } from "../interfaces";
import { mockAnnouncementBarData } from "@/mocks";

export class MockAnnouncementRepository implements IAnnouncementRepository {
  async getAnnouncementBar() {
    const now = new Date();
    const items = mockAnnouncementBarData.items.filter((item) => {
      if (item.startsAt && new Date(item.startsAt) > now) return false;
      if (item.endsAt && new Date(item.endsAt) < now) return false;
      return true;
    });

    return { ...mockAnnouncementBarData, items };
  }
}
