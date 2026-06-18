"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Mocked auth — UI only, no backend. "Signing in" just stores an email locally
 * and flips a logged-in flag so the avatar can show an initial. Leaves room for
 * real auth later; wires to nothing now.
 */
type AuthValue = {
  email: string | null;
  signedIn: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const KEY = "2am-user";
const AuthCtx = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);

  // Hydrate from localStorage on mount — unavailable during SSR, so this syncs
  // external browser state into React (exactly what an effect is for).
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (v) setEmail(v);
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = (e: string) => {
    setEmail(e);
    try {
      localStorage.setItem(KEY, e);
    } catch {
      /* ignore */
    }
  };

  const signOut = () => {
    setEmail(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <AuthCtx.Provider
      value={{ email, signedIn: !!email, signIn, signOut }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
