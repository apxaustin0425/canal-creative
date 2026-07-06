/**
 * Canal Creative — Gallery Section
 * Design: Asymmetric masonry grid with hover reveals
 * - Pure black background
 * - CSS grid-auto-flow: dense with varied row/col spans
 * - Hover: caption overlay + orange accent rule
 * - Lightbox with keyboard navigation
 * - StaggerContainer fade-in on scroll
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { EASE_OUT_EXPO } from "@/components/motion/index";

const BANQUET_PHOTOS = [
  "/manus-storage/banquet_01_5cf5b72d.jpg",
  "/manus-storage/banquet_02_433efbe9.jpg",
  "/manus-storage/banquet_03_e4f1f1b2.jpg",
  "/manus-storage/banquet_04_5ff175d4.jpg",
  "/manus-storage/banquet_05_6182bd40.jpg",
  "/manus-storage/banquet_06_d24bcfa4.jpg",
  "/manus-storage/banquet_07_8a3b5a04.jpg",
  "/manus-storage/banquet_08_364d43d4.jpg",
  "/manus-storage/banquet_09_41a996ef.jpg",
  "/manus-storage/banquet_10_3bcd84e4.jpg",
  "/manus-storage/banquet_11_ff7aaa28.jpg",
  "/manus-storage/banquet_12_0ec71fe4.jpg",
  "/manus-storage/banquet_13_21b5b13c.jpg",
  "/manus-storage/banquet_14_369c6785.jpg",
  "/manus-storage/banquet_15_8014aca6.jpg",
];

// Varied grid spans for asymmetric masonry
const GRID_SPANS = [
  { col: "col-span-2", row: "row-span-2" }, // 0: large
  { col: "col-span-1", row: "row-span-1" }, // 1: small
  { col: "col-span-1", row: "row-span-2" }, // 2: tall
  { col: "col-span-1", row: "row-span-1" }, // 3: small
  { col: "col-span-1", row: "row-span-1" }, // 4: small
  { col: "col-span-2", row: "row-span-1" }, // 5: wide
  { col: "col-span-1", row: "row-span-1" }, // 6: small
  { col: "col-span-1", row: "row-span-2" }, // 7: tall
  { col: "col-span-1", row: "row-span-1" }, // 8: small
  { col: "col-span-2", row: "row-span-1" }, // 9: wide
  { col: "col-span-1", row: "row-span-1" }, // 10: small
  { col: "col-span-1", row: "row-span-1" }, // 11: small
  { col: "col-span-1", row: "row-span-2" }, // 12: tall
  { col: "col-span-2", row: "row-span-1" }, // 13: wide
  { col: "col-span-1", row: "row-span-1" }, // 14: small
];

const PHOTO_LABELS = [
  "Event Space", "Banquet Hall", "Main Floor", "Setup Ready",
  "Open Layout", "Venue Interior", "Ceiling Detail", "Side Hall",
  "Stage Area", "Full Venue", "Corner View", "Entry Hall",
  "Back Section", "Panoramic", "Detail Shot",
];

interface GalleryItemProps {
  src: string;
  label: string;
  colSpan: string;
  rowSpan: string;
  index: number;
  onOpen: (i: number) => void;
}

function GalleryItem({ src, label, colSpan, rowSpan, index, onOpen }: GalleryItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`${colSpan} ${rowSpan} relative overflow-hidden cursor-pointer`}
      style={{ minHeight: "160px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onOpen(index)}
      tabIndex={0}
      role="button"
      aria-label={`View ${label}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: (index % 6) * 0.06 }}
    >
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        loading="lazy"
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <span className="accent-rule mb-2" />
        <span className="text-white text-[13px] font-mono tracking-wide">{label}</span>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + BANQUET_PHOTOS.length) % BANQUET_PHOTOS.length : null), []);
  const nextPhoto = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % BANQUET_PHOTOS.length : null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  return (
    <section id="gallery" className="bg-black py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <p className="text-white/40 text-[13px] tracking-[0.2em] uppercase mb-4 font-mono">
            The Space
          </p>
          <h2 className="section-heading font-mono">
            Event &<br />Venue Gallery
          </h2>
        </motion.div>

        {/* ── Asymmetric masonry grid ── */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px",
            gridAutoFlow: "dense",
          }}
        >
          {BANQUET_PHOTOS.map((src, i) => (
            <GalleryItem
              key={src}
              src={src}
              label={PHOTO_LABELS[i] || `Photo ${i + 1}`}
              colSpan={GRID_SPANS[i]?.col || "col-span-1"}
              rowSpan={GRID_SPANS[i]?.row || "row-span-1"}
              index={i}
              onOpen={openLightbox}
            />
          ))}
        </div>

        {/* Mobile: single column override */}
        <style>{`
          @media (max-width: 640px) {
            #gallery .grid {
              grid-template-columns: 1fr !important;
              grid-auto-rows: 240px !important;
            }
            #gallery .col-span-2,
            #gallery .row-span-2 {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            #gallery .grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            #gallery .col-span-2 {
              grid-column: span 2 !important;
            }
          }
        `}</style>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <motion.img
              key={lightboxIndex}
              src={BANQUET_PHOTOS[lightboxIndex]}
              alt={PHOTO_LABELS[lightboxIndex]}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-[12px] font-mono tracking-widest">
              {lightboxIndex + 1} / {BANQUET_PHOTOS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
