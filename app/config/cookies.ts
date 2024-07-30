import { SESSION_LIFETIME } from "./constants";

export const getDefaultCookieOptions = () => {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    expires: Date.now() + SESSION_LIFETIME,
  } as const;
};
