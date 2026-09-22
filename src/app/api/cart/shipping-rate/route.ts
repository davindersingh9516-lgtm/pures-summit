import { NextResponse } from "next/server";
import { z } from "zod";
import { cartRepository } from "@/repositories";
import { getWooSessionToken, respondWithCart } from "@/lib/woo-session";

const rateSchema = z.object({ rateId: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = rateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const sessionToken = await getWooSessionToken();
  if (!sessionToken) return NextResponse.json({ error: "No cart session" }, { status: 400 });

  const result = await cartRepository.selectShippingRate(sessionToken, parsed.data.rateId);
  return respondWithCart(result);
}
