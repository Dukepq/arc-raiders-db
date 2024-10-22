import cn from "@/app/utils/cn";
import Link, { LinkProps } from "next/link";
import {
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { searchParamSchema } from "@/app/lib/validation/searchParamSchemas";
import { MAX_ITEMS_PER_PAGE } from "@/app/config/constants";

type PaginationProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
  itemsLength: number;
};

export default function Pagination({
  searchParams,
  itemsLength,
}: PaginationProps) {
  const { data } = searchParamSchema.safeParse(searchParams);
  const params = Object.fromEntries(
    Object.entries(data || {}).filter(([key, value]) => !!value && !!key)
  );

  const page = data?.page ?? 1;

  const prevPageExists = page - 1 >= 1;
  const prevPage = Math.max(page - 1, 1);

  const nextPageExists = itemsLength >= MAX_ITEMS_PER_PAGE;
  const nextPage = nextPageExists ? page + 1 : page;

  if (!nextPageExists && !prevPageExists) return null;

  return (
    <nav
      aria-label="pagination"
      className="flex bg-accent text-backdrop rounded-sm"
    >
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
      {prevPageExists && (
        <PaginationButton
          className={cn("px-3 w-10 text-center")}
          href={`?${new URLSearchParams({
            ...params,
            page: prevPage.toString(),
          })}`}
        >
          <span>{prevPage}</span>
        </PaginationButton>
      )}
      <PaginationButton
        className={cn(
          "px-3 w-10 text-center font-bold border-b-2 border-b-accent-red bg-text bg-opacity-10"
        )}
        href={`?${new URLSearchParams({
          ...params,
          page: page.toString(),
        })}`}
      >
        <span>{page}</span>
      </PaginationButton>
      {nextPageExists && page !== nextPage && (
        <PaginationButton
          className={"px-3 w-10 text-center"}
          href={`?${new URLSearchParams({
            ...params,
            page: nextPage.toString(),
          })}`}
        >
          <span>{nextPage}</span>
        </PaginationButton>
      )}

      <PaginationButton
        aria-label="next page"
        className={cn(
          !nextPageExists && "opacity-50 hover:bg-opacity-0 cursor-default",
          "flex items-center"
        )}
        href={`?${new URLSearchParams({
          ...params,
          page: `${nextPage}`,
        })}`}
      >
        <ChevronRight size={18} />
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
