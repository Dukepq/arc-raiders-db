import "server-only";

import { db } from "@/drizzle/db";
import { CommentTable, ItemTable, UserTable } from "@/drizzle";
import { asc, count, desc, eq } from "drizzle-orm";
import { ItemComment } from "@/app/types/commentTypes";

const itemCommentFields = {
  content: CommentTable.content,
  createdAt: CommentTable.createdAt,
  parentId: ItemTable.itemId,
  username: UserTable.username,
  commentId: CommentTable.commentId,
  userId: UserTable.userId,
};

export const commentsDL = {
  query: {
    getItemComments: async (
      itemId: string,
      offset: number,
      limit: number
    ): Promise<ItemComment[]> => {
      const comments = await db
        .select(itemCommentFields)
        .from(ItemTable)
        .where(eq(ItemTable.itemId, itemId))
        .innerJoin(CommentTable, eq(CommentTable.itemId, ItemTable.itemId))
        .innerJoin(UserTable, eq(UserTable.userId, CommentTable.userId))
        .orderBy(desc(CommentTable.createdAt))
        .offset(offset)
        .limit(limit);
      return comments;
    },
    getItemCommentsCount: async (
      itemId: string,
      offset: number,
      limit: number
    ): Promise<number> => {
      const [data] = await db
        .select({ count: count() })
        .from(ItemTable)
        .where(eq(ItemTable.itemId, itemId))
        .innerJoin(CommentTable, eq(CommentTable.itemId, ItemTable.itemId));

      return data.count;
    },
    getComment: async (commentId: string) => {
      const [comment] = await db
        .select(itemCommentFields)
        .from(CommentTable)
        .where(eq(CommentTable.commentId, commentId))
        .innerJoin(ItemTable, eq(CommentTable.itemId, ItemTable.itemId))
        .innerJoin(UserTable, eq(UserTable.userId, CommentTable.userId))
        .orderBy(CommentTable.createdAt);
      return comment ?? null;
    },
  },
  mutation: {
    createItemComment: async (data: {
      userId: string;
      itemId: string;
      content: string;
    }) => {
      const [comment] = await db.insert(CommentTable).values(data).returning();
      return comment;
    },
    deleteComment: async (commentId: string) => {
      const [comment] = await db
        .delete(CommentTable)
        .where(eq(CommentTable.commentId, commentId))
        .returning();
      return comment;
    },
  },
};
