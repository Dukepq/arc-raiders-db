"use client";

import { usePathname } from "next/navigation";
import { deleteCommentAction } from "../../../server/actions";
import { Button } from "../../../_components/ui/Button";
import { useTransition } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useCommentContext } from "@/app/context/commentContext";
import { getRelativeTime } from "@/app/utils/utils";
import { User } from "@/app/types/auth";
import cn from "@/app/utils/cn";

type CommentProps = {
  username: User["username"];
  createdAt: Date | string;
  content: string;
  commentId: string;
  deleteAble: boolean;
  userRole?: User["role"];
};

export default function Comment({
  content,
  username,
  createdAt,
  commentId,
  deleteAble,
  userRole = "RAIDER",
}: CommentProps) {
  const createdAtDate = new Date(createdAt);
  const relativeDate = getRelativeTime(createdAtDate);
  return (
    <div className="flex justify-between mb-3 bg-backdrop-darker p-2 rounded-sm border border-border-grey">
      <div>
        <div className="flex mb-1">
          <div
            className={cn(
              "size-12 bg-secondary mr-3 rounded-sm",
              userRole === "ADMIN" && "border border-arc-rarity-scarce"
            )}
          ></div>
          <div className="flex flex-col">
            <span className="text-base font-bold">{username}</span>
            <span className="text-sm font-light opacity-50">
              {relativeDate}
            </span>
          </div>
        </div>
        <p className="font-light">{content}</p>
      </div>

      {deleteAble && <DeleteCommentButton commentId={commentId} />}
    </div>
  );
}

type DeleteCommentButtonProps = {
  commentId: string;
};
function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { setComments } = useCommentContext();

  return (
    <Button
      className="py-0.5 px-1.5 h-fit ml-20"
      onClick={async () => {
        startTransition(async () => {
          const result = await deleteCommentAction(commentId, pathname);
          if (result.success) {
            setComments((prev) =>
              prev.filter((entry) => entry.commentId !== result.data?.commentId)
            );
            toast.success(result.message || "deleted.");
          } else {
            toast.error(result.message || "something went wrong.");
          }
        });
      }}
      variant={"ghost"}
      size={"sm"}
    >
      {isPending ? (
        <LoaderCircle size={15} className="animate-spin" />
      ) : (
        <span>delete</span>
      )}
    </Button>
  );
}
