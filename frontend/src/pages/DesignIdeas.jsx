import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiSearch, HiX, HiHeart } from 'react-icons/hi';
import { FaArrowRight } from 'react-icons/fa';
import { MdSearchOff } from 'react-icons/md';
import useApi from '../hooks/useApi';
import { api } from '../services/api';
import { designs as fallbackDesigns } from '../data/siteData';

const MotionLink = motion(Link);

// Perfectly tiles in a 3-col grid with zero gaps:
// Row pair A: [BIG 2×2][small 1×1]
//             [BIG 2×2][small 1×1]
// Row pair B: [TALL 1×2][WIDE 2×1]
//             [TALL 1×2][WIDE 2×1]
const BENTO_SPANS = [
  'col-span-2 row-span-2',  // BIG
  'col-span-1 row-span-1',  // small
  'col-span-1 row-span-1',  // small
  'col-span-1 row-span-2',  // TALL
  'col-span-2 row-span-1',  // WIDE
  'col-span-2 row-span-1',  // WIDE
];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const categoryToSlug = (cat) => cat.toLowerCase().replace(/\s+/g, '-');

const CHIP_FILTERS = [
  'All', 'Modular Kitchen', 'Living Room', 'Master Bedroom',
  'Wardrobe', 'Bathroom', 'Kids Room', 'Pooja Room',
  'Dining Room', 'False Ceiling', 'TV Unit', 'Home Office', 'Balcony',
];

export default function DesignIdeas() {
  const navigate = useNavigate();
  const { data: designsData, loading } = useApi(api.getDesigns, fallbackDesigns);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [saved, setSaved] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const searchRef = useRef(null);

  const filteredDesigns = useMemo(() => (designsData || []).filter((d) => {
    const matchesFilter = activeFilter === 'All' || d.category === activeFilter;
    const matchesSearch = d.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  }), [designsData, activeFilter, debouncedSearch]);

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearAll = () => {
    setActiveFilter('All');
    setSearchQuery('');
    searchRef.current?.focus();
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: '#1e3a6e' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=30" alt=""
            className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,42,90,0.92) 0%, rgba(30,58,110,0.82) 60%, rgba(64,90,180,0.6) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.15) 0%, transparent 65%)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute left-0 bottom-0 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(100,140,255,0.1) 0%, transparent 65%)', transform: 'translate(-30%,30%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest mb-7"
            style={{ background: 'rgba(232,115,58,0.15)', borderColor: 'rgba(232,115,58,0.4)', color: '#E8733A' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
            10,000+ Curated Design Ideas
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, serif)' }}>
            Interior Design<br /><span style={{ color: '#E8733A' }}>Inspiration</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            Explore stunning interiors curated by our expert designers — find inspiration for every room.
          </motion.p>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 max-w-lg mx-auto relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.4)' }} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search rooms, styles, designs…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-white text-sm focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
              onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.18)'; e.target.style.borderColor = 'rgba(232,115,58,0.6)'; }}
              onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <HiX className="w-3.5 h-3.5 text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stat pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            {[{ n: '10k+', s: 'Design Ideas' }, { n: '13', s: 'Categories' }, { n: '2k+', s: 'Expert Designers' }].map(({ n, s }) => (
              <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <span className="font-bold text-white text-sm">{n}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="bg-white z-40"
        style={{ position: 'sticky', top: '72px', marginTop: '-2px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1.5 py-3.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {CHIP_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              const count = filter === 'All'
                ? (designsData || []).length
                : (designsData || []).filter(d => d.category === filter).length;
              return (
                <motion.button key={filter} whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    if (filter === 'All') { setActiveFilter('All'); }
                    else { navigate(`/design-ideas/${categoryToSlug(filter)}`); }
                  }}
                  className="relative whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-colors duration-200"
                  style={{ color: isActive ? '#fff' : '#6B7280' }}>
                  {isActive && (
                    <motion.div layoutId="designActivePill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #243665 100%)', boxShadow: '0 4px 16px rgba(27,42,74,0.3)' }}
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                  {count > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.span key={count}
                        initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.18 }}
                        className="relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                        style={isActive
                          ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                          : { background: 'rgba(232,115,58,0.12)', color: '#E8733A' }}>
                        {count}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </motion.button>
              );
            })}

            <div className="ml-auto flex-shrink-0 flex items-center gap-2">
              <div className="h-5 w-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
              <AnimatePresence mode="wait">
                <motion.span key={filteredDesigns.length}
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, rgba(232,115,58,0.12) 0%, rgba(232,115,58,0.06) 100%)', color: '#E8733A', border: '1px solid rgba(232,115,58,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
                  {filteredDesigns.length} Designs
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY — Bento Mosaic Grid ── */}
      <section className="py-14" style={{ background: '#F0F2F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 [grid-auto-rows:160px] sm:[grid-auto-rows:260px] [grid-auto-flow:dense]">
              {BENTO_SPANS.map((span, i) => (
                <div key={i} className={`${span} rounded-2xl bg-gray-200 animate-pulse`} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredDesigns.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                  <MdSearchOff className="w-16 h-16 mx-auto mb-4" style={{ color: '#E8733A', opacity: 0.3 }} />
                  <h3 className="text-base font-bold text-gray-400">No designs found</h3>
                  <p className="text-sm text-gray-400 mt-1">Try a different search term or category</p>
                  <button onClick={clearAll}
                    className="mt-5 px-6 py-2.5 rounded-full text-white text-sm font-bold transition-all hover:-translate-y-0.5"
                    style={{ background: '#E8733A' }}>
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={activeFilter + debouncedSearch}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 [grid-auto-rows:160px] sm:[grid-auto-rows:260px] [grid-auto-flow:dense]">
                  {filteredDesigns.map((design, i) => {
                    const spanClass = BENTO_SPANS[i % BENTO_SPANS.length];
                    const isBig = spanClass.includes('col-span-2') || spanClass.includes('row-span-2');
                    const isHovered = hoveredCard === design.id;
                    const isSaved = saved.has(design.id);

                    return (
                      <motion.div
                        key={design.id}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer ${spanClass}`}
                        onMouseEnter={() => setHoveredCard(design.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => navigate(`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`)}
                      >
                        {/* Image */}
                        <img
                          src={design.image}
                          alt={design.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.09]"
                          loading="lazy"
                        />

                        {/* Shine sweep on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ x: '-110%' }}
                              animate={{ x: '210%' }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, ease: 'easeInOut' }}
                              className="absolute inset-0 pointer-events-none z-10"
                              style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.11) 50%, transparent 65%)' }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Gradient — subtle at rest, deep on hover */}
                        <div
                          className="absolute inset-0 transition-all duration-400"
                          style={{
                            background: isHovered
                              ? 'linear-gradient(to top, rgba(5,12,32,0.97) 0%, rgba(5,12,32,0.62) 48%, rgba(5,12,32,0.12) 74%, transparent 100%)'
                              : 'linear-gradient(to top, rgba(5,12,32,0.84) 0%, rgba(5,12,32,0.28) 44%, transparent 70%)',
                          }}
                        />

                        {/* Heart — top right, always visible */}
                        <motion.button
                          whileTap={{ scale: 0.75 }}
                          animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                          onClick={(e) => toggleSave(design.id, e)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center z-20"
                          style={{
                            background: isSaved ? '#E8733A' : 'rgba(0,0,0,0.38)',
                            backdropFilter: 'blur(14px)',
                            border: `1.5px solid ${isSaved ? 'rgba(232,115,58,0.6)' : 'rgba(255,255,255,0.18)'}`,
                            boxShadow: isSaved ? '0 4px 16px rgba(232,115,58,0.55)' : 'none',
                          }}>
                          <HiHeart className="w-4 h-4"
                            style={{ color: isSaved ? '#fff' : 'rgba(255,255,255,0.78)' }} />
                        </motion.button>

                        {/* Style badge — slides down on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.22 }}
                              className="absolute top-3 left-3 z-20 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                              style={{ background: '#E8733A', color: '#fff', letterSpacing: '0.1em' }}>
                              {design.style}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Bottom content */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                          {/* Orange accent bar — expands on hover */}
                          <div className="mb-2 h-[2px] rounded-full transition-all duration-500 origin-left"
                            style={{
                              background: 'linear-gradient(90deg, #E8733A, #ff9a5c)',
                              width: isHovered ? '45%' : '18%',
                              opacity: isHovered ? 1 : 0.6,
                            }}
                          />

                          <span
                            className="block font-black uppercase tracking-[0.14em] mb-1.5"
                            style={{ fontSize: '11px', color: '#E8733A' }}>
                            {design.category}
                          </span>

                          <h3
                            className="text-white font-bold leading-snug line-clamp-2"
                            style={{ fontSize: isBig ? '18px' : '14px' }}>
                            {design.title}
                          </h3>

                          {/* CTA — slides up on hover */}
                          <div
                            className="overflow-hidden transition-all duration-300"
                            style={{
                              maxHeight: isHovered ? '52px' : '0',
                              marginTop: isHovered ? '10px' : '0',
                              opacity: isHovered ? 1 : 0,
                            }}>
                            <MotionLink
                              to={`/design-ideas/${design.categorySlug}/${design.id}-${design.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              whileTap={{ scale: 0.96 }}
                              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white font-bold uppercase tracking-wide"
                              style={{
                                fontSize: '12px',
                                background: 'linear-gradient(135deg, #E8733A 0%, #c95e22 100%)',
                                boxShadow: '0 5px 20px rgba(232,115,58,0.65)',
                              }}>
                              View Design <FaArrowRight className="w-2.5 h-2.5" />
                            </MotionLink>
                          </div>
                        </div>

                        {/* Orange glow border on hover */}
                        <div
                          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                          style={{
                            boxShadow: 'inset 0 0 0 2px rgba(232,115,58,0.7)',
                            opacity: isHovered ? 1 : 0,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}
