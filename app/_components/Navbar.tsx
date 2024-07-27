import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import cn from "../utils/cn";
import { paths } from "../config/navbarPaths";
import { NavLink } from "./NavLink";
import SignInOutButton from "./SignInButton";
import ProgressLink from "./ui/ProgressLink";

export default function Navbar() {
  return (
    <nav
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
    </nav>
  );
}
