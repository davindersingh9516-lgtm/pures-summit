import { Icon } from "@/components/icons";
import { AppLink } from "@/components/global/app-link";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/features/layout/components/newsletter-form";
import type { NewsletterSignup } from "@/types";

export type BlogCtaBannerProps =
  | { variant: "newsletter"; newsletter: NewsletterSignup }
  | { variant: "shop" };

function NewsletterBanner({ newsletter }: { newsletter: NewsletterSignup }) {
  if (!newsletter.enabled) return null;

  return (
    <div className="rounded-(--radius-xl) border border-(--color-border) bg-(--color-secondary-50) p-8 sm:p-10">
      <div className="flex flex-col gap-5">
        <span className="flex size-10 items-center justify-center rounded-(--radius-full) bg-(--color-secondary-100) text-(--color-secondary)">
          <Icon name="mail" className="size-4" />
        </span>
        <NewsletterForm newsletter={newsletter} />
      </div>
    </div>
  );
}

function ShopBanner() {
  return (
    <div className="relative overflow-hidden rounded-(--radius-xl) bg-(--color-secondary) p-8 text-(--color-neutral-0) sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 100% 100%, transparent 0, transparent 46px, #ffffff 47px, #ffffff 48px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-start gap-3">
        <span className="text-sm font-medium tracking-(--tracking-wider) text-(--color-neutral-0)/70 uppercase">
          Pure Summit Manuka
        </span>
        <h3 className="font-(family-name:--font-display) text-2xl text-(--color-neutral-0) sm:text-3xl">
          Taste the difference verified purity makes
        </h3>
        <p className="max-w-md text-base text-(--color-neutral-0)/85">
          Every jar is independently MGO tested for potency, so what&apos;s on the label is exactly what&apos;s in
          the honey.
        </p>
        <Button asChild size="lg" className="mt-2 bg-(--color-neutral-0) text-(--color-secondary) hover:opacity-90">
          <AppLink href="/shop">Shop the range</AppLink>
        </Button>
      </div>
    </div>
  );
}

export function BlogCtaBanner(props: BlogCtaBannerProps) {
  if (props.variant === "shop") {
    return <ShopBanner />;
  }

  return <NewsletterBanner newsletter={props.newsletter} />;
}
