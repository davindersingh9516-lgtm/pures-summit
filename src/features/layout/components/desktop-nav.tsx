"use client";

import type { PrimaryNavItem } from "@/types";
import { AppLink } from "@/components/global/app-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./mega-menu";

/**
 * Enterprise mega-menu navigation. Built on Radix's NavigationMenu (not a
 * hand-rolled hover/focus implementation) so keyboard navigation, focus
 * management, and hover-intent timing are handled by a battle-tested
 * accessibility primitive rather than reimplemented here.
 */
export function DesktopNav({ items, transparent = false }: { items: PrimaryNavItem[]; transparent?: boolean }) {
  // The mega-menu panel itself renders on its own opaque surface, but the
  // TRIGGER button stays put in the nav row - still over the transparent
  // header's dark hero background even while its panel is open - so the
  // trigger's text must stay light in every state, not just at rest.
  const transparentTriggerClassName =
    "text-(--color-neutral-0) hover:text-(--color-neutral-0) data-[state=open]:text-(--color-neutral-0)";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) =>
          item.megaMenu ? (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className={cn(transparent && transparentTriggerClassName)}>
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenu menu={item.megaMenu} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle, transparent && transparentTriggerClassName)}
              >
                <AppLink href={item.url}>{item.label}</AppLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
