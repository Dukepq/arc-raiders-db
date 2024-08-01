"use client";

import { Button } from "../../../_components/ui/Button";
import TextEditor from "../../../_components/ui/TextEditor";
import { useCallback, useState } from "react";
import cn from "../../../utils/cn";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { createItemCommentAction } from "../../../server/actions";
import { useCommentContext } from "@/app/context/commentContext";

type CreateCommentProps = {
  textFieldDisabled?: boolean;
};
export default function CreateComment({
  textFieldDisabled = false,
}: CreateCommentProps) {
  const params = useParams();
  const itemId = params.item as string;
  const { setComments } = useCommentContext();
  const pathname = usePathname();
  const [text, setText] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const handleTextChange = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const value = e.currentTarget.value;
      setText(() => value);
    },
    []
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const result = await createItemCommentAction(
          { itemId, content: text },
          pathname
        );
        const { message, success } = result;
        if (success) {
          const { comment } = result;
          setText("");
          setComments((prev) => {
            const newComments = [...prev];
            newComments.unshift(comment);
            return newComments;
          });
          toast.success(message || "created!");
        } else {
          toast.error(message || "something went wrong.");
        }
        setPending(false);
      }}
    >
      <h3 className="mb-1 opacity-80">Leave a comment!</h3>
      <TextEditor
        disabled={textFieldDisabled}
        name="content"
        value={text}
        onChange={handleTextChange}
        placeholder="Start writing something..."
      />
      <Button
        disabled={pending || text.length < 3}
        className={cn(
          "py-1 px-2 mt-2 text-base transition-all flex items-center justify-center gap-2 min-w-32 min-h-8",
          (pending || text.length < 3) && "opacity-20"
        )}
        size={"sm"}
        variant={"default"}
      >
        {pending ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <span>comment</span>
        )}
      </Button>
    </form>
  );
}