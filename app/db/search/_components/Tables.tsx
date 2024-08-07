import { raritiesToColors, rarityToName } from "@/app/lib/conversions";
import ArcHoverCard, { CardTrigger } from "@/app/_components/ui/ArcHoverCard";
import Link from "next/link";
import RarityIcon from "@/app/_components/ui/RarityIcon";
import { Coins } from "lucide-react";
import ArcIcon from "@/app/_components/ui/ArcIcon";
import Pagination from "@/app/_components/ui/Pagination";
import { Item } from "@/app/types/itemTypes";
import TableSortIndicator from "./TableSortIndicator";
import { searchParamSchema } from "@/app/lib/validation/searchParamSchemas";
import ProgressLink from "@/app/_components/ui/ProgressLink";
import { MAX_ITEMS_PER_PAGE } from "@/app/config/constants";

type GenericItemTableRendererProps = {
  items: (Omit<Item, "variants"> & Partial<Pick<Item, "variants">>)[];
  count: number;
  searchParams?:
    | {
        [key: string]: string | string[] | undefined;
      }
    | undefined;
};
export function GenericItemTableRenderer({
  items,
  count,
  searchParams,
}: GenericItemTableRendererProps) {
  return (
    <>
      <div className="px-3 pb-3 bg-backdrop rounded-sm overflow-auto">
        <GenericItemTable
          searchParams={searchParams}
          className="w-full text-nowrap relative"
        >
          {items.length > 0 ? (
            items.map((item) => {
              const {
                itemId,
                name,
                icon,
                baseValue,
                weight,
                variants,
                rarity,
              } = item;
              return (
                <GenericItemRow
                  icon={icon}
                  id={itemId}
                  name={name}
                  price={Number(baseValue)}
                  category={item.category}
                  availableRarities={
                    !variants || variants[0] === null
                      ? [rarity]
                      : variants
                          .filter(
                            (variant) => typeof variant?.rarity === "number"
                          )
                          .map((variant) => {
                            return variant!.rarity;
                          })
                          .sort()
                  }
                  weight={Number(weight)}
                  rarity={rarity || 1}
                  key={itemId}
                />
              );
            })
          ) : (
            <tr style={{ backgroundColor: "transparent" }}>
              <td colSpan={5} className="text-center opacity-60">
                <span>{"There is nothing here :("}</span>
              </td>
            </tr>
          )}
        </GenericItemTable>
      </div>
      <div className="flex justify-center sticky bottom-3 my-3">
        <Pagination
          totalItems={count}
          searchParams={searchParams}
          maxItemsPerPage={MAX_ITEMS_PER_PAGE}
        ></Pagination>
      </div>
    </>
  );
}

export function GenericItemTable({
  children,
  searchParams,
  ...props
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
} & React.TableHTMLAttributes<HTMLTableElement>) {
  const { data } = searchParamSchema.safeParse(searchParams);
  const params = Object.fromEntries(
    Object.entries(data || {}).filter(([key, value]) => !!value && !!key)
  );
  return (
    <table {...props}>
      <thead>
        <tr className="[&>th]:p-4">
          <th></th>
          <th className="text-left">
            <Link
              className="flex gap-1 items-center"
              href={`?${new URLSearchParams({
                ...params,
                sort: `name_${params.sort === "name_desc" ? "asc" : "desc"}`,
              })}`}
            >
              <span>Name</span>
              <TableSortIndicator
                ascendingCondition={params.sort === "name_asc"}
                descendingCondition={params.sort === "name_desc"}
              />
            </Link>
          </th>
          <th>Rarities</th>
          <th>Weight</th>
          <th>Sell price</th>
        </tr>
      </thead>
      <tbody className="[&>tr:nth-child(odd)]:bg-primary">{children}</tbody>
    </table>
  );
}

type GenericItemRowsProps = {
  id: string;
  icon: string;
  name: string;
  rarity: number;
  weight: number;
  price: number;
  category: string | null;
  availableRarities: number[];
};
export function GenericItemRow({
  icon,
  name,
  price,
  weight,
  id,
  rarity,
  category,
  availableRarities,
}: GenericItemRowsProps) {
  const rarityName = rarityToName(rarity);
  return (
    <tr className="[&>td]:p-2">
      <ArcHoverCard id={id}>
        <td className="min-w-16 w-16">
          <div className="flex items-center">
            <CardTrigger>
              <ProgressLink className="inline-block" href={"/db/item/" + id}>
                <ArcIcon size={48} src={icon} rarity={rarityName} alt={name} />
              </ProgressLink>
            </CardTrigger>
          </div>
        </td>
        <td className="text-start  ">
          <CardTrigger>
            <ProgressLink
              href={"/db/item/" + id}
              className="text-xl inline-block capitalize truncate"
            >
              {name}
            </ProgressLink>
          </CardTrigger>
        </td>
      </ArcHoverCard>
      <td>
        <div className="flex justify-center">
          <RarityIcon
            className="h-6 w-1.5"
            colors={raritiesToColors(availableRarities)}
          />
        </div>
      </td>
      <td className="text-center">{weight}kg</td>
      <td>
        <div className="flex gap-1 justify-center items-center">
          <span>{price}</span>
          <Coins size={16} />
        </div>
      </td>
    </tr>
  );
}
