import { Rarities } from "@/app/config/constants";
import cn from "@/app/utils/cn";

type ArcRarityIconProps = {
  children: React.ReactNode;
  overlaySize: number;
  rarity: Rarities;
} & React.AllHTMLAttributes<HTMLDivElement>;

export default function ArcRarityOverlay({
  rarity,
  children,
  overlaySize,
  className,
  ...props
}: ArcRarityIconProps) {
  let svg: React.ReactNode;
  switch (rarity) {
    case "common": {
      svg = (
        <RarityCommonOverlay
          size={overlaySize}
          className="absolute top-0 left-0"
        />
      );
      break;
    }
    case "uncommon": {
      svg = (
        <RarityUncommonOverlay
          size={overlaySize}
          className="absolute top-0 left-0"
        />
      );
      break;
    }
    case "rare": {
      svg = (
        <RarityRareOverlay
          size={overlaySize}
          className="absolute top-0 left-0"
        />
      );
      break;
    }
    case "scarce": {
      svg = (
        <RarityScarceOverlay
          size={overlaySize}
          className="absolute top-0 left-0"
        />
      );
      break;
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {svg}
      {children}
    </div>
  );
}

type OverlayProps = React.HTMLAttributes<SVGElement> & { size?: number };
export function RarityCommonOverlay({ size = 50, ...props }: OverlayProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_55)">
        <path
          d="M24.6924 -21.648L32.2827 -14.0607L-14.2638 32.5036L-21.8541 24.9162L24.6924 -21.648Z"
          fill="#02CD7B"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_55">
          <rect width="73" height="73" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function RarityUncommonOverlay({ size = 50, ...props }: OverlayProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_55)">
        <path
          d="M24.6924 -21.648L32.2827 -14.0607L-14.2638 32.5036L-21.8541 24.9162L24.6924 -21.648Z"
          fill="#58C6E4"
        />
        <path
          d="M43.9963 -23.3354L51.5865 -15.748L-10.2948 46.157L-17.8851 38.5696L43.9963 -23.3354Z"
          fill="#3A8299"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_55">
          <rect width="73" height="73" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function RarityRareOverlay({ size = 50, ...props }: OverlayProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_55)">
        <path
          d="M24.6924 -21.648L32.2827 -14.0607L-14.2638 32.5036L-21.8541 24.9162L24.6924 -21.648Z"
          fill="#EE2937"
        />
        <path
          d="M43.9963 -23.3354L51.5865 -15.748L-10.2948 46.157L-17.8851 38.5696L43.9963 -23.3354Z"
          fill="#C7222F"
        />
        <path
          d="M56.811 -18.0408L64.4013 -10.4534L-10.9897 64.9663L-18.58 57.3789L56.811 -18.0408Z"
          fill="#67151F"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_55">
          <rect width="73" height="73" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function RarityScarceOverlay({ size = 50, ...props }: OverlayProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 73 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_113_55)">
        <path
          d="M24.6925 -21.648L32.2827 -14.0607L-14.2638 32.5036L-21.8541 24.9162L24.6925 -21.648Z"
          fill="#F5A801"
        />
        <path
          d="M43.9963 -23.3354L51.5865 -15.748L-10.2948 46.157L-17.8851 38.5696L43.9963 -23.3354Z"
          fill="#F5A802"
        />
        <path
          d="M56.811 -18.0408L64.4013 -10.4534L-10.9897 64.9663L-18.58 57.3789L56.811 -18.0408Z"
          fill="#976806"
        />
        <path
          d="M69.4763 -11.7689L77.0666 -4.18147L-2.99749 75.9131L-10.5878 68.3258L69.4763 -11.7689Z"
          fill="#684809"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_55">
          <rect width="73" height="73" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
