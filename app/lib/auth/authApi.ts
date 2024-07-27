import { Session, User } from "@/app/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error("Base URL environment variable is required!");
}

export const checkSession = async (): Promise<[User, null] | [null, Error]> => {
  const res = await fetch(`${BASE_URL}/api/auth/session`, { method: "POST" });
  if (!res.ok) {
    return [null, new Error(res.statusText)];
  }
  const sessionData: User = await res.json();

  return [sessionData, null];
};

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST" });
  if (!res.ok) {
    return { success: false };
  }
  return { success: true };
};
