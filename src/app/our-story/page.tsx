import type { Metadata } from "next";
import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { env } from "@/config/env";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/json-ld";
import { createMockSEO } from "@/mocks/seo.mock";
import { ROUTES } from "@/constants/routes.constants";

function getOurStorySEO() {
  return createMockSEO({
    path: ROUTES.ourStory(),
    title: "Our Story | Pure Summit",
    description:
      "Everyone has a summit to reach. The mission, mission and grading standards, and traceability behind Pure Summit's raw New Zealand Manuka honey.",
    type: "article",
    image: { id: "our-story-og", url: "/mocks/hero-1.webp", altText: "A jar of Pure Summit Manuka honey at golden hour" },
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getOurStorySEO());
}

function buildAboutPageJsonLd() {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const url = `${siteUrl}${ROUTES.ourStory()}`;

  return {
    "@context": "https://schema.org" as const,
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#aboutpage`,
        url,
        name: "Our Story | Pure Summit",
        about: { "@id": `${siteUrl}#organization` },
      },
    ],
  };
}

const PILLARS = [
  {
    icon: "badge-check" as const,
    eyebrow: "Grading",
    title: "UMF & MGO, explained honestly",
    description:
      "Every jar carries both its UMF grade and the underlying MGO reading - not just a number on a label, but a claim you can independently check against the UMF Honey Association's public register.",
    href: "/blog/complete-guide-to-manuka-honey-grades-and-verification",
    linkLabel: "Read the grading guide",
  },
  {
    icon: "shopping-bag" as const,
    eyebrow: "Products",
    title: "A small, deliberate range",
    description:
      "We'd rather offer a handful of grades we stand fully behind than a shelf full of options. Every jar is raw, cold-extracted, and single-origin from Northland apiary partners we know by name.",
    href: "/shop",
    linkLabel: "Shop the range",
  },
  {
    icon: "map-pin" as const,
    eyebrow: "Traceability",
    title: "Every batch, checkable",
    description:
      "A batch code on the jar ties back to a harvest region, a test date, and an independent lab report - not just a marketing claim, but a record you can look up yourself.",
    href: "/lab-reports",
    linkLabel: "See lab reports",
  },
  {
    icon: "book-open" as const,
    eyebrow: "Education",
    title: "Learn before you buy",
    description:
      "How grading works, what a Certificate of Analysis actually says, how a harvest season runs from hive to jar - written plainly, by the people who do the sourcing.",
    href: "/blog",
    linkLabel: "Visit the Journal",
  },
];

export default async function OurStoryPage() {
  return (
    <>
      <JsonLd graph={buildAboutPageJsonLd()} />

      {/* Hero */}
      <Section spacing="lg" className="relative overflow-hidden bg-[#12291d] text-(--color-neutral-0)">
        <div className="absolute inset-0">
          <video
            className="size-full object-cover opacity-40"
            src="/media/our-story-hero.mp4"
            poster="/mocks/hero-1.webp"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            tabIndex={-1}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 15% 85%, transparent 0, transparent 46px, #ffffff 47px, #ffffff 48px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12291d] via-[#12291d]/70 to-[#12291d]/30" />
        </div>

        <Container className="relative flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <span className="flex size-14 items-center justify-center rounded-(--radius-full) border border-(--color-neutral-0)/25 text-(--color-neutral-0)">
            <Icon name="mountain" className="size-6" />
          </span>
          <h1 className="max-w-3xl font-(family-name:--font-display) text-4xl leading-tight sm:text-6xl">
            Everyone has a summit to reach.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-(--color-neutral-0)/85">
            At Pure Summit, we believe every person is climbing their own mountain. Our mission is to provide premium
            New Zealand products that support healthier choices and encourage people to keep moving toward their
            goals - one step at a time.
          </p>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section spacing="md">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Our Mission
            </span>
            <h2 className="font-(family-name:--font-display) text-2xl text-(--color-foreground) sm:text-3xl">
              Support the climb, not just the sale
            </h2>
            <p className="text-base leading-relaxed text-(--color-foreground-muted)">
              We provide premium New Zealand Manuka honey, harvested and lab-verified without shortcuts, so that
              choosing something better for yourself is one less thing to think about on the days you need to keep
              going.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              Our Vision
            </span>
            <h2 className="font-(family-name:--font-display) text-2xl text-(--color-foreground) sm:text-3xl">
              A daily reminder to keep moving
            </h2>
            <p className="text-base leading-relaxed text-(--color-foreground-muted)">
              A world where a small, honest ritual - a spoonful, a cup of tea, a jar on the counter - quietly stays
              part of people&apos;s routines through whatever mountain they&apos;re climbing that year.
            </p>
          </div>
        </Container>
      </Section>

      {/* Pillars: UMF / Products / Traceability / Education */}
      <Section spacing="md" className="border-y border-(--color-border) bg-(--color-secondary-50)">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              What We Stand On
            </span>
            <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              The same standards the best honey brands are built on
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col gap-4 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-8"
              >
                <span className="flex size-11 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-100) text-[#12291d]">
                  <Icon name={pillar.icon} className="size-5" />
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                    {pillar.eyebrow}
                  </span>
                  <h3 className="font-(family-name:--font-display) text-xl text-(--color-foreground)">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-foreground-muted)">{pillar.description}</p>
                </div>
                <AppLink
                  href={pillar.href}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#12291d] hover:underline"
                >
                  {pillar.linkLabel}
                  <Icon name="arrow-right" className="size-4" />
                </AppLink>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founder note */}
      <Section spacing="md">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-(--radius-xl) bg-(--color-muted)">
            <Image
              src="/mocks/why-manuka-poster.png"
              alt="A jar of Pure Summit Manuka honey surrounded by Manuka flowers in bloom"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
              From the Founder
            </span>
            <h2 className="font-(family-name:--font-display) text-2xl text-(--color-foreground) sm:text-3xl">
              Why we test everything twice
            </h2>
            <p className="text-base leading-relaxed text-(--color-foreground-muted)">
              I started Pure Summit because the manuka honey category had a trust problem - and a jar of honey has no
              business making a claim it can&apos;t back up. Every batch we sell is tested by an independent lab before
              we print a number on the label, and every jar carries a code you can trace back to that exact harvest.
              That&apos;s not a promise. It&apos;s a paper trail.
            </p>
            <AppLink
              href={ROUTES.blogAuthor("davinder-singh")}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#12291d] hover:underline"
            >
              Read more from Davinder Singh
              <Icon name="arrow-right" className="size-4" />
            </AppLink>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="md" className="border-t border-(--color-border) bg-(--color-secondary-50)">
        <Container className="flex flex-col items-center gap-5 py-4 text-center">
          <h2 className="max-w-xl font-(family-name:--font-display) text-2xl text-(--color-foreground) sm:text-3xl">
            Whatever summit you&apos;re climbing, we&apos;d like to be part of it.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <AppLink href="/shop">Shop the range</AppLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <AppLink href="/blog">Visit the Journal</AppLink>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
