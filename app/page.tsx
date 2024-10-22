import { buttonOptions } from "./_components/ui/Button";
import cn from "./utils/cn";
import Image from "next/image";
import Footer from "./_components/Footer";
import ProgressLink from "./_components/ui/ProgressLink";

export default function Page() {
  return (
    <>
      <main
        id="main-content"
        className="px-3 py-4 min-h-[calc(100vh-var(--nav-height))]"
      >
        <section className="bg-backdrop p-12 rounded-sm max-w-screen-xl mx-auto relative overflow-hidden">
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
        </section>

        <section className="max-w-screen-xl mx-auto mt-4"></section>
      </main>
      <Footer />
    </>
  );
}
