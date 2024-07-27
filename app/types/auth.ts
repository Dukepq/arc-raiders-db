import { SessionTableSelect, UserTableSelect } from "@/drizzle";

export type Session = SessionTableSelect;
export type User = UserTableSelect;
export type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  expires?: number;
  domain?: string;
  path?: string;
};
export type TokenData = {
  accessToken: string;
  refreshToken: string;
  tokenRenewDate: string;
};
