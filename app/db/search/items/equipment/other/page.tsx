import { GenericItemTableRenderer } from "../../../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [other, count] = await getDatabaseItems(
    DL.query.items.getEquipmentOther,
    DL.query.items.getEquipmentOtherCount,
    searchParams
  );
  if (!other) return null;

  return (
    <GenericItemTableRenderer
      count={count}
      items={other}
      searchParams={searchParams}
    />
  );
}
