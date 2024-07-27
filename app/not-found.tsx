import Link from "next/link";
import { buttonOptions } from "./_components/ui/Button";
import cn from "./utils/cn";

export default function NotFound() {
  return (
    <div className="px-3">
      <div className="max-w-screen-xl mx-auto p-10 bg-backdrop rounded-sm mt-4">
        <h2 className="text-accent-red text-3xl font-semibold">
          404 - Not Found
        </h2>
        <p>This page does not exist :c</p>
        <Link
          className={cn(
            buttonOptions({ variant: "outline", size: "sm" }),
            "inline-block mt-4"
          )}
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
