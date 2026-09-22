import { FadeIn } from "@/components/animations";
import { SectionHeading } from "@/components/global/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { ComparisonTableSectionData } from "@/types";

/**
 * Feature-comparison matrix (e.g. MGO grade bands side-by-side). Purely
 * presentational - every cell comes straight from `data.rows`/`data.columns`,
 * aligned by index. A `highlight` column gets the classic "recommended
 * plan" treatment: a raised card, accent border, and a pill above its
 * header.
 */
export function ComparisonTableSection({ data }: { data: ComparisonTableSectionData }) {
  return (
    <Section spacing="md">
      <Container size="full">
        <SectionHeading heading={data.heading} subheading={data.subheading} />

        <FadeIn className="mt-12">
          <div className="mx-auto max-w-4xl overflow-x-auto rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) shadow-(--shadow-elevation-2)">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">{data.heading}</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-b border-(--color-border) p-6 text-left">
                    <span className="sr-only">Feature</span>
                  </th>
                  {data.columns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={cn(
                        "relative border-b border-(--color-border) p-6 text-center",
                        column.highlight && "bg-(--color-accent)/25",
                      )}
                    >
                      {column.highlight && (
                        <span className="absolute top-2 left-1/2 inline-flex -translate-x-1/2 items-center rounded-(--radius-full) bg-(--color-primary) px-3 py-0.5 text-xs font-semibold tracking-(--tracking-wide) text-(--color-primary-foreground) uppercase">
                          Recommended
                        </span>
                      )}
                      <span
                        className={cn(
                          "block text-lg font-semibold text-(--color-foreground)",
                          column.highlight && "pt-4",
                        )}
                      >
                        {column.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.id} className="border-b border-(--color-border) last:border-b-0">
                    <th scope="row" className="p-6 text-left text-base font-medium text-(--color-foreground)">
                      {row.label}
                    </th>
                    {data.columns.map((column, index) => {
                      const value = row.values[index];
                      return (
                        <td
                          key={column.id}
                          className={cn(
                            "p-6 text-center text-base text-(--color-foreground-muted)",
                            column.highlight && "bg-(--color-accent)/10",
                          )}
                        >
                          {typeof value === "boolean" ? (
                            <span
                              className={cn(
                                "mx-auto flex size-8 items-center justify-center rounded-(--radius-full)",
                                value
                                  ? "bg-(--color-primary)/15 text-(--color-primary)"
                                  : "bg-(--color-muted) text-(--color-foreground-muted)",
                              )}
                            >
                              <Icon name={value ? "check" : "x"} className="size-4" aria-label={value ? "Yes" : "No"} />
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
