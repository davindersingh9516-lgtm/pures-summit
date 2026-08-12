import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { AppProviders } from "@/providers/app-providers";
import { CMSProvider } from "@/providers/cms-provider";
import { SiteShell } from "@/features/layout";
import { JsonLd } from "@/lib/seo/json-ld";
import { getSettings } from "@/services";
import { env } from "@/config/env";
import type { SiteSettings } from "@/types";

/**
 * Site-level Organization node - rendered once, sitewide, since it describes
 * the business entity every other page's schema implicitly trusts against
 * (Product/Article/BreadcrumbList nodes reference back to it via @id).
 */
function buildOrganizationJsonLd(settings: SiteSettings) {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;

  return {
    "@context": "https://schema.org" as const,
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: settings.business.legalName || settings.siteName,
        alternateName: settings.siteName,
        url: siteUrl,
        logo: settings.logo.url,
        description: settings.tagline,
        ...(settings.business.foundedYear ? { foundingDate: String(settings.business.foundedYear) } : {}),
        ...(settings.contact.address ? { address: settings.contact.address } : {}),
        ...(settings.contact.email ? { email: settings.contact.email } : {}),
        ...(settings.contact.phone ? { telephone: settings.contact.phone } : {}),
        ...(settings.socialLinks.length > 0 ? { sameAs: settings.socialLinks.map((link) => link.url) } : {}),
      },
    ],
  };
}

// One typeface for the whole site - headings and body both resolve through
// `--font-display`/`--font-body` (kept as two CSS variables so a future
// swap back to a distinct display face only touches this file), plus
// `--font-mono` for numeric/code contexts (SKUs, batch references).
const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Root-level metadata is intentionally minimal and entirely backend-driven
 * (via services/settings.service.ts). Every route below sets its own
 * complete SEO payload through `buildMetadata(seo)` - see
 * lib/seo/build-metadata.ts - which fully overrides these defaults rather
 * than merging with hardcoded copy.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: { default: settings.siteName, template: `%s | ${settings.siteName}` },
    description: settings.tagline,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  return (
    <html lang={settings.defaultLocale} className={`${fontBody.variable} ${fontMono.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLd graph={buildOrganizationJsonLd(settings)} />
        <CMSProvider>
          <AppProviders>
            <SiteShell>{children}</SiteShell>
          </AppProviders>
        </CMSProvider>
      </body>
    </html>
  );
}
