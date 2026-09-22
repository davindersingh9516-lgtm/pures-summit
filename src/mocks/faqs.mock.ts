import type { FAQItem } from "@/types";

/**
 * MOCK DATA - stands in for an ACF Repeater field (or dedicated FAQ CPT)
 * surfaced through WPGraphQL.
 */
export const mockFAQs: FAQItem[] = [
  {
    id: "faq-what-is-mgo",
    question: "What does MGO 263+ mean?",
    answer:
      "MGO stands for Methylglyoxal, the naturally occurring compound behind Manuka honey's non-peroxide antibacterial activity. The number is the minimum measured concentration in milligrams per kilogram - so MGO 263+ means an independent laboratory measured at least 263 mg/kg in that batch.",
    category: "Product",
  },
  {
    id: "faq-raw-unpasteurized",
    question: "Is your honey raw and unpasteurized?",
    answer: "Yes - all of our honey is cold-extracted and never heat-treated, preserving its natural enzymes.",
    category: "Product",
  },
  {
    id: "faq-size-choice",
    question: "Should I buy the 250g or the 500g jar?",
    answer:
      "It's the same MGO 263+ honey in both - only the jar size changes. The 250g suits a first order or an occasional spoonful; the 500g works out cheaper per gram and suits a daily habit. If you already know you'll reorder, a value pack is cheaper again than buying the jars one at a time.",
    category: "Product",
  },
  {
    id: "faq-value-packs",
    question: "What's in the value packs?",
    answer:
      "Multi-jar packs of the same MGO 263+ honey: two 250g jars, two 500g jars, a 500g plus a 250g, or the family pack of two 500g jars plus a 250g. Each pack is priced below buying those jars separately, and the saving is shown on the product card.",
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
    id: "faq-mgo-verification",
    question: "How is the MGO grade verified?",
    answer:
      "Every batch is sampled and sent to an accredited independent laboratory - never tested only in-house - which measures Methylglyoxal alongside the other markers of genuine Manuka, including leptosperin, DHA and HMF. A grade is only printed on a jar once those results come back above the claimed level.",
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
