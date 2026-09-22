"use client";

import type { Product } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/product";
import { useWishlist } from "@/contexts/wishlist-context";
import { ROUTES } from "@/constants/routes.constants";

/** Wishlist only stores `{ productId, addedAt }` in localStorage (see
 * contexts/wishlist-context.tsx) - this filters the full product list the
 * server already fetched down to whatever's actually wishlisted, rather
 * than adding a second "get products by id" repository method for a
 * catalog this small. */
export function WishlistContent({ products }: { products: Product[] }) {
  const { items, isHydrated } = useWishlist();

  if (!isHydrated) return null;

  const wishlisted = products.filter((product) => items.some((item) => item.productId === product.id));

  if (wishlisted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-(--color-foreground-muted)">Your wishlist is empty.</p>
        <Button asChild size="lg">
          <AppLink href={ROUTES.productList()}>Shop All</AppLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {wishlisted.map((product) => (
        <ProductCard key={product.id} product={product} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
      ))}
    </div>
  );
}
