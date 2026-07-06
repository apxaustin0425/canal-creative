/**
 * Canal Creative — Contact Section
 * Design: Split layout — form left, info right
 * - Pure black background
 * - Space Mono form inputs with orange focus states
 * - Contact info cards with orange icon backgrounds
 * - Mailto form submission
 */

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Navigation, Check, Copy } from "lucide-react";
import { EASE_OUT_EXPO } from "@/components/motion/index";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 text-white/30 hover:text-white transition-colors"
      title="Copy"
    >
      {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
    </button>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", businessType: "",
    spaceInterest: "", moveIn: "", message: "", honeypot: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return;
    const subject = encodeURIComponent(`Canal Creative Inquiry — ${form.name}${form.spaceInterest ? ` (${form.spaceInterest})` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\nBusiness Type: ${form.businessType || "—"}\nSpace of Interest: ${form.spaceInterest || "—"}\nMove-in Timeframe: ${form.moveIn || "—"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:andres@canalcreative.net?subject=${subject}&body=${body}`;
  }

  const inputClass = "bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-600 transition-colors font-mono w-full";
  const labelClass = "text-[10px] text-white/40 uppercase tracking-[0.15em] font-mono mb-1.5 block";

  return (
    <section id="contact" className="bg-black py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <p className="text-white/40 text-[13px] tracking-[0.2em] uppercase mb-4 font-mono">
            Contact
          </p>
          <h2 className="section-heading font-mono">
            Let's Talk<br />About Your Space
          </h2>
        </motion.div>

        {/* ── Split layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Form ── */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            {/* Honeypot */}
            <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange}
              className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone (optional)</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="(610) 000-0000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Business Type</label>
                <select name="businessType" value={form.businessType} onChange={handleChange} className={inputClass}>
                  <option value="">Select one</option>
                  <option>Artist / Creative</option>
                  <option>Photography / Video</option>
                  <option>Tattoo / Body Art</option>
                  <option>Maker / Fabricator</option>
                  <option>Consultant / Professional</option>
                  <option>Health / Wellness</option>
                  <option>Retail / Pop-up</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Space of Interest</label>
                <select name="spaceInterest" value={form.spaceInterest} onChange={handleChange} className={inputClass}>
                  <option value="">Select one</option>
                  <option>Studio</option>
                  <option>Office</option>
                  <option>Workshop</option>
                  <option>Event Space</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Move-in Timeframe</label>
                <select name="moveIn" value={form.moveIn} onChange={handleChange} className={inputClass}>
                  <option value="">Select one</option>
                  <option>ASAP</option>
                  <option>Within 30 days</option>
                  <option>1–3 months</option>
                  <option>Just exploring</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Message *</label>
              <textarea name="message" required value={form.message} onChange={handleChange}
                rows={4} placeholder="Tell us about your business and what you're looking for..."
                className={`${inputClass} resize-none`} />
            </div>

            <div className="flex items-center gap-4">
              <button type="submit" className="btn-orange flex items-center gap-2 px-5 py-3 text-sm rounded-full font-mono">
                <Navigation size={14} /> Send Inquiry
              </button>
              <span className="text-xs text-white/30 font-mono">Opens your email app.</span>
            </div>
          </motion.form>

          {/* ── Contact info ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 }}
          >
            {[
              {
                icon: <Mail size={15} className="text-accent" />,
                label: "Direct Email",
                content: <span className="flex items-center">andres@canalcreative.net<CopyButton text="andres@canalcreative.net" /></span>,
              },
              {
                icon: <Mail size={15} className="text-accent" />,
                label: "General Inquiries",
                content: <span className="flex items-center">info@canalcreative.net<CopyButton text="info@canalcreative.net" /></span>,
              },
              {
                icon: <Phone size={15} className="text-accent" />,
                label: "Call or Text",
                content: <a href="tel:+14847941508" className="hover:text-orange-400 transition-colors">(484) 794-1508</a>,
              },
              {
                icon: <MapPin size={15} className="text-accent" />,
                label: "Visit",
                content: (
                  <div>
                    531 Canal Street<br />Reading, PA 19602
                    <br />
                    <a href="https://maps.google.com/?q=531+Canal+Street+Reading+PA+19602"
                      target="_blank" rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-400 text-xs mt-1 inline-block transition-colors">
                      Open in Maps →
                    </a>
                  </div>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-4 border border-white/8 rounded-lg">
                <div className="w-9 h-9 bg-orange-600/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] text-white/35 uppercase tracking-[0.15em] font-mono mb-1">
                    {item.label}
                  </div>
                  <div className="text-white text-sm font-mono">{item.content}</div>
                </div>
              </div>
            ))}

            {/* Instagram */}
            <div className="flex items-center gap-4 px-5 py-4 border border-white/8 rounded-lg">
              <div className="w-9 h-9 bg-orange-600/15 rounded-lg flex items-center justify-center shrink-0">
                <i className="bi bi-instagram text-accent text-sm" />
              </div>
              <div>
                <div className="text-[10px] text-white/35 uppercase tracking-[0.15em] font-mono mb-1">Instagram</div>
                <a href="https://instagram.com/canalcreative" target="_blank" rel="noopener noreferrer"
                  className="text-white text-sm font-mono hover:text-orange-400 transition-colors">
                  @canalcreative
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
