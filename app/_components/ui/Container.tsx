import cn from "@/app/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T> &
  VariantProps<typeof containerOptions>;

const containerOptions = cva("grid place-content-center", {
  variants: {
    variant: {
      transparent: "bg-transparent",
      backdrop: "bg-backdrop",
      "dark-backdrop": "bg-backdrop-darker",
      dialog: "bg-backdrop-darker border border-border-grey rounded-md",
    },
    size: {
      lg: "px-8 lg:px-16 py-10 lg:py-20",
      default: "px-6 lg:px-12 py-7 lg:py-14",
      sm: "px-4 lg:px-6 py-6 lg:py-12",
      xs: "px-1.5 lg:px-3 py-4 lg:py-8",
    },
  },
  defaultVariants: {
    variant: "transparent",
    size: "default",
  },
});

export default function Container<T extends React.ElementType>({
  as,
  children,
  className,
  variant,
  size,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component
      className={cn(containerOptions({ variant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
