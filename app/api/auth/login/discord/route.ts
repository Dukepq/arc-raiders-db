import discord from "@/app/lib/auth/OAuth/discord";
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateRandomHex,
} from "@/app/lib/auth/OAuth/helpers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!CLIENT_ID || !CLIENT_SECRET || !BASE_URL) {
  throw new Error("Missing environment variables for id, secret or base url!");
}

export const dynamic = "force-dynamic";
export async function GET() {
  const state = generateRandomHex();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const authorizationURL = discord.createAuthorizationURL(
    state,
    codeChallenge,
    {
      prompt: "consent",
      scopes: ["identify", "email"],
    }
  );

  const encodedCredentials = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString("base64");

  cookies().set("code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
  });
  cookies().set("state", state, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
  });
  return NextResponse.redirect(authorizationURL, {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  });
}
