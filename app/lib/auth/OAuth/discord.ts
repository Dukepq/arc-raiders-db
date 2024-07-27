import "server-only";
import { DiscordTokens, DiscordUser } from "@/app/types/oAuth";

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!CLIENT_ID || !CLIENT_SECRET || !BASE_URL) {
  throw new Error(
    "Environment variables for base url, client id and/or client secret were not found."
  );
}

type createAuthorizationURLOptions = {
  prompt: "consent" | "none";
  scopes?: ("identify" | "email")[];
};

class Discord {
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;
  private redirectURI: string;
  public tokenttl: number;
  constructor(
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    redirectURI: string,
    options?: {
      tokenttl: number;
    }
  ) {
    this.CLIENT_ID = CLIENT_ID;
    this.CLIENT_SECRET = CLIENT_SECRET;
    this.redirectURI = redirectURI;
    this.tokenttl = options?.tokenttl || 1000 * 60 * 60;
  }
  public getEncodedCredentials() {
    return Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString(
      "base64"
    );
  }
  public createAuthorizationURL(
    state: string,
    codeChallenge: string,
    options: createAuthorizationURLOptions = {
      prompt: "consent",
      scopes: [],
    }
  ) {
    const url = new URL("https://discord.com/oauth2/authorize");
    const { prompt, scopes = [] } = options;

    const params = {
      client_id: this.CLIENT_ID,
      response_type: "code",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state: state,
      scope: scopes.join(" "),
      prompt: prompt,
      redirect_uri: this.redirectURI,
    };

    url.search = new URLSearchParams(params).toString();
    return url.toString();
  }

  public async validateAuthorizationCode(
    code: string,
    verifier: string
  ): Promise<DiscordTokens> {
    const tokenRequestFormData = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: verifier,
      redirect_uri: `${BASE_URL}/api/auth/login/discord/callback`,
    }).toString();

    const res = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "POST",
      body: tokenRequestFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${this.getEncodedCredentials()}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `ISCORD ERROR: failed to validate discord authorization code  - ${res.statusText}. code: ${res.status}`
      );
    }

    const tokens: DiscordTokens = await res.json();
    return tokens;
  }

  public async getUser(accessToken: string): Promise<DiscordUser | null> {
    const userResponse = await fetch(`https://discord.com/api/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!userResponse.ok) return null;
    const userData: DiscordUser = await userResponse.json();
    return userData;
  }

  public async revokeToken(
    token: string,
    tokenType: "access_token" | "refresh_token"
  ) {
    const url = "https://discord.com/api/oauth2/token/revoke";
    const formData = new URLSearchParams({
      token_type_hint: tokenType,
      [tokenType]: token,
    }).toString();

    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: this.getEncodedCredentials(),
      },
    });
    if (!res.ok) {
      throw new Error(
        `DISCORD ERROR: failed to revoke discord tokens - ${res.statusText}. code: ${res.status}`
      );
    }
  }

  public async refreshAccessToken(
    refreshToken: string
  ): Promise<DiscordTokens> {
    const userRequestFormData = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString();

    const res = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "POST",
      body: userRequestFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${this.getEncodedCredentials()}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `DISCORD ERROR: could not refresh access token - ${res.statusText}. code: ${res.status}`
      );
    }

    const freshTokens: DiscordTokens = await res.json();
    return freshTokens;
  }
}

const discord = new Discord(
  CLIENT_ID,
  CLIENT_SECRET,
  `${BASE_URL}/api/auth/login/discord/callback`,
  { tokenttl: 1000 * 60 }
);
export default discord;
