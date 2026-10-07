"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { INTRO_PHRASES } from "./intro-phrases";
import styles from "./intro-sequence.module.css";


const meta = [
  { pos: "tl", label: "SH — Portfolio" },
  { pos: "tr", label: "Edition 2026" },
  { pos: "bl", label: "Sys.init" },
  { pos: "br", label: "Full-stack / AI / SaaS" },
];

const vars = (i: number) => ({ "--i": i }) as CSSProperties;

// Server-rendered so it covers the page from the first paint. The timeline is pure
// CSS; this component only handles skip, and unmounts once every animation is done.
export function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"play" | "skip" | "done">("play");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Also covers hydrating after the intro already ended (finished promises resolve at once).
    // A skip cancels these animations; the skip timer below unmounts instead.
    Promise.all(
      el.getAnimations({ subtree: true }).map((a) => a.finished),
    ).then(
      () => setState("done"),
      () => {},
    );

    const skip = () => setState((s) => (s === "play" ? "skip" : s));
    const events = ["pointerdown", "wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, skip));
  }, []);

  useEffect(() => {
    if (state !== "skip") return;
    const t = setTimeout(() => setState("done"), 200);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "done") return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-skip={state === "skip" || undefined}
      className={styles.intro}
    >
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.cols}>
            {Array.from({ length: 13 }, (_, i) => (
              <span
                key={i}
                className={styles.vline}
                data-minor={i % 3 !== 0 || undefined}
                style={vars(i)}
              />
            ))}
            {meta.map(({ pos, label }, i) => (
              <span
                key={pos}
                className={styles.meta}
                data-pos={pos}
                style={vars(i)}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <span className={styles.hline} data-pos="top" style={vars(0)} />
        <span className={styles.hline} data-pos="bottom" style={vars(1)} />
        {["tl", "tr", "bl", "br"].map((pos) => (
          <span key={pos} className={styles.corner} data-pos={pos} />
        ))}
        <p className={styles.headline}>
          {/* Every set is rendered hidden; the inline script in intro-sequence.tsx shows one. */}
          {INTRO_PHRASES.map((lines, p) => (
            <span key={p} className={styles.phrase} data-phrase={p}>
              {lines.map(({ word, muted }, i) => (
                <span key={word} className={styles.line}>
                  <span
                    className={
                      muted ? `${styles.word} ${styles.muted}` : styles.word
                    }
                    style={vars(i)}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
      <span className={styles.sweep} />
    </div>
  );
}
