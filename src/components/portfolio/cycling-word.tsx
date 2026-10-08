"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const EXIT_MS = 700;

// Cycles through `words` in place. All words share one grid cell, so the
// slot is always as wide as the longest word and surrounding text never shifts.
export function CyclingWord({
  words,
  interval = 3000,
  className,
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  // `prev` is the word currently leaving; cleared once its exit finishes so it
  // can reset below unseen.
  const [{ index, prev }, setState] = useState<{
    index: number;
    prev: number | null;
  }>({ index: 0, prev: null });

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(
      () => setState((s) => ({ ...s, prev: null })),
      EXIT_MS,
    );
    return () => clearTimeout(t);
  }, [prev, index]);

  useEffect(() => {
    if (words.length < 2) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    const sync = () => {
      clearInterval(timer);
      if (media.matches) {
        setState({ index: 0, prev: null });
        return;
      }
      timer = setInterval(
        () =>
          setState((s) => ({
            index: (s.index + 1) % words.length,
            prev: s.index,
          })),
        interval,
      );
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      media.removeEventListener("change", sync);
    };
  }, [words.length, interval]);

  return (
    <span className={cn("inline-grid", className)}>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            "[grid-area:1/1] will-change-[opacity,transform,filter] motion-reduce:transition-none",
            i === index
              ? // Enter: rise from below, slightly after the exit starts.
                "translate-y-0 opacity-100 blur-0 transition-[opacity,transform,filter] delay-150 duration-900 ease-[cubic-bezier(0.33,1,0.68,1)]"
              : i === prev
                ? // Exit: drift up and dissolve.
                  "translate-y-[-0.22em] opacity-0 blur-xs transition-[opacity,transform,filter] duration-600 ease-[cubic-bezier(0.32,0,0.67,0)]"
                : // Idle: wait below, invisible, no transition so the reset is never seen.
                  "translate-y-[0.22em] opacity-0 blur-xs transition-none",
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
