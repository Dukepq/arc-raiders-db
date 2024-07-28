import cn from "@/app/utils/cn";

type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & {
  loading: boolean;
  children?: React.ReactNode;
};
export default function Spinner({
  className,
  children,
  loading,
  ...props
}: SpinnerProps) {
  if (!loading) return children;
  return <span {...props} className={cn("spinner", className)}></span>;
}
