"use client";

import cn from "@/app/utils/cn";
import { X } from "lucide-react";
import { useState } from "react";

type BannerProps = {
  dismissable: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Banner({
  dismissable,
  className,
  ...props
}: BannerProps) {
  const [hidden, setHidden] = useState(false);
  return (
    <>
      {!hidden && (
        <div
          {...props}
          className={cn(
            "py-2 px-3 text-base bg-accent-red flex justify-center",
            className
          )}
        >
          <span>This project is a work in progress, expect bugs!</span>
          {dismissable && (
            <button
              className="justify-self-end ml-6"
              onClick={() => setHidden(true)}
            >
              <X />
            </button>
          )}
        </div>
      )}
    </>
  );
}
