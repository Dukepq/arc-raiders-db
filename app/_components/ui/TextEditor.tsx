"use client";

import { useCallback, useState } from "react";
import TextArea from "./TextArea";
import cn from "@/app/utils/cn";

type TextEditorProps = {
  textAreaDisabled?: boolean;
} & React.AllHTMLAttributes<HTMLTextAreaElement>;

export default function TextEditor({
  textAreaDisabled = false,
  ...props
}: TextEditorProps) {
  return (
    <TextArea
      name="text-area"
      className={cn("h-20")}
      disabled={textAreaDisabled}
      {...props}
    />
  );
}
