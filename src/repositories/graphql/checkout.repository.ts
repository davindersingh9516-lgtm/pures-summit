import type { CartResult, ICheckoutRepository } from "../interfaces";
import type { Address, CheckoutInput, CreateAccountInput, Order } from "@/types";
import { graphqlSessionRequest } from "@/graphql/client";
import { CHECKOUT_MUTATION, REGISTER_CUSTOMER_MUTATION } from "@/graphql/queries/checkout.queries";
import { mapWooOrder, type WPOrderNode } from "@/graphql/mappers/order.mapper";
import { mapWooCart, type WPCartNode } from "@/graphql/mappers/cart.mapper";
import { GET_CART_QUERY } from "@/graphql/queries/cart.queries";

function toAddressInput(address: Address) {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    company: address.company,
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    state: address.state,
    postcode: address.postcode,
    country: address.country,
    email: address.email,
    phone: address.phone,
  };
}

export class GraphQLCheckoutRepository implements ICheckoutRepository {
  async placeOrder(sessionToken: string, input: CheckoutInput): Promise<Order> {
    const { data } = await graphqlSessionRequest<{ checkout: { order: WPOrderNode } }>(
      CHECKOUT_MUTATION,
      {
        billing: toAddressInput(input.billing),
        shipping: input.shipping ? toAddressInput(input.shipping) : undefined,
        shipToDifferentAddress: input.shipToDifferentAddress,
        customerNote: input.customerNote,
        paymentMethod: input.paymentMethod,
        transactionId: input.transactionId,
      },
      sessionToken,
    );
    return mapWooOrder(data.checkout.order);
  }

  async createAccount(sessionToken: string, input: CreateAccountInput): Promise<CartResult> {
    const { sessionToken: afterRegister } = await graphqlSessionRequest<{
      registerCustomer: { customer: { id: string; email: string } };
    }>(
      REGISTER_CUSTOMER_MUTATION,
      {
        input: {
          email: input.email,
          username: input.username,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName,
          authenticate: true,
        },
      },
      sessionToken,
    );

    // RegisterCustomerPayload has no `cart` field (same gap as
    // UpdateCustomerPayload - see cart.repository.ts's updateShippingAddress)
    // - re-fetch on the now-authenticated session to return the merged cart.
    const { data: cartData, sessionToken: token } = await graphqlSessionRequest<{ cart: WPCartNode | null }>(
      GET_CART_QUERY,
      undefined,
      afterRegister,
    );
    return { sessionToken: token, cart: mapWooCart(cartData.cart ?? {}, token) };
  }
}
