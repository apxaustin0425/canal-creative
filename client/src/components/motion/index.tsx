/**
 * Canal Creative — Motion Primitives
 * All animations respect prefers-reduced-motion
 * Spring config: stiffness 120, damping 28 (matches hero)
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";

// ─── EASE CURVES ────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const SPRING_CONFIG = { stiffness: 120, damping: 28, mass: 0.6 };

// ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function ScrollReveal({ children, className = "", delay = 0, y = 30 }: ScrollRevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EASE_OUT_EXPO,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER CONTAINER ──────────────────────────────────────────────────────
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayStart = 0,
}: StaggerContainerProps) {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayStart,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ─── STAGGER ITEM ────────────────────────────────────────────────────────────
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

export function StaggerItem({ children, className = "", y = 20 }: StaggerItemProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

// ─── PARALLAX IMAGE ──────────────────────────────────────────────────────────
interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.1 = subtle, 0.3 = noticeable
}

export function ParallaxImage({ children, className = "", speed = 0.15 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  const y = useTransform(springProgress, [0, 1], reduced ? [0, 0] : [-60 * speed * 10, 60 * speed * 10]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─── HOVER LIFT ──────────────────────────────────────────────────────────────
interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  liftY?: number;
}

export function HoverLift({ children, className = "", liftY = -6 }: HoverLiftProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduced ? {} : { y: liftY, scale: 1.02 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={SPRING_CONFIG}
    >
      {children}
    </motion.div>
  );
}

// ─── FADE IN ─────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeIn({ children, className = "", delay = 0, duration = 0.9, y = 25 }: FadeInProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        ease: [0.215, 0.61, 0.355, 1.0],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
