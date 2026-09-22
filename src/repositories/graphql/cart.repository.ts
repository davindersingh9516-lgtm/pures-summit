import type { CartResult, ICartRepository } from "../interfaces";
import type { Address } from "@/types";
import { graphqlSessionRequest } from "@/graphql/client";
import {
  ADD_TO_CART_MUTATION,
  APPLY_COUPON_MUTATION,
  EMPTY_CART_MUTATION,
  GET_CART_QUERY,
  REMOVE_COUPONS_MUTATION,
  REMOVE_ITEMS_FROM_CART_MUTATION,
  UPDATE_CUSTOMER_SHIPPING_MUTATION,
  UPDATE_ITEM_QUANTITIES_MUTATION,
  UPDATE_SHIPPING_METHOD_MUTATION,
} from "@/graphql/queries/cart.queries";
import { mapWooCart, type WPCartNode } from "@/graphql/mappers/cart.mapper";
import { decodeWooDatabaseId } from "@/graphql/mappers/relay-id";

function toResult(data: { cart: WPCartNode | null }, sessionToken: string): CartResult {
  return { sessionToken, cart: mapWooCart(data.cart ?? {}, sessionToken) };
}

export class GraphQLCartRepository implements ICartRepository {
  async getCart(sessionToken?: string): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{ cart: WPCartNode | null }>(
      GET_CART_QUERY,
      undefined,
      sessionToken,
    );
    return toResult(data, token);
  }

  async addItem(
    sessionToken: string | undefined,
    productId: string,
    quantity: number,
    variantId?: string,
  ): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{ addToCart: { cart: WPCartNode } }>(
      ADD_TO_CART_MUTATION,
      {
        productId: decodeWooDatabaseId(productId),
        quantity,
        variationId: variantId ? decodeWooDatabaseId(variantId) : undefined,
      },
      sessionToken,
    );
    return toResult({ cart: data.addToCart.cart }, token);
  }

  async updateItemQuantity(sessionToken: string, itemKey: string, quantity: number): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{
      updateItemQuantities: { cart: WPCartNode };
    }>(UPDATE_ITEM_QUANTITIES_MUTATION, { items: [{ key: itemKey, quantity }] }, sessionToken);
    return toResult({ cart: data.updateItemQuantities.cart }, token);
  }

  async removeItem(sessionToken: string, itemKey: string): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{
      removeItemsFromCart: { cart: WPCartNode };
    }>(REMOVE_ITEMS_FROM_CART_MUTATION, { keys: [itemKey] }, sessionToken);
    return toResult({ cart: data.removeItemsFromCart.cart }, token);
  }

  async clearCart(sessionToken: string): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{ emptyCart: { cart: WPCartNode } }>(
      EMPTY_CART_MUTATION,
      undefined,
      sessionToken,
    );
    return toResult({ cart: data.emptyCart.cart }, token);
  }

  async applyCoupon(sessionToken: string, code: string): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{ applyCoupon: { cart: WPCartNode } }>(
      APPLY_COUPON_MUTATION,
      { code },
      sessionToken,
    );
    return toResult({ cart: data.applyCoupon.cart }, token);
  }

  async removeCoupon(sessionToken: string, code: string): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{ removeCoupons: { cart: WPCartNode } }>(
      REMOVE_COUPONS_MUTATION,
      { codes: [code] },
      sessionToken,
    );
    return toResult({ cart: data.removeCoupons.cart }, token);
  }

  async updateShippingAddress(sessionToken: string, address: Address): Promise<CartResult> {
    const { sessionToken: afterUpdate } = await graphqlSessionRequest<{
      updateCustomer: { customer: { id: string } };
    }>(
      UPDATE_CUSTOMER_SHIPPING_MUTATION,
      {
        shipping: {
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
        },
      },
      sessionToken,
    );

    // UpdateCustomerPayload doesn't expose `cart`, so re-fetch it on the
    // same session to see the recalculated totals/rates for the new address.
    const { data: cartData, sessionToken: token } = await graphqlSessionRequest<{ cart: WPCartNode | null }>(
      GET_CART_QUERY,
      undefined,
      afterUpdate,
    );

    // WooCommerce does NOT auto-switch the chosen shipping method when the
    // address moves to a different shipping zone (verified against the live
    // store: NZ -> AU left `shippingTotal` stuck at the old NZ rate until a
    // second explicit updateShippingMethod call). Always re-select the
    // (first) rate the new address's zone actually offers.
    const firstRateId = cartData.cart?.availableShippingMethods?.[0]?.rates?.[0]?.id;
    if (!firstRateId) return toResult(cartData, token);

    return this.selectShippingRate(token, firstRateId);
  }

  async selectShippingRate(sessionToken: string, rateId: string): Promise<CartResult> {
    const { data, sessionToken: token } = await graphqlSessionRequest<{
      updateShippingMethod: { cart: WPCartNode };
    }>(UPDATE_SHIPPING_METHOD_MUTATION, { methods: [rateId] }, sessionToken);
    return toResult({ cart: data.updateShippingMethod.cart }, token);
  }
}
