import type { FAQItem } from "@/types";

/**
 * MOCK DATA - stands in for an ACF Repeater field (or dedicated FAQ CPT)
 * surfaced through WPGraphQL.
 */
export const mockFAQs: FAQItem[] = [
  {
    id: "faq-umf-vs-mgo",
    question: "How is UMF different from MGO?",
    answer:
      "UMF and MGO are both potency-grading systems for Manuka honey, tested by independent laboratories. UMF also verifies additional purity markers and requires licensing from the UMF Honey Association.",
    category: "Product",
  },
  {
    id: "faq-raw-unpasteurized",
    question: "Is your honey raw and unpasteurized?",
    answer: "Yes - all of our honey is cold-extracted and never heat-treated, preserving its natural enzymes.",
    category: "Product",
  },
  {
    id: "faq-strength-choice",
    question: "What's the difference between UMF 5+ and UMF 20+?",
    answer:
      "The number reflects potency, not quality - UMF 5+ to 10+ suits everyday use, while UMF 15+ and above is typically chosen for more targeted, concentrated use.",
    category: "Product",
  },
  {
    id: "faq-child-safety",
    question: "Is Manuka honey safe for children?",
    answer:
      "Honey should not be given to infants under 12 months due to a small botulism risk. For children over one year old, our honey is completely safe to enjoy.",
    category: "Product",
  },
  {
    id: "faq-storage",
    question: "How should I store my honey once opened?",
    answer: "Keep it sealed at room temperature, out of direct sunlight - there's no need to refrigerate, and it won't spoil.",
    category: "Product",
  },
  {
    id: "faq-sourcing-region",
    question: "Where does your honey come from?",
    answer:
      "Every jar is sourced from one of five wild Manuka regions across New Zealand - see our Origin & Traceability map for the exact hives behind your batch.",
    category: "Sourcing & Quality",
  },
  {
    id: "faq-verify-batch",
    question: "How do I verify my batch?",
    answer:
      "Enter the code printed on the base of your jar into our batch lookup tool to see its harvest region, date, and independent lab results.",
    category: "Sourcing & Quality",
  },
  {
    id: "faq-umf-licensing",
    question: "What does UMF licensing actually verify?",
    answer:
      "UMF licensing requires annual audits and independent lab testing of leptosperin, DHA, HMF, and MGO for every batch before the UMF mark can be used.",
    category: "Sourcing & Quality",
  },
  {
    id: "faq-lab-report",
    question: "Can I see the lab report for my jar?",
    answer: "Yes - every batch's lab report is available through the batch lookup tool on our Origin & Traceability map.",
    category: "Sourcing & Quality",
  },
  {
    id: "faq-shipping-international",
    question: "Do you ship internationally?",
    answer: "We currently ship across New Zealand and Australia, with further regions coming soon.",
    category: "Shipping & Returns",
  },
  {
    id: "faq-returns-policy",
    question: "What's your returns policy?",
    answer: "30-day returns on every order, no questions asked - if you're not satisfied, we'll make it right.",
    category: "Shipping & Returns",
  },
  {
    id: "faq-shipping-time",
    question: "How long does shipping take?",
    answer: "New Zealand orders arrive in 2-4 business days; Australia typically takes 5-8 business days.",
    category: "Shipping & Returns",
  },
  {
    id: "faq-express-shipping",
    question: "Do you offer express shipping?",
    answer: "Yes - express shipping is available at checkout for an additional fee, arriving in 1-2 business days within New Zealand.",
    category: "Shipping & Returns",
  },
  {
    id: "faq-subscribe-save",
    question: "Can I subscribe and save?",
    answer: "Yes - set up recurring delivery on any jar at checkout and save on every repeat order.",
    category: "Orders & Payment",
  },
  {
    id: "faq-payment-methods",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, Apple Pay, Google Pay, and Afterpay.",
    category: "Orders & Payment",
  },
  {
    id: "faq-change-cancel",
    question: "Can I change or cancel my order after placing it?",
    answer: "Contact us within 2 hours of ordering and we'll do our best to adjust or cancel it before it ships.",
    category: "Orders & Payment",
  },
];
