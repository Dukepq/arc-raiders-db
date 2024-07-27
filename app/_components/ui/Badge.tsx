import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const badgeOptions = cva("uppercase", {
  variants: {
    variant: {
      "arc-primary": "bg-arc-badge text-backdrop",
      "arc-secondary": "bg-arc-badge-secondary",
    },
    size: {
      "arc-primary": "py-1 px-2 font-normal text-sm",
    },
  },
  defaultVariants: { variant: "arc-primary", size: "arc-primary" },
});

type BadgeProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeOptions>;

export default function Badge({
  children,
  variant,
  size,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(badgeOptions({ variant, size }), "text-nowrap", className)}
    >
      {children}
    </span>
  );
}
