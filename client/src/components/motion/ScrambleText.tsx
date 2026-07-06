/**
 * ScrambleText — hover-driven scramble animation
 * On hover: scrambles all chars, then reveals left-to-right
 * On unhover: immediately resets to original text
 */

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export function ScrambleText({ text, isHovered, className = "" }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState<string[]>(text.split(""));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isHovered) {
      setDisplayed(text.split(""));
      frameRef.current = 0;
      return;
    }

    // Start scrambling
    frameRef.current = 0;
    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      const cursor = Math.floor(frameRef.current / 4); // 4 frames per char

      setDisplayed(() =>
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < cursor) return char; // revealed
          return randomChar(); // scrambling
        })
      );

      if (cursor >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayed(text.split(""));
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

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
