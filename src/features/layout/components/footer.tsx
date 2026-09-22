import Image from "next/image";
import type { Currency, FooterData, Locale } from "@/types";
import { AppLink } from "@/components/global/app-link";
import { CountrySelector } from "@/components/global/country-selector";
import { CurrencySelector } from "@/components/global/currency-selector";
import { LanguageSelector } from "@/components/global/language-selector";
import { Logo } from "@/components/global/logo";
import { SocialLinks } from "@/components/global/social-links";
import { Icon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { FooterColumn } from "./footer-column";
import { NewsletterForm } from "./newsletter-form";
import { SiteCredit } from "./site-credit";

export function Footer({
  footer,
  logo,
  languages,
  currencies,
}: {
  footer: FooterData;
  logo: { id: string; url: string; altText: string };
  languages: Locale[];
  currencies: Currency[];
}) {
  const hasContactBlock = Boolean(footer.contactEmail || footer.contactPhone || footer.contactHours);

  return (
    <footer data-theme="dark" className="bg-(--color-background)">
      <div className="h-px bg-gradient-to-r from-transparent via-(--color-brand-400) to-transparent" />

      <Container size="full" className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-10 lg:py-20">
        <div className="col-span-2 flex flex-col gap-5 sm:col-span-3 lg:col-span-2">
          <Logo image={logo} />
          {footer.tagline ? (
            <p className="max-w-xs text-sm leading-relaxed text-(--color-foreground-muted)">{footer.tagline}</p>
          ) : null}
          <SocialLinks links={footer.socialLinks} />
        </div>

        {footer.columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-4">
            {column.id === "footer-support" && hasContactBlock ? (
              <div className="flex flex-col gap-2 border-b border-(--color-border) pb-5">
                <p className="text-xs font-medium tracking-(--tracking-wider) text-(--color-foreground-muted)/70 uppercase">
                  Customer Care
                </p>
                {footer.contactEmail ? (
                  <a
                    href={`mailto:${footer.contactEmail}`}
                    className="flex items-center gap-2 text-sm text-(--color-foreground) transition-colors duration-(--duration-fast) hover:text-(--color-brand-400)"
                  >
                    <Icon name="mail" className="size-3.5 shrink-0 text-(--color-foreground-muted)" />
                    {footer.contactEmail}
                  </a>
                ) : null}
                {footer.contactPhone ? (
                  <a
                    href={`tel:${footer.contactPhone}`}
                    className="flex items-center gap-2 text-sm text-(--color-foreground) transition-colors duration-(--duration-fast) hover:text-(--color-brand-400)"
                  >
                    <Icon name="phone" className="size-3.5 shrink-0 text-(--color-foreground-muted)" />
                    {footer.contactPhone}
                  </a>
                ) : null}
                {footer.contactHours ? (
                  <p className="flex items-center gap-2 text-sm text-(--color-foreground-muted)">
                    <Icon name="clock" className="size-3.5 shrink-0" />
                    {footer.contactHours}
                  </p>
                ) : null}
              </div>
            ) : null}
            <FooterColumn column={column} />
          </div>
        ))}
      </Container>

      <Separator />

      <div className="bg-(--color-surface)">
        <Container size="full" className="py-10 lg:py-12">
          <div className="mx-auto max-w-lg rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface-raised) p-6 lg:mx-0 lg:p-8">
            <NewsletterForm newsletter={footer.newsletter} />
          </div>
        </Container>
      </div>

      {footer.certifications.length > 0 ? (
        <>
          <Separator />
          <Container size="full" className="flex flex-wrap items-center gap-x-10 gap-y-5 py-8">
            {footer.certifications.map((cert) => (
              <div key={cert.id} className="flex items-center gap-3">
                <div className="flex h-12 w-auto items-center rounded-(--radius-md) bg-(--color-neutral-0) px-3 py-2">
                  <Image
                    src={cert.image.url}
                    alt={cert.image.altText}
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-(--color-foreground)">{cert.name}</span>
                  {cert.caption ? (
                    <span className="text-xs text-(--color-foreground-muted)">{cert.caption}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </Container>
        </>
      ) : null}

      {footer.paymentIcons.length > 0 || footer.shippingIcons.length > 0 ? (
        <>
          <Separator />
          <Container size="full" className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            {footer.paymentIcons.length > 0 ? (
              <div className="flex items-center gap-3">
                {footer.paymentIcons.map((icon) => (
                  <div key={icon.id} className="flex h-7 items-center rounded-(--radius-sm) bg-(--color-neutral-0) px-2 py-1">
                    <Image
                      src={icon.image.url}
                      alt={icon.image.altText}
                      width={60}
                      height={20}
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {footer.shippingIcons.length > 0 ? (
              <div className="flex items-center gap-3">
                {footer.shippingIcons.map((icon) => (
                  <div key={icon.id} className="flex h-7 items-center rounded-(--radius-sm) bg-(--color-neutral-0) px-2 py-1">
                    <Image
                      src={icon.image.url}
                      alt={icon.image.altText}
                      width={60}
                      height={20}
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </Container>
        </>
      ) : null}

      <Separator />

      <Container size="full" className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-(--color-foreground-muted)">{footer.copyrightText}</p>

        <div className="flex flex-wrap items-center gap-4">
          {footer.bottomLinks.map((link) => (
            <AppLink
              key={link.url}
              href={link.url}
              className="text-xs text-(--color-foreground-muted) transition-colors hover:text-(--color-foreground)"
            >
              {link.label}
            </AppLink>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
          <LanguageSelector languages={languages} />
          <CurrencySelector currencies={currencies} />
          <CountrySelector />
        </div>
      </Container>

      <Separator />

      <Container size="full" className="flex justify-center py-4">
        <SiteCredit />
      </Container>
    </footer>
  );
}
