import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-level loading boundary (App Router convention) - Next.js
 * automatically wraps this segment's content in a `<Suspense>` with this as
 * the fallback while server data resolves.
 */
export default function Loading() {
  return (
    <Container className="flex flex-1 flex-col gap-6 py-16">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-48 w-full" />
        ))}
      </div>
    </Container>
  );
}
