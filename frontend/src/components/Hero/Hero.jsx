import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { heroSlides as fallbackSlides } from '../../data/siteData';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiCheck } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import { HeroSkeleton } from '../ui/Skeleton';

const CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad',
];
const SLIDE_DURATION = 5000;

function validateField(name, value) {
  if (!value.trim()) return 'This field is required';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Enter a valid email address';
  if (name === 'phone' && !/^\d{10}$/.test(value))
    return 'Enter a valid 10-digit phone number';
  return '';
}

export default function Hero() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: slides, loading } = useApi(api.getHeroSlides, fallbackSlides);

  // All state declarations together
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const slideCount = slides?.length || 0;
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#consultation') {
      setShowForm(true);
    }
  }, [location.hash]);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setProgress(0);
    startTimeRef.current = performance.now();
  }, []);

  const next = useCallback(() => {
    if (slideCount > 0) goTo((current + 1) % slideCount);
  }, [current, slideCount, goTo]);

  const prev = useCallback(() => {
    if (slideCount > 0) goTo((current - 1 + slideCount) % slideCount);
  }, [current, slideCount, goTo]);

  useEffect(() => {
    if (slideCount === 0 || isHovered) return;
    startTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent((c) => (c + 1) % slideCount);
        setProgress(0);
        startTimeRef.current = performance.now();
        progressRef.current = requestAnimationFrame(tick);
      }
    };

    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [current, isHovered, slideCount]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((err) => ({ ...err, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((err) => ({ ...err, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'phone', 'city'];
    const newErrors = {};
    fields.forEach((f) => { newErrors[f] = validateField(f, formData[f]); });
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, city: true });
    if (Object.values(newErrors).some(Boolean)) return;

    setSubmitting(true);
    try {
      await api.submitLead(formData);
      setSubmitted(true);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all bg-white placeholder-gray-400 ${
      touched[name] && errors[name]
        ? 'border-red-400 focus:ring-red-100'
        : 'border-gray-200 focus:border-navy focus:ring-navy/15 hover:border-gray-300'
    }`;

  if (loading || !slides || slides.length === 0) return <HeroSkeleton />;

  const slide = slides[current];

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ minHeight: 'calc(100vh - 73px)', maxHeight: 860 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Background image ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          {/* Gradient: heavy left for text legibility, lighter on right for form */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
          <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main content: CSS grid ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-0"
        style={{ minHeight: 'inherit', display: 'flex', alignItems: 'center' }}
      >
        <div className={`w-full grid gap-8 xl:gap-16 items-center ${showForm ? 'grid-cols-1 lg:grid-cols-[1fr_380px]' : 'grid-cols-1'}`}>

          {/* ── Left: slide text ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Tag pill */}
              {slide.tag && (
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                  className="inline-flex items-center gap-1.5 bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider shadow-lg shadow-gold/30"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                  {slide.tag}
                </motion.span>
              )}

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white leading-[1.1] font-[family-name:var(--font-display)]"
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mt-5 text-white/75 text-base sm:text-lg leading-relaxed max-w-lg"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA + badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => {
                    if (slide.cta === 'Calculate Now') {
                      navigate('/estimate?type=kitchen');
                    } else {
                      setShowForm(true);
                    }
                  }}
                  className="inline-flex items-center gap-2.5 bg-gold hover:bg-gold-hover text-white px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-gold/40 hover:-translate-y-0.5"
                >
                  {slide.cta}
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="flex flex-wrap items-center gap-3 mt-5"
              >
                <span className="inline-flex items-center gap-2 bg-gold/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-gold/20 backdrop-blur-sm">
                  <span>🚚</span> 45-Day Delivery Guarantee
                </span>
                <span
                  className="inline-flex items-center gap-2 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                  <span>✨</span> ₹1,200/sqft onwards
                </span>
              </motion.div>

            </motion.div>
          </AnimatePresence>

          {/* ── Right: Lead Form (shown on CTA click) ── */}
          <AnimatePresence>
          {showForm && (
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 48 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
              style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}
            >
              {/* Form header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #162044 0%, #2F3D7A 60%, #4052A0 100%)' }}
              >
                <div>
                  <p className="text-white font-semibold text-sm">Free Consultation</p>
                  <p className="text-white/60 text-xs mt-0.5">No cost, no commitment</p>
                </div>
                <span className="text-xs font-bold text-white bg-gold px-3 py-1 rounded-full">
                  FREE
                </span>
              </div>

              {/* Form body */}
              <div className="p-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                      >
                        <HiCheck className="w-9 h-9 text-green-600" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-navy mb-2 font-[family-name:var(--font-display)]">
                        You&apos;re all set!
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">We&apos;ll call you within 2 hours!</p>
                      <p className="text-xs text-gray-400 mb-5">
                        Our designer will discuss your requirements
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', city: '' });
                          setTouched({});
                          setErrors({});
                        }}
                        className="text-xs text-navy underline underline-offset-2 hover:text-gold transition-colors"
                      >
                        Schedule for Later
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-base font-bold text-navy mb-0.5 font-[family-name:var(--font-display)]">
                        Get Free Design Consultation
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">Talk to our designer — it&apos;s free!</p>

                      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                        {/* Full Name */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">
                            Full Name
                          </label>
                          <input
                            type="text" name="name"
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={handleChange} onBlur={handleBlur}
                            className={fieldClass('name')}
                          />
                          {touched.name && errors.name && (
                            <p className="text-[10px] text-red-500 mt-0.5">⚠ {errors.name}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">
                            Email Address
                          </label>
                          <input
                            type="email" name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange} onBlur={handleBlur}
                            className={fieldClass('email')}
                          />
                          {touched.email && errors.email && (
                            <p className="text-[10px] text-red-500 mt-0.5">⚠ {errors.email}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">
                            Phone Number
                          </label>
                          <div className={`flex rounded-xl border overflow-hidden transition-all ${
                            touched.phone && errors.phone ? 'border-red-400' : 'border-gray-200 focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/15'
                          }`}>
                            <select className="shrink-0 w-16 px-2 py-2.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-600 focus:outline-none">
                              <option>+91</option><option>+1</option><option>+44</option><option>+971</option>
                            </select>
                            <input
                              type="tel" name="phone"
                              placeholder="10-digit number"
                              value={formData.phone}
                              onChange={handleChange} onBlur={handleBlur}
                              maxLength={10}
                              className="flex-1 px-3 py-2.5 text-sm focus:outline-none bg-white placeholder-gray-400"
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="text-[10px] text-red-500 mt-0.5">⚠ {errors.phone}</p>
                          )}
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-widest">
                            City
                          </label>
                          <select
                            name="city" value={formData.city}
                            onChange={handleChange} onBlur={handleBlur}
                            className={fieldClass('city')}
                          >
                            <option value="">Select your city</option>
                            {CITIES.map((c) => <option key={c}>{c}</option>)}
                          </select>
                          {touched.city && errors.city && (
                            <p className="text-[10px] text-red-500 mt-0.5">⚠ {errors.city}</p>
                          )}
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-gold/30 bg-gold hover:bg-gold-hover text-white disabled:opacity-60 flex items-center justify-center gap-2 mt-1 hover:-translate-y-0.5"
                        >
                          {submitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            <>Book Free Consultation <FiArrowRight className="w-4 h-4" /></>
                          )}
                        </button>
                      </form>

                      <p className="text-[10px] text-gray-400 mt-3 text-center">
                        By submitting, you agree to our{' '}
                        <a href="#" className="text-navy underline underline-offset-1 hover:text-gold transition-colors">
                          Privacy Policy
                        </a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
          )}
          </AnimatePresence>

        </div>
      </div>

      {/* ── Carousel controls — centered at bottom ── */}
      <div className="absolute bottom-7 left-0 right-0 z-20 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-200 hover:scale-110"
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-7 h-2 bg-gold shadow-md shadow-gold/40'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-200 hover:scale-110"
        >
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <div
          className="h-full bg-gold transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
