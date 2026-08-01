import type { ICurrencyRepository } from "../interfaces";
import { mockCurrencies } from "@/mocks";

export class MockCurrencyRepository implements ICurrencyRepository {
  async getCurrencies() {
    return mockCurrencies;
  }
}
