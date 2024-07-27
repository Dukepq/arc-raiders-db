import { GenericItemTableRenderer } from "../_components/Tables";
import { rarityNameToNum } from "@/app/lib/conversions";
import { searchParamSchema } from "@/app/lib/validation/searchParamSchemas";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data, success } = searchParamSchema.safeParse(searchParams ?? {});
  const resultData = success ? data : {};

  const q = {
    ...resultData,
    rarity: rarityNameToNum(resultData.rarity),
  };
  const itemsPromise = DL.query.items.getItems(q);
  const countPromise = DL.query.items.getItemsCount(q);
  const [items, count] = await Promise.all([itemsPromise, countPromise]);

  return (
    <GenericItemTableRenderer
      count={count}
      items={items}
      searchParams={searchParams}
    />
  );
}
