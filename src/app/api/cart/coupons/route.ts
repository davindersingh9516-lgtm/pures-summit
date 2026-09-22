import { NextResponse } from "next/server";
import { z } from "zod";
import { cartRepository } from "@/repositories";
import { getWooSessionToken, respondWithCart } from "@/lib/woo-session";

const couponSchema = z.object({ code: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = couponSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const sessionToken = await getWooSessionToken();
  const result = await cartRepository.applyCoupon(sessionToken ?? "", parsed.data.code);
  return respondWithCart(result);
}

export async function DELETE(request: Request) {
  const parsed = couponSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const sessionToken = await getWooSessionToken();
  if (!sessionToken) return NextResponse.json({ error: "No cart session" }, { status: 400 });

  const result = await cartRepository.removeCoupon(sessionToken, parsed.data.code);
  return respondWithCart(result);
}
