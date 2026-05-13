import { useRef } from 'react';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { howItWorks as fallbackSteps } from '../../data/siteData';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { HiPhone, HiPencil, HiCube, HiTruck, HiHome } from 'react-icons/hi';

const STEP_META = [
  { Icon: HiPhone,  color: '#E8733A', rgb: '232,115,58',  num: '01', short: 'Free consultation + instant quote' },
  { Icon: HiPencil, color: '#6366F1', rgb: '99,102,241',  num: '02', short: '10% booking locks your slot' },
  { Icon: HiCube,   color: '#10B981', rgb: '16,185,129',  num: '03', short: 'Pick designs, materials & finishes' },
  { Icon: HiTruck,  color: '#3B82F6', rgb: '59,130,246',  num: '04', short: 'Experts execute your plan' },
  { Icon: HiHome,   color: '#F59E0B', rgb: '245,158,11',  num: '05', short: 'Move in — done in 45 days' },
];

export default function HowItWorks() {
  const { data: steps } = useApi(api.getProcessSteps, fallbackSteps);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (!steps?.length) return null;

  return (
    <section id="how-it-works" className="py-16 sm:py-24 overflow-hidden bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full border"
            style={{ background: 'rgba(232,115,58,0.07)', borderColor: 'rgba(232,115,58,0.25)', color: '#E8733A' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Simple 5-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}
          >
            How It Works
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            From your first call to moving in — end-to-end handled in just 45 days.
          </p>
        </motion.div>

        {/* ── DESKTOP: horizontal timeline ── */}
        <div className="hidden lg:block">

          {/* Line + circles row */}
          <div className="relative flex items-center justify-between mb-10 px-[5%]">

            {/* Track (full width background) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-100" />

            {/* Animated gradient fill */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full origin-left"
              style={{ background: 'linear-gradient(90deg, #E8733A 0%, #6366F1 25%, #10B981 50%, #3B82F6 75%, #F59E0B 100%)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

            {/* Circles */}
            {steps.map((step, idx) => {
              const m = STEP_META[idx] || STEP_META[0];
              return (
                <motion.div
                  key={step.step}
                  className="relative z-10 flex flex-col items-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.2 + idx * 0.25, type: 'spring', stiffness: 280, damping: 18 }}
                >
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={inView ? { opacity: [0, 0.35, 0], scale: [1, 1.7, 1.7] } : {}}
                    transition={{ delay: 0.6 + idx * 0.25, duration: 0.8 }}
                    style={{ background: m.color, borderRadius: '50%' }}
                  />
                  {/* Circle */}
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${m.color} 0%, ${m.color}cc 100%)`,
                      boxShadow: `0 8px 24px rgba(${m.rgb},0.4)`,
                    }}
                  >
                    <m.Icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Step number pill below circle */}
                  <div
                    className="mt-2 text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: `rgba(${m.rgb},0.1)`, color: m.color }}
                  >
                    {m.num}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Text content row — each block aligned under its circle */}
          <div className="flex justify-between px-[3%]">
            {steps.map((step, idx) => {
              const m = STEP_META[idx] || STEP_META[0];
              return (
                <motion.div
                  key={step.step}
                  className="w-[17%] text-center group"
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.45 }}
                >
                  <h3
                    className="text-sm font-bold mb-1.5 leading-snug transition-colors duration-200"
                    style={{ color: '#1B2A4A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = m.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#1B2A4A')}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#9CA3AF' }}>
                    {m.short}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE: vertical timeline ── */}
        <div className="lg:hidden">
          <div className="relative pl-14">
            {/* Vertical track */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gray-100" />
            {/* Animated fill */}
            <motion.div
              className="absolute left-6 top-2 w-px origin-top"
              style={{ background: 'linear-gradient(to bottom, #E8733A, #6366F1, #10B981, #3B82F6, #F59E0B)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: inView ? 1 : 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {steps.map((step, idx) => {
              const m = STEP_META[idx] || STEP_META[0];
              const isLast = idx === steps.length - 1;
              return (
                <motion.div
                  key={step.step}
                  className={`relative flex gap-4 ${!isLast ? 'pb-9' : ''}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.45 }}
                >
                  {/* Circle on the line */}
                  <motion.div
                    className="absolute -left-8 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: m.color, boxShadow: `0 4px 16px rgba(${m.rgb},0.4)` }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + idx * 0.15, type: 'spring', stiffness: 300 }}
                  >
                    <m.Icon className="w-5 h-5 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="pt-1 min-h-[48px]">
                    <p className="text-[10px] font-black mb-0.5" style={{ color: m.color }}>
                      STEP {m.num}
                    </p>
                    <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: '#1B2A4A' }}>
                      {step.title}
                    </h3>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>{m.short}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Ready to begin CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 sm:mt-20 rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #1B2A4A 0%, #243665 100%)',
            boxShadow: '0 24px 64px rgba(27,42,74,0.22)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 18px)' }}
          />
          <div className="absolute right-0 top-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.28) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }}
          />

          <div className="relative px-7 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#E8733A' }}>
                Ready to begin?
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug"
                style={{ fontFamily: 'var(--font-display, serif)' }}
              >
                Start your journey today —<br />
                <span style={{ color: '#E8733A' }}>it&apos;s 100% free to begin.</span>
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/estimate"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg,#E8733A 0%,#d4621f 100%)', boxShadow: '0 8px 24px rgba(232,115,58,0.4)' }}
              >
                Get Free Estimate <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/stores"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border-2 transition-all hover:bg-white hover:text-navy whitespace-nowrap"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)' }}
              >
                Visit Experience Centre
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
