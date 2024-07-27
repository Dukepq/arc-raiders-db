import { getUser } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST() {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return NextResponse.json(null, { status: 200 });
  }

  const user = await getUser();
  return NextResponse.json(user, { status: 200 });
}
