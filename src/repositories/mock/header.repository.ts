import type { IHeaderRepository } from "../interfaces";
import { mockHeaderData } from "@/mocks";

export class MockHeaderRepository implements IHeaderRepository {
  async getHeader() {
    return mockHeaderData;
  }
}
