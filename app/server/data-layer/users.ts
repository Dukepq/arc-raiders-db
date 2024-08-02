import "server-only";

import {
  UserKeyTable,
  UserKeyTableInsert,
  ProviderEnumType,
  UserTable,
  UserTableInsert,
  CommentTable,
} from "@/drizzle";
import { db } from "@/drizzle/db";
import { and, desc, eq, or, sql } from "drizzle-orm";

const selectUserFields = {
  userId: UserTable.userId,
  email: UserTable.email,
  username: UserTable.username,
  createdAt: UserTable.createdAt,
  banned: UserTable.banned,
  role: UserTable.role,
};

export const usersDL = {
  query: {
    getUserByProviderId: async (
      provider: ProviderEnumType,
      providerId: string
    ) => {
      const [user] = await db
        .select(selectUserFields)
        .from(UserTable)
        .innerJoin(UserKeyTable, eq(UserKeyTable.userId, UserTable.userId))
        .where(
          and(
            eq(UserKeyTable.provider, provider),
            eq(UserKeyTable.providerUserId, providerId)
          )
        );
      return (user ?? null) as typeof user | null;
    },
    getUserByName: async (username: string) => {
      const [foundUser] = await db
        .select(selectUserFields)
        .from(UserTable)
        .where(eq(UserTable.username, username));
      return foundUser;
    },
    getUserByEmail: async (email: string) => {
      const [foundUser] = await db
        .select(selectUserFields)
        .from(UserTable)
        .where(eq(UserTable.email, email));
      return foundUser;
    },
    getUsersByEmailOrName: async (email: string, username: string) => {
      const users = await db
        .select()
        .from(UserTable)
        .where(
          or(eq(UserTable.email, email), eq(UserTable.username, username))
        );
      return users;
    },
    getUserComments: async (
      userId: string,
      options?: {
        offset?: number;
        limit?: number;
      }
    ) => {
      const query = db
        .select({
          userId: CommentTable.userId,
          content: CommentTable.content,
          commentId: CommentTable.commentId,
          createdAt: CommentTable.createdAt,
        })
        .from(UserTable)
        .where(eq(UserTable.userId, userId))
        .innerJoin(CommentTable, eq(CommentTable.userId, UserTable.userId))
        .orderBy(desc(CommentTable.createdAt));

      if (options?.limit) {
        query.limit(options?.limit);
      }
      if (options?.offset) {
        query.offset(options.offset);
      }

      const comments = await query;
      return comments;
    },
  },
  mutation: {
    insertUser: async (user: UserTableInsert) => {
      const [insertedUser] = await db
        .insert(UserTable)
        .values(user)
        .returning();
      return insertedUser;
    },
    insertUserKey: async (key: UserKeyTableInsert) => {
      const [insertedKey] = await db
        .insert(UserKeyTable)
        .values(key)
        .returning();
      return insertedKey ?? null;
    },
    insertUserWithKey: async ({
      user,
      key,
    }: {
      user: UserTableInsert;
      key: Omit<UserKeyTableInsert, "userId">;
    }) => {
      const transaction = await db.transaction(async (tx) => {
        const [insertedUser] = await tx
          .insert(UserTable)
          .values(user)
          .returning();
        const [insertedKey] = await tx
          .insert(UserKeyTable)
          .values({ ...key, userId: insertedUser.userId })
          .returning();

        return { key: insertedKey ?? null, user: insertedUser ?? null };
      });
      return transaction;
    },
    updateUsername: async (userId: string, newName: string) => {
      const [user] = await db
        .update(UserTable)
        .set({ username: newName })
        .where(eq(UserTable.userId, userId))
        .returning();
      return user;
    },
    deleteUser: async (userId: string) => {
      await db.delete(UserTable).where(eq(UserTable.userId, userId));
    },
  },
};
