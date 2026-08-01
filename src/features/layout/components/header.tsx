"use client";

import { Heart, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import type { Currency, FooterData, HeaderData, Locale } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { Logo } from "@/components/global/logo";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCart } from "@/contexts/cart-context";
import { useHeaderAppearance } from "@/contexts/header-appearance-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useTranslations } from "@/hooks/use-translations";
import { duration, easing } from "@/styles/tokens/motion";
import { cn } from "@/lib/utils";
import { SearchTrigger } from "@/features/search/components/search-trigger";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function Header({
  header,
  footer,
  languages,
  currencies,
}: {
  header: HeaderData;
  footer: FooterData;
  languages: Locale[];
  currencies: Currency[];
}) {
  const t = useTranslations();
  const { direction, isAtTop } = useScrollDirection(40);
  const { transparentOverHero } = useHeaderAppearance();
  const { itemCount: cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const isTransparent = transparentOverHero && isAtTop;
  const isHidden = direction === "down" && !isAtTop;
  // While a page's hero is mounted (TransparentHeroBoundary), the header must
  // be taken out of document flow entirely so the hero's full-viewport video
  // runs behind it instead of being pushed down by the header's own height.
  const iconColorClassName = isTransparent
    ? "text-(--color-neutral-0) hover:bg-(--color-neutral-0)/15 hover:text-(--color-neutral-0)"
    : undefined;

  return (
    <motion.header
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: duration.normal, ease: easing.standard }}
      className={cn(
        "top-0 z-(--z-index-header) w-full transition-colors duration-(--duration-normal)",
        transparentOverHero ? "fixed inset-x-0" : "sticky",
        isTransparent
          ? "bg-transparent text-(--color-neutral-0)"
          : "border-b border-(--color-border) bg-(--color-surface-raised)/90 text-(--color-foreground) backdrop-blur-md",
      )}
    >
      <Container size="full" className="flex h-18 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-22">
        <MobileNav header={header} footer={footer} languages={languages} currencies={currencies} triggerClassName={iconColorClassName} />

        <Logo image={isTransparent && header.logoDark ? header.logoDark : header.logo} priority className="lg:mr-4" />

        <div className="hidden lg:flex lg:flex-1">
          <DesktopNav items={header.primaryNav} transparent={isTransparent} />
        </div>

        <div className="flex items-center gap-1">
          {header.utilityLinks.map((link) => (
            <AppLink
              key={link.url}
              href={link.url}
              className={cn(
                "mr-2 hidden text-sm font-medium transition-colors lg:inline-flex",
                isTransparent
                  ? "text-(--color-neutral-0)/90 hover:text-(--color-neutral-0)"
                  : "text-(--color-foreground-muted) hover:text-(--color-foreground)",
              )}
            >
              {link.label}
            </AppLink>
          ))}
          <SearchTrigger className={iconColorClassName} />
          <ThemeToggle className={cn("hidden sm:inline-flex", iconColorClassName)} />
          <Button variant="ghost" size="icon" aria-label={t("wishlist")} asChild className={cn("relative hidden sm:inline-flex", iconColorClassName)}>
            <AppLink href="/account/wishlist">
              <Heart className="size-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-(--radius-full) bg-(--color-primary) px-0.5 text-[10px] text-(--color-primary-foreground)">
                  {wishlistItems.length}
                </span>
              )}
            </AppLink>
          </Button>
          <Button variant="ghost" size="icon" aria-label={t("account")} asChild className={cn("hidden sm:inline-flex", iconColorClassName)}>
            <AppLink href="/account">
              <User className="size-5" />
            </AppLink>
          </Button>
          <Button variant="ghost" size="icon" aria-label={t("cart")} asChild className={cn("relative", iconColorClassName)}>
            <AppLink href="/cart">
              <ShoppingBag className="size-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-(--radius-full) bg-(--color-primary) px-0.5 text-[10px] text-(--color-primary-foreground)">
                  {cartCount}
                </span>
              )}
            </AppLink>
          </Button>
          {header.cta && (
            <Button asChild size="sm" className="ml-2 hidden lg:inline-flex">
              <AppLink href={header.cta.url}>{header.cta.label}</AppLink>
            </Button>
          )}
        </div>
      </Container>
    </motion.header>
  );
}
