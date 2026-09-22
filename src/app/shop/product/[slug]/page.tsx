import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { getAllProductSlugs, getProduct, getRelatedProducts } from "@/services";
import { ProductBuyerPersonas } from "@/features/product/components/product-buyer-personas";
import { ProductDetailsAccordion } from "@/features/product/components/product-details-accordion";
import { ProductFAQSection } from "@/features/product/components/product-faq-section";
import { ProductHighlights } from "@/features/product/components/product-highlights";
import { ProductImageGallery } from "@/features/product/components/product-image-gallery";
import { ProductInfoPanel } from "@/features/product/components/product-info-panel";
import { ProductReviewsSection } from "@/features/product/components/product-reviews-section";
import { ProductSafetyInfo } from "@/features/product/components/product-safety-info";
import { ProductSpecTable } from "@/features/product/components/product-spec-table";
import { RelatedProductsCarousel } from "@/features/product/components/related-products-carousel";
import { RelatedSearchChips } from "@/features/product/components/related-search-chips";
import type { BreadcrumbItem } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return buildMetadata(product.seo);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);
  const primaryCategory = product.categories[0];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", url: "/" },
    { label: "Shop", url: "/shop" },
    ...(primaryCategory ? [{ label: primaryCategory.name, url: `/shop/category/${primaryCategory.slug}` }] : []),
    { label: product.name },
  ];

  return (
    <>
      <JsonLd graph={product.seo.jsonLd} />

      <Section spacing="sm" className="border-b border-(--color-border)">
        <Container size="full">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductImageGallery images={product.images} productName={product.name} />
            <ProductInfoPanel product={product} />
          </div>

          <div className="mt-16">
            <ProductDetailsAccordion product={product} />
          </div>

          {product.specifications && product.specifications.length > 0 ? (
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <ProductSpecTable specifications={product.specifications} />
              <div className="relative hidden aspect-4/3 w-full overflow-hidden rounded-(--radius-xl) bg-(--color-muted) lg:block">
                <Image
                  src={(product.images[1] ?? product.images[0]).url}
                  alt={(product.images[1] ?? product.images[0]).altText}
                  fill
                  sizes="45vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}

          <div className="mt-10">
            <RelatedSearchChips product={product} />
          </div>
        </Container>
      </Section>

      <Separator />

      <Section spacing="md">
        <Container size="full">
          <ProductHighlights />
        </Container>
      </Section>

      <Section spacing="md" className="bg-(--color-secondary-50)">
        <Container size="full">
          <ProductBuyerPersonas product={product} />
        </Container>
      </Section>

      <Separator />

      <Section spacing="md">
        <Container size="full">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProductReviewsSection product={product} />
          </Suspense>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="full" className="max-w-3xl">
          <ProductSafetyInfo />
        </Container>
      </Section>

      <Section spacing="md" className="bg-(--color-secondary-50)">
        <Container size="full">
          <Suspense fallback={<Skeleton className="mx-auto h-64 w-full max-w-2xl" />}>
            <ProductFAQSection />
          </Suspense>
        </Container>
      </Section>

      {relatedProducts.length > 0 ? (
        <Section spacing="md">
          <Container size="full">
            <RelatedProductsCarousel products={relatedProducts} />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
