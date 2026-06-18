"use client";

import { motion } from "motion/react";

/**
 * The reader's bottom control bar + progress arc. The arc (not a bar) shows
 * position through the entries. Save state is the lone rose accent here; the
 * rest of the reader stays ink + bone for calm reading.
 */
export default function ReaderControls({
  progress,
  focus,
  saved,
  ambient,
  onPrev,
  onNext,
  onFocus,
  onSave,
  onAmbient,
  onSizeUp,
  onSizeDown,
  atStart,
  atEnd,
}: {
  progress: number;
  focus: boolean;
  saved: boolean;
  ambient: boolean;
  onPrev: () => void;
  onNext: () => void;
  onFocus: () => void;
  onSave: () => void;
  onAmbient: () => void;
  onSizeUp: () => void;
  onSizeDown: () => void;
  atStart: boolean;
  atEnd: boolean;
}) {
  const R = 13;
  const C = 2 * Math.PI * R;

  return (
    <motion.footer
      animate={{ opacity: focus ? 0 : 1, y: focus ? 16 : 0 }}
      whileHover={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-20 flex items-center justify-between gap-4 px-5 pb-8 sm:px-10"
    >
      {/* progress arc */}
      <div className="flex items-center gap-3">
        <svg width="34" height="34" viewBox="0 0 34 34" className="-rotate-90">
          <circle cx="17" cy="17" r={R} fill="none" stroke="#3d2a41" strokeWidth="2" />
          <circle
            cx="17"
            cy="17"
            r={R}
            fill="none"
            stroke="#ebdbe0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <span className="font-mono text-[11px] text-bone/40">
          {Math.round(progress * 100)}%
        </span>
      </div>

      {/* center: tools */}
      <div className="flex items-center gap-1 rounded-full border border-plum/50 bg-ink-soft/70 px-2 py-1 backdrop-blur-sm">
        <Tool label="Aa−" onClick={onSizeDown} title="Smaller text" />
        <Tool label="Aa+" onClick={onSizeUp} title="Larger text" />
        <Divider />
        <Tool
          label={ambient ? "♪ on" : "♪"}
          onClick={onAmbient}
          title="Ambient sound"
          active={ambient}
        />
        <Tool label="focus" onClick={onFocus} title="Dim the lights (F)" />
        <Divider />
        <button
          onClick={onSave}
          title="Save this one"
          className={`rounded-full px-3 py-1 text-xs transition-colors ${
            saved ? "text-rose" : "text-bone/60 hover:text-bone"
          }`}
        >
          {saved ? "★ saved" : "☆ save"}
        </button>
      </div>

      {/* prev/next (mobile-friendly) */}
      <div className="flex items-center gap-2 md:hidden">
        <NavBtn label="←" onClick={onPrev} disabled={atStart} />
        <NavBtn label="→" onClick={onNext} disabled={atEnd} />
      </div>
      <span className="hidden font-mono text-[11px] text-bone/30 md:inline">
        ← → to turn
      </span>
    </motion.footer>
  );
}

function Tool({
  label,
  onClick,
  title,
  active,
}: {
  label: string;
  onClick: () => void;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
        active ? "text-rose" : "text-bone/60 hover:text-bone"
      }`}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-4 w-px bg-plum/60" aria-hidden />;
}

function NavBtn({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-plum/60 px-3 py-1 text-bone/70 transition-colors hover:border-bone hover:text-bone disabled:opacity-20"
    >
      {label}
    </button>
  );
}
