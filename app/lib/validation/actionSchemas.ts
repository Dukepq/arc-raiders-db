import { commentConfig } from "@/app/config/constants";
import { z } from "zod";

export const deleteCommentActionSchema = z.object({
  id: z.string(),
  revalidatePathname: z.string(),
});

export const createItemCommentActionSchema = z.object({
  itemId: z.string(),
  content: z
    .string()
    .max(commentConfig.content.maxLength)
    .min(commentConfig.content.minLength),
});
