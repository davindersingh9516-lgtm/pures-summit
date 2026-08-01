import type { HomepageSection } from "@/types";
import { HeroSection } from "./components/hero-section";
import { MediaTextSection } from "./components/media-text-section";
import { FullWidthBannerSection } from "./components/full-width-banner-section";
import { EditorialStorySection } from "./components/editorial-story-section";
import { ProductCarouselSection } from "./components/product-carousel-section";
import { CategoryCarouselSection } from "./components/category-carousel-section";
import { CollectionGridSection } from "./components/collection-grid-section";
import { TrustIconsSection } from "./components/trust-icons-section";
import { BenefitsGridSection } from "./components/benefits-grid-section";
import { ComparisonTableSection } from "./components/comparison-table-section";
import { VideoSectionResolver } from "./components/video-section";
import { StatisticsSection } from "./components/statistics-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { FAQPreviewSection } from "./components/faq-preview-section";
import { NewsletterSectionResolver } from "./components/newsletter-section";
import { InstagramFeedSection } from "./components/instagram-feed-section";
import { BlogPreviewSection } from "./components/blog-preview-section";
import { CTABannerSection } from "./components/cta-banner-section";
import { FeatureCardsMediaSection } from "./components/feature-cards-media-section";
import { ProductFilterSectionResolver } from "./components/product-filter-section";
import { PurityPromiseSection } from "./components/purity-promise-section";
import { ProcessStepsSection } from "./components/process-steps-section";
import { OriginTraceabilitySection } from "./components/origin-traceability-section";
import { ContactFormSection } from "./components/contact-form-section";
import {
  SpacerSection,
  DividerSection,
  CustomHtmlSection,
  FutureCustomBlockSection,
} from "./components/utility-sections";

/**
 * SECTION RENDERER - the single dispatch point from CMS-authored section
 * order (`HomepageSection[]`) to actual components. Reordering, adding, or
 * removing sections in WordPress never touches this file: it only maps
 * `type` -> component, once, for every possible type. Several `type`
 * literals intentionally share one component (see homepage-sections.types.ts
 * for why) - that's reuse, not a gap.
 */
export function SectionRenderer({ section }: { section: HomepageSection }) {
  switch (section.type) {
    case "hero":
      return <HeroSection data={section} />;

    case "splitHero":
    case "imageLeft":
    case "imageRight":
      return <MediaTextSection data={section} />;

    case "fullWidthBanner":
      return <FullWidthBannerSection data={section} />;

    case "editorialBlock":
    case "storyBlock":
      return <EditorialStorySection data={section} />;

    case "productCarousel":
    case "featuredProducts":
      return <ProductCarouselSection data={section} />;

    case "categoryCarousel":
      return <CategoryCarouselSection data={section} />;

    case "collectionGrid":
      return <CollectionGridSection data={section} />;

    case "trustIcons":
      return <TrustIconsSection data={section} />;

    case "benefitsGrid":
      return <BenefitsGridSection data={section} />;

    case "comparisonTable":
      return <ComparisonTableSection data={section} />;

    case "videoSection":
      return <VideoSectionResolver data={section} />;

    case "statistics":
      return <StatisticsSection data={section} />;

    case "testimonials":
      return <TestimonialsSection data={section} />;

    case "faqPreview":
      return <FAQPreviewSection data={section} />;

    case "newsletter":
      return <NewsletterSectionResolver data={section} />;

    case "instagramFeed":
      return <InstagramFeedSection data={section} />;

    case "blogPreview":
      return <BlogPreviewSection data={section} />;

    case "ctaBanner":
      return <CTABannerSection data={section} />;

    case "featureCardsMedia":
      return <FeatureCardsMediaSection data={section} />;

    case "productFilterGrid":
      return <ProductFilterSectionResolver data={section} />;

    case "purityPromise":
      return <PurityPromiseSection data={section} />;

    case "harvestProcess":
      return <ProcessStepsSection data={section} />;

    case "originTraceability":
      return <OriginTraceabilitySection data={section} />;

    case "contactForm":
      return <ContactFormSection data={section} />;

    case "spacer":
      return <SpacerSection data={section} />;

    case "divider":
      return <DividerSection data={section} />;

    case "customHtml":
      return <CustomHtmlSection data={section} />;

    case "futureCustomBlock":
      return <FutureCustomBlockSection data={section} />;

    default: {
      // Exhaustiveness check - a new HomepageSection member added to the
      // union without a corresponding case here fails the build.
      const _exhaustiveCheck: never = section;
      return null;
    }
  }
}
