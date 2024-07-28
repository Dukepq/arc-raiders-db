"use client";

import { ChevronDown } from "lucide-react";
import DropdownWrap, { DropdownItem } from "@/app/_components/ui/DropdownWrap";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import cn from "@/app/utils/cn";
import { Suspense } from "react";
import { URLSearchParamHandler } from "@/app/lib/URLSearchParamHandler";

/*ISSUE: when setting search params, then refreshing the page, then emptying search params
the page does not update as expected.
reproduce: page load -> apply search param -> refresh page -> remove search params

SOLVED: in next 14.2.5 https://github.com/vercel/next.js/issues/64978#issuecomment-2200184303
*/

export default function ItemFilters() {
  return (
    <div
      className="rounded-sm mb-3 overflow-auto flex items-center
      [&>button]:flex [&>button]:items-center [&>button]:gap-1 [&>button]:bg-backdrop
      [&>button]:px-3 [&>button]:py-1.5 [&>button]:outline-none gap-3"
    >
      <Suspense fallback={<ItemFilterButtonSkeleton />}>
        <RarityFilter />
      </Suspense>
      <Suspense fallback={<ItemFilterButtonSkeleton />}>
        <TypeFilter />
      </Suspense>
    </div>
  );
}

const typeDropdownItems: { name: string }[] = [
  {
    name: "technological",
  },
  {
    name: "civilian",
  },
];

export function TypeFilter() {
  const params = useSearchParams();
  const typeFilter = params.get("type");
  const newParams = new URLSearchParamHandler(params);
  newParams.delete("page");

  return (
    <DropdownWrap
      trigger={
        <button>
          <span>Type</span> <ChevronDown size={15} />
        </button>
      }
    >
      <ul
        className="
        bg-backdrop py-3 [&>li>a]:px-3 hover:[&>li>a]:bg-primary-mild focus:[&>li>a]:bg-primary-mild
        [&>li>a]:flex [&>li>a]:w-full [&>li>a]:gap-3 [&>li>a]:min-w-40
        [&>li>a]:py-0.5 border border-border-grey rounded-sm [&>li>a]:items-center
        animate-slideDownAndFade [&>li>a]:outline-none"
      >
        {!!typeFilter && (
          <li>
            <DropdownItem>
              <Link
                replace={true}
                href={`?${newParams.delete("type").getParams()}`}
              >
                <span className="text-accent-red">Remove filter</span>
              </Link>
            </DropdownItem>
          </li>
        )}
        {typeDropdownItems.map(({ name }) => (
          <li key={name}>
            <DropdownItem>
              <Link
                replace={true}
                href={`?${newParams.set("type", name).getParams()}`}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-1 h-5 bg-text opacity-25",
                    typeFilter === name && "opacity-100 animate-pulse"
                  )}
                ></span>
                <span>{name}</span>
              </Link>
            </DropdownItem>
          </li>
        ))}
      </ul>
    </DropdownWrap>
  );
}

const rarityDropdownItems: { name: string; colorHex: string }[] = [
  {
    name: "common",
    colorHex: "#03CC7C",
  },
  {
    name: "uncommon",
    colorHex: "#54C8E7",
  },
  {
    name: "rare",
    colorHex: "#F32734",
  },
  {
    name: "scarce",
    colorHex: "#ECA610",
  },
];

export function RarityFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const rarityFilter = params.get("rarity");
  const newParams = new URLSearchParamHandler(params);
  newParams.delete("page");

  return (
    <DropdownWrap
      trigger={
        <button>
          <span>Rarity</span> <ChevronDown size={15} />
        </button>
      }
    >
      <ul
        className="
        bg-backdrop py-3 [&>li>a]:px-3 hover:[&>li>a]:bg-primary-mild focus:[&>li>a]:bg-primary-mild
        [&>li>a]:flex [&>li>a]:w-full [&>li>a]:gap-3 [&>li>a]:min-w-40
        [&>li>a]:py-0.5 border border-border-grey rounded-sm [&>li>a]:items-center
        animate-slideDownAndFade [&>li>a]:outline-none"
      >
        {!!rarityFilter && (
          <li>
            <DropdownItem>
              <Link
                replace={true}
                href={`?${newParams.delete("rarity").getParams()}`}
              >
                <span className="text-accent-red">Remove filter</span>
              </Link>
            </DropdownItem>
          </li>
        )}
        {rarityDropdownItems.map(({ name, colorHex }) => (
          <li key={name}>
            <DropdownItem>
              <Link
                replace={true}
                href={`?${newParams.set("rarity", name).getParams()}`}
              >
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: colorHex }}
                  className={cn(
                    "h-5 w-1 opacity-50",
                    rarityFilter === name && "opacity-100 animate-pulse"
                  )}
                ></span>
                <span>{name}</span>
              </Link>
            </DropdownItem>
          </li>
        ))}
      </ul>
    </DropdownWrap>
  );
}

export function BookmarkedFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const bookmarkedFilter = params.get("bookmarked");

  const newParams = new URLSearchParamHandler(params);
  newParams.delete("page");

  // useEffect(() => {
  //   if (!bookmarkedFilter) router.refresh();
  // }, [bookmarkedFilter, router]);

  return (
    <DropdownWrap
      trigger={
        <button>
          <span>Bookmarked</span> <ChevronDown size={15} />
        </button>
      }
    >
      <ul
        className="bg-backdrop py-3 [&>li>a]:px-3 hover:[&>li>a]:bg-primary-mild focus:[&>li>a]:bg-primary-mild
        [&>li>a]:flex [&>li>a]:w-full [&>li>a]:gap-3 [&>li>a]:min-w-40
        [&>li>a]:py-0.5 border border-border-grey rounded-sm [&>li>a]:items-center
        animate-slideDownAndFade [&>li>a]:outline-none"
      >
        {!!bookmarkedFilter && (
          <li>
            <DropdownItem>
              <Link
                className="text-accent-red"
                href={`?${newParams.delete("bookmarked").getParams()}`}
              >
                Remove filter
              </Link>
            </DropdownItem>
          </li>
        )}
        <li>
          <DropdownItem>
            <Link href={`?${newParams.set("bookmarked", "true").getParams()}`}>
              Yes
            </Link>
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            <Link href={`?${newParams.set("bookmarked", "false").getParams()}`}>
              No
            </Link>
          </DropdownItem>
        </li>
      </ul>
    </DropdownWrap>
  );
}

export function ItemFilterButtonSkeleton() {
  return (
    <div className="flex items-center gap-1 bg-backdrop px-3 py-1.5 animate-pulse"></div>
  );
}
