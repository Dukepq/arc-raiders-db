"use client";

import { usePathname } from "next/navigation";
import { deleteCommentAction } from "../server/actions";
import { Button } from "./ui/Button";

type CommentProps = {
  username: string;
  createdAt: string;
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
  const pathname = usePathname();
  return (
    <div className="flex justify-between mb-5 bg-backdrop-darker p-2 rounded-sm">
      <div>
        <div className="flex mb-1">
          <div className="size-12 bg-secondary mr-3 rounded-sm"></div>
          <div className="flex flex-col">
            <span className="text-base font-bold">{username}</span>
            <span className="text-sm font-light opacity-50">{createdAt}</span>
          </div>
        </div>
        <p className="font-light">{content}</p>
      </div>

      {deleteAble && (
        <Button
          className="py-0.5 px-1.5 h-fit ml-20"
          onClick={async () => {
            await deleteCommentAction(commentId, pathname);
          }}
          variant={"ghost"}
          size={"sm"}
        >
          delete
        </Button>
      )}
    </div>
  );
}
