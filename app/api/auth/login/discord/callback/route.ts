import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import "@/envConfig";
import discord from "@/app/lib/auth/OAuth/discord";
import { invalidateCookies } from "@/app/lib/auth/cookies";
import envHandler from "@/app/utils/envHandler";
import DL from "@/app/server/data-layer";
import { auth } from "@/app/lib/auth";
import logging from "@/app/lib/logging";

const BASE_URL = envHandler("NEXT_PUBLIC_BASE_URL");

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = cookies().get("state")?.value;
  const codeVerifier = cookies().get("code_verifier")?.value;
  if (
    !url ||
    !code ||
    !state ||
    !cookieState ||
    state !== cookieState ||
    !codeVerifier
  ) {
    return NextResponse.redirect(BASE_URL);
  }

  try {
    const { access_token, refresh_token, expires_in } =
      await discord.validateAuthorizationCode(code, codeVerifier);
    const discordUser = await discord.getUser(access_token);

    if (discordUser === null) {
      invalidateCookies("session");
      return NextResponse.redirect(BASE_URL);
    }

    let user = await DL.query.users.getUserByProviderId(
      "discord",
      discordUser.id
    );

    if (!user) {
      let username = discordUser.global_name;
      const existingUsername = await DL.query.users.getUserByName(username);

      if (existingUsername) {
        username = username + `#${existingUsername.userId.slice(0, 6)}`;
      }

      const { user: returnedUser } = await DL.mutation.users.insertUserWithKey({
        user: { email: discordUser.email, username },
        key: { provider: "discord", providerUserId: discordUser.id },
      });
      user = returnedUser;
    }

    const session = await auth.createSession(user.userId);

    cookies().set(auth.cookieName, session.sessionId, {
      ...auth.cookieOptions,
    });

    const redirectOrigin = cookies().get("redirect_origin")?.value;

    return NextResponse.redirect(redirectOrigin || BASE_URL);
  } catch (e) {
    if (e instanceof Error) {
      logging.error(e);
    }
    return NextResponse.redirect(BASE_URL);
  }
}
