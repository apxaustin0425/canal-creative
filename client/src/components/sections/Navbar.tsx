/**
 * Canal Creative — Navbar
 * Design: SynapseX-inspired expanding pill mechanic
 * - Logo pill (left) + expanding menu pill (left) + CTA pill (right)
 * - Hamburger animates to X on open
 * - ScrambleText on nav link hover
 * - Mobile: scaled-down version, menu pill expands to full width
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "@/components/motion/ScrambleText";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Amenities", id: "amenities" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
  { label: "Relief", id: "relief" },
];

interface NavbarProps {
  entranceComplete: boolean;
  onScrollTo: (id: string) => void;
}

// ── Canal Creative Logo Mark ──────────────────────────────────────────────
function CanalLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="white"
      aria-label="Canal Creative"
    >
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

// ── Animated Hamburger ────────────────────────────────────────────────────
function SquashHamburger({ isOpen }: { isOpen: boolean }) {
  const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <div className="relative w-[18px] h-[12px]">
      {/* Top bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full"
        style={{ height: "1.5px", top: 0, transformOrigin: "center" }}
        animate={isOpen ? { rotate: 45, y: 5.25 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
      {/* Middle bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full"
        style={{ height: "1.5px", top: "50%", marginTop: "-0.75px" }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      {/* Bottom bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full"
        style={{ height: "1.5px", bottom: 0, transformOrigin: "center" }}
        animate={isOpen ? { rotate: -45, y: -5.25 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
    </div>
  );
}

// ── Nav Link with ScrambleText ────────────────────────────────────────────
function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-[16px] font-normal text-white/80 hover:text-white transition-colors font-mono"
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

export function Navbar({ entranceComplete, onScrollTo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const pillSpring = { type: "spring" as const, stiffness: 350, damping: 28 };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center"
      initial={{ opacity: 0 }}
      animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full px-4 sm:px-6 flex items-center justify-between">

        {/* ── LEFT GROUP: Logo pill + Menu pill ── */}
        <div className="flex items-center gap-2">

          {/* Logo pill — hides on mobile when menu open */}
          <AnimatePresence>
            {!menuOpen && (
              <motion.button
                key="logo-pill"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hidden sm:flex items-center gap-2.5 h-12 px-5 rounded-[14px] bg-white/15 backdrop-blur-md"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.22)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={pillSpring}
              >
                <CanalLogo size={18} />
                <span className="text-[16px] font-medium tracking-tight text-white font-mono whitespace-nowrap">
                  Canal Creative
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile logo pill */}
          <AnimatePresence>
            {!menuOpen && (
              <motion.button
                key="logo-pill-mobile"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex sm:hidden items-center gap-2 h-9 px-3.5 rounded-[10px] bg-white/15 backdrop-blur-md"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={pillSpring}
              >
                <CanalLogo size={14} />
                <span className="text-[13px] font-medium text-white font-mono whitespace-nowrap">
                  Canal Creative
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Expanding menu pill — desktop */}
          <motion.div
            className="hidden sm:flex items-center h-12 rounded-[14px] bg-white/15 backdrop-blur-md overflow-hidden"
            animate={{ width: menuOpen ? 290 : 48 }}
            transition={pillSpring}
          >
            {/* Hamburger button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center shrink-0 transition-colors"
              animate={
                menuOpen
                  ? { width: 36, height: 36, borderRadius: 11, marginLeft: 6, backgroundColor: "rgba(255,255,255,0.1)" }
                  : { width: 48, height: 48, borderRadius: 14, marginLeft: 0, backgroundColor: "transparent" }
              }
              whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              transition={pillSpring}
            >
              <SquashHamburger isOpen={menuOpen} />
            </motion.button>

            {/* Nav links (fade in when open) */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-5 pl-3 pr-4"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.id}
                      label={link.label}
                      onClick={() => {
                        onScrollTo(link.id);
                        setMenuOpen(false);
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Expanding menu pill — mobile */}
          <motion.div
            className="flex sm:hidden items-center h-9 rounded-[10px] bg-white/15 backdrop-blur-md overflow-hidden"
            animate={{ width: menuOpen ? "calc(100vw - 2rem)" : 36 }}
            transition={pillSpring}
          >
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center shrink-0"
              style={{ width: 36, height: 36 }}
            >
              <div className="relative w-[15px] h-[10px]">
                <motion.span
                  className="absolute left-0 w-full bg-white rounded-full"
                  style={{ height: "1.2px", top: 0 }}
                  animate={menuOpen ? { rotate: 45, y: 4.4 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.span
                  className="absolute left-0 w-full bg-white rounded-full"
                  style={{ height: "1.2px", top: "50%", marginTop: "-0.6px" }}
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.span
                  className="absolute left-0 w-full bg-white rounded-full"
                  style={{ height: "1.2px", bottom: 0 }}
                  animate={menuOpen ? { rotate: -45, y: -4.4 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex items-center gap-4 pl-1 pr-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onScrollTo(link.id);
                        setMenuOpen(false);
                      }}
                      className="text-[13px] text-white/80 hover:text-white font-mono whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── RIGHT: CTA pill ── */}
        <motion.button
          onClick={() => onScrollTo("contact")}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          className="hidden sm:flex items-center gap-2 h-12 px-6 bg-white rounded-full text-black font-mono font-medium text-[15px]"
          whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ScrambleText text="Get a Space" isHovered={ctaHovered} />
        </motion.button>

        {/* Mobile CTA */}
        <motion.button
          onClick={() => onScrollTo("contact")}
          className="flex sm:hidden items-center h-9 px-3.5 bg-white rounded-full text-black font-mono font-medium text-[13px]"
          whileTap={{ scale: 0.97 }}
        >
          Inquire
        </motion.button>
      </div>
    </motion.header>
  );
}
