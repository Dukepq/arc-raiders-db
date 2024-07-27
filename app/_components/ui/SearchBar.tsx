"use client";

import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { SearchIcon } from "lucide-react";

const searchBarOptions = cva(
  "outline-none font-light pl-10 pr-3 py-1.5 text-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary-mild rounded-sm border border-transparent focus:border-text focus:border-opacity-25 hover:border-text hover:border-opacity-25 transition-colors",
      },
      size: { default: "" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

type SearchBarProps = {} & React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof searchBarOptions>;

export default function SearchBar({
  variant,
  size,
  className,
  ...props
}: SearchBarProps) {
  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <input
        {...props}
        placeholder="Search items..."
        type="text"
        className={cn(searchBarOptions({ variant, size }), className)}
      />
      <SearchIcon size={20} className="absolute top-1.5 left-2 opacity-50" />
    </form>
  );
}
