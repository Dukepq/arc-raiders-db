"use client";
import cn from "@/app/utils/cn";
import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  overlayStyle?: string;
  onInteractOutside?: () => void;
};
export default function Dialog({
  trigger,
  children,
  overlayStyle,
  onInteractOutside,
}: ModalProps) {
  return (
    <D.Root>
      <D.Trigger asChild>{trigger}</D.Trigger>
      <D.Portal>
        <D.Overlay
          className={cn(
            "bg-backdrop-darker data-[state=open]:animate-overlayShow fixed inset-0 opacity-50 z-[60]",
            overlayStyle
          )}
        />
        <D.Content
          onInteractOutside={onInteractOutside}
          className="data-[state=open]:animate-modalSlideUpAndFade fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] z-[100]"
        >
          <div>
            <D.DialogClose className="absolute top-1 right-1">
              <X className="opacity-50 hover:opacity-100 transition-colors duration-35" />
            </D.DialogClose>
            {children}
          </div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}

export function DialogTitle({
  children,
  ...props
}: { children: React.ReactNode } & React.AllHTMLAttributes<HTMLElement>) {
  return <D.Title {...props}>{children}</D.Title>;
}
