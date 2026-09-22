import type { CartResult, ICheckoutRepository } from "../interfaces";
import type { CheckoutInput, CreateAccountInput, Order } from "@/types";
import { siteConfig } from "@/config/site.config";
import { MockCartRepository } from "./cart.repository";

const mockCartRepository = new MockCartRepository();

export class MockCheckoutRepository implements ICheckoutRepository {
  async createAccount(sessionToken: string, _input: CreateAccountInput): Promise<CartResult> {
    return mockCartRepository.getCart(sessionToken);
  }

  async placeOrder(_sessionToken: string, input: CheckoutInput): Promise<Order> {
    const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
    return {
      id: crypto.randomUUID(),
      orderNumber,
      status: "processing",
      total: { amount: 0, currencyCode: siteConfig.defaultCurrency, formatted: "$0.00" },
      paymentMethod: input.paymentMethod,
      billing: input.billing,
      shipping: input.shipping,
      createdAt: new Date().toISOString(),
    };
  }
}
