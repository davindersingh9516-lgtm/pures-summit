"use client";

import { useMemo, useState } from "react";
import type { Product, ProductFilterSectionData } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { SectionHeading } from "@/components/global/section-heading";
import { Stagger, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";
import { Section } from "@/components/ui/section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/features/product";
import { getFeaturedProducts } from "@/services";

interface ProductFilterSectionProps {
  data: ProductFilterSectionData;
  products: Product[];
}

/**
 * "Shop by Strength" - one product pool, fetched once server-side, filtered
 * client-side by tag prefix as the visitor switches tabs (no re-fetch per
 * tab). `data.tabs[n].tagPrefix === ""` is the "All" tab.
 */
function ProductFilterSection({ data, products }: ProductFilterSectionProps) {
  const [activeTabId, setActiveTabId] = useState(data.tabs[0]?.id);

  const activeTab = data.tabs.find((tab) => tab.id === activeTabId) ?? data.tabs[0];

  const filteredProducts = useMemo(() => {
    if (!activeTab || activeTab.tagPrefix === "") return products.slice(0, data.limit);
    return products.filter((product) => product.tags.some((tag) => tag.startsWith(activeTab.tagPrefix))).slice(0, data.limit);
  }, [products, activeTab, data.limit]);

  return (
    <Section spacing="md">
      <Container size="full">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} subheading={data.subheading} />

        <div className="mt-8 flex justify-center">
          <Tabs value={activeTabId} onValueChange={setActiveTabId}>
            <TabsList className="h-auto flex-wrap gap-1 bg-(--color-muted) p-1.5">
              {data.tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="min-h-10 px-4">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredProducts.length > 0 ? (
          <Stagger className="mt-10">
            <Grid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} gap="lg">
              {filteredProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
                </StaggerItem>
              ))}
            </Grid>
          </Stagger>
        ) : (
          <p className="mt-10 text-center text-(--color-foreground-muted)">Nothing in this grade yet.</p>
        )}

        {data.viewAllUrl && (
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="md">
              <AppLink href={data.viewAllUrl}>View all</AppLink>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

/** Server-side data wrapper - fetches the shared product pool once and
 * hands it to the client-side tab filter above. */
export async function ProductFilterSectionResolver({ data }: { data: ProductFilterSectionData }) {
  const products = await getFeaturedProducts(20);

  if (!products || products.length === 0) return null;

  return <ProductFilterSection data={data} products={products} />;
}
