"use client";

import cn from "../utils/cn";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import { FieldValues, useForm } from "react-hook-form";
import { editProfileSchema } from "../lib/validation/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionContext } from "../context/sessionContext";
import { changeUsernameAction } from "../server/actions";
import { LoaderCircle } from "lucide-react";
import CustomToast from "./ui/CustomToast";
import { toast } from "sonner";

type EditProfileForm = {
  closeParentDialog?: () => void;
};

export default function EditProfileForm({
  closeParentDialog,
}: EditProfileForm) {
  const { user, loading, update } = useSessionContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const username = data?.username;
    if (typeof username !== "string") {
      return;
    }

    const res = await changeUsernameAction(username);
    if (res.success) {
      toast.custom((t) => {
        return (
          <CustomToast variant={"success"} iconSize={20}>
            Your username is now{" "}
            <span className="text-accent font-bold">{username}</span>!
          </CustomToast>
        );
      });

      await update();
    } else {
      toast.error("something went wrong.");
    }
    if (closeParentDialog) closeParentDialog();
  };

  return (
    <div
      className={`px-6 py-12 bg-backdrop max-w-128 w-full flex flex-col
    gap-3 rounded-md border border-border-grey text-nowrap
    `}
    >
      <div className="flex w-full items-center justify-center opacity-75">
        <div style={{ height: 1 }} className="w-20 opacity-25 bg-text"></div>
        <h2 className="font-medium px-3">Change Profile Name</h2>
        <div style={{ height: 1 }} className="w-20 opacity-25 bg-text"></div>
      </div>
      <div className="mt-3">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative pb-6">
            <Input {...register("username")} className="w-full" id="new-name" />
            {errors.username && (
              <span className="block text-accent-red absolute bottom-0 animate-slideUpAndFade">{`${errors.username.message}`}</span>
            )}
          </div>
          <Button
            className={cn(
              "mt-3",
              isSubmitting || !isDirty ? "opacity-50" : "hover:bg-opacity-10",
              "w-full min-h-10 bg-text bg-opacity-5 transition-colors mt-3 text-text"
            )}
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <div className="flex justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            ) : (
              "confirm"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
