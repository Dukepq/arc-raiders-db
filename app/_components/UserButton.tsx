import DropdownWrap, { DropdownItem } from "./ui/DropdownWrap";
import {
  ChevronDown,
  Cog,
  Loader2,
  LogOut,
  TriangleAlert,
  UserCog,
  UserCog2,
  X,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogWrapper from "./ui/Dialog";
import { logout } from "../lib/auth/authApi";
import cn from "../utils/cn";
import { Button, buttonOptions } from "./ui/Button";
import EditProfileForm from "./EditProfileForm";
import { useState } from "react";
import PopoverWrap from "./ui/PopoverWrap";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import Container from "./ui/Container";
import { DialogTitle } from "./ui/Dialog";
import DL from "../server/data-layer";
import { useSessionContext } from "../context/sessionContext";
import logging from "../lib/logging";
import { deleteUserAction } from "../server/actions";
import { toast } from "sonner";

const ICON_SIZE = 18;

type UserButtonProps = {
  username: string;
};

export default function UserButton({ username }: UserButtonProps) {
  return (
    <Dialog.Root>
      <DropdownWrap
        trigger={
          <button
            className={cn(
              buttonOptions({ variant: "timid" }),
              "max-w-28 truncate"
            )}
          >
            <span>{username}</span>
          </button>
        }
      >
        <div className="z-[120] bg-backdrop py-1 border border-border-grey rounded-sm">
          <ul
            className={`
        [&>li>button]:flex [&>li>button]:items-center [&>li>button]:gap-2 [&>li>button]:w-full
        [&>li>button]:justify-between [&>li]:hover:outline-none
        `}
          >
            <DropdownItem>
              <li className="hover:bg-arc-badge-secondary cursor-pointer transition-colors duration-50">
                <Dialog.Trigger className="py-1 px-3">
                  <span>Profile</span>
                  <UserCog size={ICON_SIZE} />
                </Dialog.Trigger>
              </li>
            </DropdownItem>
            <DropdownItem>
              <li className="hover:bg-arc-badge-secondary cursor-pointer transition-colors duration-50">
                <button
                  className="py-1 px-3"
                  onClick={async () => {
                    await logout();
                    location.reload();
                  }}
                >
                  <span>Sign Out</span>
                  <LogOut size={ICON_SIZE} />
                </button>
              </li>
            </DropdownItem>
          </ul>
        </div>
      </DropdownWrap>
      <EditProfileModal />
    </Dialog.Root>
  );
}

export function EditProfileModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-backdrop-darker data-[state=open]:animate-overlayShow fixed inset-0 opacity-50 z-[80]" />
      <Dialog.Content
        title={undefined}
        className="data-[state=open]:animate-modalSlideUpAndFade fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] z-[100]"
      >
        <Dialog.DialogClose className="absolute top-1 right-1">
          <X className="opacity-50 hover:opacity-100 transition-colors duration-35" />
        </Dialog.DialogClose>
        <div
          className={`px-6 py-2 bg-backdrop max-w-128 w-full flex flex-col h-80 overflow-auto
    gap-3 rounded-md border border-border-grey text-nowrap scrollbar-sm
    `}
        >
          <Dialog.Title className="font-medium text-text text-lg flex items-center gap-2">
            <UserCog2 size={20} />
            <span>Settings</span>
          </Dialog.Title>

          <EditProfileForm />
          <DangerZone />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function DangerZone() {
  const { user, setSession } = useSessionContext();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteUser = async () => {
    if (!user?.userId) return;
    setIsDeleting(true);
    const { message, success } = await deleteUserAction(user.userId);
    if (success) {
      toast.success(message);
      setSession((prev) => ({ ...prev, user: null }));
    } else {
      toast.error(message);
    }
    setIsDeleting(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1"
      >
        <span>More settings</span>
        <ChevronDown size={15} className={cn("", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="mt-3">
          <DialogWrapper
            trigger={
              <button
                className={cn(
                  buttonOptions({ variant: "outline" }),
                  "border-accent-red text-accent-red flex gap-3 items-center"
                )}
              >
                <span>Remove account</span>
                <TriangleAlert size={16} />
              </button>
            }
          >
            <Container
              as={"div"}
              size={"xs"}
              className="bg-backdrop-darker gap-3 rounded-md"
            >
              <DialogTitle className="text-lg font-semibold mb-3">
                Remove account
              </DialogTitle>
              <p className="mb-3">
                This will delete your account and any content associated with
                it, are you sure?
              </p>
              <Button
                disabled={isDeleting}
                onClick={deleteUser}
                className={cn(
                  "bg-accent-red min-h-8 text-backdrop font-semibold w-full text-center flex justify-center items-center",
                  isDeleting && "grayscale"
                )}
              >
                {isDeleting ? (
                  <Loader2 size={21} className="animate-spin" />
                ) : (
                  <span>Remove account</span>
                )}
              </Button>
            </Container>
          </DialogWrapper>
        </div>
      )}
    </div>
  );
}
