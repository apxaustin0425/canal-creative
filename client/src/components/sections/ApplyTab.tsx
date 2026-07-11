/**
 * Canal Creative — Apply Tab
 * Design: Vertical pill tab fixed to right edge of screen
 * - "APPLY NOW" text rotated 90deg
 * - Orange background, white text
 * - Hover: slight scale + glow
 * - Click: opens ApplicationModal
 */

import { motion } from "framer-motion";

interface ApplyTabProps {
  onClick: () => void;
}

export function ApplyTab({ onClick }: ApplyTabProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[80] flex items-center justify-center"
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        backgroundColor: "oklch(0.58 0.19 38)",
        color: "white",
        fontFamily: '"Space Mono", monospace',
        fontWeight: 700,
        fontSize: "11px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        paddingLeft: "0.6rem",
        paddingRight: "0.6rem",
        borderRadius: "8px 0 0 8px",
        boxShadow: "0 0 24px oklch(0.58 0.19 38 / 30%)",
        cursor: "pointer",
        userSelect: "none",
      }}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.04, boxShadow: "0 0 32px oklch(0.58 0.19 38 / 50%)" }}
      whileTap={{ scale: 0.97 }}
    >
      Apply Now
    </motion.button>
  );
}
