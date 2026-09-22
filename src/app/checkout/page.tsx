import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { createMockSEO } from "@/mocks/seo.mock";
import { CheckoutFlow } from "@/features/checkout/components/checkout-flow";

function getCheckoutSEO() {
  return createMockSEO({
    path: "/checkout",
    title: "Checkout | Pure Summit",
    description: "Complete your order.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getCheckoutSEO());
}

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
