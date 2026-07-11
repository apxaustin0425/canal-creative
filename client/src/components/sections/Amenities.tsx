/**
 * Canal Creative — Amenities Section
 * Design: SynapseX Section 4 (Technology/Adaptive Intelligence) adapted
 * - Building photo as full-bleed background
 * - Asymmetric top: left heading + right description
 * - Bottom grid: 2 cols mobile, 4 cols desktop, staggered fade-up
 * - Each card: icon + bold label + minimal description
 */

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/index";

const AMENITIES_PHOTO = "/manus-storage/IMG_0898_e683b78b.jpg";

const AMENITIES = [
  { icon: "🔐", label: "24/7 Access" },
  { icon: "📦", label: "Mail Handling" },
  { icon: "🅿️", label: "On-Site Parking" },
  { icon: "🔧", label: "On-Site Management" },
  { icon: "🏗️", label: "Loading Dock" },
  { icon: "💡", label: "Utilities Included" },
];

export function Amenities() {
  return (
    <section
      id="amenities"
      className="relative min-h-screen h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img
          src={AMENITIES_PHOTO}
          alt="Canal Creative workshop space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* ── Top gradient ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: "120px", background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col flex-1 px-8 sm:px-12 md:px-16 py-24 sm:py-28">

        {/* ── Top: asymmetric heading + description ── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-auto">
          <motion.h2
            className="section-heading font-mono"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
          >
            Everything<br />Included
          </motion.h2>


        </div>

        {/* ── Spacer ── */}
        <div className="flex-1" style={{ minHeight: "2rem" }} />

        {/* ── Bottom: amenities grid ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          {AMENITIES.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="text-white text-[14px] sm:text-[16px] font-normal mb-2 font-mono">
                {item.label}
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: "120px", background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
      />
    </section>
  );
}
