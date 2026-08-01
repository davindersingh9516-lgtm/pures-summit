"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { useMounted } from "@/hooks/use-mounted";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch. The theme mechanism (ThemeProvider, `data-theme`
 * attribute, CSS dark-mode tokens) has existed since the foundation build -
 * this is just the first visible control for it, so flipping it now needs
 * no provider or token changes.
 */
export function ThemeToggle({ className, ...props }: Omit<ButtonProps, "onClick" | "aria-label" | "size">) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle light and dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(className)}
      {...props}
    >
      {mounted && resolvedTheme === "dark" ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </Button>
  );
}
