"use client";
import CreateComment from "@/app/_components/CreateComment";
import Comment from "@/app/_components/Comment";
import { SignInButton } from "@/app/_components/SignInButton";
import { createItemCommentAction } from "@/app/server/actions";
import { ItemComment } from "@/app/types/commentTypes";
import { useSessionContext } from "@/app/context/sessionContext";

type ItemCommentSectionRenderedProps = {
  itemId: string;
  itemComments: ItemComment[];
} & React.AllHTMLAttributes<HTMLFormElement>;
export default function ItemCommentSectionRendered({
  itemComments,
  itemId,
}: ItemCommentSectionRenderedProps) {
  const { user } = useSessionContext();

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
        {itemComments && itemComments.length === 0 ? (
          <div>
            <span className="font-extralight opacity-50">
              There are no comments yet, yours could be the first!
            </span>
          </div>
        ) : (
          <div className="pb-3">
            {itemComments &&
              itemComments.map((comment) => {
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
    </div>
  );
}
