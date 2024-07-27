"use client";

import * as Popover from "@radix-ui/react-popover";

type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export default function PopoverWrap({ children, trigger }: PopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" asChild>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
