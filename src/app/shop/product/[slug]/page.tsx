import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/global/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { getAllProductSlugs, getProduct, getRelatedProducts } from "@/services";
import { ProductDetailsAccordion } from "@/features/product/components/product-details-accordion";
import { ProductFAQSection } from "@/features/product/components/product-faq-section";
import { ProductImageGallery } from "@/features/product/components/product-image-gallery";
import { ProductInfoPanel } from "@/features/product/components/product-info-panel";
import { ProductReviewsSection } from "@/features/product/components/product-reviews-section";
import { RelatedProductsCarousel } from "@/features/product/components/related-products-carousel";
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
