"use client";

import { Search } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useSearchModal } from "@/contexts/search-context";
import { useTranslations } from "@/hooks/use-translations";

export function SearchTrigger(props: Omit<ButtonProps, "onClick" | "aria-label">) {
  const t = useTranslations();
  const { open } = useSearchModal();

  return (
    <Button variant="ghost" size="icon" aria-label={t("search")} onClick={open} {...props}>
      <Search className="size-5" />
    </Button>
  );
}
