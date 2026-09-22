import type { Testimonial } from "@/types";

/**
 * MOCK DATA - stands in for a testimonials CPT surfaced through WPGraphQL.
 */
export const mockTestimonials: Testimonial[] = [
  {
    id: "testimonial-emily",
    authorName: "Emily R.",
    authorTitle: "Verified Customer",
    quote:
      "The most genuine-tasting Manuka honey I've found - you can tell it's raw the moment you open the jar, and the batch lookup actually checked out.",
    rating: 5,
    featured: true,
  },
  {
    id: "testimonial-david",
    authorName: "David L.",
    authorTitle: "Verified Customer",
    quote: "Transparent lab reports and beautiful packaging. Now our go-to gift.",
    rating: 5,
  },
  {
    id: "testimonial-priya",
    authorName: "Priya K.",
    authorTitle: "Verified Customer",
    quote: "Finally, honey that doesn't taste cooked.",
    rating: 5,
  },
  {
    id: "testimonial-marcus",
    authorName: "Marcus T.",
    authorTitle: "Verified Customer",
    quote:
      "I've bought Manuka from three other brands before this one, and Pure Summit is the first where the MGO number actually matched what I could taste and feel.",
    rating: 5,
  },
  {
    id: "testimonial-hana",
    authorName: "Hana S.",
    authorTitle: "Verified Customer",
    quote: "Ordered as a gift, kept a jar for myself. No regrets.",
    rating: 5,
  },
  {
    id: "testimonial-oliver",
    authorName: "Oliver B.",
    authorTitle: "Verified Customer",
    quote: "Rich, complex flavor - nothing like the supermarket stuff.",
    rating: 4,
  },
  {
    id: "testimonial-grace",
    authorName: "Grace W.",
    authorTitle: "Verified Customer",
    quote:
      "The origin map sold me before I even added anything to cart - being able to see the actual region and beekeeper made it feel real.",
    rating: 5,
  },
];
