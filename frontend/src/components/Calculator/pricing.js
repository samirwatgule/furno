// ── City tier classification ──────────────────────────────────────────────────

export const CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad',
  'Kochi', 'Lucknow', 'Jaipur', 'Chandigarh', 'Coimbatore',
  'Vizag', 'Mysore', 'Mangalore', 'Indore', 'Nagpur',
];

const TIER1_CITIES = new Set(['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Noida', 'Gurugram', 'Pune', 'Ahmedabad']);
const TIER2_CITIES = new Set(['Kochi', 'Lucknow', 'Jaipur', 'Chandigarh', 'Coimbatore', 'Vizag', 'Indore', 'Nagpur']);

function getCityTier(city) {
  if (TIER1_CITIES.has(city)) return 'tier1';
  if (TIER2_CITIES.has(city)) return 'tier2';
  return 'tier3';
}

// ── Multipliers ───────────────────────────────────────────────────────────────

export const LOC_MULT = { tier1: 1.30, tier2: 1.00, tier3: 0.85 };

export const MAT_MULT = {
  laminate:  { label: 'Laminate',  mult: 1.00, desc: 'Durable & budget-friendly' },
  acrylic:   { label: 'Acrylic',   mult: 1.20, desc: 'Glossy & easy to clean' },
  pu_finish: { label: 'PU Finish', mult: 1.40, desc: 'Premium smooth finish' },
  veneer:    { label: 'Veneer',    mult: 1.60, desc: 'Natural wood look' },
};

export const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];

// ── Package metadata ──────────────────────────────────────────────────────────

export const PACKAGES = [
  {
    key: 'essential',
    label: 'Essential',
    tagline: 'Smart & functional',
    color: 'from-slate-500 to-slate-600',
    badgeColor: 'bg-slate-100 text-slate-700',
    features: ['Standard materials', 'Basic accessories', '2-year warranty', 'Designer consultation'],
  },
  {
    key: 'comfort',
    label: 'Comfort',
    tagline: 'Style meets value',
    color: 'from-navy to-blue-700',
    badgeColor: 'bg-blue-50 text-navy',
    badge: 'Most Popular',
    features: ['Premium materials', 'Enhanced accessories', '5-year warranty', 'Dedicated designer'],
  },
  {
    key: 'luxury',
    label: 'Luxury',
    tagline: 'Uncompromised premium',
    color: 'from-amber-500 to-gold',
    badgeColor: 'bg-amber-50 text-amber-700',
    features: ['Luxury materials', 'Full accessories', '10-year warranty', 'Personal designer + PM'],
  },
];

// ── Base rates ────────────────────────────────────────────────────────────────

// Full home: ₹ per sqft
const FULL_HOME_RATES = { essential: 1200, comfort: 1800, luxury: 2800 };

// Kitchen: ₹ per running foot
const KITCHEN_RATES = { essential: 15000, comfort: 20000, luxury: 28000 };

// Wardrobe: ₹ per running foot
const WARDROBE_RATES = { essential: 8000, comfort: 12000, luxury: 18000 };

// Accessory add-ons as a % of base
const ACCESSORY_PCT = { none: 0, basic: 0.08, full: 0.18 };

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculatePackages(calcType, formData) {
  const { city, material, accessories } = formData;
  const locMult = LOC_MULT[getCityTier(city)] ?? 1.00;
  const matMult = MAT_MULT[material]?.mult ?? 1.00;
  const accPct  = ACCESSORY_PCT[accessories] ?? 0;

  let baseRates;
  let unit;
  let qty;

  if (calcType === 'full_home') {
    baseRates = FULL_HOME_RATES;
    unit      = 'sqft';
    qty       = Number(formData.area) || 0;
  } else if (calcType === 'kitchen') {
    baseRates = KITCHEN_RATES;
    unit      = 'running ft';
    qty       = Number(formData.length) || 0;
  } else {
    // wardrobe
    baseRates = WARDROBE_RATES;
    unit      = 'running ft';
    qty       = Number(formData.width) || 0;
  }

  return PACKAGES.map((pkg) => {
    const base  = baseRates[pkg.key] * qty;
    const total = Math.round(base * locMult * matMult * (1 + accPct));
    const low   = Math.round(total * 0.95);
    const high  = Math.round(total * 1.05);
    return {
      ...pkg,
      total,
      range: `₹${formatINR(low)} – ₹${formatINR(high)}`,
      perUnit: baseRates[pkg.key],
      unit,
      qty,
    };
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatINR(n) {
  if (n >= 1_00_00_000) return `${(n / 1_00_00_000).toFixed(1)} Cr`;
  if (n >= 1_00_000)    return `${(n / 1_00_000).toFixed(1)} L`;
  return n.toLocaleString('en-IN');
}
