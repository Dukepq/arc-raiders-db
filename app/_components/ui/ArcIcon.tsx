import Image, { ImageProps } from "next/image";
import ArcRarityOverlay from "./ArcIconRarityOverlay";
import { Rarities } from "@/app/config/constants";
import cn from "@/app/utils/cn";

type ArcIconProps = {
  rarity: Rarities;
  alt: string;
  src: string;
  overlaySize?: number;
  sizes?: string;
  size?: number;
} & React.HTMLAttributes<HTMLDivElement>;
export default function ArcIcon({
  rarity,
  alt,
  src,
  overlaySize = 30,
  size,
  sizes = "60px",
  className,
  ...props
}: ArcIconProps) {
  return (
    <ArcRarityOverlay
      className={cn(
        "h-full w-full flex items-center justify-center",
        className
      )}
      style={size ? { width: size, height: size } : {}}
      rarity={rarity}
      overlaySize={overlaySize}
      {...props}
    >
      <div className={"relative h-5/6 w-full"}>
        <Image
          draggable="false"
          alt={alt}
          src={src}
          className="object-contain select-none"
          fill
          sizes={sizes}
        />
      </div>
    </ArcRarityOverlay>
  );
}
