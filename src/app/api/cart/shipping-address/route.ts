import { NextResponse } from "next/server";
import { z } from "zod";
import { cartRepository } from "@/repositories";
import { getWooSessionToken, respondWithCart } from "@/lib/woo-session";

const addressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  company: z.string().optional(),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().optional(),
  postcode: z.string().min(1),
  country: z.enum(["NZ", "AU"]),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = addressSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const sessionToken = await getWooSessionToken();
  if (!sessionToken) return NextResponse.json({ error: "No cart session" }, { status: 400 });

  const result = await cartRepository.updateShippingAddress(sessionToken, parsed.data);
  return respondWithCart(result);
}
