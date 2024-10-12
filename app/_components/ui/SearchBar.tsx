"use client";

import cn from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const searchBarOptions = cva("outline-none font-light px-3 py-1.5 text-sm", {
  variants: {
    variant: {
      default:
        "bg-text/5 rounded-sm border border-text/10 focus:border-text focus:border-opacity-25 hover:border-text hover:border-opacity-25 transition-colors",
    },
    size: { default: "" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

type SearchBarProps = {} & React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof searchBarOptions>;

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ variant, size, className, ...props }, forwardedRef) => {
    return (
      <form className="relative" onSubmit={(e) => e.preventDefault()}>
        <input
          {...props}
          ref={forwardedRef}
          spellCheck={false}
          placeholder="Search items..."
          type="text"
          className={cn(
            searchBarOptions({ variant, size }),
            "pr-15",
            className
          )}
        />
      </form>
    );
  }
);

export default SearchBar;
