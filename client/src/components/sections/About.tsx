/**
 * Canal Creative — About Section (Cinematic Text)
 * Design: SynapseX Section 2 adapted for Canal Creative
 * - Building photo as full-bleed background
 * - Top gradient overlay (dark to transparent)
 * - 3D perspective text with scroll-driven rotateX + translateY
 * - Spring-smoothed scroll progress (stiffness 15, damping 32, mass 1.8)
 * - Opacity fades in from 0 to 1 between scroll progress 0.3–0.5
 */

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const BUILDING_PHOTO = "/manus-storage/IMG_0985_4a2f134e.jpg";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  // 3D text: rotates from 24deg to 0, translates from 60px to -120px
  const rotateX = useTransform(springProgress, [0, 1], [24, 0]);
  const translateY = useTransform(springProgress, [0, 1], [60, -120]);

  // Opacity: fades in between 0.3 and 0.5 scroll progress
  const textOpacity = useTransform(springProgress, [0.2, 0.45], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Background: building photo ── */}
      <div className="absolute inset-0">
        <img
          src={BUILDING_PHOTO}
          alt="Canal Creative building interior"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* ── Top gradient overlay (dark to transparent) ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "180px",
          background: "linear-gradient(to bottom, #000 0%, transparent 100%)",
        }}
      />

      {/* ── 3D Cinematic Text ── */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12"
        style={{ perspective: "400px" }}
      >
        <motion.p
          className="font-mono font-normal text-white leading-[1.35] tracking-[-0.02em] select-none text-center"
          style={{
            fontSize: "clamp(22px, 5vw, 42px)",
            rotateX,
            y: translateY,
            translateZ: 15,
            opacity: textOpacity,
          }}
        >
          A working community of artists, makers, and small businesses. Canal Creative occupies a historic industrial building at 531 Canal Street. Every space is built for real work — studios, offices, workshops, and event space. 40+ units. 24/7 access. Flexible terms. One building. Endless possibility.
        </motion.p>
      </div>

      {/* ── Bottom gradient overlay ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to top, #000 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
