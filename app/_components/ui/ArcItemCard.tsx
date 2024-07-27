import { Weight, Coins } from "lucide-react";
import Badge from "@/app/_components/ui/Badge";
import { rarityToName } from "@/app/lib/conversions";
import ArcRarityOverlay from "./ArcIconRarityOverlay";
import cn from "@/app/utils/cn";
import ImageWithSpinner from "./ImageWithSpinner";

type ArcItemCardProps = {
  category: string;
  subCategory?: string | null;
  name: string;
  price: number | null;
  weight: number;
  description: string | null;
  rarity?: number;
  image?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ArcItemCard({
  category,
  description,
  name,
  price,
  weight,
  image,
  rarity,
  className,
  subCategory,
  ...props
}: ArcItemCardProps) {
  const rarityName = rarity ? rarityToName(rarity) : null;
  return (
    <div
      {...props}
      className={cn(
        "p-3 bg-backdrop min-w-96 w-min bg-opacity-60 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex gap-20 justify-between">
        <div className="flex gap-1">
          <Badge variant={"arc-primary"} size={"arc-primary"}>
            {category}
          </Badge>
          {subCategory && (
            <Badge variant={"arc-primary"} size={"arc-primary"}>
              {subCategory}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Weight strokeWidth={3} className="line" size={16} />
          <span className="font-semibold">{weight}kg</span>
        </div>
      </div>
      <h4 className="font-normal text-2xl uppercase mt-2">{name}</h4>
      {rarity && (
        <div className="mb-2 mt-1 bg-arc-badge-secondary inline-block px-2 py-0.5 text-text text-opacity-50 uppercase text-sm text-nowrap">
          {rarityToName(rarity)}
        </div>
      )}
      {image && rarityName ? (
        <ArcRarityOverlay overlaySize={60} rarity={rarityName || "common"}>
          <ImageSection src={image} />
        </ArcRarityOverlay>
      ) : (
        image && <ImageSection src={image} />
      )}
      {description && (
        <div>
          <div className="border-b border-text border-opacity-50 my-1"></div>
          <p className="text-sm text-opacity-60 text-text">{description}</p>
          <div className="border-b border-text border-opacity-50 my-1"></div>
        </div>
      )}

      {price && (
        <div className="flex justify-center items-center gap-3 my-3">
          <Coins size={32} />{" "}
          <span className="font-medium text-lg">{price}</span>
        </div>
      )}
    </div>
  );
}

function ImageSection({ src }: { src: string }) {
  return (
    <div className="py-8">
      <div className="relative w-full max-w-60 h-36 mx-auto">
        <ImageWithSpinner
          delay={25}
          fill
          sizes="300px"
          className="object-contain"
          src={src}
          alt="image"
        />
      </div>
    </div>
  );
}
