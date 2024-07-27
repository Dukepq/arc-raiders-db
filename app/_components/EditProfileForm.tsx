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
  );
}
