import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { env } from "@/config/env";
import { getStripeClient } from "@/lib/stripe";
import { checkoutRepository } from "@/repositories";
import type { Address } from "@/types";

/**
 * Source of truth for order creation - NOT the client's post-payment
 * redirect, which could be closed/interrupted or spoofed. Stripe retries
 * this webhook until it gets a 2xx, so it's safe for `placeOrder` to be the
 * only place a WooCommerce order actually gets created from a paid intent.
 */
export async function POST(request: Request) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });

  const rawBody = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type !== "payment_intent.succeeded") {
    return NextResponse.json({ received: true });
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const { wooSessionToken, billing, shipping, customerNote } = paymentIntent.metadata;

  if (!wooSessionToken || !billing) {
    return NextResponse.json({ error: "PaymentIntent is missing required metadata" }, { status: 400 });
  }

  const order = await checkoutRepository.placeOrder(wooSessionToken, {
    billing: JSON.parse(billing) as Address,
    shipping: shipping ? (JSON.parse(shipping) as Address) : undefined,
    shipToDifferentAddress: Boolean(shipping),
    customerNote: customerNote || undefined,
    paymentMethod: "stripe",
    transactionId: paymentIntent.id,
  });

  return NextResponse.json({ received: true, orderId: order.id, orderNumber: order.orderNumber });
}
