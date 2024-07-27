"use client";

import {
  useState,
  useContext,
  createContext,
  useEffect,
  SetStateAction,
  useCallback,
} from "react";
import { checkSession } from "../lib/auth/authApi";
import { User } from "../types/auth";

type Session = {
  user: User | null;
  loading: "authenticated" | "unauthenticated" | "loading";
};
const SessionContext = createContext<
  | ((Session & { update: () => Promise<void> }) & {
      setSession: React.Dispatch<SetStateAction<Session>>;
    })
  | null
>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    loading: "loading",
    user: null,
  });

  const updateSession = useCallback(
    (() => {
      let loading: boolean = false;
      return async () => {
        if (loading) return;
        loading = true;
        setSession((prev) => ({ ...prev, loading: "loading" }));
        const [retreivedUser] = await checkSession();
        if (retreivedUser) {
          setSession(() => ({
            user: retreivedUser,
            loading: "authenticated",
          }));
        } else {
          setSession(() => ({ user: null, loading: "unauthenticated" }));
        }
        loading = false;
      };
    })(),
    []
  );

  useEffect(() => {
    (async () => {
      await updateSession();
    })();
  }, []);

  return (
    <SessionContext.Provider
      value={{ ...session, update: updateSession, setSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("Context should only be used inside of a provider");
  }
  return ctx;
}
