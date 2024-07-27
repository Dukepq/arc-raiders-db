import { itemsBodySchema } from "@/app/lib/validation/apiSchemas";
import DL from "@/app/server/data-layer";
import WEH from "@/app/utils/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const result = itemsBodySchema.safeParse(Object.fromEntries(searchParams));
  const { success, data } = result;
  if (!success) {
    return NextResponse.json(
      { message: "Shape of search params is incorrect." },
      { status: 400 }
    );
  }
  const itemsPromise = DL.query.items.getItems(data);
  const countPromise = DL.query.items.getItemsCount({ search: data?.search });

  const [resolved, error] = await WEH(
    Promise.all([itemsPromise, countPromise])
  );

  if (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
  const [items, count] = resolved;

  return NextResponse.json(
    { items, totalMatchingItems: count },
    { status: 200 }
  );
}
