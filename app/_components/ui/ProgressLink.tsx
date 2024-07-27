"use client";

import { useNavigationProgressContext } from "@/app/context/navigationProgressContext";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, startTransition } from "react";

type ProgressLinkProps = { children: React.ReactNode; href: string } & Omit<
  LinkProps,
  "href"
> &
  React.AllHTMLAttributes<HTMLAnchorElement>;
export default function ProgressLink({
  children,
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const progress = useNavigationProgressContext();
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        progress.start();

        startTransition(() => {
          progress.done();
          router.push(href.toString());
        });
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
