import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { createMockSEO } from "@/mocks/seo.mock";
import { Container } from "@/components/ui/container";
import { getProducts } from "@/services";
import { siteConfig } from "@/config/site.config";
import { WishlistContent } from "@/features/account/components/wishlist-content";

function getWishlistSEO() {
  return createMockSEO({
    path: "/account/wishlist",
    title: "Your Wishlist | Pure Summit",
    description: "Products you've saved for later.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getWishlistSEO());
}

export default async function WishlistPage() {
  const { nodes: products } = await getProducts({ perPage: siteConfig.pagination.productsPerPage });

  return (
    <Container size="page" className="flex flex-col gap-8 py-16">
      <h1 className="text-3xl font-semibold text-(--color-foreground)">Your Wishlist</h1>
      <WishlistContent products={products} />
    </Container>
  );
}
