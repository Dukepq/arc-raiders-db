"use client";

import Link, { LinkProps } from "next/link";
import cn from "@/app/utils/cn";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Grid2X2,
  Swords,
  Ellipsis,
  Backpack,
  Weight,
} from "lucide-react";
import { usePathname } from "next/navigation";

function resourceMatches(locationPath: string, currentPath: string): boolean {
  const pathSegments = currentPath.split("/");
  pathSegments.pop();
  const withoutSlug = pathSegments.join("/");
  return locationPath === currentPath || locationPath === withoutSlug;
}

export default function Navigation() {
  return (
    <nav
      aria-label="database navigation"
      className="bg-backdrop rounded-sm p-3 overflow-y-clip select-none h-fit text-nowrap"
      draggable="false"
    >
      <ul>
        <ExpandableList
          trigger={"Items"}
          defaultOpen={true}
          pathname="/db/search/items"
        >
          <NavLinkItem href={"/db/search/items"}>
            <Grid2X2 size={16} />
            <span>All items</span>
          </NavLinkItem>
          <ExpandableList
            trigger={"Equipment"}
            pathname="/db/search/items/equipment"
          >
            <NavLinkItem href={"/db/search/items/equipment"}>
              <Backpack size={15} />
              <span>All equipment</span>
            </NavLinkItem>
            <NavLinkItem href={"/db/search/items/equipment/weapons"}>
              <Swords size={15} /> <span>Weapons</span>
            </NavLinkItem>
            <NavLinkItem href={"/db/search/items/equipment/other"}>
              <Ellipsis size={15} />
              <span>Other</span>
            </NavLinkItem>
          </ExpandableList>
          <NavLinkItem href={"/db/search/items/materials"}>
            <Weight size={15} />
            <span>Materials</span>
          </NavLinkItem>
          <NavLinkItem href={"/db/search/items/miscellaneous"}>
            <Weight size={15} />
            <span>Miscellaneous</span>
          </NavLinkItem>
        </ExpandableList>
      </ul>
    </nav>
  );
}

function ExpandableList({
  children,
  trigger,
  className,
  defaultOpen = false,
  onOpenChange,
  pathname,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode;
  trigger: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  pathname?: string;
}) {
  const path = usePathname();
  const [expanded, setExpanded] = useState<boolean>(
    defaultOpen || resourceMatches(pathname || "", path)
  );
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(expanded);
    }
  }, [expanded, onOpenChange]);

  return (
    <li>
      <button
        aria-expanded={expanded}
        className={cn(
          "flex items-center gap-1 cursor-pointer hover:bg-arc-rarity-uncommon hover:bg-opacity-10 px-3 py-1 rounded-sm w-full"
        )}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <ChevronRight
          size={15}
          className={cn("transition-transform", expanded && "rotate-90")}
        />
        {trigger}
      </button>
      {expanded && (
        <ul
          draggable="false"
          className={cn("flex flex-col pl-4", className)}
          {...props}
        >
          {children}
        </ul>
      )}
    </li>
  );
}

export function NavLinkItem({
  children,
  className,
  ...props
}: { children: React.ReactNode } & LinkProps &
  React.HTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  return (
    <li className="h-full">
      <Link
        draggable="false"
        className={cn(
          "flex items-center gap-1 hover:bg-arc-rarity-uncommon hover:bg-opacity-10 px-3 py-1 rounded-sm",
          className
        )}
        {...props}
      >
        {children}
        {pathname === props.href && (
          <span className="ml-auto h-3.5 w-1 bg-accent motion-safe:animate-pulse"></span>
        )}
      </Link>
    </li>
  );
}
