export type Line = { word: string; muted?: boolean };

// To add/remove a phrase, edit this array; index 0 is the first-visit signature phrase.
export const INTRO_PHRASES: Line[][] = [
  [{ word: "Ideas" },       { word: "Into", muted: true },     { word: "Products" }],
  [{ word: "Ship" },        { word: "Faster", muted: true },   { word: "Scale" }],
  [{ word: "Intelligent" }, { word: "Software", muted: true }, { word: "Systems" }],
  [{ word: "Crafted" },     { word: "For", muted: true },      { word: "Growth" }],
  [{ word: "Products" },    { word: "That", muted: true },     { word: "Perform" }],
  [{ word: "Automate" },    { word: "The", muted: true },      { word: "Complex" }],
  [{ word: "Code" },        { word: "With", muted: true },     { word: "Purpose" }],
  [{ word: "Built" },       { word: "To", muted: true },       { word: "Last" }],
  [{ word: "Vision" },      { word: "Into", muted: true },     { word: "Reality" }],
  [{ word: "Engineered" },  { word: "For", muted: true },      { word: "Impact" }],
];

export const INTRO_PHRASE_KEY = "intro-phrase-queue";

/*
 * Shuffle-bag pick: cycles through every phrase before any repeats, never twice in a row.
 * Storage holds [lastShown, ...upcoming]; when only lastShown is left, reshuffle all
 * and make sure the new head differs from it. First visit starts at index 0.
 *
 * Must stay self-contained (no outer references): it is serialized into the inline
 * script in intro-sequence.tsx so the pick happens before hydration and first paint.
 */
export function getNextIntroPhrase(count: number, storageKey: string): number {
  const shuffle = (a: number[]) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  };
  const range = (from: number) => {
    const a: number[] = [];
    for (let i = from; i < count; i++) a.push(i);
    return a;
  };
  const mem = window as unknown as { __introPhraseLast?: number };

  try {
    const raw = localStorage.getItem(storageKey);
    let queue: number[];
    if (raw === null) {
      queue = [0].concat(shuffle(range(1)));
    } else {
      const stored: unknown = JSON.parse(raw);
      const valid =
        Array.isArray(stored) &&
        stored.length > 0 &&
        stored.every((i) => Number.isInteger(i) && i >= 0 && i < count);
      if (valid && stored.length > 1) {
        queue = stored.slice(1);
      } else {
        const last = valid ? stored[0] : -1;
        queue = shuffle(range(0));
        if (queue[0] === last && count > 1) {
          queue[0] = queue[1];
          queue[1] = last;
        }
      }
    }
    localStorage.setItem(storageKey, JSON.stringify(queue));
    return queue[0];
  } catch {
    // Storage blocked (private mode etc.): random, but not the last one picked here.
    let next = Math.floor(Math.random() * count);
    if (next === mem.__introPhraseLast && count > 1) next = (next + 1) % count;
    mem.__introPhraseLast = next;
    return next;
  }
}
