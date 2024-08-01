import ItemView from "../_components/ItemView";
import BackButton from "../_components/BackButton";
import Favourite from "@/app/_components/ui/Favourite";
import RelatedContent from "../_components/RelatedContent";
import DL from "@/app/server/data-layer";
import { CommentContextProvider } from "@/app/context/commentContext";

export default async function Page({ params }: { params: { item: string } }) {
  return (
    <div className="px-3">
      <main className="max-w-screen-xl mx-auto">
        <div className="mt-3">
          <div className="flex gap-3 mb-3">
            <BackButton>back</BackButton>
            <Favourite />
          </div>

          <ItemView itemId={params.item} />
        </div>

        <div className="my-3">
          <CommentContextProvider>
            <RelatedContent />
          </CommentContextProvider>
        </div>
      </main>
    </div>
  );
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const items = await DL.query.items.getItems();
  return items.map((item) => ({
    item: item.itemId,
  }));
}
