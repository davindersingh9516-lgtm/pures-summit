export interface BreadcrumbItem {
  label: string;
  /** Omitted on the final (current page) crumb. */
  url?: string;
}
