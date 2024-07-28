import { QueryParameters } from "../types/queries";
import { rarityNameToNum } from "./conversions";
import { searchParamSchema } from "./validation/searchParamSchemas";

export default async function getDatabaseItems<T>(
  getItems: (q: QueryParameters) => T,
  getItemsCount: (q: QueryParameters) => Promise<number>,
  searchParams?: { [key: string]: string | string[] | undefined }
) {
  const { data, success } = searchParamSchema.safeParse(searchParams ?? {});
  const resultData = success ? data : {};

  const q = {
    ...resultData,
    rarity: rarityNameToNum(resultData.rarity),
  };

  const itemsPromise = getItems(q);
  const countPromise = getItemsCount(q);
  const [items, count] = await Promise.all([itemsPromise, countPromise]);

  return [items, count] as const;
}
