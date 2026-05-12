import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLinkedinIn, FaBullseye, FaLightbulb, FaHandshake,
  FaAward, FaLeaf, FaHeart, FaPlay, FaArrowRight, FaEye,
} from 'react-icons/fa';
import {
  HiCheck, HiStar, HiShieldCheck, HiHome,
  HiLightBulb, HiUserGroup, HiClock,
} from 'react-icons/hi';

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 2000, isActive = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const start = Date.now();
    let rafId;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, isActive]);
  return count;
}

// ── InView hook ───────────────────────────────────────────────────────────────
function useInView(threshold = 0.25) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { target: 100000, format: (n) => n.toLocaleString('en-IN') + '+', label: 'Happy Homes' },
  { target: 100,    format: (n) => n + '+',                          label: 'Cities' },
  { target: 2000,   format: (n) => n.toLocaleString('en-IN') + '+', label: 'Designers' },
  { target: 20,     format: (n) => n + 'L+',                        label: 'Catalogue Products' },
  { target: 50,     format: (n) => n + '+',                         label: 'Experience Centres' },
  { target: 146,    format: (n) => n.toString(),                     label: 'Quality Checks' },
];

const values = [
  { Icon: FaBullseye,  title: 'Customer First',  description: 'Every decision we make is guided by what is best for our homeowners.' },
  { Icon: FaLightbulb, title: 'Innovation',       description: 'We leverage technology and design thinking to create world-class interiors.' },
  { Icon: FaHandshake, title: 'Transparency',     description: 'No hidden costs, no surprises. We believe in clear, upfront communication.' },
  { Icon: FaAward,     title: 'Quality',          description: '146 quality checks ensure every product meets our exacting standards.' },
  { Icon: FaLeaf,      title: 'Sustainability',   description: 'We source responsibly and build interiors that last a lifetime.' },
  { Icon: FaHeart,     title: 'Passion',          description: 'We love what we do, and it shows in every home we deliver.' },
];

const timeline = [
  { year: '2014', title: 'Founded',               description: 'Started with a mission to make beautiful interiors accessible to every Indian home.' },
  { year: '2016', title: 'Multi-City Launch',      description: 'Expanded to 5 major cities — Delhi, Mumbai, Bangalore, Hyderabad, Chennai.' },
  { year: '2018', title: '10,000 Homes',           description: 'Crossed 10,000 happy homes delivered across the country.' },
  { year: '2020', title: 'Virtual Design',         description: 'Launched virtual consultations and 3D walkthrough technology for remote clients.' },
  { year: '2022', title: '50K Homes & 50 Cities',  description: 'Reached 50,000+ delivered homes and expanded to 50+ cities.' },
  { year: '2024', title: 'Lifetime Warranty',      description: "Introduced India's first lifetime warranty on modular products." },
  { year: '2026', title: '1 Lakh+ Homes',          description: "1,00,000+ homes delivered. 100+ cities. And we're still growing." },
];

const team = [
  { name: 'Anuj Srivastava', role: 'Co-founder & CEO',   yearsAt: 12,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    bio: "Anuj brings 15+ years of consumer tech experience and drives FurnoTech's long-term vision.", linkedin: '#' },
  { name: 'Ramakant Sharma', role: 'Co-founder & COO',   yearsAt: 12,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    bio: 'Ramakant oversees operations and ensures every home is delivered on time, every time.', linkedin: '#' },
  { name: 'Shagufta Anurag', role: 'VP of Design',       yearsAt: 8,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'Shagufta leads a 2,000+ design team, setting creative direction across all of India.', linkedin: '#' },
  { name: 'Vikram Joshi',    role: 'Chief Technology Officer', yearsAt: 6,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
    bio: "Vikram built the technology platform powering FurnoTech's end-to-end customer experience.", linkedin: '#' },
];

// ── Reusable section label ────────────────────────────────────────────────────
function SectionLabel({ text, center = false }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : ''}`}>
      <div className="w-7 h-0.5" style={{ background: '#E8733A' }} />
      <div className="w-3 h-0.5" style={{ background: '#E8733A' }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>{text}</span>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ target, format, label, isActive }) {
  const count = useCountUp(target, 2000, isActive);
  return (
    <div className="text-center py-6 px-3">
      <div className="text-3xl sm:text-4xl font-black leading-none" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
        {format(count)}
      </div>
      <div className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function About() {
  const [statsRef, statsInView] = useInView(0.3);
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '55vh', backgroundColor: '#1e3a6e' }}>
        {/* BG image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=40" alt="" className="w-full h-full object-cover opacity-25" />
        </div>
        {/* Gradient overlay — lighter than before */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,42,90,0.88) 0%, rgba(30,58,110,0.78) 55%, rgba(64,90,180,0.55) 100%)' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 28px)' }} />
        {/* Decorative orb */}
        <div className="absolute top-8 right-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.18) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-16 sm:py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest mb-6"
            style={{ background: 'rgba(232,115,58,0.15)', borderColor: 'rgba(232,115,58,0.35)', color: '#E8733A' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
            About FurnoTech
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display, serif)' }}
          >
            Home to Beautiful<br />
            <span style={{ color: '#E8733A' }}>Interiors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            India&apos;s most trusted home interiors platform — making beautiful, functional spaces accessible to every Indian family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-10 flex-wrap"
          >
            <a href="#story" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5" style={{ background: '#E8733A' }}>
              Our Story <FaArrowRight className="w-3.5 h-3.5" />
            </a>
            <a href="#team" className="px-8 py-3.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-all border" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.22)' }}>
              Meet the Team
            </a>
          </motion.div>
        </div>

        {/* Curved bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 Q720,70 1440,0 L1440,70 L0,70 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-2 pb-6" ref={statsRef} style={{ marginTop: '-2px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100 rounded-2xl overflow-hidden shadow-md border border-gray-100"
          >
            {stats.map((stat) => <StatCard key={stat.label} {...stat} isActive={statsInView} />)}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT COMPANY ─────────────────────────────────────────────────── */}
      <section id="story" className="py-14 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <SectionLabel text="About Company" />
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                We Are Leading India&apos;s<br />Interior Design Revolution
              </h2>
              <p className="mt-5 leading-relaxed text-[15px]" style={{ color: '#6B7280' }}>
                FurnoTech was founded with a simple belief: everyone deserves a beautiful home. We saw the pain points of traditional interior design — long timelines, unreliable quality, and hidden costs. We set out to change that with technology and transparency.
              </p>
              <p className="mt-4 leading-relaxed text-[15px]" style={{ color: '#6B7280' }}>
                Today, we&apos;ve grown into India&apos;s largest and most trusted home interiors platform, delivering over 1,00,000 dream homes across 100+ cities with a guaranteed 45-day move-in timeline.
              </p>

              {/* Orange italic tagline */}
              <p className="mt-6 font-semibold text-lg leading-snug italic" style={{ color: '#E8733A' }}>
                &ldquo;Providing beautiful interiors<br />for every Indian home.&rdquo;
              </p>

              {/* Avatar + signature */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid rgba(232,115,58,0.4)' }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="CEO" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#1B2A4A' }}>Anuj Srivastava</p>
                  <p className="text-xs text-gray-400">Co-founder & CEO, FurnoTech</p>
                  <p className="text-base mt-0.5" style={{ color: 'rgba(27,42,74,0.35)', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>
                    Anuj Srivastava
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Creative image collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative pb-14 select-none"
            >
              {/* Decorative dots — top right */}
              <div className="absolute -top-4 right-0 w-28 h-28 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, #E8733A 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />

              {/* Main image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl ml-10" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80"
                  alt="Interior showcase"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping smaller image */}
              <div className="absolute bottom-0 left-0 w-[56%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80"
                  alt="Beautiful living room"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlayVideo(true)}
                className="absolute z-20 flex items-center justify-center rounded-full shadow-2xl cursor-pointer"
                style={{
                  width: 56, height: 56,
                  top: '42%', left: '37%',
                  transform: 'translate(-50%, -50%)',
                  background: '#E8733A',
                }}
                aria-label="Play video"
              >
                <FaPlay className="text-white w-4 h-4 ml-0.5" />
              </motion.button>

              {/* Orange badge */}
              <div className="absolute bottom-2 right-0 z-20 rounded-xl px-4 py-3 shadow-xl max-w-[165px]" style={{ background: '#E8733A' }}>
                <HiStar className="w-5 h-5 text-white mb-1.5" />
                <p className="text-white text-xs font-bold leading-snug">We&apos;re Providing the Best Interior Design Services</p>
              </div>

              {/* Decorative dots — bottom left */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #1B2A4A 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── WHAT'S OUR GOAL + MISSION & VISION (unified section) ──────── */}
      <section className="py-14 sm:py-20 overflow-hidden" style={{ background: '#F6F7F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* — What's Our Goal — */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left: Image with overlay text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Shadow block behind */}
              <div className="absolute -top-3 -left-3 w-[55%] h-[55%] rounded-tl-3xl pointer-events-none" style={{ background: 'rgba(13,21,38,0.07)' }} />
              <div className="rounded-3xl overflow-hidden shadow-xl relative z-10" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Our goal"
                  className="w-full h-full object-cover"
                />
                {/* Gradient text overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-6 rounded-b-3xl" style={{ background: 'linear-gradient(to top, rgba(13,21,38,0.9) 0%, rgba(13,21,38,0.4) 60%, transparent 100%)' }}>
                  <p className="text-white font-bold text-base leading-snug">Why We Are Best In<br />Interior Design Across India</p>
                </div>
              </div>
              {/* Dots accent — outside bottom-right */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, #E8733A 1.5px, transparent 1.5px)', backgroundSize: '11px 11px' }} />
            </motion.div>

            {/* Right: Goal content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <SectionLabel text="What's Our Goal" />
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.2]" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                Delivering Perfection<br />in Every Space We Design
              </h2>
              <p className="mt-5 leading-relaxed text-[15px]" style={{ color: '#6B7280' }}>
                Our goal is simple — to make beautiful, functional, and affordable interiors accessible to every Indian family. We combine cutting-edge technology with skilled craftsmanship to deliver spaces that exceed expectations, every single time.
              </p>

              {/* Mission & Vision cards */}
              <div className="grid grid-cols-2 gap-5 mt-8">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(232,115,58,0.1)' }}>
                    <FaBullseye className="w-5 h-5" style={{ color: '#E8733A' }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Our Mission</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                    To democratize beautiful interiors — accessible, affordable, and hassle-free for every Indian household.
                  </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(27,42,74,0.08)' }}>
                    <FaEye className="w-5 h-5" style={{ color: '#1B2A4A' }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Our Vision</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                    To be India&apos;s most innovative home interiors platform, setting new global standards in quality.
                  </p>
                </motion.div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20" style={{ background: '#F6F7F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="What We Stand For" center />
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Our Core Values</h2>
            <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">The principles that guide every decision we make and every home we deliver.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                style={{ borderColor: '#F0F0F0' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(232,115,58,0.12)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#E8733A' }} />
                </div>
                <h3 className="font-bold text-base" style={{ color: '#1B2A4A' }}>{title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY (Timeline) ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Since 2014" center />
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Our Journey</h2>
            <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">A decade of transforming Indian homes — from a startup to a category leader.</p>
          </div>

          <div className="relative">
            {/* Vertical line — left on mobile, center on lg */}
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {/* ── Mobile layout: all items right of left-edge dot ── */}
                  <div className="lg:hidden relative pl-12 pb-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.4, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 400, damping: 14 }}
                      className="absolute left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"
                      style={{ background: '#E8733A' }}
                    />
                    <span className="inline-block text-white text-xs font-mono px-3 py-1 rounded-full mb-1.5" style={{ background: '#E8733A' }}>
                      {item.year}
                    </span>
                    <h4 className="font-bold text-sm" style={{ color: '#1B2A4A' }}>{item.title}</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
                  </div>

                  {/* ── Desktop layout: alternating left / right ── */}
                  <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-6 items-start pb-10">
                    {/* Left side (even items) */}
                    <div className={i % 2 === 0 ? 'text-right pt-0.5' : 'opacity-0 pointer-events-none'}>
                      <span className="inline-block text-white text-xs font-mono px-3 py-1 rounded-full mb-1.5" style={{ background: '#E8733A' }}>
                        {item.year}
                      </span>
                      <h4 className="font-bold text-sm" style={{ color: '#1B2A4A' }}>{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    {/* Dot */}
                    <div className="flex items-start justify-center relative z-10 pt-1">
                      <motion.div
                        whileInView={{ scale: [0, 1.4, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 400, damping: 14 }}
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0"
                        style={{ background: '#E8733A' }}
                      />
                    </div>
                    {/* Right side (odd items) */}
                    <div className={i % 2 !== 0 ? 'pt-0.5' : 'opacity-0 pointer-events-none'}>
                      <span className="inline-block text-white text-xs font-mono px-3 py-1 rounded-full mb-1.5" style={{ background: '#E8733A' }}>
                        {item.year}
                      </span>
                      <h4 className="font-bold text-sm" style={{ color: '#1B2A4A' }}>{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section id="team" className="py-14 sm:py-20" style={{ background: '#F6F7F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="The People Behind It" center />
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Leadership Team</h2>
            <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">Meet the visionaries driving India's interior design revolution.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-3">
                  <div className="aspect-square overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={person.image} alt={person.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-400"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(27,42,74,0.88)' }}>
                    <p className="text-white text-xs text-center leading-relaxed">{person.bio}</p>
                    <a
                      href={person.linkedin} target="_blank" rel="noopener noreferrer"
                      className="mt-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-gold"
                      style={{ background: 'rgba(255,255,255,0.12)' }}
                    >
                      <FaLinkedinIn className="w-3.5 h-3.5 text-white" />
                    </a>
                  </div>
                </div>
                <h3 className="font-bold text-sm" style={{ color: '#1B2A4A' }}>{person.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: '#E8733A' }}>{person.role}</p>
                <p className="text-xs text-gray-400 mt-0.5">{person.yearsAt} yrs at FurnoTech</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO LIGHTBOX ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {playVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={() => setPlayVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl aspect-video flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-white/50 p-12">
                <FaPlay className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-sm">Video coming soon</p>
                <button onClick={() => setPlayVideo(false)} className="mt-6 text-xs text-white/50 hover:text-white transition-colors underline">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
