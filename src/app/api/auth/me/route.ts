import { NextResponse } from "next/server";
import { authRepository } from "@/repositories";
import { getAuthToken } from "@/lib/auth-session";

export async function GET() {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ customer: null, orders: [] });

  try {
    const [customer, orders] = await Promise.all([
      authRepository.getCurrentCustomer(token),
      authRepository.getOrders(token),
    ]);
    return NextResponse.json({ customer, orders });
  } catch {
    // Token expired (5 min lifetime) or otherwise invalid - treat as
    // logged-out rather than surfacing a GraphQL error to the account page.
    return NextResponse.json({ customer: null, orders: [] });
  }
}
