import { NextResponse } from "next/server";
import { z } from "zod";
import { cartRepository } from "@/repositories";
import { getWooSessionToken, respondWithCart } from "@/lib/woo-session";

const updateQuantitySchema = z.object({ quantity: z.number().int().min(0) });

export async function PATCH(request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const parsed = updateQuantitySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const sessionToken = await getWooSessionToken();
  if (!sessionToken) return NextResponse.json({ error: "No cart session" }, { status: 400 });

  const result =
    parsed.data.quantity === 0
      ? await cartRepository.removeItem(sessionToken, key)
      : await cartRepository.updateItemQuantity(sessionToken, key, parsed.data.quantity);
  return respondWithCart(result);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const sessionToken = await getWooSessionToken();
  if (!sessionToken) return NextResponse.json({ error: "No cart session" }, { status: 400 });

  const result = await cartRepository.removeItem(sessionToken, key);
  return respondWithCart(result);
}
