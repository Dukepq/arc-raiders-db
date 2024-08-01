"use client";

import { usePathname } from "next/navigation";
import { deleteCommentAction } from "../server/actions";
import { Button } from "./ui/Button";
import { startTransition, useTransition } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type CommentProps = {
  username: string;
  createdAt: Date | string;
  content: string;
  commentId: string;
  deleteAble: boolean;
};

export default function Comment({
  content,
  username,
  createdAt,
  commentId,
  deleteAble,
}: CommentProps) {
  const createdAtDate = new Date(createdAt);
  return (
    <div className="flex justify-between mb-5 bg-backdrop-darker p-2 rounded-sm">
      <div>
        <div className="flex mb-1">
          <div className="size-12 bg-secondary mr-3 rounded-sm"></div>
          <div className="flex flex-col">
            <span className="text-base font-bold">{username}</span>
            <span className="text-sm font-light opacity-50">
              {createdAtDate.toUTCString()}
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

  return (
    <Button
      className="py-0.5 px-1.5 h-fit ml-20"
      onClick={async () => {
        startTransition(async () => {
          const result = await deleteCommentAction(commentId, pathname);
          if (result.success) {
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
