"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Segment-level error boundary (App Router convention). Catches render
 * errors anywhere in this route segment and below without taking down the
 * whole app - the root layout (header/footer/announcement bar) keeps
 * rendering around this.
 */
export default function SegmentError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm tracking-(--tracking-widest) text-(--color-foreground-muted) uppercase">
        Something went wrong
      </p>
      <h1 className="font-(family-name:--font-display) text-3xl text-(--color-foreground)">
        We hit a snag loading this page
      </h1>
      <p className="max-w-prose text-(--color-foreground-muted)">
        Please try again. If the problem persists, it&rsquo;s on our end, not yours.
      </p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}
