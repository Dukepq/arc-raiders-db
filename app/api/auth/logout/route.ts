import { invalidateCookies } from "@/app/lib/auth/cookies";
import DL from "@/app/server/data-layer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const sessionId = cookies().get("session")?.value;

  if (sessionId) {
    await DL.mutation.sessions.deleteSession(sessionId);
  }
  invalidateCookies("session");

  return NextResponse.json(null, { status: 200 });
}
