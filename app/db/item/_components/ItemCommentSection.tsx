import CreateComment from "@/app/_components/CreateComment";
import Comment from "@/app/_components/Comment";
import { getUser } from "@/app/lib/auth";
import { Button } from "@/app/_components/ui/Button";
import Dialog from "@/app/_components/ui/Dialog";
import { SignInButton } from "@/app/_components/SignInButton";
import { createItemCommentAction } from "@/app/server/actions";
import DL from "@/app/server/data-layer";

type ItemCommentSectionProps = {
  itemId: string;
} & React.AllHTMLAttributes<HTMLFormElement>;
export default async function ItemCommentSection({
  itemId,
}: ItemCommentSectionProps) {
  const itemComments = await DL.query.comments.getItemComments(itemId, 0, 10);
  const user = await getUser();

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
            <Dialog
              trigger={
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="ml-3 px-2 py-0.5 text-sm font-bold"
                >
                  Sign In
                </Button>
              }
            >
              <SignInButton />
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
