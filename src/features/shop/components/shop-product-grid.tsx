import { Grid } from "@/components/ui/grid";
import { ProductCard } from "@/features/product";
import type { Product } from "@/types";

export function ShopProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-(--radius-xl) border border-dashed border-(--color-border) py-20 text-center">
        <p className="font-(family-name:--font-display) text-xl text-(--color-foreground)">No products found</p>
        <p className="text-sm text-(--color-foreground-muted)">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  // 3-up at desktop rather than 4: the catalogue is six products, which fills
  // two clean rows here instead of leaving an orphan on a second row.
  return (
    <Grid cols={{ base: 2, sm: 2, md: 3, lg: 3 }} gap="lg">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          sizes="(min-width: 768px) 33vw, 50vw"
        />
      ))}
    </Grid>
  );
}
