import { GenericItemTableRenderer } from "../../_components/Tables";
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

  const countPromise = DL.query.items.getMaterialsCount(q);
  const materialsPromise = DL.query.items.getMaterials(q);
  const [count, materials] = await Promise.all([
    countPromise,
    materialsPromise,
  ]);

  return (
    <GenericItemTableRenderer
      count={count}
      items={materials}
      searchParams={searchParams}
    />
  );
}
