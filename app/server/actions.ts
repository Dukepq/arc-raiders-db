"use server";
import { revalidatePath } from "next/cache";
import DL from "./data-layer";
import { getUser } from "../lib/auth";

export const createItemCommentAction = async (
  itemId: string,
  content: string,
  revalidate: string
) => {
  const user = await getUser();
  if (!user) {
    return { success: false, message: "user not authenticated" };
  }
  try {
    await DL.mutation.comments.createItemComment({
      itemId,
      userId: user.userId,
      content,
    });
    revalidatePath(revalidate);
    return { success: true, message: "comment created!" };
  } catch (e) {
    return { success: false, message: "something went wrong." };
  }
};

export const deleteCommentAction = async (
  id: string,
  revalidatePathname: string
) => {
  try {
    const user = await getUser();
    if (!user) {
      return { success: false, message: "not authenticated" };
    }

    const comment = await DL.query.comments.getComment(id);
    if (comment.userId !== user.userId) {
      return { success: false, message: "not authenticated" };
    }

    const deleted = await DL.mutation.comments.deleteComment(id);
    revalidatePath(revalidatePathname);

    return { success: true, message: "comment deleted", data: deleted };
  } catch (e) {
    return { success: false, message: "something went wrong" };
  }
};

export const changeUsernameAction = async (
  newName: string
): Promise<{ success: boolean; message: string }> => {
  const user = await getUser();
  if (!user) {
    return { success: false, message: "unauthenticated" };
  }
  try {
    await DL.mutation.users.updateUsername(user.userId, newName);
    return { success: true, message: "username updated!" };
  } catch {
    return { success: false, message: "username already taken" };
  }
};
