import { itemSearchParamsSchema } from "@/app/lib/validation/apiSchemas";
import DL from "@/app/server/data-layer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const { searchParams } = url;

  const result = itemSearchParamsSchema.safeParse(
    Object.fromEntries(searchParams)
  );
  const { data, success } = result;
  if (!success) {
    return NextResponse.json(
      { message: "shape of provided search params was incorrect." },
      { status: 400 }
    );
  }

  const { itemId } = data;
  const item = await DL.query.items.getItem(itemId);

  return NextResponse.json(item, { status: 200 });
}
