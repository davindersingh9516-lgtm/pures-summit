"use client";

import { Menu, Search } from "lucide-react";
import type { Currency, FooterData, HeaderData, Locale } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { CountrySelector } from "@/components/global/country-selector";
import { CurrencySelector } from "@/components/global/currency-selector";
import { LanguageSelector } from "@/components/global/language-selector";
import { Logo } from "@/components/global/logo";
import { SocialLinks } from "@/components/global/social-links";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchModal } from "@/contexts/search-context";
import { useTranslations } from "@/hooks/use-translations";
import { cn } from "@/lib/utils";

export function MobileNav({
  header,
  footer,
  languages,
  currencies,
  triggerClassName,
}: {
  header: HeaderData;
  footer: FooterData;
  languages: Locale[];
  currencies: Currency[];
  triggerClassName?: string;
}) {
  const t = useTranslations();
  const search = useSearchModal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("openMenu")} className={cn("lg:hidden", triggerClassName)}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
          <SheetClose asChild>
            <Logo image={header.logo} />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4">
          <SheetClose asChild>
            <button
              type="button"
              onClick={search.open}
              className="flex items-center gap-3 rounded-(--radius-md) border border-(--color-border) px-4 py-2.5 text-sm text-(--color-foreground-muted)"
            >
              <Search className="size-4" />
              {t("search")}
            </button>
          </SheetClose>

          <Accordion type="multiple" className="flex flex-col">
            {header.primaryNav.map((item) =>
              item.megaMenu ? (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-base font-medium">{item.label}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 pl-2">
                      {item.megaMenu.columns.map((column) => (
                        <div key={column.id} className="flex flex-col gap-2">
                          {column.title && (
                            <p className="text-xs font-semibold tracking-(--tracking-wider) text-(--color-foreground-muted) uppercase">
                              {column.title}
                            </p>
                          )}
                          {column.links.map((link) => (
                            <SheetClose asChild key={link.id}>
                              <AppLink href={link.url} className="text-sm text-(--color-foreground)">
                                {link.label}
                              </AppLink>
                            </SheetClose>
                          ))}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.id} className="border-b border-(--color-border) py-4">
                  <SheetClose asChild>
                    <AppLink href={item.url} className="text-base font-medium text-(--color-foreground)">
                      {item.label}
                    </AppLink>
                  </SheetClose>
                </div>
              ),
            )}
          </Accordion>

          <div className="flex flex-col gap-3">
            {header.secondaryNav.map((item) => (
              <SheetClose asChild key={item.id}>
                <AppLink href={item.url} className="text-sm text-(--color-foreground-muted)">
                  {item.label}
                </AppLink>
              </SheetClose>
            ))}
            {header.utilityLinks.map((link) => (
              <SheetClose asChild key={link.url}>
                <AppLink href={link.url} className="text-sm text-(--color-foreground-muted)">
                  {link.label}
                </AppLink>
              </SheetClose>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <AppLink href="/account/wishlist" className="text-sm text-(--color-foreground)">
                {t("wishlist")}
              </AppLink>
            </SheetClose>
            <SheetClose asChild>
              <AppLink href="/account" className="text-sm text-(--color-foreground)">
                {t("account")}
              </AppLink>
            </SheetClose>
          </div>

          <Separator />

          <div className="flex flex-wrap items-center gap-4">
            <LanguageSelector languages={languages} />
            <CurrencySelector currencies={currencies} />
            <CountrySelector />
          </div>
        </div>

        <SheetFooter>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {footer.bottomLinks.map((link) => (
              <SheetClose asChild key={link.url}>
                <AppLink href={link.url} className="text-xs text-(--color-foreground-muted)">
                  {link.label}
                </AppLink>
              </SheetClose>
            ))}
          </div>
          <SocialLinks links={footer.socialLinks} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
