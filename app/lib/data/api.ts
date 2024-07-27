import { Item } from "@/app/types/itemTypes";
import { QueryParameters } from "@/app/types/queries";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is missing.");
}

export const fetchItem = async (
  itemId: string
): Promise<[Item, null] | [null, Error]> => {
  const data = await fetchWithErrors<Item>(
    `${BASE_URL}/api/items/item?itemId=${itemId}`
  );
  return data;
};

export const fetchTrendingItems = async (): Promise<
  [Item[], null] | [null, Error]
> => {
  const data = await fetchWithErrors<Item[]>(
    `${BASE_URL}/api/items/item/trending`
  );
  return data;
};

export const fetchItemsWithAmountMatching = async (query: QueryParameters) => {
  const url = new URL(`${BASE_URL}/api/items`);
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (!value) continue;
    searchParams.set(key, value.toString());
  }
  url.search = searchParams.toString();

  const data = await fetchWithErrors<{
    items: Item[];
    totalMatchingItems: number;
  }>(url);

  return data;
};

export const fetchWithErrors = async <T>(
  url: string | URL | Request,
  init?: RequestInit | undefined
): Promise<[T, null] | [null, Error]> => {
  const res = await fetch(url, init);
  if (!res.ok) {
    return [null, new Error(res.statusText)];
  }
  const data: T = await res.json();
  return [data, null];
};
