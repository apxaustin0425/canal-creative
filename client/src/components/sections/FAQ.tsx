/**
 * Canal Creative — FAQ Section
 * Design: Minimal accordion with orange accent rules
 * - Pure black background
 * - Each question has an orange accent rule above it
 * - Smooth expand/collapse animation
 * - Keyboard navigable
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/components/motion/index";

const FAQS = [
  {
    q: "What types of businesses are a good fit?",
    a: "Canal Creative is home to artists, photographers, tattoo artists, therapists, consultants, fabricators, and small agencies. If you create, build, or serve clients — you probably belong here.",
  },
  {
    q: "Are leases month-to-month or long-term?",
    a: "We offer flexible terms. Month-to-month leases are available for most units. Longer-term leases may come with additional benefits — ask us during your tour.",
  },
  {
    q: "Is there parking available?",
    a: "Yes. On-site parking is available for tenants and their clients.",
  },
  {
    q: "What's included in the rent?",
    a: "Most units include utilities, high-speed internet, 24/7 keycard access, and shared restroom facilities. Specific inclusions vary by unit — confirm during your tour.",
  },
  {
    q: "How do I find the building?",
    a: "The building is at 531 Canal Street, Reading, PA 19602. It sits along the canal on the east side of Reading. Use Google Maps — look for the large industrial building with the mural.",
  },
  {
    q: "Is there an application fee?",
    a: "There is no online application portal at this time. Reach out to us directly and we will guide you through the process.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-black py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <p className="text-white/40 text-[13px] tracking-[0.2em] uppercase mb-4 font-mono">
            FAQ
          </p>
          <h2 className="section-heading font-mono">
            Common<br />Questions
          </h2>
        </motion.div>

        {/* ── Accordion ── */}
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
            >
              {/* Orange accent rule above each question */}
              <div className="accent-rule mb-0" />

              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left gap-4 py-5"
                aria-expanded={openIndex === i}
              >
                <span className="text-white text-[15px] sm:text-[17px] font-mono font-normal leading-snug">
                  {faq.q}
                </span>
                <motion.span
                  className="text-white/40 shrink-0 font-mono text-lg"
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-white/50 text-[14px] sm:text-[15px] leading-relaxed pb-5 pr-8 font-mono">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {/* Final rule */}
          <div className="accent-rule" />
        </div>
      </div>
    </section>
  );
}
