import DropdownWrap, { DropdownItem } from "./ui/DropdownWrap";
import { LogOut, UserCog, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { logout } from "../lib/auth/authApi";
import cn from "../utils/cn";
import { buttonOptions } from "./ui/Button";
import EditProfileForm from "./EditProfileForm";

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
              <li className="hover:bg-arc-badge-secondary py-1 px-3 cursor-pointer transition-colors duration-50">
                <Dialog.Trigger>
                  <span>Profile</span>
                  <UserCog size={ICON_SIZE} />
                </Dialog.Trigger>
              </li>
            </DropdownItem>
            <DropdownItem>
              <li className="hover:bg-arc-badge-secondary py-1 px-3 cursor-pointer transition-colors duration-50">
                <button
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
      <Dialog.Content className="data-[state=open]:animate-modalSlideUpAndFade fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] z-[100]">
        <Dialog.DialogClose className="absolute top-1 right-1">
          <X className="opacity-50 hover:opacity-100 transition-colors duration-35" />
        </Dialog.DialogClose>
        <div
          className={`px-6 py-12 bg-backdrop max-w-128 w-full flex flex-col
    gap-3 rounded-md border border-border-grey text-nowrap
    `}
        >
          <div className="flex w-full items-center justify-center opacity-75">
            <div
              style={{ height: 1 }}
              className="w-full opacity-25 bg-text"
            ></div>
            <Dialog.Title className="font-medium px-3">
              Change Profile Name
            </Dialog.Title>
            <div
              style={{ height: 1 }}
              className="w-full opacity-25 bg-text"
            ></div>
          </div>
          <EditProfileForm />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
