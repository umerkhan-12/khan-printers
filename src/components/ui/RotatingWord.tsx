"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Props = {
  words: string[];
  /** Time each word stays on screen. */
  interval?: number;
};

/**
 * Headline word that keeps changing: the old word lifts away while the new
 * one's letters rise into the (masked) line one after another. Only the
 * current and outgoing words are ever rendered, so nothing overlaps.
 *
 * The server HTML contains only the first word, and screen readers always
 * get the first word. No motion for users who prefer reduced motion.
 */
export function RotatingWord({ words, interval = 2800 }: Props) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (document.hidden) return;
        setIndex((i) => (i + 1) % words.length);
        setTick((t) => t + 1);
      }, interval);
    }, 1800); // let the headline entrance finish first
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [words.length, interval]);

  if (tick === 0) return <span className="whitespace-nowrap">{words[0]}</span>;

  const previous = (index - 1 + words.length) % words.length;
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="sr-only">{words[0]}</span>
      <span key={`out-${tick}`} aria-hidden="true" className="word-out absolute top-0 left-0">
        {words[previous]}
      </span>
      <span key={`in-${tick}`} aria-hidden="true" className="inline-block">
        {Array.from(words[index]).map((ch, i) => (
          <span key={i} className="letter-in" style={{ animationDelay: `${120 + i * 38}ms` } as CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
