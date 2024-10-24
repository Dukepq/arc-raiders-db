"use client";

import useDebounce from "@/app/hooks/useDebounce";
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "./ui/SearchBar";
import { useRouter } from "next/navigation";
import cn from "../utils/cn";
import { fetchItemsWithAmountMatching } from "../lib/data/api";
import { Loader2 } from "lucide-react";
import ProgressLink from "./ui/ProgressLink";

export default function NavSearchBar() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [items, setItems] = useState<{
    data: { [key: string]: string; id: string }[];
    allLoaded: boolean;
  }>({ data: [], allLoaded: false });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const pageRef = useRef<number>(1);
  const listItemsRef = useRef<(HTMLElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const displayLoader =
    (loading && !items.allLoaded && modalOpen) ||
    (search !== debouncedSearch && search.length > 0);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const page = (++pageRef.current).toString();
    const [data, error] = await fetchItemsWithAmountMatching({
      page: page,
      search,
    });
    if (error) return [];
    const { items: newItems, totalMatchingItems } = data;
    if (newItems) {
      setItems((prev) => {
        return {
          data: [...prev.data].concat(
            newItems.map((item) => ({
              id: item.itemId,
              icon: item.icon,
              name: item.name,
            }))
          ),
          allLoaded: totalMatchingItems === prev.data.length + newItems.length,
        };
      });
    }
    setLoading(false);
  }, [search]);

  const handleScrollEnd = async (
    e: React.UIEvent<HTMLUListElement, UIEvent>
  ) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (!loading && !items.allLoaded) {
        await loadItems();
      }
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!modalOpen) return;
      if (items.data.length < 0) return;
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setActiveIndex((prev) => {
            if (typeof prev === "number" && prev + 1 < items.data.length) {
              return prev + 1;
            }
            return prev;
          });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setActiveIndex((prev) => {
            if (typeof prev === "number" && prev - 1 >= 0) {
              return prev - 1;
            }
            return prev;
          });
          break;
        }
        case "Enter": {
          if (typeof activeIndex !== "number") return;
          const targettedItem = items.data[activeIndex];
          router.push(`/db/item/${targettedItem.id}`);
          setModalOpen(false);
          setSearch("");
        }
      }
    },
    [activeIndex, items, modalOpen, router]
  );

  useEffect(() => {
    if (typeof activeIndex === "number" && listItemsRef.current[activeIndex]) {
      listItemsRef.current[activeIndex].scrollIntoView();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (debouncedSearch.length < 3) {
      // empty previous search results
      setItems(() => ({
        data: [],
        allLoaded: false,
      }));
      return;
    }
    (async () => {
      setLoading(true);
      const [res, error] = await fetchItemsWithAmountMatching({
        page: "1",
        search: debouncedSearch,
      });
      if (error) return;

      const { items: newItems, totalMatchingItems } = res;

      if (newItems) {
        setItems(() => ({
          data: newItems.map((item) => ({
            icon: item.icon,
            name: item.name,
            id: item.itemId,
          })),
          allLoaded: totalMatchingItems === newItems.length,
        }));
      }

      pageRef.current = 1;
      setLoading(false);
    })();
  }, [debouncedSearch]);

  let itemList: React.ReactNode | undefined;

  if (debouncedSearch.length >= 3) {
    itemList = (
      <ul
        className="scrollbar-sm rounded-sm w-60 mt-2 max-h-64 overflow-auto capitalize animate-slideDownAndFade"
        onScroll={handleScrollEnd}
      >
        {items &&
          items.data.map((item, index) => (
            <li
              key={index}
              ref={(e) => {
                listItemsRef.current[index] = e;
              }}
            >
              <ProgressLink
                whenClicked={() => {
                  setModalOpen(false);
                  setSearch("");
                }}
                href={`/db/item/${item.id}`}
                className={cn(
                  "flex items-center gap-3 p-2 bg-backdrop/50 hover:bg-primary/25 transition-colors duration-100 overflow-hidden",
                  index === activeIndex && "bg-primary/50"
                )}
              >
                <Image
                  className="rounded-sm"
                  src={item.icon}
                  alt="icon"
                  width={30}
                  height={30}
                />
                <span className="truncate">{item.name}</span>
              </ProgressLink>
            </li>
          ))}
      </ul>
    );
  } else {
    itemList = (
      <div className="bg-backdrop/20 p-2 text-center text-sm">
        start typing to search
      </div>
    );
  }

  return (
    <Popover.Root open={modalOpen}>
      <Popover.Trigger asChild>
        <div className="relative">
          <SearchBar
            autoComplete="off"
            onKeyDown={handleKeyDown}
            id="nav-input"
            value={search}
            onClick={() => setModalOpen((prev) => !prev)}
            onChange={(e) => {
              setActiveIndex(0);
              setModalOpen(() => true);
              setSearch(e.target.value);
            }}
          />
          {displayLoader && (
            <Loader2
              size={18}
              className="animate-spin absolute right-2 top-2"
            />
          )}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          style={{ zIndex: 1000 }}
          onInteractOutside={(e: any) => {
            if ("nav-input" !== e.target?.id) setModalOpen(() => false);
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-red backdrop-blur-md w-60"
        >
          {itemList}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
