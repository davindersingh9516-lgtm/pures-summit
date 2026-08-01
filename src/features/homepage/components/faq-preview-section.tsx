import type { FAQPreviewSectionData } from "@/types";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/animations";
import { getFAQPreview } from "@/services";
import { FAQCategoryFilter } from "./faq-category-filter";

/**
 * Homepage FAQ teaser - fetches its own questions via the homepage service
 * (server-side), then hands them to the client-side category filter below.
 * Disappears entirely once there's nothing to show.
 */
export async function FAQPreviewSection({ data }: { data: FAQPreviewSectionData }) {
  const faqs = await getFAQPreview(data.limit ?? 8);

  if (!faqs || faqs.length === 0) return null;

  return (
    <Section spacing="md">
      <Container size="full">
        <FadeIn className="text-center">
          <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
            {data.heading}
          </h2>
          {data.subheading && <p className="mt-3 text-base text-(--color-foreground-muted)">{data.subheading}</p>}
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <FAQCategoryFilter faqs={faqs} data={data} />
        </FadeIn>
      </Container>
    </Section>
  );
}
