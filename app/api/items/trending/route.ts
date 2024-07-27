import DL from "@/app/server/data-layer";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await DL.query.items.getTrendingItems();
  return NextResponse.json(items, { status: 200 });
}
