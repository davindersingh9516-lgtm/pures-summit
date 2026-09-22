import type { ID, Money } from "./common.types";

/** Only the two countries this store ships to/sells in (see
 * NZ 15% GST / AU GST-free wiring in WooCommerce). */
export type ShippingCountry = "NZ" | "AU";

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  /** NZ region or AU state, e.g. "AUK", "NSW". */
  state?: string;
  postcode: string;
  country: ShippingCountry;
  email?: string;
  phone?: string;
}

export interface CheckoutInput {
  billing: Address;
  shipping?: Address;
  shipToDifferentAddress?: boolean;
  customerNote?: string;
  /** WooCommerce payment gateway id this order settles against - "stripe"
   * for the WooCommerce Stripe Gateway plugin registered in Phase A. */
  paymentMethod: string;
  /** Stripe PaymentIntent id, recorded as the order's transaction id. */
  transactionId: string;
}

/** Account creation happens *before* payment (see
 * /api/checkout/create-payment-intent), not smuggled into the checkout
 * mutation - the resulting `sessionToken` is the same WC cart session,
 * now tied to the newly-registered customer instead of a guest. */
export interface CreateAccountInput {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Customer {
  id: ID;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthSession {
  authToken: string;
  refreshToken: string;
  customer: Customer;
}

export interface Order {
  id: ID;
  orderNumber: string;
  status: string;
  total: Money;
  paymentMethod: string;
  billing: Address;
  shipping?: Address;
  createdAt: string;
}
