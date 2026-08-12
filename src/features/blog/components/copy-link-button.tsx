"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function CopyLinkButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({ title: "Link copied", description: "The article link is on your clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Couldn't copy link", description: "Copy the URL from your browser's address bar instead." });
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-(--color-foreground-muted) transition-colors duration-(--duration-fast) hover:text-[#12291d]",
        className,
      )}
    >
      <Icon name={copied ? "check" : "link"} className="size-4" />
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
