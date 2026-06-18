import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBook, books } from "@/lib/books";
import { getEntries, hasReader } from "@/lib/reader";
import FloatingBook from "@/components/FloatingBook";
import AddToCart from "@/components/book/AddToCart";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return { title: book ? `${book.title} — 2 AM Press` : "2 AM Press" };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const canRead = hasReader(slug);
  const sampleTitles = getEntries(slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-32 sm:px-8">
      {/* hero — asymmetric, book offset right */}
      <section className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="order-1 flex justify-center lg:justify-start">
          <FloatingBook book={book} size={300} />
        </div>

        <div className="order-2 max-w-xl">
          <p className="kicker mb-5">{book.mood}</p>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.98]">
            {book.title}
          </h1>
          <p className="mt-5 text-xl text-bone/75">{book.hook}</p>
          <p className="mt-6 leading-relaxed text-bone/60">{book.description}</p>
          <AddToCart book={book} canRead={canRead} />
        </div>
      </section>

      {/* what's inside */}
      {sampleTitles.length > 0 && (
        <section className="mt-32">
          <Reveal>
            <p className="kicker mb-6">what&apos;s inside</p>
            <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4.5vw,3rem)] leading-tight">
              A taste of the {book.count} things.
            </h2>
          </Reveal>
          <ul className="mt-12 divide-y divide-plum/40 border-y border-plum/40">
            {sampleTitles.map((e, i) => (
              <Reveal key={e.number} delay={i * 0.04}>
                <li className="flex items-baseline gap-6 py-5">
                  <span className="font-mono text-sm text-rose">
                    № {String(e.number).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl text-bone/85">
                    {e.title}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
