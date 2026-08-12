import Image from "next/image";
import { AppLink } from "@/components/global/app-link";
import { Button } from "@/components/ui/button";

export function BlogSidebarCta() {
  return (
    <div className="flex flex-col overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface-raised)">
      <div className="relative aspect-[4/3] w-full bg-(--color-muted)">
        <Image
          src="/mocks/product-jar.png"
          alt="A jar of Pure Summit Manuka honey"
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-base font-(family-name:--font-display) text-(--color-foreground)">
          Shop the Manuka range
        </h3>
        <p className="text-sm text-(--color-foreground-muted)">
          UMF and MGO tested jars, harvested and packed in New Zealand.
        </p>
        <Button asChild size="sm" className="mt-2 w-full">
          <AppLink href="/shop">Browse jars</AppLink>
        </Button>
      </div>
    </div>
  );
}
