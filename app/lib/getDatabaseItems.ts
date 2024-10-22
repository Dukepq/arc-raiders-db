import { QueryParameters } from "../types/queries";
import { rarityNameToNum } from "./conversions";
import { searchParamSchema } from "./validation/searchParamSchemas";

export default async function getDatabaseItems<T>(
  getItems: (q: QueryParameters) => T,
  searchParams?: { [key: string]: string | string[] | undefined }
) {
  const { data, success } = searchParamSchema.safeParse(searchParams ?? {});
  const resultData = success ? data : {};

  const q = {
    ...resultData,
    rarity: rarityNameToNum(resultData.rarity),
  };

  const items = await getItems(q);

  return items;
}
