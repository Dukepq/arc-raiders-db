import { GenericItemTableRenderer } from "../../_components/Tables";
import getDatabaseItems from "@/app/lib/getDatabaseItems";
import DL from "@/app/server/data-layer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [materials, count] = await getDatabaseItems(
    DL.query.items.getMaterials,
    DL.query.items.getMaterialsCount,
    searchParams
  );
  return (
    <GenericItemTableRenderer
      count={count}
      items={materials}
      searchParams={searchParams}
    />
  );
}
