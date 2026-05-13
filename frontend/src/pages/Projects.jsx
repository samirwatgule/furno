import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { api } from '../services/api';
import { projects as fallbackProjects } from '../data/siteData';
import { CardSkeleton } from '../components/ui/Skeleton';
import { HiLocationMarker } from 'react-icons/hi';
import { FaEye, FaRupeeSign } from 'react-icons/fa';

const MotionLink = motion(Link);

const cityFilters = ['All', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Gurgaon', 'Chennai'];

const STATS = [
  { label: 'Happy Homes', end: 100000, suffix: '+' },
  { label: 'Cities',      end: 100,    suffix: '+' },
  { label: 'Designers',   end: 2000,   suffix: '+' },
];

function SectionLabel({ text, center = false }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : ''}`}>
      <div className="w-7 h-0.5" style={{ background: '#E8733A' }} />
      <div className="w-3 h-0.5" style={{ background: '#E8733A' }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>{text}</span>
    </div>
  );
}

function useCountUp(end, duration = 1400) {
  const [count, setCount] = useState(0);
  const triggered = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        let start = null;
        const tick = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.round(p * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
}

function StatCounter({ end, suffix, label }) {
  const [count, ref] = useCountUp(end);
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display, serif)' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="w-8 h-0.5 mx-auto mt-2 mb-1.5" style={{ background: '#E8733A' }} />
      <div className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
    </div>
  );
}

export default function Projects() {
  const { data: projectsData, loading } = useApi(api.getProjects, fallbackProjects);
  const [activeCity, setActiveCity] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered = (projectsData || []).filter(
    (p) => activeCity === 'All' || p.city === activeCity
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: '#1e3a6e' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=30"
            alt="" className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(20,42,90,0.92) 0%, rgba(30,58,110,0.82) 60%, rgba(64,90,180,0.6) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.15) 0%, transparent 65%)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(100,140,255,0.1) 0%, transparent 65%)', transform: 'translate(-30%,30%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest mb-7"
            style={{ background: 'rgba(232,115,58,0.15)', borderColor: 'rgba(232,115,58,0.4)', color: '#E8733A' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
            1,00,000+ Beautiful Homes Delivered
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, serif)' }}>
            Our Delivered<br /><span style={{ color: '#E8733A' }}>Dream Homes</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            Browse through beautiful homes designed and delivered by our expert team across India.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-10 sm:gap-16 mt-12 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
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

      {/* ── STICKY FILTER BAR ── */}
      <section className="bg-white z-40"
        style={{ position: 'sticky', top: '72px', marginTop: '-2px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1.5 py-3.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {cityFilters.map((city) => {
              const isActive = activeCity === city;
              const cityCount = city === 'All'
                ? (projectsData || []).length
                : (projectsData || []).filter(p => p.city === city).length;
              return (
                <motion.button key={city} whileTap={{ scale: 0.94 }}
                  onClick={() => setActiveCity(city)}
                  className="relative whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-colors duration-200"
                  style={{ color: isActive ? '#fff' : '#6B7280' }}>

                  {/* Sliding animated pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #243665 100%)', boxShadow: '0 4px 16px rgba(27,42,74,0.3)' }}
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}

                  {/* Hover bg for inactive */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-150"
                      style={{ background: 'rgba(232,115,58,0.08)' }}
                    />
                  )}

                  <span className="relative z-10">{city === 'All' ? 'All Cities' : city}</span>

                  {/* Count bubble */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${city}-${cityCount}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                      style={isActive
                        ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                        : { background: 'rgba(232,115,58,0.12)', color: '#E8733A' }}>
                      {cityCount}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              );
            })}

            {/* Total count badge */}
            <div className="ml-auto flex-shrink-0 flex items-center gap-2">
              <div className="h-5 w-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={filtered.length}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, rgba(232,115,58,0.12) 0%, rgba(232,115,58,0.06) 100%)', color: '#E8733A', border: '1px solid rgba(232,115,58,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
                  {filtered.length} Projects
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="py-14" style={{ background: '#F6F7F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-base font-semibold text-gray-400">No projects in {activeCity} yet</h3>
              <button onClick={() => setActiveCity('All')}
                className="mt-4 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: '#E8733A' }}>
                Show All Projects
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeCity} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => (
                  <motion.div key={project.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }} transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredCard(project.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">

                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy" />

                      {/* Dark gradient on hover */}
                      <div className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(to top, rgba(15,28,53,0.88) 0%, rgba(15,28,53,0.2) 55%, transparent 100%)',
                          opacity: hoveredCard === project.id ? 1 : 0,
                        }} />

                      {/* BHK badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: '#E8733A' }}>
                        {project.bhk}
                      </div>

                      {/* Delivered badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[10px] font-bold"
                        style={{ background: 'rgba(16,185,129,0.88)', backdropFilter: 'blur(8px)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Delivered
                      </div>

                      {/* Hover overlay — View Project only */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hoveredCard === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <MotionLink
                          to={`/projects/${project.id}`}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[11px] font-bold uppercase tracking-wide"
                          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)' }}
                        >
                          <FaEye className="w-3 h-3" /> View Project
                        </MotionLink>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <h3 className="font-bold text-sm leading-snug mb-1 transition-colors group-hover:text-[#E8733A]"
                        style={{ color: '#1B2A4A' }}>
                        {project.title}
                      </h3>
                      <p className="text-xs flex items-center gap-1.5 mb-4" style={{ color: '#9CA3AF' }}>
                        <HiLocationMarker className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#E8733A' }} />
                        {project.city} · {project.area}
                      </p>

                      <div className="flex items-center justify-between pb-4"
                        style={{ borderBottom: '1px solid #F3F4F6' }}>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#9CA3AF' }}>Budget</p>
                          <p className="text-sm font-bold" style={{ color: '#E8733A' }}>{project.budget}</p>
                        </div>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: '#F6F7F9', color: '#6B7280' }}>
                          {project.style}
                        </span>
                      </div>

                      {/* Single CTA — Get Quote */}
                      <MotionLink to="/#consultation" whileTap={{ scale: 0.97 }}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ background: '#E8733A', color: '#fff' }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,115,58,0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>
                        <FaRupeeSign className="w-3 h-3" />
                        Get Quote
                      </MotionLink>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  );
}
