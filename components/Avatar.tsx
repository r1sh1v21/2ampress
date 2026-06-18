"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAuth } from "./AuthContext";

/**
 * Top-right account control. Avatar button that opens a polished sign-in panel
 * (UI only). When "signed in" the avatar shows the user's initial and the panel
 * becomes a small account menu with sign-out.
 */
export default function Avatar() {
  const { email, signedIn, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initial = email?.trim()?.[0]?.toUpperCase() ?? "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.includes("@")) return;
    signIn(value.trim());
    setValue("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={signedIn ? "Account" : "Sign in"}
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs transition-colors ${
          signedIn
            ? "border-rose bg-rose/10 text-rose"
            : "border-bone/30 text-bone/70 hover:border-bone hover:text-bone"
        }`}
      >
        {signedIn ? (
          <span className="font-mono">{initial}</span>
        ) : (
          // minimal user glyph
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M5 19.5c1.2-3.2 4-4.5 7-4.5s5.8 1.3 7 4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-12 w-72 border border-plum bg-coal/95 p-5 backdrop-blur-xl"
          >
            {signedIn ? (
              <div>
                <p className="kicker mb-1">signed in</p>
                <p className="truncate font-mono text-sm text-bone">{email}</p>
                <button
                  onClick={signOut}
                  className="link-underline mt-5 text-sm text-bone/70 hover:text-bone"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p className="font-display text-2xl">Sign in</p>
                <p className="mt-1 mb-4 text-xs text-fog">
                  For your shelf and saved pages.
                </p>
                <input
                  type="email"
                  required
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full border border-plum bg-ink px-3 py-2.5 font-mono text-sm text-bone outline-none transition-colors placeholder:text-fog/60 focus:border-rose"
                />
                <button
                  type="submit"
                  className="group mt-3 flex w-full items-center justify-center gap-2 bg-bone py-2.5 text-sm font-medium text-ink transition-colors hover:bg-rose"
                >
                  Continue
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
                <p className="mt-3 text-center font-mono text-[10px] text-fog/70">
                  preview only — nothing is sent
                </p>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
