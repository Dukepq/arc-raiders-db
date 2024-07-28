import { GenericItemTableRenderer } from "../../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [equipment, count] = await getDatabaseItems(
    DL.query.items.getEquipment,
    DL.query.items.getEquipmentCount,
    searchParams
  );

  return (
    <GenericItemTableRenderer
      count={count}
      items={equipment}
      searchParams={searchParams}
    />
  );
}
