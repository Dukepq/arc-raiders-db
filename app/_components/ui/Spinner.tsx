import cn from "@/app/utils/cn";

export default function Spinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={cn("spinner", className)}></span>;
}
