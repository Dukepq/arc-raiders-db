"use client";

import { useNavigationProgressContext } from "@/app/context/navigationProgressContext";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { forwardRef, startTransition } from "react";

type ProgressLinkProps = { children: React.ReactNode; href: string } & Omit<
  LinkProps,
  "href"
> &
  React.AllHTMLAttributes<HTMLAnchorElement>;

const ProgressLink = forwardRef<HTMLAnchorElement, ProgressLinkProps>(
  function ProgressLink(
    { children, href, ...props }: ProgressLinkProps,
    forwardedRef
  ) {
    const pathname = usePathname();
    const router = useRouter();
    const progress = useNavigationProgressContext();
    return (
      <Link
        ref={forwardedRef}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          if (pathname === href) return;
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
);

export default ProgressLink;
