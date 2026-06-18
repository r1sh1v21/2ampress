"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import type { Book } from "@/lib/books";

/**
 * Mocked add-to-cart. Updates the cart context and flashes a confirmation —
 * no payment, no network.
 */
export default function AddToCart({
  book,
  canRead,
}: {
  book: Book;
  canRead: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handle = () => {
    add(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mt-9 flex flex-wrap items-center gap-5">
      <button
        onClick={handle}
        className="rounded-full bg-bone px-8 py-3.5 font-medium text-ink transition-colors hover:bg-rose"
      >
        {added ? "Added ✓" : `Add to cart — $${book.price}`}
      </button>
      {canRead && (
        <Link
          href={`/read/${book.slug}`}
          className="text-sm text-bone/70 underline-offset-4 transition-colors hover:text-bone hover:underline"
        >
          Read a sample →
        </Link>
      )}
    </div>
  );
}
