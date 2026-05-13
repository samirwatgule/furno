import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChevronRight, HiChevronLeft, HiLocationMarker,
  HiOutlineChevronDown,
} from 'react-icons/hi';
import { FaArrowLeft, FaArrowRight, FaRupeeSign, FaShieldAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import useApi from '../hooks/useApi';
import { api } from '../services/api';
import { projects as fallbackProjects } from '../data/siteData';

const TRUST_BADGES = [
  { icon: '✅', label: 'On Time',   sub: 'Delivery' },
  { icon: '🛡️', label: 'Warranty', sub: '5 Years' },
  { icon: '🎨', label: 'Design',   sub: 'Customised' },
  { icon: '📦', label: 'Quality',  sub: 'Checked' },
];

// ── Gallery ───────────────────────────────────────────────────────────────────

function Gallery({ images, title }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = images.length;
  const prev = useCallback(() => setActiveIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % total), [total]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main */}
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
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
            >
              <HiChevronLeft className="w-5 h-5" style={{ color: '#1B2A4A' }} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
            >
              <HiChevronRight className="w-5 h-5" style={{ color: '#1B2A4A' }} />
            </button>
          </>
        )}

        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {activeIdx + 1} / {total}
        </div>

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
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, idx) => (
            <button key={idx} onClick={() => setActiveIdx(idx)}
              className="relative rounded-xl overflow-hidden transition-all duration-200"
              style={{
                aspectRatio: '4/3',
                outline: activeIdx === idx ? '2.5px solid #E8733A' : '2.5px solid transparent',
                outlineOffset: '2px',
                opacity: activeIdx === idx ? 1 : 0.58,
              }}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: projectsData } = useApi(api.getProjects, fallbackProjects);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  const projectIdNum = parseInt(projectId, 10);
  const project = useMemo(
    () => (projectsData || []).find((p) => p.id === projectIdNum),
    [projectsData, projectIdNum]
  );

  useEffect(() => {
    if (projectsData && !project) navigate('/projects', { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectsData, project, navigate]);

  if (!project) return null;

  const projectImages = project.images?.length ? project.images : [project.image];

  const specs = [
    { label: 'BHK',    value: project.bhk },
    { label: 'Area',   value: project.area },
    { label: 'City',   value: project.city },
    { label: 'Style',  value: project.style },
    { label: 'Budget', value: project.budget },
  ];

  const visibleSpecs = specsExpanded ? specs : specs.slice(0, 4);

  const related = (projectsData || [])
    .filter((p) => p.id !== project.id && (p.city === project.city || p.style === project.style))
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: '#F6F7FB' }}>

      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '220px' }}>
        <div className="absolute inset-0">
          <img src={project.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(14,22,55,0.97) 0%, rgba(20,42,90,0.92) 55%, rgba(64,90,180,0.7) 100%)' }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <motion.div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.18) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
            <Link to="/projects" className="hover:text-white/70 transition">Projects</Link>
            <HiChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white/65 truncate max-w-[200px] sm:max-w-xs">{project.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <HiLocationMarker className="w-4 h-4" style={{ color: '#E8733A' }} />
              {project.city} · {project.area}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display, serif)' }}
            >
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2.5">
              {[project.bhk, project.style, project.budget].map((pill) => (
                <span key={pill} className="px-3.5 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(232,115,58,0.14)', border: '1px solid rgba(232,115,58,0.4)', color: '#E8733A' }}
                >
                  {pill}
                </span>
              ))}
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.35)', color: '#22c55e' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Delivered
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 sm:pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Left: Gallery + overview ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            <Gallery images={projectImages} title={project.title} />

            {/* Project overview */}
            <div className="mt-6 bg-white rounded-3xl border border-gray-100 p-6"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-0.5 bg-[#E8733A]" />
                <div className="w-3 h-0.5 bg-[#E8733A]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>Project Overview</span>
              </div>
              <h2 className="text-lg font-bold mb-3" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                About This Project
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                This {project.bhk} residence in {project.city} blends {project.style?.toLowerCase()} design
                with functional planning across {project.area}. The interiors were crafted to maximise
                storage, improve flow, and create a warm, inviting atmosphere throughout every room.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-4 bg-white rounded-3xl border border-gray-100 p-6"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
            >
              <h3 className="text-sm font-bold mb-4" style={{ color: '#1B2A4A' }}>Project Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  `Optimised layout for ${project.area}`,
                  `Custom ${project.style?.toLowerCase()} finishes`,
                  `Budget aligned around ${project.budget}`,
                  'Delivered by in-house execution team',
                  'Multi-stage quality inspected',
                  '5-year warranty on all work',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#6B7280' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(232,115,58,0.1)', border: '1px solid rgba(232,115,58,0.3)' }}
                    >
                      <svg className="w-2.5 h-2.5" fill="none" stroke="#E8733A" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link to="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#E8733A]"
                style={{ color: '#9CA3AF' }}
              >
                <FaArrowLeft className="w-3 h-3" /> Back to Projects
              </Link>
            </div>
          </motion.div>

          {/* ── Right: Sticky sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-6 lg:self-start"
          >
            {/* Main sidebar card */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
              style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#E8733A' }}>Delivered Project</p>
                  <h2 className="text-lg font-bold leading-snug" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                    {project.title}
                  </h2>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <p className="text-2xl font-black" style={{ color: '#E8733A' }}>{project.budget}</p>
                    <span className="text-xs text-gray-400">overall budget</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-4 gap-1 mb-5 p-3 rounded-2xl" style={{ background: '#F6F7FB' }}>
                  {TRUST_BADGES.map(({ icon, label, sub }) => (
                    <div key={label} className="flex flex-col items-center text-center gap-0.5 px-1">
                      <span className="text-lg leading-none mb-0.5">{icon}</span>
                      <span className="text-[9px] font-bold leading-tight" style={{ color: '#1B2A4A' }}>{label}</span>
                      <span className="text-[8px] leading-tight text-gray-400">{sub}</span>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-2" style={{ color: '#1B2A4A' }}>Project Details</h3>
                  <div className="divide-y divide-gray-50">
                    {visibleSpecs.map(({ label, value }) => (
                      <div key={label} className="flex items-start py-2.5">
                        <span className="text-xs text-gray-400 font-medium w-28 flex-shrink-0 pt-0.5">{label}</span>
                        <span className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {specs.length > 4 && (
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

                {/* CTAs */}
                <Link to="/#consultation"
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl mb-3"
                  style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)', boxShadow: '0 8px 28px rgba(232,115,58,0.4)' }}
                >
                  <FaRupeeSign className="w-3.5 h-3.5" /> Get Quote for Similar Home
                </Link>
                <Link to="/contact"
                  className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all border-2 hover:bg-navy hover:text-white hover:border-navy"
                  style={{ borderColor: 'rgba(27,42,74,0.18)', color: '#1B2A4A' }}
                >
                  <FaCalendarAlt className="w-3.5 h-3.5" /> Book Free Consultation
                </Link>
              </div>

              {/* Footer bar */}
              <div className="px-6 py-3 flex items-center justify-between border-t"
                style={{ borderColor: 'rgba(27,42,74,0.07)', background: 'rgba(27,42,74,0.03)' }}
              >
                <div className="flex items-center gap-1.5">
                  <MdVerified className="w-4 h-4" style={{ color: '#1B2A4A' }} />
                  <span className="text-xs font-semibold" style={{ color: '#1B2A4A' }}>Verified Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaShieldAlt className="w-3.5 h-3.5" style={{ color: '#1B2A4A' }} />
                  <span className="text-xs font-semibold" style={{ color: '#1B2A4A' }}>5-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Related projects */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="mt-5 bg-white rounded-3xl border border-gray-100 p-5"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold" style={{ color: '#1B2A4A' }}>Similar Projects</h3>
                  <Link to="/projects"
                    className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                    style={{ color: '#E8733A' }}
                  >
                    View All <FaArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {related.map((p) => (
                    <Link key={p.id} to={`/projects/${p.id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[#E8733A]"
                          style={{ color: '#1B2A4A' }}
                        >
                          {p.title}
                        </p>
                        <p className="text-[10px] font-bold mt-0.5 flex items-center gap-1" style={{ color: '#E8733A' }}>
                          <HiLocationMarker className="w-2.5 h-2.5" /> {p.city} · {p.area}
                        </p>
                      </div>
                      <FaArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#E8733A] transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
