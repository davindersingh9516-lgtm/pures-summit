import { NextResponse } from "next/server";
import { z } from "zod";
import { cartRepository } from "@/repositories";
import { getWooSessionToken, respondWithCart } from "@/lib/woo-session";

const addItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().default(1),
  variantId: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = addItemSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const sessionToken = await getWooSessionToken();
  const result = await cartRepository.addItem(
    sessionToken,
    parsed.data.productId,
    parsed.data.quantity,
    parsed.data.variantId,
  );
  return respondWithCart(result);
}
