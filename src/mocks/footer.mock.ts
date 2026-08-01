import type { FooterData } from "@/types";

/**
 * MOCK DATA - stands in for a WPGraphQL query against footer menu locations
 * plus an ACF Options Page for social links / payment icons / newsletter copy.
 */
export const mockFooterData: FooterData = {
  tagline: "Raw, single-origin Manuka honey - traceable from hive to jar.",
  contactEmail: "hello@puresummit.co.nz",
  contactPhone: "+64 9 555 0142",
  contactHours: "Mon-Fri, 9am-5pm NZST",
  columns: [
    {
      id: "footer-shop",
      title: "Shop",
      links: [
        { label: "Raw Manuka Honey", url: "/shop/category/raw-manuka-honey" },
        { label: "UMF Graded", url: "/shop/category/umf-graded" },
        { label: "Gift Sets", url: "/shop/category/gift-sets" },
        { label: "Wholesale", url: "/wholesale" },
      ],
    },
    {
      id: "footer-learn",
      title: "Learn",
      links: [
        { label: "What Is UMF?", url: "/blog/what-is-umf-rating" },
        { label: "Origin & Traceability", url: "/our-story#origin" },
        { label: "The Harvest Process", url: "/our-story#harvest" },
        { label: "Journal", url: "/blog" },
      ],
    },
    {
      id: "footer-company",
      title: "Company",
      links: [
        { label: "Our Story", url: "/our-story" },
        { label: "Sustainability", url: "/sustainability" },
        { label: "Lab Reports", url: "/lab-reports" },
        { label: "Careers", url: "/careers" },
      ],
    },
    {
      id: "footer-support",
      title: "Support",
      links: [
        { label: "Contact Us", url: "/contact" },
        { label: "Shipping & Returns", url: "/shipping-returns" },
        { label: "FAQs", url: "/faqs" },
        { label: "Track Order", url: "/account/orders" },
      ],
    },
  ],
  socialLinks: [
    { id: "social-instagram", platform: "instagram", url: "https://instagram.com", label: "Instagram" },
    { id: "social-facebook", platform: "facebook", url: "https://facebook.com", label: "Facebook" },
  ],
  paymentIcons: [
    { id: "pay-visa", name: "Visa", image: { id: "pay-visa-img", url: "/mocks/payment-visa.svg", altText: "Visa" } },
    {
      id: "pay-mastercard",
      name: "Mastercard",
      image: { id: "pay-mastercard-img", url: "/mocks/payment-mastercard.svg", altText: "Mastercard" },
    },
    { id: "pay-paypal", name: "PayPal", image: { id: "pay-paypal-img", url: "/mocks/payment-paypal.svg", altText: "PayPal" } },
  ],
  shippingIcons: [
    {
      id: "ship-nz-post",
      name: "NZ Post",
      image: { id: "ship-nz-post-img", url: "/mocks/shipping-nzpost.svg", altText: "NZ Post" },
    },
    {
      id: "ship-courier",
      name: "Courier Post",
      image: { id: "ship-courier-img", url: "/mocks/shipping-courier.svg", altText: "Courier Post" },
    },
  ],
  certifications: [
    {
      id: "cert-umf",
      name: "UMF Certified",
      caption: "UMF Licensed Member #4102",
      image: { id: "cert-umf-img", url: "/mocks/certification-umf.svg", altText: "UMF Certified" },
    },
    {
      id: "cert-organic",
      name: "Certified Organic",
      caption: "BioGro NZ Certified",
      image: { id: "cert-organic-img", url: "/mocks/certification-organic.svg", altText: "Certified Organic" },
    },
  ],
  newsletter: {
    enabled: true,
    title: "Join our journal",
    description: "Seasonal harvest notes and early access to limited batches.",
    consentText: "By subscribing you agree to our Privacy Policy.",
  },
  copyrightText: `© ${new Date().getUTCFullYear()} Pure Summit. All rights reserved.`,
  bottomLinks: [
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms of Service", url: "/terms-of-service" },
  ],
};
