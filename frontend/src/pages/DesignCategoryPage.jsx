import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChevronRight, HiSearch, HiX, HiHeart, HiOutlineHeart,
  HiOutlineChevronDown, HiFire,
} from 'react-icons/hi';
import { FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { designs, CATEGORY_META } from '../data/siteData';
import { formatINR } from '../components/Calculator/pricing';

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugToDisplay(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Design Card ───────────────────────────────────────────────────────────────

function DesignCard({ design, saved, onSave, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`} className="block relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Save button */}
        <button
          onClick={e => { e.preventDefault(); onSave(design.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10"
          style={{ background: saved ? '#E8733A' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}
        >
          {saved
            ? <HiHeart className="w-4 h-4 text-white" />
            : <HiOutlineHeart className="w-4 h-4 text-gray-600" />}
        </button>

        {/* Trending badge */}
        {design.trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10"
            style={{ background: 'linear-gradient(135deg, #E8733A, #d4621f)', boxShadow: '0 4px 12px rgba(232,115,58,0.5)' }}
          >
            <HiFire className="w-3 h-3" /> Trending
          </div>
        )}

        {/* Tags on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10"
            >
              {design.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Card body */}
      <div className="p-4">
        <Link to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}>
          <h3 className="text-sm font-bold text-navy leading-snug mb-2 line-clamp-2 hover:text-gold transition-colors">
            {design.title}
          </h3>
        </Link>

        <p className="text-xs font-bold mb-3" style={{ color: '#E8733A' }}>
          Starting from ₹{formatINR(design.priceStartingFrom)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {design.tags.map(tag => (
            <span key={tag} className="text-[10px] text-gray-500 px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50">
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}
          className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 group/btn border-2"
          style={{ borderColor: '#1B2A4A', color: '#1B2A4A' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1B2A4A'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1B2A4A'; }}
        >
          View Design
          <FaArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
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
      style={{
        border: '2px solid #E8733A',
        boxShadow: '0 0 0 4px rgba(232,115,58,0.12)',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-bold text-xs leading-snug line-clamp-2">{design.title}</p>
          <p className="text-[10px] font-bold mt-1" style={{ color: '#E8733A' }}>
            From ₹{formatINR(design.priceStartingFrom)}
          </p>
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1 text-white text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: '#E8733A' }}
        >
          <HiFire className="w-2.5 h-2.5" /> Trending
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
      className="border-b border-gray-100 last:border-0"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className={`text-sm font-semibold pr-4 transition-colors ${open ? 'text-gold' : 'text-navy'}`}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <HiOutlineChevronDown className={`w-4 h-4 transition-colors ${open ? 'text-gold' : 'text-gray-400'}`} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-500 leading-relaxed pb-4">{a}</p>
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

  // Redirect unknown slugs
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
    <div className="min-h-screen" style={{ background: '#F8F9FA' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${meta.bannerImage}')` }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(22,32,68,0.96) 0%, rgba(47,61,122,0.88) 50%, rgba(22,32,68,0.92) 100%)' }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        {/* Glow orb */}
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/45 text-xs mb-6"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <HiChevronRight className="w-3 h-3" />
            <Link to="/design-ideas" className="hover:text-white transition">Design Ideas</Link>
            <HiChevronRight className="w-3 h-3" />
            <span className="text-white/80">{meta.label}</span>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-white/20"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <MdVerified className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-semibold text-white/80">{categoryDesigns.length} Designs Available</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-display)] leading-tight mb-4">
                {meta.label}
              </h1>
              <p className="text-white/60 text-base leading-relaxed">{meta.heroDesc}</p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="w-full sm:w-72 flex-shrink-0"
            >
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search ${meta.label.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm text-white placeholder-white/40 focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <HiX className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sub-category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex gap-2 mt-8 overflow-x-auto pb-1"
            ref={tabsRef}
            style={{ scrollbarWidth: 'none' }}
          >
            {meta.subCategories.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSub(sub)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                style={activeSub === sub ? {
                  background: '#E8733A', color: '#fff',
                  boxShadow: '0 4px 16px rgba(232,115,58,0.4)',
                } : {
                  background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {sub}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Trending Strip ───────────────────────────────────────────── */}
        {trendingDesigns.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(232,115,58,0.1)', border: '1px solid rgba(232,115,58,0.3)' }}
              >
                <HiFire className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-bold text-gold uppercase tracking-wider">Top Trending</span>
              </div>
              <h2 className="text-lg font-bold text-navy font-[family-name:var(--font-display)]">
                Trending {meta.label}
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
              {trendingDesigns.map(d => <TrendingCard key={d.id} design={d} />)}
              {/* Placeholder cards if few trending */}
              {trendingDesigns.length < 4 && categoryDesigns.filter(d => !d.trending).slice(0, 4 - trendingDesigns.length).map(d => (
                <TrendingCard key={`extra-${d.id}`} design={d} />
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Results count + active filter indicator ───────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-navy">{filteredDesigns.length}</span> designs
              {activeSub !== 'All' && <> for <span className="font-bold text-gold">"{activeSub}"</span></>}
              {searchQuery && <> matching <span className="font-bold text-gold">"{searchQuery}"</span></>}
            </p>
          </div>
          {(activeSub !== 'All' || searchQuery) && (
            <button
              onClick={() => { setActiveSub('All'); setSearchQuery(''); }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-navy transition-colors"
            >
              <HiX className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>

        {/* ── Design Grid ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredDesigns.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-navy mb-2">No designs found</h3>
              <p className="text-sm text-gray-400 mb-5">Try adjusting your search or filter</p>
              <button
                onClick={() => { setActiveSub('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: '#E8733A' }}
              >
                View All {meta.label}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeSub + searchQuery}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5"
            >
              {filteredDesigns.map((design, i) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  index={i}
                  saved={saved.has(design.id)}
                  onSave={toggleSave}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mid-page Lead CTA ────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="my-16 rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 24px 64px rgba(22,32,68,0.2)' }}
        >
          <div
            className="relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #162044 0%, #2F3D7A 55%, #4052A0 100%)' }}
          >
            {/* Background texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 16px)' }}
            />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(232,115,58,0.15)' }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 sm:p-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(232,115,58,0.15)', border: '1px solid rgba(232,115,58,0.3)' }}
                >
                  <FaQuoteLeft className="w-3 h-3 text-gold" />
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">Free Design Consultation</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-display)] leading-tight mb-3">
                  Get a Design Tailored<br />for Your Space
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  Our expert designers will create a personalised {meta.label.toLowerCase()} plan — completely free, no commitment needed.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Free consultation', '45-day delivery', '5-year warranty'].map(b => (
                    <span key={b} className="flex items-center gap-1.5 text-xs text-white/70 font-medium">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(232,115,58,0.25)', border: '1px solid rgba(232,115,58,0.4)' }}
                      >
                        <svg className="w-2.5 h-2.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <AnimatePresence mode="wait">
                  {leadDone ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-4"
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.35)' }}
                      >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <h3 className="font-bold text-navy text-lg font-[family-name:var(--font-display)]">You&apos;re on the list!</h3>
                      <p className="text-sm text-gray-500 mt-1">Our designer will call you within 2 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submitLead} className="space-y-3">
                      <h3 className="font-bold text-navy text-base mb-4">Book Free Consultation</h3>
                      {[
                        { key: 'name',  placeholder: 'Your full name',      type: 'text' },
                        { key: 'phone', placeholder: '10-digit mobile',     type: 'tel'  },
                        { key: 'city',  placeholder: 'Your city',           type: 'text' },
                      ].map(({ key, placeholder, type }) => (
                        <input
                          key={key}
                          type={type}
                          required
                          placeholder={placeholder}
                          value={leadForm[key]}
                          onChange={e => setLeadForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all"
                        />
                      ))}
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #E8733A, #d4621f)', boxShadow: '0 8px 24px rgba(232,115,58,0.35)' }}
                      >
                        Get Free Consultation <FaArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-[10px] text-gray-400 text-center">No spam. We only call once.</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Related Categories ───────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-lg font-bold text-navy mb-4 font-[family-name:var(--font-display)]">What Are You Looking For?</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_META).filter(([slug]) => slug !== categorySlug).map(([slug, m]) => (
              <Link
                key={slug}
                to={`/design-ideas/${slug}`}
                className="px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: '#e5e7eb', color: '#374151' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8733A'; e.currentTarget.style.color = '#E8733A'; e.currentTarget.style.background = 'rgba(232,115,58,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = 'transparent'; }}
              >
                {m.label}
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        {meta.faqs?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-10"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-navy mb-6 font-[family-name:var(--font-display)]">
                FAQ About {meta.label}
              </h2>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 divide-y divide-gray-100"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
              >
                {meta.faqs.map((faq, i) => (
                  <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
