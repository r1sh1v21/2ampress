// Mocked catalog. No backend — all titles live here. Covers are rendered with
// layered CSS by <BookCover />, so nothing depends on an image existing.

export type Book = {
  slug: string;
  title: string;
  hook: string; // one-line
  description: string; // longer, brand voice
  price: number;
  mood: string; // browse-by-mood tag
  cover: {
    // CSS-drawn cover palette pulled from the Last Call family
    base: string;
    accent: string;
    glyph: string; // big mark on the cover
  };
  count: number; // "100 things", "30 dates", etc — drives the cover number
  flagship?: boolean;
};

export const books: Book[] = [
  {
    slug: "100-things-after-a-breakup",
    title: "100 Things To Do After A Breakup",
    hook: "One small thing at a time, until the days get lighter.",
    description:
      "You don't need a five-year plan at 2am. You need the next ten minutes. This is one hundred small, doable things — not affirmations, not a glow-up — just honest moves from someone who's been awake at the same hour you are. Read one. Do it. Come back tomorrow.",
    price: 9,
    mood: "heartbreak",
    cover: { base: "#0e0e0e", accent: "#ff5d4b", glyph: "100" },
    count: 100,
    flagship: true,
  },
  {
    slug: "200-things-to-do-alone",
    title: "200 Things To Do Alone",
    hook: "Being on your own, without being lonely about it.",
    description:
      "Alone is a skill before it's a feeling. Two hundred ways to spend an evening with yourself that don't end in a doom-scroll — small adventures, quiet rituals, and the kind of nights you'll secretly start to protect.",
    price: 11,
    mood: "solitude",
    cover: { base: "#070707", accent: "#ededea", glyph: "200" },
    count: 200,
  },
  {
    slug: "100-small-moves",
    title: "100 Small Moves That Make You Hard To Forget",
    hook: "Not tricks. Just the things people quietly remember.",
    description:
      "Being memorable isn't loud. It's a hundred small, specific moves — how you listen, when you text back, what you notice — that make people keep your name in their mouth long after you've left the room.",
    price: 10,
    mood: "magnetism",
    cover: { base: "#121212", accent: "#ff5d4b", glyph: "100" },
    count: 100,
  },
  {
    slug: "30-dates-worth-having",
    title: "30 Dates Worth Having",
    hook: "Thirty plans better than 'wyd.'",
    description:
      "Thirty actual dates — for new people, old loves, or just yourself — designed to get past the small talk and into the part that matters. Print one out. Surprise someone. Be the person who plans.",
    price: 8,
    mood: "romance",
    cover: { base: "#0a0a0a", accent: "#ededea", glyph: "30" },
    count: 30,
  },
  {
    slug: "50-ways-to-quit-your-phone",
    title: "50 Ways To Put The Phone Down",
    hook: "For the 2am scroll you keep promising to end.",
    description:
      "Fifty small, unglamorous ways to want your phone a little less — built for people who've tried 'just delete the app' and know it doesn't work like that. Gentle, specific, and a little funny about how hard this actually is.",
    price: 7,
    mood: "reset",
    cover: { base: "#0e0e0e", accent: "#6c6c6c", glyph: "50" },
    count: 50,
  },
  {
    slug: "100-questions-before-you-text-back",
    title: "100 Questions To Ask Before You Text Back",
    hook: "A pause, between the notification and the regret.",
    description:
      "One hundred questions to sit with before you reply to the message you've already typed three times. Not rules — just a friend grabbing your wrist for a second so you send the thing you actually mean.",
    price: 9,
    mood: "clarity",
    cover: { base: "#060606", accent: "#ff5d4b", glyph: "100" },
    count: 100,
  },
];

export const flagship = books.find((b) => b.flagship)!;

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
