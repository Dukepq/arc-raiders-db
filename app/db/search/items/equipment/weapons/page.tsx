import { GenericItemTableRenderer } from "../../../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [weapons, count] = await getDatabaseItems(
    DL.query.items.getEquipmentWeapons,
    DL.query.items.getEquipmentWeaponsCount,
    searchParams
  );

  return (
    <GenericItemTableRenderer
      count={count}
      items={weapons}
      searchParams={searchParams}
    />
  );
}
