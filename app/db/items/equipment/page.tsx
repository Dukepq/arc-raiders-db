import { GenericItemTableRenderer } from "../../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const equipment = await getDatabaseItems(
    DL.query.items.getEquipment,
    searchParams
  );
  console.log(searchParams);
  return (
    <GenericItemTableRenderer items={equipment} searchParams={searchParams} />
  );
}
