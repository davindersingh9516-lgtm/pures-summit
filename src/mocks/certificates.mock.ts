import type { Certificate } from "@/types";

/**
 * MOCK DATA - stands in for a "Lab Reports & Certifications" CPT surfaced
 * through WPGraphQL.
 */
export const mockCertificates: Certificate[] = [
  {
    id: "cert-mgo-verified",
    name: "MGO Verified",
    description: "Methylglyoxal content confirmed by an accredited independent laboratory",
    image: { id: "cert-mgo-verified-img", url: "/mocks/certification-mgo.svg", altText: "MGO verified mark" },
  },
  {
    id: "cert-organic-cert",
    name: "Certified Organic",
    description: "BioGro certified organic production",
    image: { id: "cert-organic-cert-img", url: "/mocks/certification-organic.svg", altText: "Certified Organic mark" },
  },
];
