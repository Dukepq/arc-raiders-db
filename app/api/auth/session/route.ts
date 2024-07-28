import { getUser } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json(null, { status: 200 });
  }
  return NextResponse.json(user, { status: 200 });
}
