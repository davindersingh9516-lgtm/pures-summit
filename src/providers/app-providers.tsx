import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { MotionProvider } from "./motion-provider";
import { ScrollRestorationProvider } from "./scroll-restoration-provider";
import { AnalyticsProvider } from "./analytics-provider";
import { GTMProvider } from "./gtm-provider";
import {
  AuthProvider,
  CartProvider,
  CompareProvider,
  CookieConsentProvider,
  CurrencyProvider,
  HeaderAppearanceProvider,
  LocaleProvider,
  RegionProvider,
  SearchProvider,
  WishlistProvider,
} from "@/contexts";

/**
 * Single composition root for every client-side provider. `src/app/layout.tsx`
 * renders exactly one of these (wrapped by the server-only `CMSProvider`) -
 * no page or feature component should ever reach for an individual provider
 * directly, keeping the provider tree additive as new global concerns are
 * introduced.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <CurrencyProvider>
          <RegionProvider>
            <AuthProvider>
              <CookieConsentProvider>
                <GTMProvider>
                  <AnalyticsProvider>
                    <MotionProvider>
                      <ScrollRestorationProvider>
                        <CartProvider>
                          <WishlistProvider>
                            <CompareProvider>
                              <HeaderAppearanceProvider>
                                <SearchProvider>
                                  <ToastProvider>{children}</ToastProvider>
                                </SearchProvider>
                              </HeaderAppearanceProvider>
                            </CompareProvider>
                          </WishlistProvider>
                        </CartProvider>
                      </ScrollRestorationProvider>
                    </MotionProvider>
                  </AnalyticsProvider>
                </GTMProvider>
              </CookieConsentProvider>
            </AuthProvider>
          </RegionProvider>
        </CurrencyProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
