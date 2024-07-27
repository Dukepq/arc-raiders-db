import * as Dropdown from "@radix-ui/react-dropdown-menu";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: () => void;
};

export default function DropdownWrap({
  children,
  trigger,
  open,
  onOpenChange,
}: DropdownProps) {
  return (
    <Dropdown.Root open={open} onOpenChange={onOpenChange}>
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="start" asChild>
          {children}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

export function DropdownItem({ children }: { children: React.ReactNode }) {
  return <Dropdown.Item asChild>{children}</Dropdown.Item>;
}
