import { cartRepository } from "@/repositories";
import { getWooSessionToken, respondWithCart } from "@/lib/woo-session";

export async function GET() {
  const sessionToken = await getWooSessionToken();
  const result = await cartRepository.getCart(sessionToken);
  return respondWithCart(result);
}

export async function DELETE() {
  const sessionToken = await getWooSessionToken();
  const { cart, sessionToken: token } = await cartRepository.getCart(sessionToken);
  if (!cart.items.length) return respondWithCart({ cart, sessionToken: token });
  const result = await cartRepository.clearCart(token);
  return respondWithCart(result);
}
