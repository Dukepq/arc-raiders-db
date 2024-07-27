import { CheckCheck, X, CircleAlert } from "lucide-react";
import cn from "@/app/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

export const toastOptions = cva(
  "px-4 py-2.5 flex gap-2 items-center relative font-semibold border border-border-grey z-[1000]",
  {
    variants: {
      variant: {
        default: " bg-primary-mild text-text rounded-sm ",
        success: " bg-primary-mild text-text rounded-sm",
        error: " bg-primary-mild text-error rounded-sm",
        cyber:
          "bg-accent text-background font-bold border-none rounded-none uppercase text-lg py-1.5",
      },
      size: {
        default: "min-w-72",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type CustomToastProps = {
  children: React.ReactNode;
  iconSize: number;
  dismissFunc?: () => void;
} & VariantProps<typeof toastOptions> &
  React.HTMLAttributes<HTMLDivElement>;

export default function CustomToast({
  children,
  iconSize,
  dismissFunc,
  variant,
  size,
  className,
}: CustomToastProps) {
  let icon;
  if (variant === "success") icon = <CheckCheck size={iconSize} />;
  if (variant === "error") icon = <CircleAlert size={iconSize} />;

  return (
    <div className={cn(toastOptions({ variant, size }), className)}>
      {icon}
      <span>{children}</span>
      {!!dismissFunc && (
        <button
          onClick={() => dismissFunc()}
          className="absolute top-1 right-1"
        >
          <X size={15} className="text-text" />
        </button>
      )}
    </div>
  );
}
