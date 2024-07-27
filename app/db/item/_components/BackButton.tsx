"use client";

import { Button } from "@/app/_components/ui/Button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return (
    <Button
      {...props}
      size={"sm"}
      variant={"default"}
      className="py-1 pl-1 pr-2 bg-backdrop bg-opacity-75 hover:bg-opacity-100 text-text flex items-center gap-1"
      onClick={() => router.back()}
    >
      <ChevronLeft size={15} /> <span>{children}</span>
    </Button>
  );
}
