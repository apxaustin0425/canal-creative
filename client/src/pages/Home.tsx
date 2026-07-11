/**
 * Canal Creative — Home Page
 * Design: SynapseX-inspired industrial aesthetic
 * - Space Mono font throughout
 * - Pure black backgrounds
 * - Scroll-expansion mural hero
 * - Cinematic 3D scroll text
 * - Asymmetric layouts, strategic orange accents
 * - Modular section components
 */

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Metrics } from "@/components/sections/Metrics";
import { Amenities } from "@/components/sections/Amenities";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Relief } from "@/components/sections/Relief";
import { Footer } from "@/components/sections/Footer";
import { ApplicationModal } from "@/components/sections/ApplicationModal";
import { ApplyTab } from "@/components/sections/ApplyTab";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  // Entrance completes after 800ms (matches Hero delay)
  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  const handleScrollTo = useCallback((id: string) => scrollTo(id), []);

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      {/* ── Apply tab (fixed right edge) ── */}
      <ApplyTab onClick={() => setApplyOpen(true)} />

      {/* ── Application modal ── */}
      <ApplicationModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
      {/* ── Navigation ── */}
      <Navbar
        entranceComplete={entranceComplete}
        onScrollTo={handleScrollTo}
      />

      {/* ── Hero: scroll-expansion mural ── */}
      <Hero
        onScrollToContact={() => scrollTo("contact")}
        onScrollToProcess={() => scrollTo("process")}
      />

      {/* ── About: cinematic 3D scroll text ── */}
      <About />

      {/* ── Metrics: key stats with photo background ── */}
      <Metrics />

      {/* ── Amenities: staggered grid with photo background ── */}
      <Amenities />

      {/* ── Process: pure black, layer cards ── */}
      <Process />

      {/* ── Gallery: asymmetric masonry ── */}
      <Gallery />

      {/* ── FAQ: accordion with orange accent rules ── */}
      <FAQ />

      {/* ── Contact: split form/info layout ── */}
      <Contact />

      {/* ── Relief: Venezuela earthquake donation ── */}
      <Relief />

      {/* ── Footer: two-column photo + info ── */}
      <Footer />
    </div>
  );
}
