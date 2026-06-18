import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-[800px] flex-col items-center justify-center px-5 text-center">
      <p className="kicker mb-6">404</p>
      <h1 className="font-display text-[clamp(2.6rem,9vw,6rem)] leading-[0.95]">
        This page is up
        <br />
        past its <span className="text-rose">bedtime.</span>
      </h1>
      <p className="mt-6 max-w-sm text-bone/55">
        Whatever you were looking for isn&apos;t here — or it&apos;s asleep.
        Either way, let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="mt-9 rounded-full border border-bone px-8 py-3.5 transition-colors hover:bg-bone hover:text-ink"
      >
        Back home
      </Link>
    </div>
  );
}
