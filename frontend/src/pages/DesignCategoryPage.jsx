import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChevronRight, HiSearch, HiX, HiHeart, HiOutlineHeart,
  HiOutlineChevronDown, HiFire, HiArrowRight,
} from 'react-icons/hi';
import { FaRupeeSign, FaStar, FaArrowRight } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { designs, CATEGORY_META } from '../data/siteData';
import { formatINR } from '../components/Calculator/pricing';

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ text, center = false }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : ''}`}>
      <div className="w-7 h-0.5" style={{ background: '#E8733A' }} />
      <div className="w-3 h-0.5" style={{ background: '#E8733A' }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>{text}</span>
    </div>
  );
}

// ── Design Card ───────────────────────────────────────────────────────────────

function DesignCard({ design, saved, onSave, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}
        className="block relative overflow-hidden"
        style={{ aspectRatio: '4/3' }}
      >
        <motion.img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Save */}
        <button
          onClick={e => { e.preventDefault(); onSave(design.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 active:scale-90"
          style={{ background: saved ? '#E8733A' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
        >
          {saved
            ? <HiHeart className="w-4 h-4 text-white" />
            : <HiOutlineHeart className="w-4 h-4 text-gray-600" />}
        </button>

        {/* Trending badge */}
        {design.trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10"
            style={{ background: 'linear-gradient(135deg, #E8733A, #d4621f)', boxShadow: '0 4px 12px rgba(232,115,58,0.55)' }}
          >
            <HiFire className="w-3 h-3" /> Trending
          </div>
        )}

        {/* Hover tags overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10"
            >
              {design.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <Link to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}>
          <h3 className="text-sm font-bold leading-snug mb-1.5 line-clamp-2 transition-colors group-hover:text-[#E8733A]"
            style={{ color: '#1B2A4A' }}
          >
            {design.title}
          </h3>
        </Link>

        <p className="text-xs font-bold mb-3 flex items-center gap-1" style={{ color: '#E8733A' }}>
          <FaRupeeSign className="w-2.5 h-2.5" />
          Starting {formatINR(design.priceStartingFrom)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {design.tags.slice(0, 3).map(tag => (
            <span key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ color: '#6B7280', borderColor: '#E5E7EB', background: '#F9FAFB' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}
          className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 group/btn"
          style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #243665 100%)', color: '#fff', boxShadow: '0 4px 16px rgba(27,42,74,0.2)' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,42,74,0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(27,42,74,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          View Design
          <FaArrowRight className="w-2.5 h-2.5 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Trending Card ─────────────────────────────────────────────────────────────

function TrendingCard({ design }) {
  return (
    <Link
      to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}
      className="group flex-shrink-0 w-56 relative rounded-2xl overflow-hidden block"
      style={{ border: '2px solid #E8733A', boxShadow: '0 0 0 4px rgba(232,115,58,0.1)' }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={design.image} alt={design.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-bold text-xs leading-snug line-clamp-2">{design.title}</p>
          <p className="text-[10px] font-bold mt-1" style={{ color: '#E8733A' }}>
            From ₹{formatINR(design.priceStartingFrom)}
          </p>
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1 text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: '#E8733A' }}
        >
          <HiFire className="w-2.5 h-2.5" /> Hot
        </div>
      </div>
    </Link>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl overflow-hidden border border-gray-100 bg-white mb-3"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      >
        <span className={`text-sm font-semibold pr-2 transition-colors ${open ? 'text-[#E8733A]' : 'text-navy'}`}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <HiOutlineChevronDown className={`w-4 h-4 transition-colors ${open ? 'text-[#E8733A]' : 'text-gray-400'}`} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 leading-relaxed px-5 pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DesignCategoryPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const meta = CATEGORY_META[categorySlug];

  const [activeSub, setActiveSub]     = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [saved, setSaved]             = useState(new Set());
  const [leadForm, setLeadForm]       = useState({ name: '', phone: '', city: '' });
  const [leadDone, setLeadDone]       = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    if (!meta) navigate('/design-ideas', { replace: true });
  }, [meta, navigate]);

  if (!meta) return null;

  const categoryDesigns = designs.filter(d => d.categorySlug === categorySlug);
  const trendingDesigns = categoryDesigns.filter(d => d.trending);

  const filteredDesigns = categoryDesigns.filter(d => {
    const matchesSub = activeSub === 'All' || d.tags.some(t => t.toLowerCase().includes(activeSub.toLowerCase()));
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesSearch;
  });

  const toggleSave = (id) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const submitLead = (e) => {
    e.preventDefault();
    setLeadDone(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F6F7FB' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '440px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={meta.bannerImage} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(14,22,55,0.97) 0%, rgba(30,46,100,0.92) 50%, rgba(14,22,55,0.88) 100%)' }}
        />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Glow orbs */}
        <motion.div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.18) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
        />
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="#F6F7FB" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-xs mb-8"
          >
            <Link to="/" className="hover:text-white/70 transition">Home</Link>
            <HiChevronRight className="w-3 h-3" />
            <Link to="/design-ideas" className="hover:text-white/70 transition">Design Ideas</Link>
            <HiChevronRight className="w-3 h-3" />
            <span className="text-white/70">{meta.label}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left: title + desc */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border"
                style={{ background: 'rgba(232,115,58,0.12)', borderColor: 'rgba(232,115,58,0.35)', color: '#E8733A' }}
              >
                <MdVerified className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">{categoryDesigns.length} Curated Designs</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-4"
                style={{ fontFamily: 'var(--font-display, serif)' }}
              >
                {meta.label}
                <br />
                <span style={{ color: '#E8733A' }}>Designs</span>
              </h1>
              <p className="text-white/55 text-base leading-relaxed max-w-xl">{meta.heroDesc}</p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-3 mt-7">
                {[
                  { label: 'Free Consultation', icon: '🎨' },
                  { label: '45-Day Delivery', icon: '⚡' },
                  { label: 'Lifetime Warranty*', icon: '🛡️' },
                ].map(item => (
                  <span key={item.label}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: search + sub-category filters */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-col gap-4 lg:w-72 flex-shrink-0"
            >
              {/* Search */}
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search ${meta.label.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm text-white placeholder-white/35 focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <HiX className="w-4 h-4 text-white/55 hover:text-white transition-colors" />
                  </button>
                )}
              </div>
              {/* Sub-category pills */}
              <div className="flex flex-wrap gap-2" ref={tabsRef}>
                {meta.subCategories.map(sub => (
                  <button key={sub} onClick={() => setActiveSub(sub)}
                    className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                    style={activeSub === sub
                      ? { background: '#E8733A', color: '#fff', boxShadow: '0 4px 14px rgba(232,115,58,0.45)' }
                      : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.18)' }
                    }
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

        {/* ── Trending Strip ── */}
        {trendingDesigns.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12 pt-2"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                  style={{ background: 'rgba(232,115,58,0.1)', border: '1px solid rgba(232,115,58,0.3)' }}
                >
                  <HiFire className="w-3.5 h-3.5" style={{ color: '#E8733A' }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#E8733A' }}>Top Trending</span>
                </div>
                <h2 className="text-lg font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                  This Week&apos;s Favourites
                </h2>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
              {[...trendingDesigns, ...categoryDesigns.filter(d => !d.trending)].slice(0, 6).map(d => (
                <TrendingCard key={d.id} design={d} />
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Filter bar ── */}
        <div className="flex items-center justify-between mb-6 py-4 border-b border-gray-200">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Showing <span className="font-bold" style={{ color: '#1B2A4A' }}>{filteredDesigns.length}</span> designs
            {activeSub !== 'All' && <> · <span className="font-semibold" style={{ color: '#E8733A' }}>{activeSub}</span></>}
            {searchQuery && <> matching <span className="font-semibold" style={{ color: '#E8733A' }}>&ldquo;{searchQuery}&rdquo;</span></>}
          </p>
          {(activeSub !== 'All' || searchQuery) && (
            <button onClick={() => { setActiveSub('All'); setSearchQuery(''); }}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-navy"
              style={{ color: '#9CA3AF' }}
            >
              <HiX className="w-3.5 h-3.5" /> Clear all
            </button>
          )}
        </div>

        {/* ── Design Grid ── */}
        <AnimatePresence mode="wait">
          {filteredDesigns.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-3xl border border-gray-100"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1B2A4A' }}>No designs found</h3>
              <p className="text-sm text-gray-400 mb-6">Try adjusting your search or filter</p>
              <button onClick={() => { setActiveSub('All'); setSearchQuery(''); }}
                className="px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: '#E8733A' }}
              >
                View All {meta.label}
              </button>
            </motion.div>
          ) : (
            <motion.div key={activeSub + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredDesigns.map((design, i) => (
                <DesignCard key={design.id} design={design} index={i} saved={saved.has(design.id)} onSave={toggleSave} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mid-page CTA Banner ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="my-16 rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 24px 64px rgba(14,22,55,0.22)' }}
        >
          <div className="relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0E1637 0%, #1B2A4A 50%, #243665 100%)' }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 18px)' }}
            />
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.2) 0%, transparent 70%)' }}
            />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 sm:p-12">
              {/* Left copy */}
              <div>
                <SectionLabel text="Free Design Consultation" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-display, serif)' }}
                >
                  Get a Design Tailored<br />
                  <span style={{ color: '#E8733A' }}>for Your Space</span>
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Our expert designers will create a personalised {meta.label.toLowerCase()} plan — completely free, no commitment needed.
                </p>
                <div className="flex flex-col gap-2.5">
                  {['Free consultation with expert designer', '45-day guaranteed delivery', 'Lifetime warranty on modular products'].map((b, i) => (
                    <div key={b} className="flex items-center gap-2.5 text-sm text-white/65">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(232,115,58,0.2)', border: '1px solid rgba(232,115,58,0.4)' }}
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="#E8733A" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <AnimatePresence mode="wait">
                  {leadDone ? (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.4)' }}
                      >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-base font-bold mb-1" style={{ color: '#1B2A4A' }}>You&apos;re on the list!</h3>
                      <p className="text-xs text-gray-400">Our designer will call you within 2 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submitLead}>
                      <h3 className="text-base font-bold mb-4" style={{ color: '#1B2A4A' }}>Book Your Free Consultation</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'name',  placeholder: 'Your name',         type: 'text' },
                          { key: 'phone', placeholder: 'Mobile number',      type: 'tel' },
                          { key: 'city',  placeholder: 'Your city',          type: 'text' },
                        ].map(({ key, placeholder, type }) => (
                          <input key={key} type={type} required placeholder={placeholder}
                            value={leadForm[key]}
                            onChange={e => setLeadForm(f => ({ ...f, [key]: e.target.value }))}
                            className="w-full px-4 py-3 text-sm rounded-xl border-2 border-gray-200 focus:border-[#E8733A] outline-none transition-colors"
                          />
                        ))}
                      </div>
                      <button type="submit"
                        className="mt-4 w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)', boxShadow: '0 8px 24px rgba(232,115,58,0.35)' }}
                      >
                        Book Free Consultation <HiArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-[10px] text-center text-gray-400 mt-3">No spam. We respect your privacy.</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── FAQ ── */}
        {meta.faqs && meta.faqs.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <SectionLabel text="Frequently Asked" center />
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                Common Questions
              </h2>
            </div>
            {meta.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </motion.section>
        )}

        {/* ── Back link ── */}
        <div className="mt-10 text-center">
          <Link to="/design-ideas"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#E8733A]"
            style={{ color: '#9CA3AF' }}
          >
            ← Back to All Design Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
