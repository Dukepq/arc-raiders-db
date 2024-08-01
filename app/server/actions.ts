"use server";
import { revalidatePath } from "next/cache";
import DL from "./data-layer";
import { getUser } from "../lib/auth";
import { profanityFilter } from "../lib/profanityFilter";
import logging from "../lib/logging";
import { commentsConfig } from "../config/constants";
import { createItemCommentActionSchema } from "../lib/validation/actionSchemas";
import { z } from "zod";
import { ItemComment } from "../types/commentTypes";

type createItemCommentActionReturn =
  | { success: false; message: string }
  | {
      success: true;
      message: string;
      comment: ItemComment;
    };
export const createItemCommentAction = async (
  comment: {
    itemId: unknown;
    content: unknown;
  },
  revalidate: unknown
): Promise<createItemCommentActionReturn> => {
  const user = await getUser();
  if (!user) {
    return { success: false, message: "not authenticated." };
  }
  try {
    const { content, itemId } = createItemCommentActionSchema.parse(comment);
    const parsedRevalidatePathname = z.string().parse(revalidate);

    const [recentComments] = await DL.query.users.getUserComments(user.userId, {
      limit: 1,
      offset: commentsConfig.offset,
    });
    const commentDate = recentComments?.createdAt as Date | undefined;
    if (commentDate) {
      const elapsedSinceComment = Date.now() - commentDate.getTime();
      const commentingAllowed =
        commentDate && elapsedSinceComment > commentsConfig.timespan;

      if (!commentingAllowed) {
        return {
          success: false,
          message: `Please wait ${Math.ceil(
            (commentsConfig.timespan - elapsedSinceComment) / 1000 / 60
          )} minutes before commenting again.`,
        };
      }
    }

    const filteredComment = await profanityFilter.censorProfanity(content);
    const addedComment = await DL.mutation.comments.createItemComment({
      itemId,
      userId: user.userId,
      content: filteredComment,
    });
    revalidatePath(parsedRevalidatePathname);
    return {
      success: true,
      message: "comment created!",
      comment: {
        ...addedComment,
        parentId: addedComment.itemId || "",
        username: user.username,
      },
    };
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
