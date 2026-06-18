"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Book } from "@/lib/books";

export type CartLine = {
  slug: string;
  title: string;
  price: number;
  qty: number;
};

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; book: Book }
  | { type: "remove"; slug: string }
  | { type: "qty"; slug: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const KEY = "2am-cart";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const existing = state.lines.find((l) => l.slug === action.book.slug);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.slug === action.book.slug ? { ...l, qty: l.qty + 1 } : l
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            slug: action.book.slug,
            title: action.book.title,
            price: action.book.price,
            qty: 1,
          },
        ],
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.slug !== action.slug) };
    case "qty":
      return {
        lines: state.lines
          .map((l) =>
            l.slug === action.slug ? { ...l, qty: Math.max(0, action.qty) } : l
          )
          .filter((l) => l.qty > 0),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (book: Book) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  // Hydrate from localStorage once on mount (mocked persistence).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) });
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore quota / private mode */
    }
  }, [state.lines]);

  const value = useMemo<CartValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      add: (book) => dispatch({ type: "add", book }),
      remove: (slug) => dispatch({ type: "remove", slug }),
      setQty: (slug, qty) => dispatch({ type: "qty", slug, qty }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.lines]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
