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
  // The mega-menu panel itself always renders on its own opaque surface, so
  // its trigger's OPEN state keeps the default (opaque-header) text color
  // even while the header is transparent - only the resting/closed state
  // needs to flip to light-on-dark.
  const transparentTriggerClassName =
    "text-(--color-neutral-0) hover:text-(--color-neutral-0) data-[state=open]:text-(--color-foreground)";

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
