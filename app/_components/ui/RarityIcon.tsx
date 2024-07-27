import cn from "@/app/utils/cn";

type RarityIconProps = {
  colors: string[];
} & React.HTMLAttributes<HTMLDivElement>;
export default function RarityIcon({
  colors,
  className,
  ...props
}: RarityIconProps) {
  return (
    <div className="flex gap-1">
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className={cn(`h-12 w-3 skew-x-12`, className)}
          {...props}
        ></div>
      ))}
    </div>
  );
}
