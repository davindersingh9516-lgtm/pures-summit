import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { env } from "@/config/env";

/**
 * WordPress -> Next.js on-demand ISR webhook. Pair with a `save_post` /
 * `woocommerce_update_product` action in wp-admin (Code Snippets plugin is
 * already installed on pure-summit) that POSTs here with the secret and the
 * changed path, e.g.:
 *
 *   wp_remote_post('https://your-frontend.example.com/api/revalidate', [
 *     'body' => wp_json_encode(['secret' => '...', 'path' => '/shop/product/' . $post->post_name]),
 *     'headers' => ['Content-Type' => 'application/json'],
 *   ]);
 *
 * `REVALIDATE_SECRET` is unset in .env.local for now (dev doesn't need
 * ISR revalidation - `next dev` never caches) - set it before deploying.
 */
const bodySchema = z.object({
  secret: z.string(),
  path: z.string().optional(),
  tag: z.string().optional(),
});

export async function POST(request: Request) {
  if (!env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "REVALIDATE_SECRET is not configured" }, { status: 500 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  if (parsed.data.secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  if (!parsed.data.path && !parsed.data.tag) {
    return NextResponse.json({ error: "Provide a path or a tag" }, { status: 400 });
  }

  if (parsed.data.path) revalidatePath(parsed.data.path);
  if (parsed.data.tag) revalidateTag(parsed.data.tag);

  return NextResponse.json({ revalidated: true });
}
