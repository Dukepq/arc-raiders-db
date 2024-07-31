import DL from "@/app/server/data-layer";
import ItemCommentSectionRendered from "./ItemCommentRenderer";
import Pagination from "@/app/_components/ui/Pagination";
import { MAX_ITEMS_PER_PAGE } from "@/app/config/constants";

export default async function ItemCommentSection({
  itemId,
}: {
  itemId: string;
}) {
  const itemComments = await DL.query.comments.getItemComments(itemId, 0, 10);
  return (
    <>
      <ItemCommentSectionRendered itemComments={itemComments} itemId={itemId} />
      <div className="flex justify-center py-3">
        <Pagination
          totalItems={itemComments.length}
          maxItemsPerPage={MAX_ITEMS_PER_PAGE}
        />
      </div>
    </>
  );
}
