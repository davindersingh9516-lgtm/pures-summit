"use client";

import { useEffect } from "react";

/**
 * Root-level error boundary. Only triggers when an error escapes the root
 * layout itself (providers, fonts, etc.) - segment errors are caught by
 * `app/error.tsx` first. Must render its own <html>/<body> since it
 * replaces the entire root layout when active.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center text-zinc-900">
        <p className="text-sm tracking-widest text-zinc-500 uppercase">Critical error</p>
        <h1 className="text-3xl font-semibold">The application failed to load</h1>
        <p className="max-w-prose text-zinc-600">Please refresh the page. If this keeps happening, contact support.</p>
        <button
          onClick={reset}
          className="h-11 rounded-md bg-zinc-900 px-6 text-sm font-medium text-white hover:opacity-90"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
