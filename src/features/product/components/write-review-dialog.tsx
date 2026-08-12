"use client";

import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

function StarPicker({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= value;
        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={filled}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            onClick={() => onChange(starValue)}
            className="p-0.5"
          >
            <Star className={cn("size-6", filled ? "fill-(--color-accent) text-(--color-accent)" : "text-(--color-border-strong)")} />
          </button>
        );
      })}
    </div>
  );
}

/** No review-submission endpoint exists yet - this confirms the client-side
 * flow end to end (validation, star picker, success state) and shows a
 * toast, the same "working in spirit" pattern as the footer newsletter
 * form. Wiring the real WooCommerce review mutation later only touches
 * `handleSubmit`. */
export function WriteReviewDialog({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setRating(0);
    setName("");
    setContent("");
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rating === 0) {
      setError("Please choose a star rating.");
      return;
    }
    if (!name.trim() || !content.trim()) {
      setError("Please fill in your name and review.");
      return;
    }

    toast({ title: "Review submitted", description: "Thanks for sharing your experience!" });
    resetForm();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon name="pencil-line" className="size-4" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {productName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error ? <p className="text-sm text-(--color-destructive)">{error}</p> : null}

          <div className="flex flex-col gap-1.5">
            <Label>Your rating</Label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-name">Name</Label>
            <Input id="review-name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-content">Your review</Label>
            <Textarea
              id="review-content"
              rows={4}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-[#12291d] hover:bg-[#12291d] hover:opacity-90">
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
