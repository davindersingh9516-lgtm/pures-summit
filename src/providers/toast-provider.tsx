import { Toaster } from "@/components/ui/toaster";

/**
 * Thin provider wrapper so `app-providers.tsx` can compose this alongside
 * every other context provider uniformly, even though `Toaster` manages its
 * own state via `hooks/use-toast.ts` rather than React context.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
