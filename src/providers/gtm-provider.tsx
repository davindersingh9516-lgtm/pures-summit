"use client";

import Script from "next/script";
import type { ReactNode } from "react";
import { env } from "@/config/env";
import { useCookieConsent } from "@/contexts/cookie-consent-context";

/**
 * FUTURE GTM ARCHITECTURE
 * ---------------------------------------------------------------------------
 * Injects the Google Tag Manager container script + noscript iframe only
 * when `NEXT_PUBLIC_GTM_ID` is configured. Distinct from `AnalyticsProvider`
 * (the generic `track()` abstraction) - this component's only job is
 * loading GTM itself so `window.dataLayer` exists for it to consume.
 */
export function GTMScripts() {
  const gtmId = env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

/**
 * Gate around `GTMScripts` respecting cookie consent. Client Component
 * because it reads `useCookieConsent()`; the actual `<Script>` tags render
 * fine from inside a client boundary in the App Router.
 */
export function GTMProvider({ children }: { children: ReactNode }) {
  const { status } = useCookieConsent();

  return (
    <>
      {status === "accepted" ? <GTMScripts /> : null}
      {children}
    </>
  );
}
