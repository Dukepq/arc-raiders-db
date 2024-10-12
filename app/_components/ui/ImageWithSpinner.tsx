"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import cn from "../../utils/cn";

type ImageWithSpinnerProps = { delay?: number } & ImageProps;

export default function ImageWithSpinner({
  delay,
  className,
  ...props
}: ImageWithSpinnerProps) {
  const [isLoading, setIsLoading] = useState(!delay);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setIsLoading(true), delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay]);
  return (
    <>
      <Image
        onLoad={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setIsLoading(false);
        }}
        {...props}
        className={cn(isLoading && "max-h-0", className)}
        alt="image"
      />

      <div className="w-full h-full grid place-content-center">
        <Spinner loading={isLoading} />
      </div>
    </>
  );
}
