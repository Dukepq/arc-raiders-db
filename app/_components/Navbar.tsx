"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import cn from "../utils/cn";
import { paths } from "../config/navbarPaths";
import ProgressLink from "./ui/ProgressLink";
import { useState } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuProgressLink,
  NavigationMenuTriggerProgressLink,
  NavigationMenu as NavMenu,
} from "./ui/NavigationMenu";
import SignInOutButton from "./SignInButton";
import NavSearchBar from "./NavSearchBar";

export default function Navbar() {
  const [valueOpen, setValueOpen] = useState<string>("");
  return (
    <>
      <div className="flex justify-between relative top-0 left-0 bg-backdrop px-3 text-nowrap z-[200] font-semibold">
        <NavMenu
          value={valueOpen}
          onValueChange={(value) => setValueOpen(value)}
          delayDuration={0}
          skipDelayDuration={0}
        >
          <NavigationMenuList className="flex h-12">
            <NavigationMenuItem>
              <ProgressLink
                draggable="false"
                href={"/"}
                className={cn("flex items-center h-full px-6")}
              >
                <Image
                  className="min-w-[25px]"
                  src={"/logo-circular.svg"}
                  alt="logo"
                  width={25}
                  height={25}
                />
              </ProgressLink>
            </NavigationMenuItem>
            <NavigationMenuItem
              onMouseLeave={() => setValueOpen("")}
              value="items"
              className="relative"
            >
              <NavigationMenuTriggerProgressLink href={paths.dbItems}>
                <span>Items</span>
                <ChevronDown size={16} />
              </NavigationMenuTriggerProgressLink>
              <NavigationMenuContent className="absolute z-30 top-12 left-0 w-full rounded-sm">
                {/* <span
                  aria-hidden
                  className="h-1 z-50 block bg-transparent"
                ></span> */}
                <div className="flex flex-col gap-0.5 p-1 bg-backdrop/85 backdrop-blur-md border border-border-grey min-w-40">
                  <NavigationMenuProgressLink
                    href={paths.dbItems + "/equipment"}
                  >
                    Equipment
                  </NavigationMenuProgressLink>
                  <NavigationMenuProgressLink
                    href={paths.dbItems + "/materials"}
                  >
                    Materials
                  </NavigationMenuProgressLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ProgressLink
                href={paths.dbEnemies}
                className="px-6 h-full flex gap-2 items-center hover:bg-text/10"
              >
                Enemies
              </ProgressLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ProgressLink
                href={paths.newsNotes}
                className="px-6 h-full flex gap-2 items-center hover:bg-text/10"
              >
                News
              </ProgressLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavMenu>

        <div className="flex gap-6 items-center pl-6">
          <SignInOutButton />
          <NavSearchBar />
        </div>
      </div>
      {/*    <nav
      aria-label="primary navigation"
      className="relative top-0 left-0 bg-backdrop px-3 text-nowrap z-50"
    >
      <div className="flex justify-between max-w-screen-2xl mx-auto font-medium overflow-x-auto">
        <ul className="flex [&>li>a]:px-6 h-12">
          <li>
            <ProgressLink
              draggable="false"
              href={"/"}
              className={cn("flex items-center h-full")}
            >
              <Image
                className="min-w-[25px]"
                src={"/logo-circular.svg"}
                alt="logo"
                width={25}
                height={25}
              />
            </ProgressLink>
          </li>
          <li>
            <NavLink href={paths.db}>
              <span>Database</span>
              <ChevronDown size={15} />
            </NavLink>
          </li>
          <li>
            <NavLink href={paths.mapSpaceport}>
              <span>Maps</span> <ChevronDown size={15} />
            </NavLink>
          </li>
          <li>
            <NavLink href={paths.newsNotes}>
              <span>Patch notes</span>
            </NavLink>
          </li>
        </ul>

        <div className="flex gap-6 items-center pl-6">
          <SignInOutButton />
          <NavSearchBar />
        </div>
      </div>
    </nav> */}
    </>
  );
}
