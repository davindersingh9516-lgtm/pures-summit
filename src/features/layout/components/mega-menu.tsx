import Image from "next/image";
import type { MegaMenu as MegaMenuData } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { NavItem } from "@/components/global/nav-item";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";

/**
 * The panel rendered inside `NavigationMenuContent` for a primary nav item
 * that has a `megaMenu` (see `HeaderData.primaryNav[n].megaMenu`). Every
 * column, featured card, and promo block comes straight from the CMS -
 * this component only lays them out.
 */
export function MegaMenu({ menu }: { menu: MegaMenuData }) {
  return (
    <Container size="page" className="py-8">
      <Grid cols={{ base: 1, md: 4 }} gap="lg">
        <div className="col-span-1 md:col-span-2">
          <Grid cols={{ base: 1, sm: 2 }} gap="lg">
            {menu.columns.map((column) => (
              <div key={column.id} className="flex flex-col gap-3">
                {column.title && (
                  <p className="text-xs font-semibold tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                    {column.title}
                  </p>
                )}
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <NavItem item={link} variant="secondary" className="text-sm" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Grid>
        </div>

        {menu.featuredCards.length > 0 && (
          <div className="col-span-1 flex flex-col gap-4 md:col-span-1">
            {menu.featuredCards.map((card) => (
              <AppLink key={card.id} href={card.url} className="group flex items-center gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-(--radius-md) bg-(--color-muted)">
                  <Image src={card.image.url} alt={card.image.altText} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  {card.badge && (
                    <Badge variant="accent" className="w-fit text-[10px]">
                      {card.badge}
                    </Badge>
                  )}
                  <p className="text-sm font-medium text-(--color-foreground) group-hover:text-(--color-primary)">
                    {card.title}
                  </p>
                  {card.description && (
                    <p className="text-xs text-(--color-foreground-muted)">{card.description}</p>
                  )}
                </div>
              </AppLink>
            ))}
          </div>
        )}

        {menu.promo && (
          <AppLink
            href={menu.promo.url}
            className="group relative col-span-1 flex min-h-40 flex-col justify-end overflow-hidden rounded-(--radius-lg) p-5 md:col-span-1"
          >
            <Image
              src={menu.promo.image.url}
              alt={menu.promo.image.altText}
              fill
              sizes="280px"
              className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-editorial) group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-neutral-950)/70 via-transparent to-transparent" />
            <div className="relative flex flex-col gap-0.5 text-(--color-neutral-0)">
              <p className="font-(family-name:--font-display) text-lg">{menu.promo.heading}</p>
              {menu.promo.subheading && <p className="text-sm opacity-90">{menu.promo.subheading}</p>}
            </div>
          </AppLink>
        )}
      </Grid>
    </Container>
  );
}
