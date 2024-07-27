import { rarityToName } from "../lib/conversions";
import ArcHoverCard, { CardTrigger } from "./ui/ArcHoverCard";
import FeaturedItemCard from "./ui/FeaturedItemCard";
import DL from "../server/data-layer";

export default async function TrendingSection() {
  const items = await DL.query.items.getTrendingItems();
  if (!items) return undefined;
  return (
    <section className="bg-backdrop p-6 rounded-sm mt-4 h-128 relative">
      <div className="text-center relative">
        <h2 className="font-semibold text-2xl mb-4">Trending items</h2>
        <div className="grid gap-x-8 gap-y-4 grid-cols-auto-fit-minmax-80 auto-rows-auto">
          {items.map((item, index) => {
            const { itemId, icon, name, rarity } = item;
            const rarityName = rarityToName(rarity || 0);
            return (
              <ArcHoverCard id={itemId} key={index}>
                <CardTrigger>
                  <FeaturedItemCard
                    icon={icon}
                    id={itemId}
                    itemName={name}
                    rarity={rarityName}
                  />
                </CardTrigger>
              </ArcHoverCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TrendingSectionSkeleton() {
  return (
    <section className="bg-backdrop p-6 rounded-sm mt-4 h-128">
      <div className="text-center">
        <h2 className="font-bold text-xl mb-4">Trending items</h2>
        <div className="grid gap-x-8 gap-y-4 grid-cols-3 auto-rows-auto animate-pulse">
          {[...Array(9)].map((_, index) => {
            return (
              <div
                key={index}
                className="flex h-12 items-center gap-6 basis-1/4 bg-primary rounded-md"
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
