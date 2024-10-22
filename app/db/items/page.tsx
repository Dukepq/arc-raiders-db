import { GenericItemTableRenderer } from "../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";
import ItemFilters from "./_components/ItemFilters";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const items = await getDatabaseItems(DL.query.items.getItems, searchParams);

  return (
    <>
      <ItemFilters className="justify-end" />
      <GenericItemTableRenderer items={items} searchParams={searchParams} />
    </>
  );
}
