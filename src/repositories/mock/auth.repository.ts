import type { IAuthRepository } from "../interfaces";
import type { AuthSession, Customer, Order } from "@/types";

const MOCK_CUSTOMER: Customer = { id: "mock-customer", email: "demo@example.com", firstName: "Demo", lastName: "User" };

export class MockAuthRepository implements IAuthRepository {
  async login(_username: string, _password: string): Promise<AuthSession> {
    return { authToken: "mock-token", refreshToken: "mock-refresh", customer: MOCK_CUSTOMER };
  }

  async getCurrentCustomer(_authToken: string): Promise<Customer | null> {
    return MOCK_CUSTOMER;
  }

  async getOrders(_authToken: string): Promise<Order[]> {
    return [];
  }
}
