import { buttonOptions } from "./_components/ui/Button";
import Link from "next/link";
import cn from "./utils/cn";
import TrendingSection, {
  TrendingSectionSkeleton,
} from "./_components/TrendingSection";
import { Suspense } from "react";
import Image from "next/image";
import mapImage from "@/public/blank.png";
import { Map } from "lucide-react";
import Footer from "./_components/Footer";
import ProgressLink from "./_components/ui/ProgressLink";

export default function Page() {
  return (
    <>
      <div
        id="main-content"
        className="px-3 py-4 min-h-[calc(100vh-var(--nav-height))]"
      >
        <header className="bg-backdrop p-12 rounded-sm max-w-screen-xl mx-auto relative overflow-hidden">
          <div className="relative z-50">
            <h1 className="font-bold text-5xl mb-2">Arc: Raiders Database</h1>
            <p className="text-xl font-light max-w-lg">
              Find all information you need about weapons, gear, materials and
              more.
            </p>
            <ProgressLink
              href={"/db"}
              className={cn(
                buttonOptions({ variant: "default", size: "lg" }),
                "mt-4 inline-block"
              )}
            >
              Browse Database
            </ProgressLink>
          </div>

          <div className="hidden absolute w-128 h-full -right-16 bottom-0 z-10 lg:block select-none">
            <Image
              src={"/celeste-hero.webp"}
              alt="arc raiders character"
              quality={60}
              loading="eager"
              width={335}
              height={640}
              className="w-60"
              style={{
                objectFit: "cover",
                zIndex: "200",
                position: "absolute",
              }}
            />
            <Image
              src={"/logo-bars.svg"}
              alt="rarity bars"
              fill={true}
              quality={100}
              loading="eager"
              className="scale-125"
            />
          </div>
        </header>

        <main className="max-w-screen-xl mx-auto mt-4">
          <div className="bg-backdrop p-12 flex justify-center overflow-hidden relative rounded-sm">
            <div className="max-w-128 relative z-10 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-center">
                Interactive maps are here!
              </h2>
              <p className="text-center opacity-80 p-2">
                Use our interactive maps to learn more about item spawns, events
                and points of interest. Or try to optimize your looting route!
              </p>
              <Link
                href={"/maps/spaceport"}
                className={cn(
                  buttonOptions({ variant: "outline" }),
                  "mt-4 w-min flex justify-center items-center gap-3 group border-accent text-accent text-base"
                )}
              >
                <span>Explore Maps</span>
                <Map size={20} />
              </Link>
            </div>
            {/*TODO: image currently causing layout shift*/}
            <Image
              draggable="false"
              quality={35}
              src={mapImage}
              alt="arc map example"
              className="absolute opacity-15 h-full w-full top-0 -left-0 scale-110"
              style={{ objectFit: "cover" }}
              role="presentation"
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
