import { notFound } from "next/navigation";
import { getBook, books } from "@/lib/books";
import { getEntries } from "@/lib/reader";
import Reader from "@/components/reader/Reader";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  const entries = getEntries(slug);
  if (!book || entries.length === 0) notFound();

  return <Reader entries={entries} book={book} />;
}
