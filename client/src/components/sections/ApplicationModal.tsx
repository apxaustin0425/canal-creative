/**
 * Canal Creative — Application Modal
 * Design: Full-screen slide-up panel, Space Mono, pure black
 * - Triggered by "Apply Now" tab anywhere on the page
 * - Multi-step form: Personal → Business → Space → Review
 * - Progress stepper at top
 * - Submits via tRPC → notifyOwner → delivered to site owner
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  businessDescription: string;
  website: string;
  spaceType: string;
  sqftNeeded: string;
  moveInDate: string;
  budget: string;
  leaseLength: string;
  additionalNeeds: string;
  honeypot: string;
}

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  businessName: "", businessType: "", businessDescription: "", website: "",
  spaceType: "", sqftNeeded: "", moveInDate: "", budget: "", leaseLength: "", additionalNeeds: "",
  honeypot: "",
};

const STEPS = ["Personal", "Business", "Space", "Review"];

const inputClass =
  "w-full bg-transparent border border-white/12 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500 transition-colors font-mono";
const labelClass =
  "block text-[10px] text-white/40 uppercase tracking-[0.15em] font-mono mb-1.5";
const selectClass =
  "w-full bg-black border border-white/12 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors font-mono appearance-none";

// ── Step 1: Personal ─────────────────────────────────────────────────────────
function StepPersonal({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-white text-xl font-mono font-light mb-1">About You</h3>
        <p className="text-white/40 text-sm font-mono">Let's start with your contact information.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name *</label>
          <input type="text" required value={data.firstName} onChange={e => onChange("firstName", e.target.value)}
            placeholder="Jane" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input type="text" required value={data.lastName} onChange={e => onChange("lastName", e.target.value)}
            placeholder="Smith" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Email Address *</label>
        <input type="email" required value={data.email} onChange={e => onChange("email", e.target.value)}
          placeholder="jane@yourbusiness.com" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Phone Number</label>
        <input type="tel" value={data.phone} onChange={e => onChange("phone", e.target.value)}
          placeholder="(610) 000-0000" className={inputClass} />
      </div>
    </div>
  );
}

// ── Step 2: Business ─────────────────────────────────────────────────────────
function StepBusiness({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-white text-xl font-mono font-light mb-1">Your Business</h3>
        <p className="text-white/40 text-sm font-mono">Tell us what you do and who you are.</p>
      </div>
      <div>
        <label className={labelClass}>Business / Studio Name *</label>
        <input type="text" required value={data.businessName} onChange={e => onChange("businessName", e.target.value)}
          placeholder="Your Studio Name" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Business Type *</label>
        <select required value={data.businessType} onChange={e => onChange("businessType", e.target.value)} className={selectClass}>
          <option value="">Select one...</option>
          <option>Artist / Fine Art</option>
          <option>Photography / Videography</option>
          <option>Tattoo / Body Art</option>
          <option>Maker / Fabrication</option>
          <option>Music / Audio</option>
          <option>Consultant / Professional Services</option>
          <option>Health / Wellness / Therapy</option>
          <option>Retail / Pop-up</option>
          <option>Tech / Creative Agency</option>
          <option>Non-Profit / Community</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Brief Business Description *</label>
        <textarea required value={data.businessDescription} onChange={e => onChange("businessDescription", e.target.value)}
          rows={3} placeholder="Describe what you do in 2–3 sentences..."
          className={`${inputClass} resize-none`} />
      </div>
      <div>
        <label className={labelClass}>Website or Social (optional)</label>
        <input type="url" value={data.website} onChange={e => onChange("website", e.target.value)}
          placeholder="https://yourbusiness.com" className={inputClass} />
      </div>
    </div>
  );
}

// ── Step 3: Space ────────────────────────────────────────────────────────────
function StepSpace({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-white text-xl font-mono font-light mb-1">Your Space Needs</h3>
        <p className="text-white/40 text-sm font-mono">Help us match you to the right unit.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Space Type *</label>
          <select required value={data.spaceType} onChange={e => onChange("spaceType", e.target.value)} className={selectClass}>
            <option value="">Select one...</option>
            <option>Studio</option>
            <option>Office</option>
            <option>Workshop / Maker Space</option>
            <option>Event / Flex Space</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Approx. Sq Ft Needed</label>
          <select value={data.sqftNeeded} onChange={e => onChange("sqftNeeded", e.target.value)} className={selectClass}>
            <option value="">Not sure</option>
            <option>Under 200 sq ft</option>
            <option>200–400 sq ft</option>
            <option>400–700 sq ft</option>
            <option>700–1,000 sq ft</option>
            <option>1,000+ sq ft</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Desired Move-in</label>
          <select value={data.moveInDate} onChange={e => onChange("moveInDate", e.target.value)} className={selectClass}>
            <option value="">Select one...</option>
            <option>ASAP</option>
            <option>Within 30 days</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Monthly Budget</label>
          <select value={data.budget} onChange={e => onChange("budget", e.target.value)} className={selectClass}>
            <option value="">Flexible</option>
            <option>Under $300/mo</option>
            <option>$300–$600/mo</option>
            <option>$600–$1,000/mo</option>
            <option>$1,000–$1,500/mo</option>
            <option>$1,500+/mo</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Preferred Lease Length</label>
        <select value={data.leaseLength} onChange={e => onChange("leaseLength", e.target.value)} className={selectClass}>
          <option value="">No preference</option>
          <option>Month-to-month</option>
          <option>3 months</option>
          <option>6 months</option>
          <option>1 year</option>
          <option>1+ years</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Additional Needs or Notes</label>
        <textarea value={data.additionalNeeds} onChange={e => onChange("additionalNeeds", e.target.value)}
          rows={3} placeholder="Anything specific — loading dock, natural light, ground floor, etc."
          className={`${inputClass} resize-none`} />
      </div>
    </div>
  );
}

// ── Step 4: Review ───────────────────────────────────────────────────────────
function StepReview({ data }: { data: FormData }) {
  const rows: [string, string][] = [
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Business", data.businessName],
    ["Type", data.businessType],
    ["Description", data.businessDescription],
    ["Website", data.website || "—"],
    ["Space Type", data.spaceType],
    ["Sq Ft", data.sqftNeeded || "Not specified"],
    ["Move-in", data.moveInDate || "Flexible"],
    ["Budget", data.budget || "Flexible"],
    ["Lease", data.leaseLength || "No preference"],
    ["Notes", data.additionalNeeds || "—"],
  ];
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-white text-xl font-mono font-light mb-1">Review Your Application</h3>
        <p className="text-white/40 text-sm font-mono">Everything look right? Hit Submit and we'll be in touch.</p>
      </div>
      <div className="border border-white/10 rounded-lg overflow-hidden">
        {rows.map(([label, value], i) => (
          <div key={label} className={`flex gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
            <span className="text-white/35 text-[11px] uppercase tracking-[0.12em] font-mono w-24 shrink-0 pt-0.5">{label}</span>
            <span className="text-white text-sm font-mono leading-relaxed">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Modal ───────────────────────────────────────────────────────────────
interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitMutation = trpc.spaceApplication.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setSubmitError(null);
    },
    onError: (err: { message?: string }) => {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    },
  });

  function onChange(key: keyof FormData, value: string) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  function next() { setDirection(1); setStep(s => Math.min(s + 1, STEPS.length - 1)); }
  function back() { setDirection(-1); setStep(s => Math.max(s - 1, 0)); }

  function submit() {
    if (data.honeypot) return;
    setSubmitError(null);
    submitMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      businessName: data.businessName,
      businessType: data.businessType,
      businessDescription: data.businessDescription,
      website: data.website || undefined,
      spaceType: data.spaceType,
      sqftNeeded: data.sqftNeeded || undefined,
      moveInDate: data.moveInDate || undefined,
      budget: data.budget || undefined,
      leaseLength: data.leaseLength || undefined,
      additionalNeeds: data.additionalNeeds || undefined,
    });
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep(0);
      setData(INITIAL);
      setSubmitted(false);
      setSubmitError(null);
    }, 400);
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  const canNext = () => {
    if (step === 0) return data.firstName && data.lastName && data.email;
    if (step === 1) return data.businessName && data.businessType && data.businessDescription;
    if (step === 2) return !!data.spaceType;
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />

          <motion.div
            className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full sm:max-w-xl bg-black border border-white/10 rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "92dvh" }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-mono">Space Application</span>
                </div>
                <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors p-1">
                  <X size={18} />
                </button>
              </div>

              {/* Progress stepper */}
              {!submitted && (
                <div className="px-6 pb-4 shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono transition-colors duration-300 ${
                            i < step ? "bg-orange-600 text-white" : i === step ? "bg-white text-black" : "bg-white/10 text-white/30"
                          }`}>
                            {i < step ? <Check size={10} /> : i + 1}
                          </div>
                          <span className={`text-[10px] font-mono hidden sm:block transition-colors duration-300 ${
                            i === step ? "text-white" : i < step ? "text-orange-500" : "text-white/25"
                          }`}>{label}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="flex-1 h-px bg-white/10 mx-1">
                            <div className="h-full bg-orange-600 transition-all duration-500" style={{ width: i < step ? "100%" : "0%" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form content */}
              <div className="flex-1 overflow-y-auto px-6 pb-4">
                {submitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-14 h-14 rounded-full bg-orange-600/20 border border-orange-600/40 flex items-center justify-center mb-2">
                      <Check size={24} className="text-orange-500" />
                    </div>
                    <h3 className="text-white text-xl font-mono font-light">Application Received</h3>
                    <p className="text-white/45 text-sm font-mono max-w-xs leading-relaxed">
                      We got your application and will be in touch within 1–2 business days at <span className="text-white/70">{data.email}</span>.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-4 px-6 py-2.5 border border-white/15 rounded-full text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors font-mono"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step === 0 && <StepPersonal data={data} onChange={onChange} />}
                      {step === 1 && <StepBusiness data={data} onChange={onChange} />}
                      {step === 2 && <StepSpace data={data} onChange={onChange} />}
                      {step === 3 && <StepReview data={data} />}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Error message */}
                {submitError && (
                  <div className="mt-4 px-4 py-3 rounded-lg bg-red-900/20 border border-red-500/30 text-red-400 text-sm font-mono">
                    {submitError}
                  </div>
                )}
              </div>

              {/* Footer nav */}
              {!submitted && (
                <div className="flex items-center justify-between px-6 py-5 border-t border-white/8 shrink-0">
                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-colors font-mono"
                  >
                    <ChevronLeft size={15} /> Back
                  </button>

                  {/* Honeypot */}
                  <input type="text" name="honeypot" value={data.honeypot}
                    onChange={e => onChange("honeypot", e.target.value)}
                    className="hidden" tabIndex={-1} autoComplete="off" />

                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={next}
                      disabled={!canNext()}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-black text-sm rounded-full font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                    >
                      Continue <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={submitMutation.isPending}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-sm rounded-full font-mono font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                      style={{ backgroundColor: "oklch(0.58 0.19 38)", color: "white" }}
                    >
                      {submitMutation.isPending ? (
                        <><Loader2 size={14} className="animate-spin" /> Sending...</>
                      ) : (
                        <>Submit Application <ChevronRight size={15} /></>
                      )}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
