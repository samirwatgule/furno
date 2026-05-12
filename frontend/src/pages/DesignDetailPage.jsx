import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChevronRight, HiChevronLeft, HiHeart, HiOutlineHeart,
  HiOutlineChevronDown, HiShare, HiCheck,
} from 'react-icons/hi';
import { FaArrowRight, FaArrowLeft, FaStar, FaShieldAlt, FaRegClock } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { designs, CATEGORY_META } from '../data/siteData';
import { formatINR } from '../components/Calculator/pricing';
import { api } from '../services/api';

// ── Trust badges data ─────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: '⚙️', label: 'Customisable', sub: 'Designs' },
  { icon: '🛡️', label: 'Lifetime', sub: 'Warranty*' },
  { icon: '💳', label: 'Easy', sub: 'EMIs' },
  { icon: '🚚', label: '45 Day', sub: 'Delivery*' },
  { icon: '⭐', label: '4.9', sub: 'Rating' },
];

// ── Spec Row ──────────────────────────────────────────────────────────────────

function SpecRow({ label, value }) {
  return (
    <div className="flex items-start py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-400 font-medium w-36 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-sm font-semibold text-navy">{value}</span>
    </div>
  );
}

// ── Image Gallery ─────────────────────────────────────────────────────────────

function ImageGallery({ images, title }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = images.length;

  const prev = useCallback(() => setActiveIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 group"
        style={{ aspectRatio: '4/3' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${title} - view ${activeIdx + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </AnimatePresence>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
              style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              <HiChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
              style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              <HiChevronRight className="w-5 h-5 text-navy" />
            </button>
          </>
        )}

        {/* Image counter pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          {activeIdx + 1} / {total}
        </div>

        {/* Dot pagination */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === activeIdx ? '20px' : '6px',
                height: '6px',
                background: i === activeIdx ? '#E8733A' : 'rgba(255,255,255,0.6)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="flex-1 rounded-xl overflow-hidden transition-all duration-200 relative"
              style={{
                aspectRatio: '4/3',
                outline: i === activeIdx ? '2.5px solid #E8733A' : '2.5px solid transparent',
                outlineOffset: '2px',
                opacity: i === activeIdx ? 1 : 0.65,
              }}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              {i === activeIdx && (
                <div className="absolute inset-0 rounded-xl ring-inset ring-2 ring-gold/30" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quote Form ────────────────────────────────────────────────────────────────

function QuoteForm({ design, onClose }) {
  const [form, setForm]           = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]           = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit number';
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.submitLead({ ...form, design_id: design.id, design_title: design.title });
    } catch { /* mock */ }
    setSubmitting(false);
    setDone(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute inset-0 z-20 bg-white rounded-3xl p-6 flex flex-col"
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-4"
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: [0, 1.25, 1] }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.4)' }}
            >
              <HiCheck className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-navy font-[family-name:var(--font-display)]">We&apos;re on it!</h3>
              <p className="text-sm text-gray-500 mt-2">Our designer will call you within 2 hours to discuss this design.</p>
            </div>
            <div className="w-full rounded-2xl p-4 text-center" style={{ background: 'rgba(232,115,58,0.07)', border: '1px dashed #E8733A' }}>
              <p className="text-[10px] text-gray-400 mb-1">Design enquiry for</p>
              <p className="text-sm font-bold text-navy line-clamp-2">{design.title}</p>
            </div>
            <button onClick={onClose} className="text-xs text-gray-400 hover:text-navy transition-colors mt-2">
              ← Back to design
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-navy font-[family-name:var(--font-display)]">Get Free Quote</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <span className="text-gray-500 text-sm font-bold">✕</span>
              </button>
            </div>
            <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: 'rgba(232,115,58,0.07)', border: '1px solid rgba(232,115,58,0.2)' }}>
              <p className="font-semibold text-navy line-clamp-1">{design.title}</p>
              <p className="text-gold font-bold mt-0.5">Starting from ₹{formatINR(design.priceStartingFrom)}</p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3 flex-1">
              {[
                { key: 'name',  label: 'Full Name *',     type: 'text',  placeholder: 'Your name' },
                { key: 'phone', label: 'Mobile *',        type: 'tel',   placeholder: '10-digit number', maxLength: 10 },
                { key: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@email.com' },
              ].map(({ key, label, type, placeholder, maxLength }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
                  <input
                    type={type} value={form[key]} maxLength={maxLength} placeholder={placeholder}
                    onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
                    className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-all ${errors[key] ? 'border-red-300' : 'border-gray-200 focus:border-navy'}`}
                  />
                  {errors[key] && <p className="text-[10px] text-red-500 mt-1">{errors[key]}</p>}
                </div>
              ))}
              <button
                type="submit" disabled={submitting}
                className="mt-auto w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #E8733A, #d4621f)', boxShadow: '0 8px 24px rgba(232,115,58,0.35)' }}
              >
                {submitting ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</> : <>Confirm & Get Quote <FaArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DesignDetailPage() {
  const { categorySlug, designId } = useParams();
  const navigate = useNavigate();

  const meta = CATEGORY_META[categorySlug];
  const designIdNum = parseInt(designId?.split('-')[0], 10);
  const design = designs.find(d => d.id === designIdNum && d.categorySlug === categorySlug);
  const categoryDesigns = designs.filter(d => d.categorySlug === categorySlug);
  const currentIdx = categoryDesigns.findIndex(d => d.id === designIdNum);
  const prevDesign = currentIdx > 0 ? categoryDesigns[currentIdx - 1] : null;
  const nextDesign = currentIdx < categoryDesigns.length - 1 ? categoryDesigns[currentIdx + 1] : null;

  const [saved, setSaved]             = useState(false);
  const [showQuote, setShowQuote]     = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [copied, setCopied]           = useState(false);

  useEffect(() => {
    if (!design || !meta) navigate('/design-ideas', { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [design, meta, navigate, designId]);

  if (!design || !meta) return null;

  const specEntries = Object.entries({
    Layout:    design.specs?.layout,
    Dimensions: design.specs?.dimensions,
    Style:     design.specs?.style,
    Colour:    design.specs?.color,
    ...(design.specs?.shutterFinish    ? { 'Shutter Finish':    design.specs.shutterFinish }    : {}),
    ...(design.specs?.countertopMaterial ? { 'Countertop':       design.specs.countertopMaterial } : {}),
    ...(design.specs?.material         ? { Material:           design.specs.material }          : {}),
    ...(design.specs?.finish           ? { Finish:             design.specs.finish }            : {}),
  }).filter(([, v]) => v);

  const visibleSpecs = specsExpanded ? specEntries : specEntries.slice(0, 4);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const goTo = (d) => navigate(`/design-ideas/${d.categorySlug}/${d.id}-${d.slug}`);

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA' }}>

      {/* ── Breadcrumb bar ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-navy transition-colors">Home</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/design-ideas" className="hover:text-navy transition-colors">Design Ideas</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to={`/design-ideas/${categorySlug}`} className="hover:text-navy transition-colors">{meta.label}</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-gray-600 truncate max-w-[200px] sm:max-w-xs">{design.title}</span>
          </div>
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Left: Gallery ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            <ImageGallery images={design.images} title={design.title} />

            {/* Mobile info (shows below gallery on small screens) */}
            <div className="lg:hidden mt-6">
              <h1 className="text-2xl font-bold text-navy font-[family-name:var(--font-display)] leading-tight mb-1">
                {design.title}
              </h1>
              <p className="text-base font-bold mb-4" style={{ color: '#E8733A' }}>
                Starting from ₹{formatINR(design.priceStartingFrom)}
              </p>
            </div>

            {/* ── Prev / Next project ─────────────────────────────────── */}
            <div className="flex gap-3 mt-6">
              {prevDesign ? (
                <button
                  onClick={() => goTo(prevDesign)}
                  className="flex-1 flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group text-left"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={prevDesign.image} alt={prevDesign.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5 flex items-center gap-1">
                      <FaArrowLeft className="w-2.5 h-2.5" /> Previous Design
                    </p>
                    <p className="text-xs font-bold text-navy leading-snug line-clamp-2 group-hover:text-gold transition-colors">{prevDesign.title}</p>
                  </div>
                </button>
              ) : <div className="flex-1" />}

              {nextDesign ? (
                <button
                  onClick={() => goTo(nextDesign)}
                  className="flex-1 flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group text-right justify-end"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5 flex items-center justify-end gap-1">
                      Next Design <FaArrowRight className="w-2.5 h-2.5" />
                    </p>
                    <p className="text-xs font-bold text-navy leading-snug line-clamp-2 group-hover:text-gold transition-colors">{nextDesign.title}</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={nextDesign.image} alt={nextDesign.title} className="w-full h-full object-cover" />
                  </div>
                </button>
              ) : <div className="flex-1" />}
            </div>

            {/* Description */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-base font-bold text-navy mb-2">About This Design</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{design.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {design.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(64,82,160,0.07)', color: '#4052A0', border: '1px solid rgba(64,82,160,0.2)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Sticky sidebar ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-6 lg:self-start"
          >
            <div className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
            >

              {/* Quote form overlay */}
              <AnimatePresence>
                {showQuote && (
                  <QuoteForm design={design} onClose={() => setShowQuote(false)} />
                )}
              </AnimatePresence>

              {/* Sidebar content */}
              <div className="p-6">

                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="min-w-0 flex-1 hidden lg:block">
                    <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">{meta.label}</p>
                    <h1 className="text-xl font-bold text-navy font-[family-name:var(--font-display)] leading-snug">
                      {design.title}
                    </h1>
                    <p className="text-lg font-black mt-2" style={{ color: '#E8733A' }}>
                      ₹{formatINR(design.priceStartingFrom)}
                      <span className="text-xs font-normal text-gray-400 ml-1">onwards</span>
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleShare}
                      title="Copy link"
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-gray-200 hover:border-navy hover:bg-navy hover:text-white"
                      style={{ color: copied ? '#22c55e' : '#6b7280' }}
                    >
                      {copied ? <HiCheck className="w-4 h-4" /> : <HiShare className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setSaved(v => !v)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border"
                      style={saved ? { background: '#E8733A', borderColor: '#E8733A', color: '#fff' } : { borderColor: '#e5e7eb', color: '#9ca3af' }}
                    >
                      {saved ? <HiHeart className="w-4 h-4" /> : <HiOutlineHeart className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-5 gap-1 mb-5 p-3 rounded-2xl" style={{ background: '#F8F9FA' }}>
                  {TRUST_BADGES.map(({ icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-0.5 px-1">
                      <span className="text-lg leading-none mb-1">{icon}</span>
                      <span className="text-[9px] font-bold text-navy leading-tight">{label}</span>
                      <span className="text-[8px] text-gray-400 leading-tight">{sub}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-4" />

                {/* Design specs */}
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-navy mb-1">{design.category} Design Details:</h2>
                  <div className="divide-y divide-gray-50">
                    {visibleSpecs.map(([label, value]) => (
                      <SpecRow key={label} label={label} value={value} />
                    ))}
                  </div>

                  {specEntries.length > 4 && (
                    <button
                      onClick={() => setSpecsExpanded(v => !v)}
                      className="flex items-center gap-1.5 text-xs font-semibold mt-3 transition-colors"
                      style={{ color: '#E8733A' }}
                    >
                      <motion.span animate={{ rotate: specsExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <HiOutlineChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                      {specsExpanded ? 'Show Less' : `Read More (${specEntries.length - 4} more specs)`}
                    </button>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-5" />

                {/* CTA */}
                <button
                  onClick={() => setShowQuote(true)}
                  className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 mb-3"
                  style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)', boxShadow: '0 8px 28px rgba(232,115,58,0.4)' }}
                >
                  GET FREE QUOTE
                  <FaArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Sub-CTA */}
                <Link
                  to="/estimate"
                  className="w-full py-3 rounded-2xl text-sm font-semibold text-navy flex items-center justify-center gap-2 transition-all border-2 border-navy/15 hover:border-navy hover:bg-navy hover:text-white"
                >
                  Calculate Full Cost
                </Link>

                {/* Trust note */}
                <div className="flex items-center gap-2 mt-4 justify-center">
                  <FaRegClock className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-[11px] text-gray-400">Our designer calls you within <span className="font-bold text-navy">2 hours</span></p>
                </div>
              </div>

              {/* Bottom strip */}
              <div className="px-6 py-3 flex items-center justify-between"
                style={{ background: 'rgba(64,82,160,0.05)', borderTop: '1px solid rgba(64,82,160,0.08)' }}
              >
                <div className="flex items-center gap-1.5">
                  <MdVerified className="w-4 h-4 text-navy" />
                  <span className="text-xs text-navy font-semibold">ISO Certified Quality</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaShieldAlt className="w-3.5 h-3.5 text-navy" />
                  <span className="text-xs text-navy font-semibold">5-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Similar designs */}
            {categoryDesigns.filter(d => d.id !== design.id).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-5 bg-white rounded-3xl border border-gray-100 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy">More {meta.label}</h3>
                  <Link to={`/design-ideas/${categorySlug}`} className="text-xs font-semibold text-gold hover:underline flex items-center gap-1">
                    View All <FaArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {categoryDesigns.filter(d => d.id !== design.id).slice(0, 3).map(d => (
                    <button
                      key={d.id}
                      onClick={() => goTo(d)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={d.image} alt={d.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-navy leading-snug line-clamp-2 group-hover:text-gold transition-colors">{d.title}</p>
                        <p className="text-[10px] font-bold mt-0.5" style={{ color: '#E8733A' }}>From ₹{formatINR(d.priceStartingFrom)}</p>
                      </div>
                      <FaArrowRight className="w-3 h-3 text-gray-300 group-hover:text-gold transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
