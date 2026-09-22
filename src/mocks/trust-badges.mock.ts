import type { TrustBadge } from "@/types";

/**
 * MOCK DATA - stands in for an ACF Options Page "Trust Badges" repeater
 * field, surfaced through WPGraphQL.
 */
export const mockTrustBadges: TrustBadge[] = [
  { id: "trust-lab-tested", icon: "flask-conical", label: "Lab Tested", description: "Every batch independently verified" },
  { id: "trust-authenticity", icon: "shield-check", label: "Guaranteed Authentic", description: "Traceable from hive to jar" },
  { id: "trust-nz-origin", icon: "map-pin", label: "100% NZ Origin", description: "Harvested in remote Northland groves" },
  { id: "trust-mgo", icon: "award", label: "MGO 263+ Graded", description: "Independently graded potency" },
  { id: "trust-batch", icon: "gauge", label: "Batch Traceable", description: "Every jar matched to its lab report" },
  { id: "trust-payments", icon: "lock", label: "Secure Payments", description: "Encrypted checkout, every order" },
];
