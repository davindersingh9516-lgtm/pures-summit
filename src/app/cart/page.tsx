import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { createMockSEO } from "@/mocks/seo.mock";
import { CartPageContent } from "@/features/cart/components/cart-page-content";

function getCartSEO() {
  return createMockSEO({
    path: "/cart",
    title: "Your Cart | Pure Summit",
    description: "Review the items in your cart before checkout.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getCartSEO());
}

export default function CartPage() {
  return <CartPageContent />;
}
