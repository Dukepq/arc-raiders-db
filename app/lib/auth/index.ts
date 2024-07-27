"server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { CookieOptions, Session, TokenData, User } from "@/app/types/auth";
import DL from "@/app/server/data-layer";
import { SESSION_LIFETIME } from "@/app/config/config";
import { invalidateCookies } from "./cookies";
import logging from "../logging";
import discord from "./OAuth/discord";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is missing.");
}

export const getUser = cache(async (): Promise<User | null> => {
  const sessionId = cookies().get(auth.cookieName)?.value;
  if (!sessionId) {
    return null;
  }

  try {
    const userSession = await auth.validateSession(sessionId);
    if (
      userSession?.session &&
      userSession.session.expiresAt >= new Date(Date.now())
    ) {
      const sessionCookie = auth.createCookie(sessionId);
      cookies().set(
        sessionCookie.key,
        sessionCookie.value,
        sessionCookie.cookieOptions
      );

      /* refresh the oauth session if necessary */
      // const OAuthTokens = ...
      // if (
      //   OAuthTokens &&
      //   new Date(OAuthTokens.tokenRenewDate).getTime() < Date.now()
      // ) {
      //   const newTokens = await discord.refreshAccessToken(
      //     OAuthTokens.refreshToken
      //   );

      //   const tokenData: TokenData = {
      //     accessToken: newTokens.access_token,
      //     refreshToken: newTokens.refresh_token,
      //     tokenRenewDate: new Date(Date.now() + discord.tokenttl).toString(),
      //   };

      //   await auth.updateSession(sessionId, {
      //     OAuthTokens: tokenData,
      //   });
      // }

      return userSession.user;
    }

    invalidateCookies(auth.cookieName);
    return null;
  } catch (e) {
    if (e instanceof Error) {
      logging.error(e);
    }
    try {
      await auth.invalidateSession(sessionId);
    } catch (e) {
      if (e instanceof Error) {
        logging.error(e);
      }
    }
    invalidateCookies(auth.cookieName);
    return null;
  }
});

export const logoutUser = async () => {
  const sessionId = cookies().get(auth.cookieName)?.value;
  if (!sessionId) {
    invalidateCookies(auth.cookieName);
    return;
  }

  try {
    await auth.invalidateSession(sessionId);
  } catch (e) {
    if (e instanceof Error) {
      logging.error(e);
    }
  }
};

class Auth {
  private ttl;
  public cookieOptions;
  public cookieName;
  constructor(options: {
    ttl: number;
    cookieOptions: CookieOptions;
    cookieName: string;
  }) {
    this.cookieName = options.cookieName;
    this.ttl = options.ttl;
    this.cookieOptions = options.cookieOptions;
  }

  async createSession(
    userId: string,
    options?: {
      expiresAt?: Date;
      tokenData?: TokenData;
    }
  ): Promise<Session> {
    const expiresAt = options?.expiresAt || new Date(Date.now() + this.ttl);
    const session = await DL.mutation.sessions.createSession(
      userId,
      expiresAt,
      options?.tokenData
    );
    return session;
  }

  createCookie(sessionId: string): {
    key: string;
    value: string;
    cookieOptions: CookieOptions;
  } {
    return {
      key: "session",
      value: sessionId,
      cookieOptions: this.cookieOptions,
    };
  }

  async validateSession(sessionId: string) {
    const nowDate = new Date(Date.now());
    const userSession = await DL.query.sessions.getSessionAndUser(sessionId);

    if (!userSession.session) {
      return { session: null, user: null };
    }

    if (userSession.session.expiresAt.getTime() <= nowDate.getTime()) {
      await DL.mutation.sessions.deleteSession(userSession.session.sessionId);
      return { session: null, user: null };
    }

    const expiresIn =
      userSession.session.expiresAt.getTime() - nowDate.getTime();
    if (expiresIn <= this.ttl / 2) {
      const newExpiry = new Date(Date.now() + this.ttl);
      userSession.session.expiresAt = newExpiry;
      await DL.mutation.sessions.updateSession(sessionId, newExpiry);
    }
    return userSession;
  }

  async invalidateSession(sessionId: string) {
    await DL.mutation.sessions.deleteSession(sessionId);
  }

  async getUserSessions(userId: string) {
    const dbSessions = await DL.query.sessions.getUserSessions(userId);
    const sessions: typeof dbSessions = [];
    for (const dbSession of dbSessions) {
      if (dbSession.expiresAt.getTime() >= Date.now()) {
        sessions.push(dbSession);
      }
    }
    return sessions;
  }

  async deleteUserSessions(userId: string) {
    await DL.mutation.sessions.deleteSessionsByUserId(userId);
  }

  async deleteExpiredSessions(userId: string) {
    const dbSessions = await DL.query.sessions.getUserSessions(userId);
    const sessionIds: string[] = [];
    for (const dbSession of dbSessions) {
      if (dbSession.expiresAt.getTime() >= Date.now()) {
        sessionIds.push(dbSession.sessionId);
      }
    }
    await DL.mutation.sessions.deleteSessions(sessionIds);
  }

  async updateSession(
    sessionId: string,
    options?: {
      expiresAt?: Date;
      OAuthTokens?: TokenData;
    }
  ) {
    const newExpirationDate = new Date(Date.now() + this.ttl);
    const updated = await DL.mutation.sessions.updateSession(
      sessionId,
      newExpirationDate
    );
    return updated;
  }
}

const auth = new Auth({
  cookieName: "session",
  ttl: SESSION_LIFETIME,
  cookieOptions: {
    httpOnly: true,
    expires: Date.now() + SESSION_LIFETIME,
    sameSite: "lax",
    secure: true,
  },
});
export { auth };
