"use client";

/**
 * Infinite horizontal ticker. A protest-banner / zine device — nothing about it
 * reads "AI landing page". Content is duplicated so the -50% keyframe loops
 * seamlessly. Pauses on hover; honors reduced motion via the global CSS clamp
 * (the animation simply doesn't run meaningfully).
 */
export default function Marquee({
  text,
  speed = 28,
  className = "",
  accent = false,
}: {
  text: string;
  speed?: number;
  className?: string;
  accent?: boolean;
}) {
  const item = (
    <span className="flex shrink-0 items-center">
      <span className="font-display whitespace-nowrap px-6 text-[clamp(2.4rem,7vw,5.5rem)] leading-none">
        {text}
      </span>
      <span
        className={accent ? "text-rose" : "text-plum-soft"}
        aria-hidden
      >
        ✶
      </span>
    </span>
  );

  return (
    <div
      className={`group relative flex overflow-hidden border-y border-plum py-4 ${className}`}
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
