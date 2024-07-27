import { GenericItemTableRenderer } from "../../../_components/Tables";
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

  const otherPromise = DL.query.items.getEquipmentOther(q);
  const countPromise = DL.query.items.getEquipmentOtherCount(q);
  const [other, count] = await Promise.all([otherPromise, countPromise]);
  if (!other) return null;

  return (
    <GenericItemTableRenderer
      count={count}
      items={other}
      searchParams={searchParams}
    />
  );
}
