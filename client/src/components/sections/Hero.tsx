/**
 * Canal Creative — Hero Section
 * Design: SynapseX-inspired scroll-expansion mural
 * - Mural image expands from center on scroll (existing mechanic preserved)
 * - Dot grid overlay (opacity 0.05)
 * - "CANAL CREATIVE" watermark in Anton SC
 * - Asymmetric bottom row: left headline + right headline (not centered)
 * - ScrambleIn text reveal after entrance complete
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ScrambleIn } from "@/components/motion/ScrambleIn";
import { FadeIn } from "@/components/motion/index";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "/manus-storage/canal_hero_mural_3ba62e3e.jpg";

interface HeroProps {
  onScrollToContact: () => void;
  onScrollToProcess: () => void;
}

export function Hero({ onScrollToContact, onScrollToProcess }: HeroProps) {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollLocked = useRef(false);
  const touchStartY = useRef(0);
  const touchVelocity = useRef(0);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const momentumFrame = useRef<number | null>(null);

  // Spring-smoothed progress
  const springProgress = useSpring(0, { stiffness: 120, damping: 28, mass: 0.6 });
  const mediaWidth = useTransform(springProgress, [0, 1], ["45%", "100%"]);
  const mediaHeight = useTransform(springProgress, [0, 1], ["65vh", "100vh"]);
  const borderRadius = useTransform(springProgress, [0, 0.8, 1], ["16px", "8px", "0px"]);
  const bgOpacity = useTransform(springProgress, [0, 0.5, 1], [0, 0, 1]);
  const titleOpacity = useTransform(springProgress, [0, 0.3, 0.6], [1, 0.3, 0]);
  const contentOpacity = useTransform(springProgress, [0.85, 1], [0, 1]);

  // Entrance delay
  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Sync spring to progress
  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  // Detect expansion
  useEffect(() => {
    const unsub = springProgress.on("change", (v) => {
      if (v > 0.98 && !expanded) setExpanded(true);
      if (v < 0.95 && expanded) setExpanded(false);
    });
    return unsub;
  }, [springProgress, expanded]);

  // Lock/unlock scroll
  useEffect(() => {
    if (progress > 0 && progress < 1) {
      if (!isScrollLocked.current) {
        document.body.style.overflow = "hidden";
        isScrollLocked.current = true;
      }
    } else {
      if (isScrollLocked.current) {
        document.body.style.overflow = "";
        isScrollLocked.current = false;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [progress]);

  // Wheel handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (progress >= 1) return;
    e.preventDefault();
    setProgress((p) => Math.max(0, Math.min(1, p + e.deltaY * 0.001)));
  }, [progress]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Touch handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    lastTouchY.current = e.touches[0].clientY;
    lastTouchTime.current = Date.now();
    touchVelocity.current = 0;
    if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (progress >= 1) return;
    e.preventDefault();
    const now = Date.now();
    const dt = now - lastTouchTime.current;
    const dy = lastTouchY.current - e.touches[0].clientY;
    touchVelocity.current = dt > 0 ? dy / dt : 0;
    lastTouchY.current = e.touches[0].clientY;
    lastTouchTime.current = now;
    setProgress((p) => Math.max(0, Math.min(1, p + dy * 0.003)));
  }, [progress]);

  const handleTouchEnd = useCallback(() => {
    const vel = touchVelocity.current;
    if (Math.abs(vel) < 0.1) return;
    let v = vel;
    const momentum = () => {
      v *= 0.92;
      setProgress((p) => {
        const next = Math.max(0, Math.min(1, p + v * 16 * 0.003));
        if (Math.abs(v) < 0.005) return next;
        momentumFrame.current = requestAnimationFrame(momentum);
        return next;
      });
    };
    momentumFrame.current = requestAnimationFrame(momentum);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{ touchAction: "none" }}
    >
      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 dot-grid z-10 pointer-events-none" />

      {/* ── Anton SC watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ marginTop: "50px" }}
      >
        <span
          style={{
            fontFamily: "'Anton SC', sans-serif",
            fontSize: "clamp(80px, 22vw, 380px)",
            letterSpacing: "-4px",
            textTransform: "uppercase",
            background: "radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.08,
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          CANAL
        </span>
      </div>

      {/* ── Expanding mural image ── */}
      <motion.div
        className="relative z-20 overflow-hidden"
        style={{
          width: mediaWidth,
          height: mediaHeight,
          borderRadius,
        }}
      >
        <img
          src={HERO_IMAGE}
          alt="531 Canal Street mural"
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.05)" }}
        />
        {/* Dark overlay that appears as image expands */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: bgOpacity }}
        />
      </motion.div>

      {/* ── Pre-expansion title (fades out as image expands) ── */}
      <motion.div
        className="absolute z-30 text-center pointer-events-none"
        style={{ opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3 font-mono">
            531 Canal Street · Reading, PA
          </p>
          <h1 className="hero-heading text-white text-center">
            Canal<br />Creative
          </h1>
        </motion.div>
      </motion.div>

      {/* ── Post-expansion content (asymmetric layout) ── */}
      <motion.div
        className="absolute inset-0 z-40 flex flex-col"
        style={{ opacity: contentOpacity, pointerEvents: expanded ? "auto" : "none" }}
      >
        {/* Padding matches SynapseX spec */}
        <div className="flex-1" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-4 sm:px-6 md:px-8 pb-8 sm:pb-12">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-4">
            {/* Kicker + accent rule */}
            <div className="flex items-center gap-3">
              <span className="accent-rule" />
              <span className="text-white/40 text-[11px] tracking-[0.25em] uppercase font-mono">
                Studios · Offices · Workshops
              </span>
            </div>

            {/* Main headline — scramble reveal */}
            <h1
              className="text-white font-light leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px, 10vw, 100px)" }}
            >
              <ScrambleIn text="Create" delay={200} triggered={entranceComplete} className="block" />
              <ScrambleIn text="& Build" delay={500} triggered={entranceComplete} className="block" />
            </h1>

            {/* Description */}
            <FadeIn delay={0.4} y={20}>
              <p className="max-w-sm text-[13px] sm:text-[15px] text-white/55 leading-relaxed font-mono">
                A working community of artists, makers, and small businesses inside a historic industrial building in Reading, PA.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.6} y={15}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onScrollToContact}
                  className="btn-orange btn-pulse flex items-center gap-2 px-5 py-2.5 text-sm rounded-full"
                >
                  Inquire About Space <ArrowRight size={14} />
                </button>
                <button
                  onClick={onScrollToProcess}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-full transition-colors font-mono"
                >
                  How It Works
                </button>
              </div>
            </FadeIn>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-1 md:text-right">
            <h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px, 10vw, 100px)" }}
            >
              <ScrambleIn text="Your" delay={700} triggered={entranceComplete} className="block" />
              <ScrambleIn text="Studio" delay={1000} triggered={entranceComplete} className="block" />
            </h2>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll hint (pre-expansion) ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        style={{ opacity: titleOpacity }}
        initial={{ opacity: 0 }}
        animate={entranceComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-mono">Scroll to expand</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </div>
  );
}
