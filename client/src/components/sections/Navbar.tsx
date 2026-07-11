/**
 * Canal Creative — Navbar
 * Design: Clean always-visible horizontal nav
 * - Logo left, nav links center, CTA right
 * - No hamburger, no sidebar, no expanding pills
 * - Transparent → frosted glass on scroll
 * - ScrambleText on link hover
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/motion/ScrambleText";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

interface NavbarProps {
  entranceComplete: boolean;
  onScrollTo: (id: string) => void;
  onApply?: () => void;
}

function CanalLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" fill="white" aria-label="Canal Creative">
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          transform={`rotate(${deg})`}
          d="M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z"
        />
      ))}
    </svg>
  );
}

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-[14px] font-mono text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

export function Navbar({ entranceComplete, onScrollTo, onApply }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(0,0,0,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full px-6 sm:px-10 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 shrink-0"
        >
          <CanalLogo size={18} />
          <span className="text-[15px] font-mono font-medium text-white tracking-tight hidden sm:block">
            Canal Creative
          </span>
        </button>

        {/* ── Center nav links (hidden on small mobile) ── */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.id}
              label={link.label}
              onClick={() => onScrollTo(link.id)}
            />
          ))}
        </nav>

        {/* ── Right CTA ── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile: show condensed links in a row */}
          <nav className="flex md:hidden items-center gap-4">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollTo(link.id)}
                className="text-[12px] font-mono text-white/55 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <motion.button
            onClick={() => onScrollTo("contact")}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            className="flex items-center h-9 px-5 bg-white rounded-full text-black font-mono font-semibold text-[13px] tracking-wide"
            whileHover={{ scale: 1.03, backgroundColor: "#e8e8ec" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ScrambleText text="Get a Space" isHovered={ctaHovered} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
