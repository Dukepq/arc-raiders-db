import { SessionTable, UserKeyTable, UserTable } from "@/drizzle";
import { db } from "@/drizzle/db";
import { eq, inArray } from "drizzle-orm";
import { generateRandomHex } from "@/app/lib/auth/OAuth/helpers";
import { TokenData } from "@/app/types/auth";

export const sessionsDL = {
  query: {
    getSessionAndUser: async (sessionId: string) => {
      const [userSession] = await db
        .select()
        .from(SessionTable)
        .innerJoin(UserTable, eq(UserTable.userId, SessionTable.userId))
        .where(eq(SessionTable.sessionId, sessionId));

      if (!userSession) {
        return {
          session: null,
          user: null,
        };
      }

      return {
        session: userSession.sessions,
        user: userSession.users,
      };
    },
    getUserSessions: async (userId: string) => {
      const userSessions = await db
        .select()
        .from(SessionTable)
        .where(eq(SessionTable.userId, userId));

      return userSessions;
    },
  },
  mutation: {
    updateSession: async (sessionId: string, expiresAt: Date) => {
      const [updatedSession] = await db
        .update(SessionTable)
        .set({ expiresAt: expiresAt })
        .where(eq(SessionTable.sessionId, sessionId))
        .returning();

      return (updatedSession ?? null) as typeof updatedSession | null;
    },
    updateAndGetSessionAndUser: async (
      sessionId: string,
      newExpiryDate: Date
    ) => {
      const transaction = await db.transaction(async (tx) => {
        const [UserSession] = await tx
          .select()
          .from(SessionTable)
          .innerJoin(UserTable, eq(UserTable.userId, SessionTable.userId))
          .where(eq(SessionTable.sessionId, sessionId));

        if (UserSession.sessions.expiresAt <= new Date(Date.now())) {
          await tx
            .update(SessionTable)
            .set({ expiresAt: newExpiryDate })
            .where(eq(SessionTable.sessionId, sessionId));
        } else {
          await tx
            .delete(SessionTable)
            .where(eq(SessionTable.sessionId, sessionId));
        }

        return {
          session: UserSession.sessions ?? null,
          user: UserSession.users ?? null,
        };
      });
      return (transaction || null) as typeof transaction | null;
    },
    deleteSession: async (sessionId: string) => {
      const [deleted] = await db
        .delete(SessionTable)
        .where(eq(SessionTable.sessionId, sessionId))
        .returning();
      return (deleted ?? null) as typeof deleted | null;
    },
    deleteSessions: async (sessionIds: string[]) => {
      const deleted = await db
        .delete(SessionTable)
        .where(inArray(SessionTable.sessionId, sessionIds))
        .returning();
      return deleted;
    },
    deleteSessionsByUserId: async (userId: string) => {
      const deleted = await db
        .delete(SessionTable)
        .where(eq(SessionTable.userId, userId))
        .returning();
      return deleted;
    },
    createSession: async (
      userId: string,
      expiresAt: Date,
      tokenData?: TokenData
    ) => {
      const sessionId = generateRandomHex();
      const [session] = await db
        .insert(SessionTable)
        .values({ userId, expiresAt, sessionId })
        .returning();
      return session;
    },
  },
};
