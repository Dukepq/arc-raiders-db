"use client";

import CreateComment from "@/app/_components/CreateComment";
import { commentsConfig } from "@/app/config/constants";
import { useSessionContext } from "@/app/context/sessionContext";
import { fetchItemComments } from "@/app/lib/data/api";
import { ItemComment } from "@/app/types/commentTypes";
import { useEffect, useRef, useState } from "react";
import { createItemCommentAction } from "@/app/server/actions";
import Comment from "@/app/_components/Comment";
import { SignInButton } from "@/app/_components/SignInButton";
import { Loader2 } from "lucide-react";

export default function ItemCommentSection({ itemId }: { itemId: string }) {
  const { user } = useSessionContext();
  const [comments, setComments] = useState<ItemComment[]>([]);
  const [allCommentsLoaded, setAllCommentsLoaded] = useState<boolean>(false);
  const hasFetched = useRef(false);

  const loadComments = async () => {
    const data = await fetchItemComments(itemId, {
      offset: comments.length.toString(),
      limit: commentsConfig.loadAmount.toString(),
    });
    if (!data) return;
    const { comments: newComments, commentsCount } = data;
    setAllCommentsLoaded(
      comments.length + newComments.length === commentsCount
    );
    setComments((prev) => prev.concat(newComments));
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      (async () => {
        await loadComments();
      })();
    }
  }, []);

  return (
    <div className="mx-3">
      {!!user && (
        <>
          <CreateComment
            textFieldDisabled={!user}
            itemId={itemId}
            createCommentAction={createItemCommentAction}
          />

          <hr className="my-6 opacity-10 text-text" />
        </>
      )}
      <div>
        {comments && comments.length === 0 ? (
          <div>
            <span className="font-extralight opacity-50">
              There are no comments yet, yours could be the first!
            </span>
          </div>
        ) : (
          <div className="pb-3">
            {comments &&
              comments.map((comment) => {
                return (
                  <Comment
                    key={comment.commentId}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    username={comment.username}
                    commentId={comment.commentId}
                    deleteAble={comment.userId === user?.userId}
                  />
                );
              })}
          </div>
        )}
        {!user && (
          <div className="mt-3">
            <span className="font-light">
              You need to be logged in to comment.
            </span>

            <SignInButton className="bg-transparent text-sm font-bold hover:bg-border-grey/20 ml-6" />
          </div>
        )}
      </div>
      <LoadCommentsButton
        allCommentsLoaded={allCommentsLoaded}
        loadComments={loadComments}
      />
    </div>
  );
}

type LoadCommentsButtonProps = {
  loadComments: () => Promise<void>;
  allCommentsLoaded: boolean;
};
function LoadCommentsButton({
  loadComments,
  allCommentsLoaded,
}: LoadCommentsButtonProps) {
  const [loadingComments, setLoadingComments] = useState<boolean>(false);

  if (allCommentsLoaded) {
    return null;
  }
  return (
    <div className="py-2 flex justify-center opacity-50 hover:opacity-100">
      <button
        className="relative"
        onClick={async () => {
          setLoadingComments(true);
          await loadComments();
          setLoadingComments(false);
        }}
      >
        <span>load more comments</span>
        {loadingComments && (
          <div className="absolute top-1/2 -translate-y-1.5 -right-5">
            <Loader2 size={15} className="animate-spin" />
          </div>
        )}
      </button>
    </div>
  );
}
