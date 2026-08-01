import { AppLink } from "@/components/global/app-link";
import { SectionHeading } from "@/components/global/section-heading";
import { Stagger, StaggerItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { ProductCard } from "@/features/product";
import { getFeaturedProducts } from "@/services";
import type { ProductCarouselSectionData } from "@/types";

/**
 * Product showcase grid - covers both the CMS "Product Carousel" and
 * "Featured Products" homepage block variants. A grid (not a sliding
 * carousel) reads better for the small, fixed counts these sections
 * actually use (4-8 products wrap cleanly into 1-2 rows). Fetches its own
 * products via the homepage service, so the section simply disappears
 * (renders nothing) if the shop has nothing to feature yet.
 */
export async function ProductCarouselSection({ data }: { data: ProductCarouselSectionData }) {
  const products = await getFeaturedProducts(data.limit);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Section spacing="md">
      <Container size="full">
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} subheading={data.subheading} />

        {data.viewAllUrl && (
          <div className="mt-6 flex justify-center">
            <Button asChild variant="outline" size="md">
              <AppLink href={data.viewAllUrl}>View all</AppLink>
            </Button>
          </div>
        )}

        <Stagger className="mt-10">
          <Grid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} gap="lg">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" />
              </StaggerItem>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  );
}
