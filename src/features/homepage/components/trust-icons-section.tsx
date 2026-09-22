import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem } from "@/components/animations";
import { getTrustBadges } from "@/services";
import { cn } from "@/lib/utils";
import type { TrustIconsSectionData } from "@/types";

/**
 * Trust & quality badges - a single full-width row of certifications,
 * guarantees, and shipping promises. Fetches its own badges via the
 * homepage service, so the section simply disappears (renders nothing) if
 * there are none to show. The first badge's icon uses the brand's mountain
 * green (matching the logo mark) rather than the shared accent color.
 */
export async function TrustIconsSection({ data: _data }: { data: TrustIconsSectionData }) {
  const badges = await getTrustBadges();

  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <Section spacing="sm" className="border-t border-(--color-border) bg-(--color-surface)">
      <Container size="full">
        <Stagger>
          <div className="flex flex-nowrap items-start justify-between gap-8 overflow-x-auto overflow-y-hidden py-1">
            {badges.map((badge, index) => (
              <StaggerItem key={badge.id} className="min-w-[9rem] shrink-0">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-(--radius-full)",
                      index === 0 ? "bg-(--color-secondary)" : "bg-(--color-accent)",
                    )}
                  >
                    <Icon
                      name={badge.icon}
                      className={cn("size-6", index === 0 ? "text-white" : "text-(--color-accent-foreground)")}
                    />
                  </span>
                  <span className="text-lg leading-tight font-semibold text-(--color-foreground)">{badge.label}</span>
                  {badge.description ? (
                    <span className="text-base leading-tight text-(--color-foreground-muted)">{badge.description}</span>
                  ) : null}
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
