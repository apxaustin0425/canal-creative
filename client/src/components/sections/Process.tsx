/**
 * Canal Creative — Process Section
 * Design: SynapseX Section 5 (Architecture) adapted
 * - Pure black background, no video/photo
 * - Centered content, max-w-3xl
 * - Heading block fades up
 * - 4 stacked "layer cards" (step cards with border)
 * - Each card: step number (left) + step title (right)
 */

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/index";

const PROCESS_STEPS = [
  { num: "01", title: "Inquire", desc: "Fill out the contact form or call us. Tell us about your business and what kind of space you need." },
  { num: "02", title: "Tour", desc: "We schedule a walkthrough of available spaces that fit your needs and budget." },
  { num: "03", title: "Apply", desc: "Once you've found your space, a straightforward application. No hidden fees." },
  { num: "04", title: "Move In", desc: "Sign your lease, get your keycard, and start building. Welcome to Canal Creative." },
];

export function Process() {
  return (
    <section id="process" className="relative min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-6 py-32 text-center">

        {/* ── Heading block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: EASE_OUT_EXPO }}
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 font-mono">
            Process
          </p>
          <h2
            className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10 font-mono"
            style={{ fontSize: "clamp(28px, 6vw, 56px)" }}
          >
            Four steps.<br />Zero friction.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto font-mono">
            No complicated portals. No waiting rooms. We handle every inquiry directly and make the process straightforward.
          </p>
        </motion.div>

        {/* ── Step cards ── */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="w-full max-w-md h-auto min-h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 py-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 + i * 0.1 }}
              whileHover={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase font-mono shrink-0">
                Step {step.num}
              </span>
              <div className="text-right flex-1">
                <div className="text-white text-[16px] sm:text-[18px] font-light font-mono">
                  {step.title}
                </div>
                <div className="text-white/35 text-[12px] sm:text-[13px] leading-relaxed mt-1 font-mono">
                  {step.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.8 }}
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-orange px-6 py-3 text-sm rounded-full font-mono"
          >
            Start the Process
          </button>
        </motion.div>
      </div>
    </section>
  );
}
