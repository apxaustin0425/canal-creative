/**
 * Canal Creative — Metrics Section
 * Design: SynapseX Section 3 adapted for Canal Creative
 * - Building photo as full-bleed background
 * - 4 key stats with large metric values
 * - Staggered fade-up on scroll (0.15s delay per item)
 * - Subtitle: "By The Numbers" in tracking-wide uppercase
 */

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/index";

const METRICS_PHOTO = "/manus-storage/IMG_1141_adcd67d8.jpg";

const METRICS = [
  { value: "40+", label: "Units & Studios" },
  { value: "24/7", label: "Secure Access" },
  { value: "4", label: "Space Types" },
  { value: "531", label: "Canal Street" },
];

export function Metrics() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img
          src={METRICS_PHOTO}
          alt="Canal Creative space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* ── Top gradient ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: "120px", background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto pt-32 pb-32 px-6">

        {/* Subtitle */}
        <motion.p
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        >
          By The Numbers
        </motion.p>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: EASE_OUT_EXPO,
                delay: i * 0.15,
              }}
            >
              <div className="metric-value font-mono">{metric.value}</div>
              <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide font-mono">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: "120px", background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
      />
    </section>
  );
}
