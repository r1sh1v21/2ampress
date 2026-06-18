import type { Book } from "@/lib/books";

/**
 * The front face of a book, drawn entirely in CSS (no image dependency).
 * Brutalist layout: a hard imprint frame, a massive condensed number bleeding
 * the cover, the title stamped at the foot. Used by <FloatingBook /> and
 * <BookCard />.
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
        background: `linear-gradient(165deg, ${base} 0%, #000 130%)`,
        containerType: "inline-size",
      }}
    >
      {/* hard imprint frame */}
      <div
        className="absolute inset-[5%] border"
        style={{ borderColor: "rgba(237,237,234,0.16)" }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between">
        <span
          className="font-mono uppercase tracking-[0.22em]"
          style={{ color: "rgba(237,237,234,0.6)", fontSize: "0.5rem" }}
        >
          2 AM Press
        </span>
        <span
          className="font-mono"
          style={{ color: accent, fontSize: "0.5rem" }}
        >
          ●
        </span>
      </div>

      {/* the number, bleeding huge */}
      <div
        className="font-display"
        style={{
          color: accent,
          fontSize: "clamp(3rem, 16cqw, 9rem)",
          lineHeight: 0.78,
          letterSpacing: "-0.04em",
        }}
      >
        {glyph}
      </div>

      <div className="relative">
        <div className="mb-[5%] h-px w-full" style={{ background: "rgba(237,237,234,0.16)" }} aria-hidden />
        <div
          className="font-display"
          style={{
            color: "#ededea",
            fontSize: "clamp(0.75rem, 4.6cqw, 1.7rem)",
            lineHeight: 0.92,
          }}
        >
          {book.title}
        </div>
      </div>
    </div>
  );
}
