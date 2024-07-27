import cn from "@/app/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const inputOptions = cva("rounded-sm", {
  variants: {
    variant: {
      default: `border border-text border-opacity-10 bg-text bg-opacity-5 focus:outline-none
      focus:border-opacity-20 transition-colors`,
    },
    size: {
      default: "px-2 py-1 text-base",
      sm: "px-1.5 py-0.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type InputProps = React.AllHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputOptions>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, className, ...props }, forwardedRef) => {
    return (
      <input
        ref={forwardedRef}
        type="text"
        {...props}
        className={cn(inputOptions(), className)}
      />
    );
  }
);
export default Input;
