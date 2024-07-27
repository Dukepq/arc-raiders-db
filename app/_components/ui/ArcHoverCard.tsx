"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import ArcItemCard from "./ArcItemCard";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { Item } from "@/app/types/itemTypes";
import { fetchItem } from "@/app/lib/data/api";

type ArcHoverCardProps = {
  id: string;
  children: React.ReactNode;
  side?: "right" | "top" | "bottom" | "left";
  align?: "center" | "start" | "end";
};

export default function ArcHoverCard({
  children,
  id,
  side,
  align,
}: ArcHoverCardProps) {
  const [item, setItem] = useState<Item | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    if (item?.itemId === id) return;
    setIsFetching(true);
    (async () => {
      const [item] = await fetchItem(id);
      if (item) setItem(() => item);
      setIsFetching(false);
    })();
  }, [open, id, item]);

  const shownCard = isFetching ? (
    <Spinner />
  ) : (
    item && (
      <ArcItemCard
        category={item.category || ""}
        description={item.description}
        name={item.name}
        price={item.baseValue}
        weight={Number(item.weight)}
      />
    )
  );

  return (
    <HoverCard.Root
      onOpenChange={(isOpen) => setOpen(isOpen)}
      open={open}
      closeDelay={0}
      openDelay={100}
    >
      {children}
      <HoverCard.Portal>
        <HoverCard.Content
          onMouseEnter={() => setOpen(false)}
          className="sm:block hidden"
          align={align || "start"}
          side={side || "right"}
        >
          {shownCard}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export function CardTrigger({ children }: { children: React.ReactNode }) {
  return <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>;
}
