import type { Book } from "@/lib/books";

/**
 * The front face of a book, drawn entirely in CSS (no image dependency).
 * Premium-minimal: deep black field, a hairline frame, the count set as a quiet
 * serif numeral, the title at the foot. Used by <FloatingBook /> and <BookCard />.
 */
export default function BookCover({
  book,
  className = "",
}: {
  book: Book;
  className?: string;
}) {
  const { base, glyph } = book.cover;
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden p-[9%] ${className}`}
      style={{
        background: `linear-gradient(160deg, ${base} 0%, #000 140%)`,
        containerType: "inline-size",
      }}
    >
      {/* hairline frame */}
      <div
        className="absolute inset-[6%] border"
        style={{ borderColor: "rgba(241,237,230,0.14)" }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between">
        <span
          className="font-mono uppercase tracking-[0.2em]"
          style={{ color: "rgba(241,237,230,0.55)", fontSize: "0.46rem" }}
        >
          2am press
        </span>
        <span
          className="font-mono uppercase tracking-[0.2em]"
          style={{ color: "rgba(241,237,230,0.4)", fontSize: "0.46rem" }}
        >
          {book.mood}
        </span>
      </div>

      {/* serif numeral */}
      <div
        className="font-display"
        style={{
          color: "#f1ede6",
          fontSize: "clamp(2.6rem, 13cqw, 7rem)",
          fontWeight: 300,
          lineHeight: 0.9,
        }}
      >
        {glyph}
      </div>

      <div className="relative">
        <div
          className="mb-[5%] h-px w-full"
          style={{ background: "rgba(241,237,230,0.14)" }}
          aria-hidden
        />
        <div
          className="font-display"
          style={{
            color: "#f1ede6",
            fontSize: "clamp(0.72rem, 4.4cqw, 1.5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
          }}
        >
          {book.title}
        </div>
      </div>
    </div>
  );
}
