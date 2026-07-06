/**
 * ScrambleIn — entrance reveal animation
 * Characters reveal left-to-right with random char scramble effect
 */

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface ScrambleInProps {
  text: string;
  delay?: number; // ms before start
  triggered?: boolean;
  className?: string;
}

export function ScrambleIn({
  text,
  delay = 0,
  triggered = true,
  className = "",
}: ScrambleInProps) {
  const [displayed, setDisplayed] = useState<string[]>(() =>
    Array(text.length).fill("\u00A0")
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cursorRef = useRef(0);

  useEffect(() => {
    if (!triggered) {
      setDisplayed(Array(text.length).fill("\u00A0"));
      cursorRef.current = 0;
      return;
    }

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        cursorRef.current += 0.5; // 0.5 chars per frame
        const cursor = Math.floor(cursorRef.current);

        setDisplayed(() =>
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < cursor) return char; // revealed
            if (i < cursor + 3) return randomChar(); // scrambling ahead
            return "\u00A0"; // not yet visible
          })
        );

        if (cursor >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayed(text.split(""));
        }
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggered, text, delay]);

  return (
    <span className={className}>
      {displayed.map((char, i) => (
        <span
          key={i}
          style={{ display: "inline-block", minWidth: char === " " ? "0.3em" : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
