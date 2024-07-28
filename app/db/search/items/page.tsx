import { GenericItemTableRenderer } from "../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [items, count] = await getDatabaseItems(
    DL.query.items.getItems,
    DL.query.items.getItemsCount,
    searchParams
  );

  return (
    <GenericItemTableRenderer
      count={count}
      items={items}
      searchParams={searchParams}
    />
  );
}
