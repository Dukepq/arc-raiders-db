"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/Button";
import TextEditor from "./ui/TextEditor";
import { useCallback, useState } from "react";
import cn from "../utils/cn";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type CreateCommentProps = {
  itemId: string;
  createCommentAction: (
    content: string,
    itemId: string,
    revalidate: string
  ) => Promise<{ success: boolean; message?: string }>;
  textFieldDisabled?: boolean;
};
export default function CreateComment({
  createCommentAction,
  itemId,
  textFieldDisabled = false,
}: CreateCommentProps) {
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
        const result = await createCommentAction(itemId, text, pathname);
        if (result.success) {
          setText("");
          toast.success(result.message || "ceated!");
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
          "py-1 px-2 mt-2 text-base transition-all flex items-center gap-2",
          (pending || text.length < 3) && "opacity-20"
        )}
        size={"sm"}
        variant={"default"}
      >
        <span>comment</span>
        {pending && <LoaderCircle size={18} className="animate-spin" />}
      </Button>
    </form>
  );
}
