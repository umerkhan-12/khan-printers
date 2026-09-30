"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  /** Time each word stays on screen. */
  interval?: number;
};

/**
 * Word that keeps cycling in place with a slide-up. All words share one grid
 * cell, so the line never changes width or jumps.
 *
 * The server HTML contains only the first word (clean for search engines),
 * and assistive tech always reads the first word; the other words are added
 * once rotation starts. Motion is skipped for users who prefer reduced motion.
 */
export function RotatingWord({ words, interval = 2600 }: Props) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      setStarted(true);
      timer = window.setInterval(() => {
        if (!document.hidden) setIndex((i) => (i + 1) % words.length);
      }, interval);
    }, 1600); // let the headline entrance finish first
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [words.length, interval]);

  const previous = (index - 1 + words.length) % words.length;
  const visible = started ? words : words.slice(0, 1);

  return (
    <span className="relative inline-grid justify-items-start whitespace-nowrap">
      {visible.map((word, i) => {
        const state =
          i === index ? "translate-y-0 opacity-100" : i === previous ? "-translate-y-[70%] opacity-0" : "translate-y-[70%] opacity-0";
        return (
          <span
            key={word}
            aria-hidden={i === 0 ? undefined : true}
            className={`col-start-1 row-start-1 transition-[transform,opacity] duration-700 ease-(--ease-soft) ${state}`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
