/**
 * Canal Creative — Venezuela Earthquake Relief Section
 * Design: Bold, urgent, with pulsing CTA buttons
 * - Dark background with subtle orange gradient
 * - Urgency marquee ticker
 * - Impact stats grid
 * - Pulsing donation amount buttons
 * - All links go to GEM campaign
 */

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/index";

const GEM_URL = "https://give.gem.org/campaign/735778?designation=1905343&utm_source=canalcreative&utm_medium=website&utm_campaign=venezuela_relief";

const IMPACT_STATS = [
  { value: "$10M+", label: "Committed to Relief" },
  { value: "97%", label: "Directly to Relief" },
  { value: "15+", label: "Years of Experience" },
  { value: "14", label: "Disasters Responded" },
];

const DONATION_AMOUNTS = [
  { amount: "$25", label: "Provides emergency food" },
  { amount: "$50", label: "Shelter for a family" },
  { amount: "$100", label: "Medical supplies" },
  { amount: "$250", label: "Full relief kit" },
];

const MARQUEE_TEXT = "VENEZUELA EARTHQUAKE RELIEF · URGENT NEED · DONATE NOW · CANAL CREATIVE SUPPORTS GEM · ";

export function Relief() {
  return (
    <section id="relief" className="relative bg-black overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      {/* ── Subtle orange glow background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.58 0.19 38 / 8%) 0%, transparent 70%)",
        }}
      />

      {/* ── Urgency marquee ticker ── */}
      <div className="relative overflow-hidden mb-16 -mx-4 sm:-mx-6 md:-mx-8">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>
          {[0, 1].map(n => (
            <span key={n} className="text-orange-600 text-[11px] tracking-[0.3em] uppercase font-mono px-4 py-2">
              {MARQUEE_TEXT.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Active relief badge ── */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <span
            className="w-2 h-2 rounded-full bg-orange-500"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="text-orange-500 text-[11px] tracking-[0.2em] uppercase font-mono">
            Active Relief Response
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
        >
          <h2 className="section-heading font-mono mb-6">
            Venezuela<br />Earthquake Relief
          </h2>
          <p className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed max-w-2xl font-mono">
            A 7.3 magnitude earthquake struck Venezuela, leaving thousands without shelter, food, or medical care. Canal Creative is partnering with GEM (Global Empowerment Mission) to channel direct relief to affected communities.
          </p>
        </motion.div>

        {/* ── Impact stats ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-white/8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 + i * 0.1 }}
            >
              <div className="text-white font-light font-mono" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}>
                {stat.value}
              </div>
              <div className="text-white/40 text-[12px] sm:text-[13px] mt-2 tracking-wide font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Donation amounts ── */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-mono mb-6">
            Choose an amount
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DONATION_AMOUNTS.map((d) => (
              <motion.a
                key={d.amount}
                href={GEM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange btn-pulse flex flex-col items-center justify-center py-4 px-3 rounded-lg text-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-xl font-mono font-bold">{d.amount}</span>
                <span className="text-[11px] text-white/70 mt-1 font-mono">{d.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Primary CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.4 }}
        >
          <a
            href={GEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange inline-flex items-center gap-2 px-8 py-4 text-base rounded-full font-mono"
          >
            Donate via GEM →
          </a>
          <p className="text-white/25 text-[11px] mt-4 font-mono">
            Powered by Global Empowerment Mission · 97% of donations go directly to relief
          </p>
        </motion.div>
      </div>
    </section>
  );
}
