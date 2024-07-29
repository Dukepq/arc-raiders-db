"use client";

import useDebounce from "@/app/hooks/useDebounce";
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "./ui/SearchBar";
import { useRouter } from "next/navigation";
import cn from "../utils/cn";
import { RefreshCw } from "lucide-react";
import { fetchItemsWithAmountMatching } from "../lib/data/api";

// TODO: refactor to use a dropdown menu

export default function NavSearchBar() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [isLoadAvailable, setIsLoadAvailable] = useState<boolean>(true);
  const [items, setItems] = useState<{ [key: string]: string; id: string }[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const pageRef = useRef<number>(1);
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 500);

  const handleLoad = async () => {
    const page = (++pageRef.current).toString();
    const [data, error] = await fetchItemsWithAmountMatching({
      page: page,
      search,
    });
    if (error) return [];
    const { items: newItems } = data;
    if (newItems.length === 0) setIsLoadAvailable(false);
    if (newItems) {
      setItems((prev) => {
        return [...prev].concat(
          newItems.map((item) => ({
            id: item.itemId,
            icon: item.icon,
            name: item.name,
          }))
        );
      });
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!modalOpen) return;
      if (items.length < 0) return;
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setSelectedItem((prev) => {
            if (prev === null) return 0;
            return prev + 1 > items.length ? 0 : prev + 1;
          });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setSelectedItem((prev) => {
            if (prev === null) return 0;
            return prev - 1 >= 0 ? prev - 1 : items.length;
          });
          break;
        }
        case "Enter": {
          if (items.length === selectedItem) {
            handleLoad();
            return;
          }
          if (typeof selectedItem !== "number") return;
          const targettedItem = items[selectedItem];
          router.push(`/db/item/${targettedItem.id}`);
          setModalOpen(false);
          setSearch("");
        }
      }
    },
    [selectedItem, items, modalOpen, router]
  );

  useEffect(() => {
    setSelectedItem(0);
  }, [modalOpen]);

  useEffect(() => {
    (async () => {
      const [res, error] = await fetchItemsWithAmountMatching({
        page: "1",
        search: debouncedSearch,
      });
      if (error) return;

      const { items: newItems, totalMatchingItems: count } = res;

      if (count === 0) {
        setIsLoadAvailable(false);
      } else {
        setIsLoadAvailable(true);
      }

      if (newItems) {
        setItems(() =>
          newItems.map((item) => ({
            icon: item.icon,
            name: item.name,
            id: item.itemId,
          }))
        );
      }

      pageRef.current = 1;
    })();
  }, [debouncedSearch]);

  return (
    <Popover.Root open={modalOpen}>
      <Popover.Trigger asChild>
        <div>
          <SearchBar
            autoComplete="off"
            onKeyDown={handleKeyDown}
            id="nav-input"
            value={search}
            onClick={() => setModalOpen((prev) => !prev)}
            onChange={(e) => {
              setSelectedItem(0);
              setModalOpen(() => true);
              setSearch(e.target.value);
            }}
          />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onInteractOutside={(e: any) => {
            if ("nav-input" !== e.target?.id) setModalOpen(() => false);
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="border-y border-border-grey rounded-sm w-60 mt-2 z-50 max-h-72 overflow-auto"
        >
          <ul autoFocus className="capitalize">
            {items &&
              items.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={() => {
                      setModalOpen(false);
                      setSearch("");
                    }}
                    href={`/db/item/${item.id}`}
                  >
                    <div
                      className={cn(
                        "flex gap-3 items-center p-2 border-y border-y-border-grey bg-backdrop hover:bg-primary",
                        index === selectedItem && "bg-primary"
                      )}
                    >
                      <Image
                        className="rounded-sm"
                        src={item.icon}
                        alt="icon"
                        width={30}
                        height={30}
                      />

                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
            {isLoadAvailable && (
              <li>
                <button
                  onClick={handleLoad}
                  className={cn(
                    `group w-full text-border-grey hover:text-arc-badge flex gap-3 items-center
                  justify-center p-2 border-y border-y-border-grey bg-backdrop hover:bg-primary
                  hover:cursor-pointer`,
                    items.length === selectedItem && "bg-primary"
                  )}
                >
                  <RefreshCw
                    size={18}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                  <span style={{ textTransform: "none" }}>Load more</span>
                </button>
              </li>
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
