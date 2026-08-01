import type { Statistic } from "@/types";

/**
 * MOCK DATA - stands in for an ACF Options Page "Statistics" repeater
 * field, surfaced through WPGraphQL.
 */
export const mockStatistics: Statistic[] = [
  { id: "stat-years", value: 12, suffix: "+ years", label: "Beekeeping in Northland" },
  { id: "stat-hives", value: 480, suffix: "+", label: "Managed hives" },
  { id: "stat-batches", value: 100, suffix: "%", label: "Batches lab-tested" },
  { id: "stat-rating", value: 4.9, prefix: "", suffix: "/5", label: "Average customer rating" },
];
