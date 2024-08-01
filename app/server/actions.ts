"use server";
import { revalidatePath } from "next/cache";
import DL from "./data-layer";
import { getUser } from "../lib/auth";
import { profanityFilter } from "../lib/profanityFilter";
import logging from "../lib/logging";
import { commentThrottling } from "../config/constants";
import { createItemCommentActionSchema } from "../lib/validation/actionSchemas";
import { z } from "zod";

export const createItemCommentAction = async (
  comment: {
    itemId: unknown;
    content: unknown;
  },
  revalidate: unknown
) => {
  const user = await getUser();
  if (!user) {
    return { success: false, message: "not authenticated." };
  }
  try {
    const { content, itemId } = createItemCommentActionSchema.parse(comment);
    const parsedRevalidatePathname = z.string().parse(revalidate);

    const [recentComments] = await DL.query.users.getUserComments(user.userId, {
      limit: 1,
      offset: commentThrottling.offset,
    });
    const commentDate = recentComments?.createdAt as Date | undefined;
    if (commentDate) {
      const elapsedSinceComment = Date.now() - commentDate.getTime();
      const commentingAllowed =
        commentDate && elapsedSinceComment > commentThrottling.timespan;

      if (!commentingAllowed) {
        return {
          success: false,
          message: `You are creating too many comments. Try again in ${Math.ceil(
            (commentThrottling.timespan - elapsedSinceComment) / 1000 / 60
          )} minutes`,
        };
      }
    }

    const filteredComment = await profanityFilter.censorProfanity(content);
    await DL.mutation.comments.createItemComment({
      itemId,
      userId: user.userId,
      content: filteredComment,
    });
    revalidatePath(parsedRevalidatePathname);
    return { success: true, message: "comment created!" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "something went wrong." };
  }
};

export const deleteCommentAction = async (
  id: unknown,
  revalidatePathname: unknown
) => {
  try {
    const parsedId = z.string().parse(id);
    const parsedRevalidatePathname = z.string().parse(revalidatePathname);

    const user = await getUser();
    if (!user) {
      return { success: false, message: "not authenticated." };
    }

    const comment = await DL.query.comments.getComment(parsedId);
    if (comment.userId !== user.userId) {
      return { success: false, message: "not authenticated." };
    }

    const deleted = await DL.mutation.comments.deleteComment(parsedId);
    revalidatePath(parsedRevalidatePathname);

    return { success: true, message: "comment deleted.", data: deleted };
  } catch (e) {
    return { success: false, message: "something went wrong." };
  }
};

export const deleteUserAction = async (userId: unknown) => {
  try {
    const parsedUserId = z.string().parse(userId);
    await DL.mutation.users.deleteUser(parsedUserId);
    return { success: true, message: "account deleted." };
  } catch (e) {
    if (e instanceof Error) {
      logging.error(e);
    }
    return { success: false, message: "failed to delete account." };
  }
};

export const changeUsernameAction = async (
  newName: unknown
): Promise<{ success: boolean; message: string }> => {
  const user = await getUser();
  if (!user) {
    return { success: false, message: "not authenticated." };
  }
  try {
    const parsedNewName = z.string().parse(newName);
    await DL.mutation.users.updateUsername(user.userId, parsedNewName);
    return { success: true, message: "username updated!" };
  } catch {
    return { success: false, message: "username already taken." };
  }
};
