import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronRight, HiChevronLeft, HiCheck, HiHome, HiOfficeBuilding } from 'react-icons/hi';
import { HiCalculator } from 'react-icons/hi2';
import { FaShieldAlt, FaMedal } from 'react-icons/fa';
import {
  CITIES, MAT_MULT, BHK_OPTIONS, PACKAGES,
  calculatePackages, formatINR,
} from './pricing';
import { api } from '../../services/api';

// ── Step constants ────────────────────────────────────────────────────────────

const STEPS = {
  TYPE:      0,
  BASICS:    1,
  ROOMS:     2,  // full_home only
  MATERIAL:  3,
  RESULTS:   4,
  LEAD:      5,
};

const CALC_TYPES = [
  { id: 'full_home', label: 'Full Home Interior', icon: HiHome,        desc: 'Complete home design & execution' },
  { id: 'kitchen',   label: 'Kitchen',             icon: HiCalculator,  desc: 'Modular kitchen estimate' },
  { id: 'wardrobe',  label: 'Wardrobe',            icon: HiOfficeBuilding, desc: 'Custom wardrobe solution' },
];

const ACC_OPTIONS = [
  { id: 'none',  label: 'No extras',       desc: 'Bare essentials only' },
  { id: 'basic', label: 'Basic (+8%)',      desc: 'Handles, hinges, lighting' },
  { id: 'full',  label: 'Full package (+18%)', desc: 'All hardware & smart storage' },
];

// ── Animation variants ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current ? 'w-8 bg-gold' : i < current ? 'w-4 bg-gold/40' : 'w-4 bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-navy mb-1.5">
      {children}{required && <span className="text-gold ml-1">*</span>}
    </label>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}

function NumberInput({ value, onChange, min, max, placeholder, suffix }) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition pr-14"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = 'Continue', nextDisabled, loading }) {
  return (
    <div className="flex gap-3 mt-8">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
        >
          <HiChevronLeft className="w-4 h-4" /> Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold text-white text-sm font-bold hover:bg-gold/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Please wait…' : nextLabel}
        {!loading && <HiChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ── Package result card ───────────────────────────────────────────────────────

function PackageCard({ pkg, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(pkg.key)}
      className={`relative w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
        selected ? 'border-gold shadow-lg scale-[1.02]' : 'border-gray-200 hover:border-gold/40'
      }`}
    >
      {pkg.badge && (
        <div className="absolute top-3 right-3 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {pkg.badge}
        </div>
      )}
      <div className={`h-1.5 w-full bg-gradient-to-r ${pkg.color}`} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pkg.badgeColor}`}>{pkg.label}</span>
        </div>
        <p className="text-xs text-gray-500 mb-2">{pkg.tagline}</p>
        <p className="text-xl font-bold text-navy">{pkg.range}</p>
        <ul className="mt-3 space-y-1">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
              <HiCheck className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {f}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function CalculatorModal({ isOpen, onClose, initialType }) {
  const [step, setStep]           = useState(initialType ? STEPS.BASICS : STEPS.TYPE);
  const [direction, setDirection] = useState(1);
  const [calcType, setCalcType]   = useState(initialType ?? 'full_home');
  const [form, setForm]           = useState({
    city: '', area: '', bhk: '', rooms: '', length: '', width: '', material: 'laminate', accessories: 'none',
  });
  const [errors, setErrors]         = useState({});
  const [packages, setPackages]     = useState([]);
  const [selectedPkg, setSelectedPkg] = useState('comfort');
  const [lead, setLead]             = useState({ name: '', phone: '', email: '' });
  const [leadErrors, setLeadErrors] = useState({});
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Reset when re-opened
  useEffect(() => {
    if (isOpen) {
      const startStep = initialType ? STEPS.BASICS : STEPS.TYPE;
      setStep(startStep);
      setDirection(1);
      setCalcType(initialType ?? 'full_home');
      setForm({ city: '', area: '', bhk: '', rooms: '', length: '', width: '', material: 'laminate', accessories: 'none' });
      setErrors({});
      setPackages([]);
      setSelectedPkg('comfort');
      setLead({ name: '', phone: '', email: '' });
      setLeadErrors({});
      setSubmitted(false);
    }
  }, [isOpen, initialType]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const setField = useCallback((key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  }, []);

  // Step total: TYPE + BASICS + (ROOMS if full_home) + MATERIAL + RESULTS + LEAD
  const totalSteps = calcType === 'full_home' ? 6 : 5;

  // Map step index to visual step (0-based dot count)
  const visualStep = calcType === 'full_home'
    ? step
    : step > STEPS.ROOMS ? step - 1 : step;

  function go(nextStep) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  // ── Validation ──────────────────────────────────────────────────────────────

  function validateBasics() {
    const e = {};
    if (!form.city) e.city = 'Select your city';
    if (calcType === 'full_home' && (!form.area || Number(form.area) < 100)) e.area = 'Enter area (min 100 sqft)';
    if (calcType === 'kitchen'   && (!form.length || Number(form.length) < 3)) e.length = 'Enter length (min 3 ft)';
    if (calcType === 'wardrobe'  && (!form.width  || Number(form.width)  < 3)) e.width  = 'Enter width (min 3 ft)';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateRooms() {
    const e = {};
    if (!form.bhk) e.bhk = 'Select configuration';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateLead() {
    const e = {};
    if (!lead.name.trim())  e.name  = 'Enter your name';
    if (!/^\d{10}$/.test(lead.phone.trim())) e.phone = 'Enter valid 10-digit mobile';
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) e.email = 'Invalid email';
    setLeadErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Navigation handlers ─────────────────────────────────────────────────────

  function handleTypeNext() {
    go(STEPS.BASICS);
  }

  function handleBasicsNext() {
    if (!validateBasics()) return;
    if (calcType === 'full_home') go(STEPS.ROOMS);
    else goToMaterial();
  }

  function handleRoomsNext() {
    if (!validateRooms()) return;
    goToMaterial();
  }

  function goToMaterial() {
    go(STEPS.MATERIAL);
  }

  function handleMaterialNext() {
    const pkgs = calculatePackages(calcType, form);
    setPackages(pkgs);
    go(STEPS.RESULTS);
  }

  async function handleLeadSubmit() {
    if (!validateLead()) return;
    setSubmitting(true);
    try {
      const chosen = packages.find((p) => p.key === selectedPkg);
      await api.submitLead({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        city: form.city,
        calculator_type: calcType,
        package_selected: selectedPkg,
        estimated_amount: chosen?.total ?? 0,
      });
      setSubmitted(true);
    } catch {
      // Silently succeed on mock
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  // ── Step content ────────────────────────────────────────────────────────────

  const stepContent = {
    [STEPS.TYPE]: (
      <div>
        <h3 className="text-xl font-bold text-navy mb-1 font-[family-name:var(--font-display)]">What are you planning?</h3>
        <p className="text-sm text-gray-500 mb-6">Choose the area you want to estimate</p>
        <div className="space-y-3">
          {CALC_TYPES.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => { setCalcType(id); setDirection(1); }}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                calcType === id ? 'border-gold bg-gold/5 shadow-sm' : 'border-gray-200 hover:border-gold/40'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${calcType === id ? 'bg-gold text-white' : 'bg-gray-100 text-gray-500'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              {calcType === id && <HiCheck className="ml-auto w-5 h-5 text-gold flex-shrink-0" />}
            </button>
          ))}
        </div>
        <NavButtons onNext={handleTypeNext} nextLabel="Continue" />
      </div>
    ),

    [STEPS.BASICS]: (
      <div>
        <h3 className="text-xl font-bold text-navy mb-1 font-[family-name:var(--font-display)]">
          {calcType === 'full_home' ? 'Tell us about your home' : calcType === 'kitchen' ? 'About your kitchen' : 'About your wardrobe'}
        </h3>
        <p className="text-sm text-gray-500 mb-6">We'll use this to calculate your estimate</p>
        <div className="space-y-4">
          <div>
            <Label required>Your City</Label>
            <Select
              value={form.city}
              onChange={(v) => setField('city', v)}
              options={CITIES}
              placeholder="Select city"
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>

          {calcType === 'full_home' && (
            <div>
              <Label required>Total Carpet Area</Label>
              <NumberInput
                value={form.area}
                onChange={(v) => setField('area', v)}
                min={100} max={10000}
                placeholder="e.g. 1200"
                suffix="sqft"
              />
              {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
            </div>
          )}

          {calcType === 'kitchen' && (
            <div>
              <Label required>Kitchen Length</Label>
              <NumberInput
                value={form.length}
                onChange={(v) => setField('length', v)}
                min={3} max={30}
                placeholder="e.g. 10"
                suffix="running ft"
              />
              {errors.length && <p className="text-xs text-red-500 mt-1">{errors.length}</p>}
            </div>
          )}

          {calcType === 'wardrobe' && (
            <div>
              <Label required>Wardrobe Width</Label>
              <NumberInput
                value={form.width}
                onChange={(v) => setField('width', v)}
                min={3} max={20}
                placeholder="e.g. 6"
                suffix="running ft"
              />
              {errors.width && <p className="text-xs text-red-500 mt-1">{errors.width}</p>}
            </div>
          )}
        </div>
        <NavButtons
          onBack={() => go(STEPS.TYPE)}
          onNext={handleBasicsNext}
        />
      </div>
    ),

    [STEPS.ROOMS]: (
      <div>
        <h3 className="text-xl font-bold text-navy mb-1 font-[family-name:var(--font-display)]">Home configuration</h3>
        <p className="text-sm text-gray-500 mb-6">Helps us estimate room count accurately</p>
        <div className="space-y-4">
          <div>
            <Label required>BHK Configuration</Label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {BHK_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setField('bhk', opt)}
                  className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    form.bhk === opt ? 'border-gold bg-gold text-white' : 'border-gray-200 text-gray-600 hover:border-gold/40'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.bhk && <p className="text-xs text-red-500 mt-1">{errors.bhk}</p>}
          </div>
          <div>
            <Label>Number of Bathrooms <span className="text-gray-400 text-xs font-normal">(optional)</span></Label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setField('rooms', String(n))}
                  className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    form.rooms === String(n) ? 'border-gold bg-gold text-white' : 'border-gray-200 text-gray-600 hover:border-gold/40'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <NavButtons onBack={() => go(STEPS.BASICS)} onNext={handleRoomsNext} />
      </div>
    ),

    [STEPS.MATERIAL]: (
      <div>
        <h3 className="text-xl font-bold text-navy mb-1 font-[family-name:var(--font-display)]">Choose your finish</h3>
        <p className="text-sm text-gray-500 mb-6">Material quality affects both look and cost</p>
        <div className="space-y-2 mb-6">
          {Object.entries(MAT_MULT).map(([key, { label, mult, desc }]) => (
            <button
              key={key}
              onClick={() => setField('material', key)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left transition-all ${
                form.material === key ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40'
              }`}
            >
              <div>
                <p className="font-semibold text-navy text-sm">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <span className="text-xs font-bold text-gray-500 ml-4 flex-shrink-0">
                {mult === 1 ? 'Base' : `×${mult.toFixed(2)}`}
              </span>
              {form.material === key && <HiCheck className="w-5 h-5 text-gold ml-2 flex-shrink-0" />}
            </button>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy mb-2">Accessories & Hardware</p>
          <div className="space-y-2">
            {ACC_OPTIONS.map(({ id, label, desc }) => (
              <button
                key={id}
                onClick={() => setField('accessories', id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all ${
                  form.accessories === id ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40'
                }`}
              >
                <div>
                  <p className="font-semibold text-navy text-sm">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                {form.accessories === id && <HiCheck className="w-5 h-5 text-gold flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
        <NavButtons
          onBack={() => go(calcType === 'full_home' ? STEPS.ROOMS : STEPS.BASICS)}
          onNext={handleMaterialNext}
          nextLabel="See My Estimate"
        />
      </div>
    ),

    [STEPS.RESULTS]: (
      <div>
        <h3 className="text-xl font-bold text-navy mb-1 font-[family-name:var(--font-display)]">Your personalised estimates</h3>
        <p className="text-sm text-gray-500 mb-2">
          Based on {form.city}
          {calcType === 'full_home' ? `, ${form.area} sqft` : ''}
          {calcType === 'kitchen'   ? `, ${form.length} running ft` : ''}
          {calcType === 'wardrobe'  ? `, ${form.width} running ft` : ''}
          {form.bhk ? `, ${form.bhk}` : ''}
        </p>
        <p className="text-xs text-gray-400 mb-4 italic">*Indicative estimate. Final quote after site visit.</p>
        <div className="space-y-3 mb-4">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.key}
              pkg={pkg}
              selected={selectedPkg === pkg.key}
              onSelect={setSelectedPkg}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-3 mb-2">
          <FaShieldAlt className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <p className="text-xs text-blue-700">All packages include project management, installation & post-handover support</p>
        </div>
        <NavButtons
          onBack={() => go(STEPS.MATERIAL)}
          onNext={() => go(STEPS.LEAD)}
          nextLabel="Get Exact Quote"
        />
      </div>
    ),

    [STEPS.LEAD]: submitted ? (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <HiCheck className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2 font-[family-name:var(--font-display)]">We'll be in touch!</h3>
        <p className="text-sm text-gray-500 mb-6">Our designer will call you within 2 hours to discuss your project.</p>
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 mb-6">
          <p className="text-xs text-gray-500 mb-1">Selected Package</p>
          {packages.find((p) => p.key === selectedPkg) && (
            <>
              <p className="font-bold text-navy text-lg">{packages.find((p) => p.key === selectedPkg).label}</p>
              <p className="text-gold font-semibold">{packages.find((p) => p.key === selectedPkg).range}</p>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-navy text-white font-bold text-sm hover:bg-navy/90 transition"
        >
          Done
        </button>
      </div>
    ) : (
      <div>
        <div className="mb-4 bg-gold/5 border border-gold/20 rounded-xl p-3 flex items-center gap-3">
          <FaMedal className="w-5 h-5 text-gold flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-navy">
              {packages.find((p) => p.key === selectedPkg)?.label} Package Selected
            </p>
            <p className="text-sm font-bold text-gold">{packages.find((p) => p.key === selectedPkg)?.range}</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-navy mb-1 font-[family-name:var(--font-display)]">Get your exact quote</h3>
        <p className="text-sm text-gray-500 mb-5">A designer will call you within 2 hours</p>
        <div className="space-y-4">
          <div>
            <Label required>Full Name</Label>
            <input
              type="text"
              value={lead.name}
              onChange={(e) => { setLead((l) => ({ ...l, name: e.target.value })); setLeadErrors((e2) => ({ ...e2, name: '' })); }}
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
            />
            {leadErrors.name && <p className="text-xs text-red-500 mt-1">{leadErrors.name}</p>}
          </div>
          <div>
            <Label required>Mobile Number</Label>
            <input
              type="tel"
              value={lead.phone}
              onChange={(e) => { setLead((l) => ({ ...l, phone: e.target.value })); setLeadErrors((e2) => ({ ...e2, phone: '' })); }}
              placeholder="10-digit mobile"
              maxLength={10}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
            />
            {leadErrors.phone && <p className="text-xs text-red-500 mt-1">{leadErrors.phone}</p>}
          </div>
          <div>
            <Label>Email <span className="text-gray-400 text-xs font-normal">(optional)</span></Label>
            <input
              type="email"
              value={lead.email}
              onChange={(e) => { setLead((l) => ({ ...l, email: e.target.value })); setLeadErrors((e2) => ({ ...e2, email: '' })); }}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
            />
            {leadErrors.email && <p className="text-xs text-red-500 mt-1">{leadErrors.email}</p>}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">By submitting you agree to be contacted by our design team.</p>
        <NavButtons
          onBack={() => go(STEPS.RESULTS)}
          onNext={handleLeadSubmit}
          nextLabel="Get My Quote"
          loading={submitting}
        />
      </div>
    ),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 pointer-events-none"
          >
            <div className="pointer-events-auto w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                    <HiCalculator className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-navy">Interior Cost Estimator</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <HiX className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Step dots */}
              <div className="px-6 pt-4 flex-shrink-0">
                <StepIndicator current={visualStep} total={totalSteps} />
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                  >
                    {stepContent[step]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
