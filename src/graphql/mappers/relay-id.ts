/**
 * WPGraphQL encodes global IDs as base64("type:databaseId") (Relay's Node
 * spec). WooGraphQL's cart mutations (addToCart, ProductVariation lookups)
 * take the raw numeric `databaseId`, not this opaque string, so cart code
 * decodes it back out here rather than plumbing a second ID through every
 * `Product`/`ProductVariant` the UI touches.
 */
export function decodeWooDatabaseId(globalId: string): number {
  const decoded = Buffer.from(globalId, "base64").toString("utf-8");
  const [, rawId] = decoded.split(":");
  const id = Number(rawId);
  if (!rawId || Number.isNaN(id)) {
    throw new Error(`Could not decode a numeric WooCommerce ID from "${globalId}"`);
  }
  return id;
}
