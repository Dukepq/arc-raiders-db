import { itemCommentsSchema } from "@/app/lib/validation/apiSchemas";
import DL from "@/app/server/data-layer";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const itemId = params?.itemId;
  if (!itemId) {
    return NextResponse.json(null, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;

  try {
    const { limit, offset } = itemCommentsSchema.parse(
      Object.fromEntries(searchParams)
    );
    const commentsPromise = DL.query.comments.getItemComments(
      itemId,
      offset,
      limit
    );
    const commentsCountPromise = DL.query.comments.getItemCommentsCount(
      itemId,
      offset,
      limit
    );
    const [comments, commentsCount] = await Promise.all([
      commentsPromise,
      commentsCountPromise,
    ]);
    return NextResponse.json({ comments, commentsCount }, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 400 });
  }
}
