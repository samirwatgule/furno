import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome, HiChevronRight, HiCheck, HiOutlineSparkles,
  HiOutlineChevronDown, HiX,
} from 'react-icons/hi';
import { HiCalculator } from 'react-icons/hi2';
import { HiCube } from 'react-icons/hi';
import { FaShieldAlt, FaMedal, FaStar, FaArrowRight } from 'react-icons/fa';
import { MdVerified, MdLocationOn } from 'react-icons/md';
import {
  CITIES, MAT_MULT, BHK_OPTIONS, PACKAGES,
  calculatePackages, formatINR,
} from '../components/Calculator/pricing';
import { api } from '../services/api';

// ── Data ──────────────────────────────────────────────────────────────────────

const ROOM_TYPES = [
  {
    id: 'full_home',
    label: 'Full Home',
    icon: HiHome,
    unit: 'sqft',
    field: 'area',
    min: 100, max: 5000, step: 50, defaultVal: 1200,
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    desc: 'Every room, beautifully designed',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: HiCalculator,
    unit: 'running ft',
    field: 'length',
    min: 3, max: 30, step: 1, defaultVal: 10,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    desc: 'Smart storage & premium countertops',
  },
  {
    id: 'wardrobe',
    label: 'Wardrobe',
    icon: HiCube,
    unit: 'running ft',
    field: 'width',
    min: 3, max: 20, step: 1, defaultVal: 6,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    desc: 'Floor-to-ceiling custom solutions',
  },
];

const ACC_OPTIONS = [
  { id: 'none',  label: '+0%',  desc: 'Bare essentials' },
  { id: 'basic', label: '+8%',  desc: 'Handles & lighting' },
  { id: 'full',  label: '+18%', desc: 'Complete hardware' },
];

const MAT_SWATCHES = {
  laminate:  '#A0785A',
  acrylic:   '#C8DCE8',
  pu_finish: '#E8D9B0',
  veneer:    '#5C3D2E',
};

const PKG_IMAGES = {
  full_home: [
    'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    'https://images.unsplash.com/photo-1556909190-8f8c10c2a9a5?w=800&q=80',
  ],
  wardrobe: [
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  ],
};

const PKG_THEMES = {
  essential: { accent: '#64748b', ringColor: '#94a3b8', badgeBg: 'rgba(255,255,255,0.2)', badgeText: '#fff' },
  comfort:   { accent: '#E8733A', ringColor: '#E8733A', badgeBg: '#E8733A',               badgeText: '#fff' },
  luxury:    { accent: '#f59e0b', ringColor: '#f59e0b', badgeBg: '#f59e0b',               badgeText: '#fff' },
};

const HERO_STATS = [
  { value: '1L+',  label: 'Homes Designed' },
  { value: '4.9★', label: 'Customer Rating' },
  { value: '45',   label: 'Day Delivery' },
  { value: '₹0',   label: 'Consultation Fee' },
];

const TRUST_BADGES = [
  { icon: FaShieldAlt, title: '5-Year Warranty',  body: 'All modular products' },
  { icon: FaMedal,     title: '45-Day Delivery',   body: 'Move in on schedule'  },
  { icon: MdVerified,  title: 'ISO Certified',     body: 'Multi-stage QC'       },
  { icon: FaStar,      title: '4.9★ Rating',       body: '1 lakh+ happy homes'  },
];

// ── useCountUp ────────────────────────────────────────────────────────────────

function useCountUp(target, duration = 750) {
  const [value, setValue] = useState(0);
  const prevRef = useRef(0);
  const rafRef  = useRef(null);

  useEffect(() => {
    if (!target) { setValue(0); prevRef.current = 0; return; }
    const from  = prevRef.current;
    const to    = target;
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);
    function tick(now) {
      const t     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else prevRef.current = to;
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

// ── PriceDisplay ──────────────────────────────────────────────────────────────

function PriceDisplay({ total, range, isReady }) {
  const animated  = useCountUp(isReady ? total : 0);
  const flashKey  = useRef(0);
  const prevTotal = useRef(total);
  if (total !== prevTotal.current) { flashKey.current++; prevTotal.current = total; }

  if (!isReady) {
    return (
      <div className="space-y-2">
        <div className="h-9 w-32 rounded-lg bg-white/15 animate-pulse" />
        <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
      </div>
    );
  }

  return (
    <div key={flashKey.current} className="price-flash">
      <p className="text-3xl sm:text-4xl font-black text-white leading-none drop-shadow-lg">
        ₹{formatINR(animated)}
      </p>
      <p className="text-white/55 text-xs mt-1.5 font-medium">{range}</p>
    </div>
  );
}

// ── PackageCard ───────────────────────────────────────────────────────────────

function PackageCard({ pkg, index, calcType, isReady, isSelected, onQuote }) {
  const isPopular      = pkg.key === 'comfort';
  const img            = PKG_IMAGES[calcType]?.[index] ?? PKG_IMAGES.full_home[index];
  const theme          = PKG_THEMES[pkg.key];
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-3xl overflow-hidden group transition-all duration-300"
      style={{
        boxShadow: isPopular
          ? `0 20px 60px rgba(0,0,0,0.18), 0 0 0 2px ${theme.ringColor}`
          : '0 4px 24px rgba(0,0,0,0.08)',
        transform: isPopular ? 'scale(1.035)' : 'scale(1)',
        zIndex: isPopular ? 1 : 0,
        outline: isSelected ? `2px solid ${theme.ringColor}` : 'none',
      }}
    >
      {/* Full-bleed image zone */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '240px' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={`${calcType}-${index}`}
            src={img}
            alt={pkg.label}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />

        {/* Most Popular badge */}
        {isPopular && (
          <div
            className="absolute top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap"
            style={{ background: '#E8733A', boxShadow: '0 4px 16px rgba(232,115,58,0.5)' }}
          >
            <FaStar className="w-2.5 h-2.5" /> Most Popular
          </div>
        )}

        {/* Package label */}
        <div
          className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm"
          style={{ background: theme.badgeBg, color: theme.badgeText, border: '1px solid rgba(255,255,255,0.25)' }}
        >
          {pkg.label}
        </div>

        {/* Price — pinned to image bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white/60 text-xs font-medium mb-2">{pkg.tagline}</p>
          <PriceDisplay total={pkg.total} range={pkg.range} isReady={isReady} />
        </div>
      </div>

      {/* White card body */}
      <div className="flex flex-col flex-1 bg-white p-5">

        {/* Features */}
        <ul className="space-y-2.5 flex-1">
          {pkg.features.map((f, fi) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + fi * 0.07 }}
              className="flex items-center gap-2.5 text-sm text-gray-600"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${theme.accent}18`, border: `1px solid ${theme.accent}35` }}
              >
                <HiCheck className="w-3 h-3" style={{ color: theme.accent }} />
              </span>
              {f}
            </motion.li>
          ))}
        </ul>

        {/* Breakdown toggle */}
        {isReady && (
          <>
            <button
              onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-navy transition-colors mt-4 mb-1.5 font-medium"
            >
              <HiOutlineChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
              {expanded ? 'Hide' : 'View'} price breakdown
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-1.5 mb-3 border border-gray-100">
                    {[
                      { label: 'Base estimate',   val: `₹${formatINR(Math.round(pkg.perUnit * pkg.qty))}` },
                      { label: 'City adjustment', val: 'included' },
                      { label: 'Material finish', val: 'included' },
                      { label: 'Accessories',     val: 'included' },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between text-gray-500">
                        <span>{label}</span>
                        <span className="font-semibold text-navy">{val}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-navy text-sm">
                      <span>Total estimate</span>
                      <span>₹{formatINR(pkg.total)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* CTA button */}
        <button
          onClick={() => onQuote(pkg.key)}
          disabled={!isReady}
          className="w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-2 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
          style={isPopular ? {
            background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)',
            color: '#fff',
            boxShadow: isReady ? '0 8px 24px rgba(232,115,58,0.35)' : 'none',
          } : {
            background: 'transparent',
            color: '#4052A0',
            border: '2px solid rgba(64,82,160,0.25)',
          }}
          onMouseEnter={e => {
            if (!isPopular) {
              e.currentTarget.style.background = '#4052A0';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '2px solid #4052A0';
            }
          }}
          onMouseLeave={e => {
            if (!isPopular) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#4052A0';
              e.currentTarget.style.border = '2px solid rgba(64,82,160,0.25)';
            }
          }}
        >
          {isReady
            ? <><span>Book a Designer Call</span> <FaArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" /></>
            : 'Fill details to unlock'}
        </button>
      </div>
    </motion.div>
  );
}

// ── LeadPanel ─────────────────────────────────────────────────────────────────

function LeadPanel({ selectedPkg, packages, calcType, formData, onClose }) {
  const [lead, setLead]             = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }, []);

  function validate() {
    const e = {};
    if (!lead.name.trim())                           e.name  = 'Name is required';
    if (!/^\d{10}$/.test(lead.phone.trim()))         e.phone = 'Enter a valid 10-digit number';
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) e.email = 'Invalid email';
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    const chosen = packages.find(p => p.key === selectedPkg);
    try {
      await api.submitLead({
        name: lead.name, phone: lead.phone, email: lead.email,
        city: formData.city, calculator_type: calcType,
        package_selected: selectedPkg, estimated_amount: chosen?.total ?? 0,
      });
    } catch { /* mock */ }
    setSubmitting(false);
    setDone(true);
  }

  const chosen = packages.find(p => p.key === selectedPkg);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
      className="mt-8 rounded-3xl overflow-hidden border border-navy/10"
      style={{ boxShadow: '0 24px 64px rgba(27,42,74,0.18)' }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden px-6 sm:px-8 py-6"
        style={{ background: 'linear-gradient(135deg, #162044 0%, #2F3D7A 55%, #4052A0 100%)' }}
      >
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-6 left-10 w-28 h-28 rounded-full pointer-events-none" style={{ background: 'rgba(232,115,58,0.12)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)' }}
        />

        <div className="relative flex items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(232,115,58,0.2)', border: '1px solid rgba(232,115,58,0.4)' }}>
                <HiOutlineSparkles className="w-3.5 h-3.5 text-gold" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Get Your Exact Quote</span>
            </div>
            <p className="text-white font-bold text-xl font-[family-name:var(--font-display)]">Speak with a Designer</p>
            <p className="text-white/55 text-sm mt-1">We'll call you within 2 hours · No commitment needed</p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            {chosen && (
              <div className="text-right hidden sm:block">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${chosen.badgeColor}`}>{chosen.label}</span>
                <p className="text-gold font-black text-xl mt-1">₹{formatINR(chosen.total)}</p>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.12)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            >
              <HiX className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="bg-white px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.25, 1] }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 32px rgba(34,197,94,0.4)' }}
              >
                <HiCheck className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-navy font-[family-name:var(--font-display)]">We&apos;re on it!</h3>
              <p className="text-gray-500 text-sm mt-2 mb-6">
                Our designer will call you within 2 hours<br />to discuss your {chosen?.label} package.
              </p>
              <div
                className="inline-flex items-center gap-4 rounded-2xl px-6 py-4"
                style={{ background: 'rgba(232,115,58,0.07)', border: '1px dashed #E8733A' }}
              >
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Your estimated budget</p>
                  <p className="text-2xl font-black" style={{ color: '#E8733A' }}>
                    ₹{chosen ? formatINR(chosen.total) : '—'}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={onClose} className="text-sm text-gray-400 hover:text-navy transition-colors">
                  ← Modify my estimate
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-3 gap-4 mb-5">
                {[
                  { key: 'name',  label: 'Full Name *',     type: 'text',  placeholder: 'Your full name' },
                  { key: 'phone', label: 'Mobile Number *', type: 'tel',   placeholder: '10-digit number', maxLength: 10 },
                  { key: 'email', label: 'Email (optional)', type: 'email', placeholder: 'you@example.com' },
                ].map(({ key, label, type, placeholder, maxLength }) => (
                  <div key={key}>
                    <label className="block text-[10px] font-bold text-navy/60 uppercase tracking-widest mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={lead[key]}
                      maxLength={maxLength}
                      onChange={e => {
                        setLead(l => ({ ...l, [key]: e.target.value }));
                        setErrors(err => ({ ...err, [key]: '' }));
                      }}
                      placeholder={placeholder}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${
                        errors[key]
                          ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10'
                      }`}
                    />
                    {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-gray-400">By submitting, you agree to be contacted by our design team. We never spam.</p>
                <button
                  onClick={submit}
                  disabled={submitting}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)', boxShadow: '0 8px 24px rgba(232,115,58,0.3)' }}
                >
                  {submitting
                    ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…</>
                    : <>Confirm & Get Quote <FaArrowRight className="w-3.5 h-3.5" /></>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function EstimatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [calcType, setCalcType]         = useState(searchParams.get('type') ?? 'full_home');
  const [form, setForm]                 = useState({
    city: '', area: '1200', bhk: '', length: '10', width: '6',
    material: 'laminate', accessories: 'none',
  });
  const [selectedPkg, setSelectedPkg]   = useState(null);
  const [showLead, setShowLead]         = useState(false);

  const changeCalcType = useCallback((type) => {
    setCalcType(type);
    setSearchParams({ type }, { replace: true });
  }, [setSearchParams]);

  const typeInfo   = ROOM_TYPES.find(t => t.id === calcType);
  const qty        = Number(form[typeInfo.field]) || 0;
  const isReady    = !!form.city && qty >= typeInfo.min;
  const qtyVal     = Number(form[typeInfo.field]) || typeInfo.defaultVal;
  const sliderPct  = ((qtyVal - typeInfo.min) / (typeInfo.max - typeInfo.min)) * 100;
  const sliderBg   = `linear-gradient(to right, #4052A0 ${sliderPct}%, #E5E7EB ${sliderPct}%)`;

  const filledCount = [form.city, form[typeInfo.field], form.material, form.accessories].filter(Boolean).length;

  const packages = useMemo(
    () => isReady ? calculatePackages(calcType, form) : PACKAGES,
    [isReady, calcType, form],
  );

  useEffect(() => { setShowLead(false); setSelectedPkg(null); }, [calcType]);

  const setField = useCallback((key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setShowLead(false);
  }, []);

  function handleQuote(pkgKey) {
    setSelectedPkg(pkgKey);
    setShowLead(true);
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden text-white" style={{ minHeight: '400px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80')` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(22,32,68,0.96) 0%, rgba(47,61,122,0.90) 50%, rgba(64,82,160,0.78) 100%)' }}
        />

        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-8 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.22) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(85,104,181,0.28) 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-24">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-white/40 text-xs mb-8"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <HiChevronRight className="w-3 h-3" />
            <span className="text-white/70">Interior Cost Estimator</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="max-w-2xl"
            >
              <div
                className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <HiOutlineSparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-semibold text-white/90">Free Instant Estimate · No Sign-up Required</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight mb-5">
                Know the Cost of Your{' '}
                <span className="relative inline-block">
                  <span className="gold-gradient-text">Dream Interior</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: '#E8733A' }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  />
                </span>
              </h1>

              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
                Get real-time cost estimates tailored to your city, size, and preferred materials.
                Configure below and instantly see three package options.
              </p>

              {/* Steps */}
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { n: '1', text: 'Choose space type' },
                  { n: '2', text: 'Configure details' },
                  { n: '3', text: 'Get instant estimate' },
                ].map(({ n, text }, i) => (
                  <div key={n} className="flex items-center gap-2.5">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-gold flex-shrink-0"
                      style={{ background: 'rgba(232,115,58,0.15)', border: '1px solid rgba(232,115,58,0.4)' }}
                    >{n}</span>
                    <span className="text-sm text-white/70 font-medium">{text}</span>
                    {i < 2 && <div className="hidden sm:block w-6 h-px bg-white/20" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-2 gap-3 lg:w-56 flex-shrink-0"
            >
              {HERO_STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 text-center backdrop-blur-sm border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-2xl font-black text-gold leading-none">{value}</p>
                  <p className="text-[11px] text-white/55 mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main Content (overlaps hero) ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 pb-20 relative z-10">

        {/* ── Room Type Selector ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 mb-6"
        >
          {ROOM_TYPES.map((type, i) => {
            const isSelected = calcType === type.id;
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                onClick={() => changeCalcType(type.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer"
                style={{
                  aspectRatio: '4/3',
                  outline: 'none',
                  border: isSelected ? '2.5px solid #E8733A' : '2.5px solid transparent',
                  boxShadow: isSelected ? '0 0 0 4px rgba(232,115,58,0.2), 0 12px 32px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                }}
              >
                <img
                  src={type.image}
                  alt={type.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: isSelected ? 'scale(1.08)' : 'scale(1)' }}
                />
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(to top, rgba(27,42,74,0.92) 0%, rgba(27,42,74,0.35) 60%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)',
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base leading-tight">{type.label}</p>
                      <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 hidden sm:block">{type.desc}</p>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isSelected ? '#E8733A' : 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      {isSelected
                        ? <HiCheck className="w-4 h-4 text-white" />
                        : <Icon className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Config + Results ───────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

          {/* Config panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="w-full lg:w-[310px] flex-shrink-0 lg:sticky lg:top-6"
          >
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

              {/* Panel header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(232,115,58,0.1)' }}
                  >
                    <HiOutlineSparkles className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm font-bold text-navy">Configure Estimate</span>
                </div>
                {/* Animated progress pills */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      animate={{ width: i < filledCount ? '16px' : '6px' }}
                      className="h-1.5 rounded-full"
                      style={{ background: i < filledCount ? '#E8733A' : '#E5E7EB', transition: 'width 0.3s ease, background 0.3s ease' }}
                    />
                  ))}
                </div>
              </div>

              <div className="p-5 space-y-6">

                {/* City */}
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">01 — Your City</p>
                  <div className="relative">
                    <MdLocationOn className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={form.city}
                      onChange={e => setField('city', e.target.value)}
                      className={`w-full border-2 rounded-2xl pl-10 pr-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/15 transition-all appearance-none ${
                        form.city ? 'border-navy text-navy font-semibold' : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      <option value="">Select your city</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* BHK */}
                <AnimatePresence>
                  {calcType === 'full_home' && (
                    <motion.div
                      key="bhk"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">BHK Configuration</p>
                      <div className="grid grid-cols-5 gap-1.5">
                        {BHK_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            onClick={() => setField('bhk', opt)}
                            className={`py-2 rounded-xl border-2 text-xs font-bold transition-all duration-200 ${
                              form.bhk === opt
                                ? 'border-gold bg-gold text-white shadow-sm'
                                : 'border-gray-200 text-gray-500 hover:border-gold/50 hover:text-gold'
                            }`}
                          >
                            {opt.replace(' BHK', '')}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Size slider */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={calcType}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                      {calcType === 'full_home' ? '02 — Carpet Area' : calcType === 'kitchen' ? '02 — Kitchen Length' : '02 — Wardrobe Width'}
                    </p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <motion.span
                        key={qtyVal}
                        initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-5xl font-black text-navy tabular-nums leading-none"
                      >{qtyVal}</motion.span>
                      <span className="text-sm text-gray-400 font-medium">{typeInfo.unit}</span>
                    </div>
                    <input
                      type="range"
                      min={typeInfo.min} max={typeInfo.max} step={typeInfo.step} value={qtyVal}
                      onChange={e => setField(typeInfo.field, e.target.value)}
                      className="estimator-slider"
                      style={{ background: sliderBg }}
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 mb-3">
                      <span>{typeInfo.min}</span>
                      <span>{typeInfo.max} {typeInfo.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={form[typeInfo.field]}
                        onChange={e => setField(typeInfo.field, e.target.value)}
                        min={typeInfo.min} max={typeInfo.max}
                        placeholder="Or type here"
                        className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy text-center transition-all"
                      />
                      <span className="text-xs text-gray-400 flex-shrink-0">{typeInfo.unit}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Material */}
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">03 — Finish Material</p>
                  <div className="space-y-2">
                    {Object.entries(MAT_MULT).map(([key, { label, mult, desc }]) => (
                      <button
                        key={key}
                        onClick={() => setField('material', key)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border-2 text-left transition-all duration-200 ${
                          form.material === key ? 'border-navy bg-navy/5' : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-lg flex-shrink-0 border border-black/10 shadow-sm"
                          style={{ background: MAT_SWATCHES[key] }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold leading-none ${form.material === key ? 'text-navy' : 'text-gray-700'}`}>{label}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-400 flex-shrink-0">{mult === 1 ? 'Base' : `×${mult.toFixed(2)}`}</span>
                        {form.material === key && (
                          <div className="w-5 h-5 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                            <HiCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">Accessories & Hardware</p>
                  <div className="grid grid-cols-3 gap-2">
                    {ACC_OPTIONS.map(({ id, label, desc }) => (
                      <button
                        key={id}
                        onClick={() => setField('accessories', id)}
                        className={`flex flex-col items-center py-3 px-2 rounded-2xl border-2 text-center transition-all duration-200 ${
                          form.accessories === id
                            ? 'border-navy bg-navy text-white shadow-md'
                            : 'border-gray-200 text-gray-500 hover:border-navy/40 hover:text-navy'
                        }`}
                      >
                        <span className="text-sm font-black">{label}</span>
                        <span className="text-[10px] mt-0.5 leading-tight opacity-75">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ready indicator */}
                <AnimatePresence>
                  {isReady && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 rounded-2xl px-4 py-3 border border-green-200"
                      style={{ background: 'rgba(34,197,94,0.06)' }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                        className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
                      />
                      <p className="text-xs text-green-700 font-semibold">Live estimates updated below →</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Results panel */}
          <div className="flex-1 min-w-0">

            {/* Summary bar */}
            <motion.div layout className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="flex items-center gap-2.5 bg-white rounded-2xl border border-gray-200 px-4 py-2.5 shadow-sm">
                <motion.div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${isReady ? 'bg-green-500' : 'bg-amber-400'}`}
                  animate={isReady ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-sm text-gray-700 font-medium">
                  {ROOM_TYPES.find(t => t.id === calcType)?.label}
                  {form.city ? ` · ${form.city}` : ''}
                  {form.bhk  ? ` · ${form.bhk}`  : ''}
                  {qty >= typeInfo.min ? ` · ${qty} ${typeInfo.unit}` : ''}
                </span>
              </div>
              {isReady ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 px-3 py-2 rounded-2xl border border-green-200">
                  <HiCheck className="w-3 h-3" /> Estimates live
                </span>
              ) : (
                <span className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-2xl border border-amber-200">
                  Select city & size to unlock estimates
                </span>
              )}
            </motion.div>

            {/* Package cards */}
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {packages.map((pkg, i) => (
                <PackageCard
                  key={pkg.key}
                  pkg={pkg}
                  index={i}
                  calcType={calcType}
                  isReady={isReady}
                  isSelected={selectedPkg === pkg.key}
                  onQuote={handleQuote}
                />
              ))}
            </div>

            <p className="mt-4 text-[11px] text-gray-400 italic">
              * Estimates are indicative and may vary ±5% based on site conditions and design complexity.
              A confirmed quote is provided after a free site visit.
            </p>

            {/* Lead form */}
            <AnimatePresence>
              {showLead && (
                <LeadPanel
                  key="lead"
                  selectedPkg={selectedPkg}
                  packages={packages}
                  calcType={calcType}
                  formData={form}
                  onClose={() => { setShowLead(false); setSelectedPkg(null); }}
                />
              )}
            </AnimatePresence>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRUST_BADGES.map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                  className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm transition-shadow duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(64,82,160,0.07)' }}
                  >
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy">{title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating sticky bar ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isReady && !showLead && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none"
          >
            <div
              className="max-w-3xl mx-auto rounded-2xl pointer-events-auto border border-white/15 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #162044 0%, #2F3D7A 55%, #4052A0 100%)',
                boxShadow: '0 -4px 0 rgba(232,115,58,0.5), 0 8px 40px rgba(22,32,68,0.5)',
              }}
            >
              <div className="px-5 py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Estimated budget range</p>
                  <p className="text-white/80 text-xs mt-0.5 truncate">
                    {form.city} · {qty} {typeInfo.unit} · {MAT_MULT[form.material]?.label}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-gold font-black text-xl leading-none">
                    ₹{formatINR(packages[0]?.total ?? 0)} – ₹{formatINR(packages[2]?.total ?? 0)}
                  </p>
                  <p className="text-white/35 text-[10px] mt-0.5">across 3 packages</p>
                </div>
                <Link
                  to="/#consultation"
                  className="flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 flex-shrink-0 hover:-translate-y-0.5"
                  style={{ background: '#E8733A', boxShadow: '0 4px 16px rgba(232,115,58,0.45)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F0884E'}
                  onMouseLeave={e => e.currentTarget.style.background = '#E8733A'}
                >
                  Book Free Call <FaArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
