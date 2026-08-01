import { FadeIn } from "@/components/animations";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/grid";
import { getStatistics } from "@/services";
import type { StatisticsSectionData } from "@/types";

/**
 * Brand credibility numbers (years of heritage, hives, MGO tested, customers
 * served, ...). Fetches its own statistics via the homepage service, so the
 * section simply disappears (renders nothing) if there are none to show.
 */
export async function StatisticsSection({ data }: { data: StatisticsSectionData }) {
  const statistics = await getStatistics();

  if (!statistics || statistics.length === 0) {
    return null;
  }

  return (
    <Section spacing="md">
      <Container>
        {data.eyebrow || data.heading ? (
          <FadeIn>
            <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
              {data.eyebrow ? (
                <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                  {data.eyebrow}
                </span>
              ) : null}
              {data.heading ? (
                <h2 className="font-(family-name:--font-display) text-3xl text-(--color-foreground) sm:text-4xl">
                  {data.heading}
                </h2>
              ) : null}
            </div>
          </FadeIn>
        ) : null}

        <FadeIn>
          <Grid cols={{ base: 2, md: 4 }} gap="lg">
            {statistics.map((statistic) => (
              <div key={statistic.id} className="flex flex-col items-center gap-2 text-center">
                <span className="font-(family-name:--font-display) text-4xl text-(--color-primary) sm:text-5xl">
                  {`${statistic.prefix ?? ""}${statistic.value}${statistic.suffix ?? ""}`}
                </span>
                <span className="text-xs font-medium tracking-(--tracking-wide) text-(--color-foreground-muted) uppercase">
                  {statistic.label}
                </span>
              </div>
            ))}
          </Grid>
        </FadeIn>
      </Container>
    </Section>
  );
}
