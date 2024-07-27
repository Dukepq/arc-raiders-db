import { VariantProps, cva } from "class-variance-authority";
import cn from "../../utils/cn";

type buttonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonOptions>;

const buttonOptions = cva("rounded-sm text-nowrap", {
  variants: {
    variant: {
      default: "bg-accent font-normal text-backdrop",
      outline: "border border-accent-red",
      ghost: "hover:bg-text hover:bg-opacity-10",
      timid: `bg-text bg-opacity-5 rounded-sm transition-colors border-opacity-20 cursor-pointer hover:bg-opacity-10 font-normal`,
    },
    size: {
      lg: "text-lg py-1 px-5 font-semibold",
      default: "text-base font-normal px-3 py-1",
      sm: "text-sm py-1.5 px-3",
      xs: "py-0.5 px-1.5 text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({ children, className, variant, size, ...props }: buttonProps) {
  return (
    <button
      className={cn(buttonOptions({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, buttonOptions };
