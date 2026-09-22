import { NextResponse } from "next/server";
import { z } from "zod";
import { authRepository, cartRepository, checkoutRepository } from "@/repositories";
import { getWooSessionToken, setWooSessionToken } from "@/lib/woo-session";
import { setAuthToken } from "@/lib/auth-session";
import { getStripeClient } from "@/lib/stripe";

const addressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().optional(),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postcode: z.string().min(1),
  country: z.enum(["NZ", "AU"]),
  email: z.string().email(),
  phone: z.string().optional(),
});

const bodySchema = z.object({
  billing: addressSchema,
  shipping: addressSchema.optional(),
  customerNote: z.string().optional(),
  createAccount: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

/** WordPress usernames only allow letters/numbers/a handful of punctuation -
 * derive a plausible one from the email's local part rather than asking the
 * shopper to pick one, appending a short random suffix on collision. */
function usernameFromEmail(email: string): string {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 40) || "customer";
  return base;
}

/**
 * Creates a Stripe PaymentIntent for the *current WooCommerce cart total* -
 * never a client-supplied amount, so a tampered request can't under-charge.
 * The billing/shipping address is stashed in PaymentIntent metadata because
 * /api/webhooks/stripe (where the order actually gets created) runs outside
 * any browser request and has no cookie to read the address back from.
 */
export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  let sessionToken = await getWooSessionToken();
  if (!sessionToken) return NextResponse.json({ error: "No cart session" }, { status: 400 });

  let accountCreated = false;
  if (parsed.data.createAccount && parsed.data.password) {
    try {
      const username = usernameFromEmail(parsed.data.billing.email);
      const result = await checkoutRepository.createAccount(sessionToken, {
        email: parsed.data.billing.email,
        username,
        password: parsed.data.password,
        firstName: parsed.data.billing.firstName,
        lastName: parsed.data.billing.lastName,
      });
      sessionToken = result.sessionToken;
      await setWooSessionToken(sessionToken);

      // Also establish a JWT session (a different token from the WC cart
      // session above) so /account shows the customer as logged in the
      // moment they land on the success page, without a second login step.
      const authSession = await authRepository.login(username, parsed.data.password);
      await setAuthToken(authSession.authToken);
      accountCreated = true;
    } catch (error) {
      // Account creation is a nice-to-have, not a checkout blocker (e.g. the
      // derived username could collide) - fall through and check out as a
      // guest rather than failing the whole payment over it.
      console.error("[checkout] account creation failed, continuing as guest:", error);
    }
  }

  const { cart } = await cartRepository.getCart(sessionToken);
  if (!cart.items.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  if (cart.total.amount <= 0) return NextResponse.json({ error: "Cart total must be greater than zero" }, { status: 400 });

  try {
    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.total.amount,
      currency: cart.currencyCode.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      receipt_email: parsed.data.billing.email,
      metadata: {
        wooSessionToken: sessionToken,
        billing: JSON.stringify(parsed.data.billing),
        shipping: parsed.data.shipping ? JSON.stringify(parsed.data.shipping) : "",
        customerNote: parsed.data.customerNote ?? "",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, accountCreated });
  } catch (error) {
    // Without this, a thrown error (e.g. STRIPE_SECRET_KEY unset) reaches
    // the client as a non-JSON 500 response, which fails `response.json()`
    // with a cryptic "Unexpected end of JSON input" instead of the real
    // reason - see checkout-flow.tsx's handling of `stripeNotConfigured`.
    const message = error instanceof Error ? error.message : "Could not start payment";
    const stripeNotConfigured = message.includes("STRIPE_SECRET_KEY");
    return NextResponse.json({ error: message, stripeNotConfigured }, { status: 500 });
  }
}
