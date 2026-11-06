"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1800;

/**
 * Types each phrase, holds it, deletes it, then moves to the next.
 * Screen readers get the first phrase once; reduced-motion visitors see it static.
 */
export default function Typewriter({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const phrase = phrases[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && text === phrase) delay = HOLD_MS;

    const id = window.setTimeout(() => {
      if (!deleting && text === phrase) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [animate, deleting, index, phrases, text]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[2px] animate-blink bg-current align-[-0.15em]" style={{ height: "1.1em" }} />
      </span>
    </span>
  );
}
