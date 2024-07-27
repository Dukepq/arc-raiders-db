import ArcItemCard from "@/app/_components/ui/ArcItemCard";
import { rarityToName } from "@/app/lib/conversions";
import Badge from "@/app/_components/ui/Badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import DL from "@/app/server/data-layer";

type ItemViewProps = {
  itemId: string;
};

export default async function ItemView({ itemId }: ItemViewProps) {
  const item = await DL.query.items.getItem(itemId);
  if (!item) notFound();
  const {
    category,
    description,
    icon,
    name,
    baseValue,
    weight,
    variants,
    rarity,
  } = item;
  return (
    <div className="flex gap-2 flex-col-reverse md:flex-row">
      <ArcItemCard
        category={category || ""}
        description={description}
        name={name}
        price={baseValue}
        weight={Number(weight)}
        rarity={rarity}
        image={icon}
      />
      <div className="flex gap-2 flex-row md:flex-col mt-3 md:mt-0 w-36">
        {variants
          .sort((a, b) => {
            if (!a || !b) return 0;
            if (a?.rarity < b?.rarity) return -1;
            return 1;
          })
          .map((variant) => {
            if (!variant) return;
            const name = rarityToName(variant.rarity);
            return (
              <Link
                href={`/db/item/${variant.itemId}`}
                key={variant.name + variant.rarity}
                className="text-background text-sm px-2 py-0.5 cursor-pointer bg-accent-red min-w-fit"
              >
                <Badge className="bg-transparent">{name}</Badge>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
