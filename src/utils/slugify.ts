/** Generic slug utility - for client-side derived URLs only. Canonical
 * slugs always come from the backend; never used to invent routes. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
