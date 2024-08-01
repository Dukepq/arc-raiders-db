"use client";

import CreateComment from "./CreateComment";
import { commentsConfig } from "@/app/config/constants";
import { useSessionContext } from "@/app/context/sessionContext";
import { fetchItemComments } from "@/app/lib/data/api";
import { ItemComment } from "@/app/types/commentTypes";
import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { SignInButton } from "@/app/_components/SignInButton";
import { Loader2 } from "lucide-react";
import { useCommentContext } from "@/app/context/commentContext";

export default function ItemCommentSection() {
  const { user } = useSessionContext();
  const { comments, allCommentsLoaded } = useCommentContext();

  return (
    <div className="mx-3">
      {!!user && (
        <>
          <CreateComment />
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
      <LoadCommentsButton />
    </div>
  );
}

function LoadCommentsButton() {
  const { allCommentsLoaded, loading, loadComments, comments } =
    useCommentContext();

  if (allCommentsLoaded || comments.length === 0) {
    return null;
  }
  return (
    <div className="py-2 flex justify-center opacity-50 hover:opacity-100">
      <button
        className="relative"
        onClick={async () => {
          await loadComments();
        }}
      >
        <span>load more comments</span>
        {loading && (
          <div className="absolute top-1/2 -translate-y-1.5 -right-5">
            <Loader2 size={15} className="animate-spin" />
          </div>
        )}
      </button>
    </div>
  );
}
