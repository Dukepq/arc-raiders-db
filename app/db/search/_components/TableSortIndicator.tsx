import cn from "@/app/utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";

type TableSortButtonProps = {
  ascendingCondition: boolean;
  descendingCondition: boolean;
};

export default function TableSortIndicator({
  ascendingCondition,
  descendingCondition,
}: TableSortButtonProps) {
  return (
    <div>
      <ChevronUp
        size={15}
        className={cn(
          "opacity-50  translate-y-1 transition-all",
          ascendingCondition && "opacity-100"
        )}
      />
      <ChevronDown
        size={15}
        className={cn(
          "opacity-50 -translate-y-1 transition-all",
          descendingCondition && "opacity-100"
        )}
      />
    </div>
  );
}
