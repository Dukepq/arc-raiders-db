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

  const countPromise = DL.query.items.getEquipmentCount(q);
  const equipmentPromise = DL.query.items.getEquipment(q);
  const [count, equipment] = await Promise.all([
    countPromise,
    equipmentPromise,
  ]);

  return (
    <GenericItemTableRenderer
      count={count}
      items={equipment}
      searchParams={searchParams}
    />
  );
}
