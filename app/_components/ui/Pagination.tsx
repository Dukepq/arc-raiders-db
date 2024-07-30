import { MAX_ITEMS_PER_PAGE } from "@/app/config/constants";
import cn from "@/app/utils/cn";
import Link, { LinkProps } from "next/link";
import {
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { searchParamSchema } from "@/app/lib/validation/searchParamSchemas";

type PaginationProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
  totalItems: number;
};

export default function Pagination({
  searchParams,
  totalItems,
}: PaginationProps) {
  const { data } = searchParamSchema.safeParse(searchParams);
  const params = Object.fromEntries(
    Object.entries(data || {}).filter(([key, value]) => !!value && !!key)
  );

  const pagesCount = Math.ceil(totalItems / MAX_ITEMS_PER_PAGE);
  if (pagesCount <= 1) {
    return null;
  }

  const page = data?.page ?? 1;
  const prevPage = Math.max(page - 1, 1);
  const nextPage = Math.min(page + 1, pagesCount);

  const surroundingPages = getSurroundingPages(Math.max(page, 1), pagesCount);
  return (
    <nav
      aria-label="pagination"
      className="flex bg-accent text-backdrop rounded-sm"
    >
      <PaginationButton
        aria-label="first page"
        className={cn(
          page === 1 && "opacity-50 hover:bg-opacity-0 cursor-default",
          "flex items-center"
        )}
        href={`?${new URLSearchParams({ ...params, page: "1" })}`}
      >
        <ChevronsLeft size={21} />
      </PaginationButton>
      <PaginationButton
        aria-label="previous page"
        className={cn(
          page === 1 && "opacity-50 hover:bg-opacity-0 cursor-default",
          "flex items-center"
        )}
        href={`?${new URLSearchParams({
          ...params,
          page: `${prevPage}`,
        })}`}
      >
        <ChevronLeft size={18} />
      </PaginationButton>
      {surroundingPages.map((surroundingPage, index) => {
        return (
          <PaginationButton
            key={index}
            className={cn(
              "px-3 w-10 text-center",
              page === surroundingPage &&
                "font-bold border-b-2 border-b-accent-red bg-text bg-opacity-10"
            )}
            href={`?${new URLSearchParams({
              ...params,
              page: Math.min(
                Math.max(surroundingPage, 1),
                pagesCount
              ).toString(),
            })}`}
          >
            <span>{surroundingPage}</span>
          </PaginationButton>
        );
      })}
      <PaginationButton
        aria-label="next page"
        className={cn(
          page === pagesCount && "opacity-50 hover:bg-opacity-0 cursor-default",
          "flex items-center"
        )}
        href={`?${new URLSearchParams({
          ...params,
          page: `${nextPage}`,
        })}`}
      >
        <ChevronRight size={18} />
      </PaginationButton>
      <PaginationButton
        aria-label="last page"
        className={cn(
          page === pagesCount && "opacity-50 hover:bg-opacity-0 cursor-default",
          "flex items-center"
        )}
        href={`?${new URLSearchParams({
          ...params,
          page: `${pagesCount}`,
        })}`}
      >
        <ChevronsRight size={21} />
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  children,
  className,
  ...props
}: { children: React.ReactNode } & LinkProps &
  React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      prefetch={true}
      {...props}
      className={cn(
        "px-1.5 py-1 uppercase hover:bg-text hover:bg-opacity-20",
        className
      )}
    >
      {children}
    </Link>
  );
}

function getSurroundingPages(page: number, max: number, items = 3): number[] {
  const arr: number[] = [];
  const start = Math.max(1, page - 1);
  for (let i = 0; i < items; i++) {
    if (start + i <= max) arr.push(start + i);
  }
  if (arr.length < items) {
    const missingLength = items - arr.length;
    const firstInArray = arr[0];
    for (let i = 0; i <= missingLength - 1; i++) {
      if (firstInArray - (i + 1) >= 1) arr.unshift(firstInArray - (i + 1));
    }
  }
  return arr;
}
