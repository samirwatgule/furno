import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChevronRight, HiChevronLeft, HiHeart, HiOutlineHeart,
  HiOutlineChevronDown, HiShare, HiCheck, HiArrowRight,
} from 'react-icons/hi';
import { FaArrowRight, FaArrowLeft, FaRupeeSign, FaShieldAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { designs, CATEGORY_META } from '../data/siteData';
import { formatINR } from '../components/Calculator/pricing';
import { api } from '../services/api';

// ── Trust badges ──────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: '⚙️', label: 'Customisable', sub: 'Designs' },
  { icon: '🛡️', label: 'Lifetime',     sub: 'Warranty*' },
  { icon: '💳', label: 'Easy',         sub: 'EMIs' },
  { icon: '⚡', label: '45 Day',       sub: 'Delivery*' },
  { icon: '⭐', label: '4.9',          sub: 'Rating' },
];

// ── Image Gallery ─────────────────────────────────────────────────────────────

function ImageGallery({ images, title }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = images.length;

  const prev = useCallback(() => setActiveIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % total), [total]);

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
      <div className="relative overflow-hidden rounded-3xl bg-gray-100 group"
        style={{ aspectRatio: '4/3' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={`${title} - view ${activeIdx + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </AnimatePresence>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
            >
              <HiChevronLeft className="w-5 h-5" style={{ color: '#1B2A4A' }} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
            >
              <HiChevronRight className="w-5 h-5" style={{ color: '#1B2A4A' }} />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {activeIdx + 1} / {total}
        </div>

        {/* Dot pagination */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === activeIdx ? '20px' : '6px', height: '6px', background: i === activeIdx ? '#E8733A' : 'rgba(255,255,255,0.65)' }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => setActiveIdx(i)}
              className="flex-1 rounded-xl overflow-hidden transition-all duration-200"
              style={{
                aspectRatio: '4/3',
                outline: i === activeIdx ? '2.5px solid #E8733A' : '2.5px solid transparent',
                outlineOffset: '2px',
                opacity: i === activeIdx ? 1 : 0.6,
              }}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quote Form ────────────────────────────────────────────────────────────────

function QuoteForm({ design, onClose }) {
  const [form, setForm]             = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);

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
    try { await api.submitLead({ ...form, design_id: design.id, design_title: design.title }); } catch { /* mock */ }
    setSubmitting(false);
    setDone(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="absolute inset-0 z-20 bg-white rounded-3xl p-6 flex flex-col"
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
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
              <h3 className="text-xl font-bold mb-1" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>We&apos;re on it!</h3>
              <p className="text-sm text-gray-500">Our designer will call you within 2 hours.</p>
            </div>
            <div className="w-full rounded-2xl p-4 text-center" style={{ background: 'rgba(232,115,58,0.07)', border: '1px dashed #E8733A' }}>
              <p className="text-[10px] text-gray-400 mb-0.5">Design enquiry for</p>
              <p className="text-sm font-bold line-clamp-2" style={{ color: '#1B2A4A' }}>{design.title}</p>
            </div>
            <button onClick={onClose} className="text-xs text-gray-400 hover:text-navy transition-colors">← Back to design</button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Get Free Quote</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500 text-sm font-bold">✕</button>
            </div>
            <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: 'rgba(232,115,58,0.07)', border: '1px solid rgba(232,115,58,0.2)' }}>
              <p className="font-semibold line-clamp-1" style={{ color: '#1B2A4A' }}>{design.title}</p>
              <p className="font-bold mt-0.5" style={{ color: '#E8733A' }}>Starting from ₹{formatINR(design.priceStartingFrom)}</p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3 flex-1">
              {[
                { key: 'name',  label: 'Full Name *',     type: 'text',  placeholder: 'Your name' },
                { key: 'phone', label: 'Mobile *',        type: 'tel',   placeholder: '10-digit number', maxLength: 10 },
                { key: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@email.com' },
              ].map(({ key, label, type, placeholder, maxLength }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9CA3AF' }}>{label}</label>
                  <input type={type} value={form[key]} maxLength={maxLength} placeholder={placeholder}
                    onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
                    className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-all ${errors[key] ? 'border-red-300' : 'border-gray-200 focus:border-[#1B2A4A]'}`}
                  />
                  {errors[key] && <p className="text-[10px] text-red-500 mt-1">{errors[key]}</p>}
                </div>
              ))}
              <button type="submit" disabled={submitting}
                className="mt-auto w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #E8733A, #d4621f)', boxShadow: '0 8px 24px rgba(232,115,58,0.35)' }}
              >
                {submitting
                  ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</>
                  : <>Confirm & Get Quote <FaArrowRight className="w-3.5 h-3.5" /></>
                }
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
  const similarDesigns = categoryDesigns.filter(d => d.id !== designIdNum).slice(0, 3);

  const [saved, setSaved]               = useState(false);
  const [showQuote, setShowQuote]       = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [copied, setCopied]             = useState(false);

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
    ...(design.specs?.shutterFinish      ? { 'Shutter Finish': design.specs.shutterFinish }      : {}),
    ...(design.specs?.countertopMaterial ? { Countertop:       design.specs.countertopMaterial }  : {}),
    ...(design.specs?.material           ? { Material:         design.specs.material }            : {}),
    ...(design.specs?.finish             ? { Finish:           design.specs.finish }              : {}),
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
    <div className="min-h-screen" style={{ background: '#F6F7FB' }}>

      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '200px' }}>
        <div className="absolute inset-0">
          <img src={design.images?.[0] || design.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(14,22,55,0.96) 0%, rgba(27,42,74,0.9) 60%, rgba(14,22,55,0.82) 100%)' }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <motion.div className="absolute right-0 top-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.2) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="#F6F7FB" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap"
          >
            <Link to="/" className="hover:text-white/70 transition">Home</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/design-ideas" className="hover:text-white/70 transition">Design Ideas</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to={`/design-ideas/${categorySlug}`} className="hover:text-white/70 transition">{meta.label}</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white/65 truncate max-w-[200px]">{design.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border"
              style={{ background: 'rgba(232,115,58,0.12)', borderColor: 'rgba(232,115,58,0.35)', color: '#E8733A' }}
            >
              <MdVerified className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">{meta.label}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display, serif)' }}
            >
              {design.title}
            </h1>
            <p className="mt-2 text-xl font-black" style={{ color: '#E8733A' }}>
              ₹{formatINR(design.priceStartingFrom)}
              <span className="text-sm font-normal text-white/40 ml-2">starting price</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 sm:pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Left: Gallery + details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            <ImageGallery images={design.images?.length ? design.images : [design.image]} title={design.title} />

            {/* About */}
            <div className="mt-6 bg-white rounded-3xl border border-gray-100 p-6"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <h2 className="text-base font-bold mb-3" style={{ color: '#1B2A4A' }}>About This Design</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{design.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {design.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: 'rgba(27,42,74,0.07)', color: '#1B2A4A', border: '1px solid rgba(27,42,74,0.12)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            {(prevDesign || nextDesign) && (
              <div className="flex gap-3 mt-4">
                {prevDesign ? (
                  <button onClick={() => goTo(prevDesign)}
                    className="flex-1 flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group text-left"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={prevDesign.image} alt={prevDesign.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mb-0.5">
                        <FaArrowLeft className="w-2.5 h-2.5" /> Previous
                      </p>
                      <p className="text-xs font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[#E8733A]" style={{ color: '#1B2A4A' }}>{prevDesign.title}</p>
                    </div>
                  </button>
                ) : <div className="flex-1" />}

                {nextDesign ? (
                  <button onClick={() => goTo(nextDesign)}
                    className="flex-1 flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group text-right justify-end"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-gray-400 font-medium flex items-center justify-end gap-1 mb-0.5">
                        Next <FaArrowRight className="w-2.5 h-2.5" />
                      </p>
                      <p className="text-xs font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[#E8733A]" style={{ color: '#1B2A4A' }}>{nextDesign.title}</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={nextDesign.image} alt={nextDesign.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </button>
                ) : <div className="flex-1" />}
              </div>
            )}

            {/* Similar designs */}
            {similarDesigns.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-0.5 bg-[#E8733A]" />
                  <div className="w-3 h-0.5 bg-[#E8733A]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>You May Also Like</span>
                </div>
                <h3 className="text-lg font-bold mb-5" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                  Similar Designs
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {similarDesigns.map(d => (
                    <button key={d.id} onClick={() => goTo(d)}
                      className="group text-left rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <img src={d.image} alt={d.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <p className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white leading-snug line-clamp-2">{d.title}</p>
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-[10px] font-bold" style={{ color: '#E8733A' }}>₹{formatINR(d.priceStartingFrom)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="mt-8">
              <Link to={`/design-ideas/${categorySlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#E8733A]"
                style={{ color: '#9CA3AF' }}
              >
                ← Back to {meta.label}
              </Link>
            </div>
          </motion.div>

          {/* ── Right: Sticky sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-6 lg:self-start"
          >
            <div className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}
            >
              {/* Quote form overlay */}
              <AnimatePresence>
                {showQuote && <QuoteForm design={design} onClose={() => setShowQuote(false)} />}
              </AnimatePresence>

              {/* Sidebar content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#E8733A' }}>{meta.label}</p>
                    <h2 className="text-lg font-bold leading-snug" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                      {design.title}
                    </h2>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <p className="text-2xl font-black" style={{ color: '#E8733A' }}>
                        ₹{formatINR(design.priceStartingFrom)}
                      </p>
                      <span className="text-xs text-gray-400">onwards</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={handleShare} title="Copy link"
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all border-2"
                      style={copied ? { background: '#22c55e', borderColor: '#22c55e', color: '#fff' } : { borderColor: '#E5E7EB', color: '#9CA3AF' }}
                    >
                      {copied ? <HiCheck className="w-4 h-4" /> : <HiShare className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setSaved(v => !v)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all border-2"
                      style={saved ? { background: '#E8733A', borderColor: '#E8733A', color: '#fff' } : { borderColor: '#E5E7EB', color: '#9CA3AF' }}
                    >
                      {saved ? <HiHeart className="w-4 h-4" /> : <HiOutlineHeart className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Trust badges strip */}
                <div className="grid grid-cols-5 gap-1 mb-5 p-3 rounded-2xl" style={{ background: '#F6F7FB' }}>
                  {TRUST_BADGES.map(({ icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-0.5 px-0.5">
                      <span className="text-lg leading-none mb-0.5">{icon}</span>
                      <span className="text-[9px] font-bold leading-tight" style={{ color: '#1B2A4A' }}>{label}</span>
                      <span className="text-[8px] leading-tight text-gray-400">{sub}</span>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#1B2A4A' }}>Specifications</h3>
                  <div className="divide-y divide-gray-50">
                    {visibleSpecs.map(([label, value]) => (
                      <div key={label} className="flex items-start py-2.5">
                        <span className="text-xs text-gray-400 font-medium w-36 flex-shrink-0 pt-0.5">{label}</span>
                        <span className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {specEntries.length > 4 && (
                    <button onClick={() => setSpecsExpanded(v => !v)}
                      className="flex items-center gap-1.5 text-xs font-semibold mt-2 transition-colors"
                      style={{ color: '#E8733A' }}
                    >
                      <motion.span animate={{ rotate: specsExpanded ? 180 : 0 }} transition={{ duration: 0.22 }}>
                        <HiOutlineChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                      {specsExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                <div className="h-px bg-gray-100 mb-5" />

                {/* Primary CTA */}
                <button onClick={() => setShowQuote(true)}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl mb-3"
                  style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)', boxShadow: '0 8px 28px rgba(232,115,58,0.4)' }}
                >
                  <FaRupeeSign className="w-3.5 h-3.5" /> Get Free Quote
                </button>
                <Link to="/contact"
                  className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all border-2 hover:bg-navy hover:text-white hover:border-navy"
                  style={{ borderColor: 'rgba(27,42,74,0.2)', color: '#1B2A4A' }}
                >
                  <RiCustomerService2Fill className="w-4 h-4" /> Book Free Consultation
                </Link>
              </div>

              {/* Footer bar */}
              <div className="px-6 py-3 flex items-center justify-between border-t"
                style={{ borderColor: 'rgba(27,42,74,0.07)', background: 'rgba(27,42,74,0.03)' }}
              >
                <div className="flex items-center gap-1.5">
                  <MdVerified className="w-4 h-4" style={{ color: '#1B2A4A' }} />
                  <span className="text-xs font-semibold" style={{ color: '#1B2A4A' }}>Verified Design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaShieldAlt className="w-3.5 h-3.5" style={{ color: '#1B2A4A' }} />
                  <span className="text-xs font-semibold" style={{ color: '#1B2A4A' }}>Lifetime Warranty*</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
