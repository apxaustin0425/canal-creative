/**
 * Canal Creative — Footer
 * Design: SynapseX footer adapted
 * - Two-column: building photo left, info right
 * - Logo mark + tagline
 * - Social links with hover effects
 * - Minimal, asymmetric
 */

import { motion } from "framer-motion";

const FOOTER_PHOTO = "/manus-storage/banquet_05_6182bd40.jpg";

function CanalLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      fill="currentColor"
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

export function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">

        {/* ── Left: building photo ── */}
        <div className="relative h-[300px] md:h-auto md:w-1/2 overflow-hidden">
          <img
            src={FOOTER_PHOTO}
            alt="Canal Creative event space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* ── Right: info ── */}
        <div className="flex flex-col justify-between p-10 sm:p-16 md:w-1/2">

          {/* Top: logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-8 text-white/70">
              <CanalLogo size={18} />
              <span className="text-[15px] font-medium tracking-tight font-mono">Canal Creative</span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm font-mono">
              A working community of artists, makers, and small businesses at 531 Canal Street, Reading, PA. Built for people who build things.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-8">
              <motion.a
                href="https://instagram.com/canalcreative"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-instagram text-xl" />
              </motion.a>
              <motion.a
                href="mailto:info@canalcreative.net"
                className="text-white/40 hover:text-white transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-envelope text-xl" />
              </motion.a>
              <motion.a
                href="https://maps.google.com/?q=531+Canal+Street+Reading+PA+19602"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-geo-alt text-xl" />
              </motion.a>
            </div>
          </div>

          {/* Bottom: copyright + address */}
          <div className="mt-12">
            <div className="accent-rule mb-4" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-white/25 text-[12px] font-mono">
                © 2025 Canal Creative · Reading, PA
              </p>
              <p className="text-white/25 text-[12px] font-mono">
                531 Canal Street · 19602
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
