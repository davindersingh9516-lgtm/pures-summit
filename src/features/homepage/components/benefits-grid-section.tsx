import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import type { BenefitsGridSectionData } from "@/types";

/**
 * Static "why choose us" benefits grid - a small set of value propositions
 * (purity, traceability, sustainability, ...) each with an icon, title, and
 * supporting copy, all authored directly on the section (no fetching).
 */
export function BenefitsGridSection({ data }: { data: BenefitsGridSectionData }) {
  return (
    <Section spacing="md">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            {data.eyebrow ? (
              <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                {data.eyebrow}
              </span>
            ) : null}
            <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
              {data.heading}
            </h2>
            {data.subheading ? (
              <p className="text-base leading-relaxed text-(--color-foreground-muted)">{data.subheading}</p>
            ) : null}
          </div>
        </FadeIn>

        <Stagger className="mt-10">
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
            {data.benefits.map((benefit) => (
              <StaggerItem key={benefit.id}>
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex size-12 items-center justify-center rounded-(--radius-full) bg-(--color-muted)">
                      <Icon name={benefit.icon} className="size-5 text-(--color-primary)" />
                    </div>
                    <h3 className="font-medium text-(--color-foreground)">{benefit.title}</h3>
                    <p className="text-sm text-(--color-foreground-muted)">{benefit.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  );
}
