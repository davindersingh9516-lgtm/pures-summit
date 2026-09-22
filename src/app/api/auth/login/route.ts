import { NextResponse } from "next/server";
import { z } from "zod";
import { authRepository } from "@/repositories";
import { setAuthToken } from "@/lib/auth-session";

const bodySchema = z.object({ username: z.string().min(1), password: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  try {
    const session = await authRepository.login(parsed.data.username, parsed.data.password);
    await setAuthToken(session.authToken);
    return NextResponse.json({ customer: session.customer });
  } catch {
    // WPGraphQL returns a generic GraphQL error for bad credentials - don't
    // leak whether it was the username or password that was wrong.
    return NextResponse.json({ error: "Invalid email/username or password" }, { status: 401 });
  }
}
