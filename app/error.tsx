"use client";

import { Button } from "./_components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid place-content-center mt-6">
      <div className="w-128 bg-backdrop p-6 rounded-md">
        <h2 className="font-semibold text-xl">Error, something went wrong.</h2>
        <Button
          className="font-semibold mt-2 rounded-sm"
          size={"sm"}
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
