import { Frown } from "lucide-react";

export default function NotFoundCard() {
  return (
    <div className="flex flex-col items-center gap-1 p-3 bg-backdrop text-sm backdrop-blur-sm backdrop-opacity-80">
      <Frown size={20} />
      <span>Something went wrong.</span>
    </div>
  );
}
