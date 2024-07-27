import Link from "next/link";
import ArcIcon from "./ArcIcon";
import { Rarities } from "@/app/config/config";

type itemCardProps = {
  id: string;
  itemName: string;
  icon: string;
  rarity: Rarities;
};

export default function ItemCard({
  icon,
  id,
  itemName,
  rarity,
}: itemCardProps) {
  return (
    <Link href={`/db/item/${id}`}>
      <div className="flex items-center gap-6 grow bg-primary rounded-sm overflow-hidden border border-transparent hover:border-accent-red transition-colors cursor-pointer">
        <div className="p-1">
          <ArcIcon size={48} alt={itemName} rarity={rarity} src={icon} />
        </div>

        <div className="text-ellipsis overflow-hidden whitespace-nowrap text-base font-semibold text-accent-red capitalize">
          {itemName}
        </div>
      </div>
    </Link>
  );
}
