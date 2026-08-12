import type { Certificate } from "@/types";

/**
 * MOCK DATA - stands in for a "Lab Reports & Certifications" CPT surfaced
 * through WPGraphQL.
 */
export const mockCertificates: Certificate[] = [
  {
    id: "cert-umf-license",
    name: "UMF License",
    description: "Licensed by the UMF Honey Association",
    image: { id: "cert-umf-license-img", url: "/mocks/certification-umf.svg", altText: "UMF certification mark" },
  },
  {
    id: "cert-organic-cert",
    name: "Certified Organic",
    description: "BioGro certified organic production",
    image: { id: "cert-organic-cert-img", url: "/mocks/certification-organic.svg", altText: "Certified Organic mark" },
  },
];
