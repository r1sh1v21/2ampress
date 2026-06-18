import type { Book } from "@/lib/books";

/**
 * The front face of a book, drawn entirely in CSS (no image dependency).
 * Editorial layout: tiny mono imprint, a huge number, the title set in display
 * serif. Used as the face of <FloatingBook /> and inside <BookCard />.
 */
export default function BookCover({
  book,
  className = "",
}: {
  book: Book;
  className?: string;
}) {
  const { base, accent, glyph } = book.cover;
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-[8%] ${className}`}
      style={{
        background: `linear-gradient(155deg, ${base} 0%, #161019 120%)`,
        containerType: "inline-size",
      }}
    >
      {/* faint imprint line */}
      <div
        className="absolute inset-[6%] rounded-[2px] border"
        style={{ borderColor: "rgba(235,219,224,0.10)" }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between">
        <span
          className="font-mono uppercase tracking-[0.25em]"
          style={{ color: "rgba(235,219,224,0.55)", fontSize: "0.5rem" }}
        >
          2 AM Press
        </span>
        <span
          className="font-mono"
          style={{ color: accent, fontSize: "0.5rem" }}
        >
          02:00
        </span>
      </div>

      <div
        className="font-display leading-[0.8]"
        style={{ color: accent, fontSize: "clamp(2.4rem, 9cqw, 6rem)" }}
      >
        {glyph}
      </div>

      <div className="relative">
        <div
          className="font-display leading-[0.95]"
          style={{ color: "#ebdbe0", fontSize: "clamp(0.8rem, 4.2cqw, 1.6rem)" }}
        >
          {book.title}
        </div>
        <div
          className="mt-[6%] h-px w-1/3"
          style={{ background: accent }}
          aria-hidden
        />
      </div>
    </div>
  );
}
