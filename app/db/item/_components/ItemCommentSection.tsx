import DL from "@/app/server/data-layer";
import ItemCommentSectionRendered from "./ItemCommentRenderer";

export default async function ItemCommentSection({
  itemId,
}: {
  itemId: string;
}) {
  const itemComments = await DL.query.comments.getItemComments(itemId, 0, 10);
  return (
    <>
      <ItemCommentSectionRendered itemComments={itemComments} itemId={itemId} />
    </>
  );
}
