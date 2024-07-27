import { useEffect, useState } from "react";

export default function useFavourite(id: string) {
  const [favourite, setFavourite] = useState<boolean>(false);
  useEffect(() => {
    const item = window.localStorage.getItem("favourite_items");
    if (!item) return;
    const items: string[] = JSON.parse(item);
    if (!Array.isArray(items)) return;
    if (items.includes(id)) {
      setFavourite(true);
    }
  }, [id]);
  return [favourite, setFavourite] as const;
}
