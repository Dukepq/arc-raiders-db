import "server-only";
import { cookies } from "next/headers";

export const invalidateCookies = (...args: string[]) => {
  for (const key of args) {
    cookies().set(key, "", {
      httpOnly: true,
      sameSite: true,
      expires: new Date(0),
    });
  }
};
