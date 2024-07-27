"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "../utils/cn";
import ProgressLink from "./ui/ProgressLink";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.AllHTMLAttributes<HTMLAnchorElement>;
export function NavLink({ children, href, className, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const highlighted = segments[1] && href.includes(segments[1]);
  return (
    <ProgressLink
      draggable="false"
      href={href}
      className={cn(
        "flex items-center gap-2 hover:bg-text hover:bg-opacity-10 border-b-2 border-b-backdrop hover:border-b-text hover:border-opacity-10 h-full",
        highlighted &&
          "border-b-accent hover:border-b-accent hover:border-opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </ProgressLink>
  );
}
