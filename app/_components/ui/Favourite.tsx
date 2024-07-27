"use client";

import { BookmarkPlus, BookmarkMinus, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useFavourite from "@/app/hooks/useFavourite";
import { toast } from "sonner";
import CustomToast from "./CustomToast";

type FavouriteProps = {
  iconSize?: number;
  id?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function Favourite({
  iconSize = 20,
  id,
  ...props
}: FavouriteProps) {
  const [hovering, setHovering] = useState(false);
  const pathname = usePathname();
  const slug = pathname.split("/")[pathname.split("/").length - 1];
  const [favourite, setFavourite] = useFavourite(id || slug);

  let render = (
    <BookmarkPlus
      size={iconSize}
      className="opacity-50 hover:opacity-100 text-text"
    />
  );
  if (favourite) {
    if (hovering) {
      render = (
        <BookmarkMinus
          size={iconSize}
          className="opacity-100 text-accent-red"
        />
      );
    } else {
      render = (
        <BookmarkPlus size={iconSize} className="opacity-100 text-accent" />
      );
    }
  }

  return (
    <button
      {...props}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        if (!favourite) {
          setLocalStorageFav(slug);
          toast.custom((t) => (
            <CustomToast
              variant={"cyber"}
              dismissFunc={() => toast.dismiss(t)}
              iconSize={20}
            >
              Item bookmarked!
            </CustomToast>
          ));
        } else {
          removeLocalStorageFav(slug);
          toast.custom((t) => (
            <CustomToast
              variant={"cyber"}
              className="bg-accent-red"
              dismissFunc={() => toast.dismiss(t)}
              iconSize={20}
            >
              Bookmark removed.
            </CustomToast>
          ));
        }
        setFavourite((prev) => !prev);
      }}
    >
      {render}
    </button>
  );
}

function setLocalStorageFav(id: string) {
  if (typeof window === "undefined") return;
  let existingFavs = window.localStorage.getItem("favourite_items");
  if (existingFavs === null) {
    existingFavs = "[]";
  }
  const parsedFavs: any[] = JSON.parse(existingFavs);
  parsedFavs.push(id);
  window.localStorage.setItem("favourite_items", JSON.stringify(parsedFavs));
}

function removeLocalStorageFav(toRemove: string) {
  if (typeof window === "undefined") return;
  const favouritesString = window.localStorage.getItem("favourite_items");
  if (!favouritesString) return;
  const favourites = JSON.parse(favouritesString);
  if (!Array.isArray(favourites)) {
    window.localStorage.removeItem("favourite_items");
    return;
  }
  const filteredFavourites = favourites.filter((fav) => fav !== toRemove);
  window.localStorage.setItem(
    "favourite_items",
    JSON.stringify(filteredFavourites)
  );
}
