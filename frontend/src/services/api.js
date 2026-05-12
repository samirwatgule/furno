/**
 * FurnoTech API Service
 * -----------------
 * Mock API layer that simulates Django REST API calls.
 * When the Django backend is ready, simply update BASE_URL and
 * remove the mock fallback imports.
 *
 * Expected Django endpoints:
 *   GET  /api/hero/           → hero slides
 *   GET  /api/offerings/      → service offerings
 *   GET  /api/inspiration/    → inspiration tabs + images
 *   GET  /api/stats/          → why choose us stats
 *   GET  /api/calculators/    → price calculator cards
 *   GET  /api/reviews/        → customer reviews
 *   GET  /api/delivered-homes/ → delivered home projects
 *   GET  /api/process-steps/  → how it works steps
 *   GET  /api/articles/       → magazine articles
 *   GET  /api/awards/         → awards & recognitions
 *   GET  /api/faqs/           → FAQ items
 *   GET  /api/stores/         → experience centres
 *   GET  /api/cities/         → city list (for forms/footer)
 *   GET  /api/nav/            → navigation links
 *   GET  /api/footer/         → footer content
 *   POST /api/leads/          → consultation form submissions
 *   POST /api/contact/        → contact form submissions
 *
 * Images: Cloudinary URLs stored in database,
 *         returned as full URLs in API responses.
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚙️  CONFIGURATION — Update when Django backend is ready
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '',
  USE_MOCK: import.meta.env.VITE_USE_MOCK_API !== 'false',
  MOCK_DELAY: 0,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔌  API CLIENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function apiGet(endpoint) {
  if (API_CONFIG.USE_MOCK) {
    return mockGet(endpoint);
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers when needed:
      // 'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function apiPost(endpoint, data) {
  if (API_CONFIG.USE_MOCK) {
    return mockPost(endpoint, data);
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📡  PUBLIC API FUNCTIONS (used by components)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const api = {
  // Hero
  getHeroSlides:      () => apiGet('/api/hero/'),

  // Offerings
  getOfferings:       () => apiGet('/api/offerings/'),

  // Inspiration
  getInspirationTabs: () => apiGet('/api/inspiration/'),

  // Stats (Why Choose Us)
  getStats:           () => apiGet('/api/stats/'),

  // Price Calculators
  getCalculators:     () => apiGet('/api/calculators/'),

  // Customer Reviews
  getReviews:         () => apiGet('/api/reviews/'),

  // Delivered Homes
  getDeliveredHomes:  () => apiGet('/api/delivered-homes/'),

  // How It Works
  getProcessSteps:    () => apiGet('/api/process-steps/'),

  // Magazine Articles
  getArticles:        () => apiGet('/api/articles/'),

  // Design Ideas
  getDesigns:         () => apiGet('/api/designs/'),

  // Projects / Portfolio
  getProjects:        () => apiGet('/api/projects/'),

  // Awards
  getAwards:          () => apiGet('/api/awards/'),

  // FAQs
  getFaqs:            () => apiGet('/api/faqs/'),

  // Stores
  getStores:          () => apiGet('/api/stores/'),

  // Cities
  getCities:          () => apiGet('/api/cities/'),

  // Navigation
  getNavLinks:        () => apiGet('/api/nav/'),

  // Footer
  getFooterData:      () => apiGet('/api/footer/'),

  // Form Submissions
  submitLead:         (data) => apiPost('/api/leads/', data),
  submitContact:      (data) => apiPost('/api/contact/', data),
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎭  MOCK DATA (simulates Django API responses)
//     Replace with real API when backend is ready
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import {
  heroSlides,
  offerings,
  inspirationTabs,
  inspirationImages,
  whyChooseUs,
  calculators,
  reviews,
  deliveredHomes,
  howItWorks,
  magazineArticles,
  awards,
  faqs,
  navLinks,
  offeringsNav,
  footerData,
  projects as mockProjects,
  designs as mockDesigns,
} from '../data/siteData';

const MOCK_ENDPOINTS = {
  '/api/hero/':            () => heroSlides,
  '/api/offerings/':       () => offerings,
  '/api/inspiration/':     () => ({ tabs: inspirationTabs, images: inspirationImages }),
  '/api/stats/':           () => whyChooseUs,
  '/api/calculators/':     () => calculators,
  '/api/reviews/':         () => reviews,
  '/api/delivered-homes/': () => deliveredHomes,
  '/api/process-steps/':   () => howItWorks,
  '/api/articles/':        () => magazineArticles,
  '/api/designs/':         () => mockDesigns,
  '/api/projects/':        () => mockProjects,
  '/api/awards/':          () => awards,
  '/api/faqs/':            () => faqs,
  '/api/stores/':          () => MOCK_STORES,
  '/api/cities/':          () => MOCK_CITIES,
  '/api/nav/':             () => ({ navLinks, offeringsNav }),
  '/api/footer/':          () => footerData,
};

function mockGet(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const handler = MOCK_ENDPOINTS[endpoint];
      if (handler) {
        resolve(handler());
      } else {
        reject(new Error(`Mock: No handler for ${endpoint}`));
      }
    }, API_CONFIG.MOCK_DELAY);
  });
}

function mockPost(endpoint, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Mock API] POST ${endpoint}`, data);
      resolve({ success: true, message: 'Submitted successfully', id: Date.now() });
    }, API_CONFIG.MOCK_DELAY);
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏬  MOCK DATA — Stores & Cities
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOCK_STORES = [
  { id: 1, name: 'FurnoTech Experience Centre — Indiranagar', city: 'Bangalore', address: '100 Feet Road, Indiranagar, Bangalore - 560038', phone: '+91 80 4567 8901', hours: 'Mon-Sun: 10 AM - 8 PM', image_url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', latitude: 12.9784, longitude: 77.6408 },
  { id: 2, name: 'FurnoTech Experience Centre — Andheri', city: 'Mumbai', address: 'Infinity IT Park, Andheri East, Mumbai - 400059', phone: '+91 22 4567 8901', hours: 'Mon-Sun: 10 AM - 8 PM', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', latitude: 19.1136, longitude: 72.8697 },
  { id: 3, name: 'FurnoTech Experience Centre — Janakpuri', city: 'Delhi', address: 'A-3, District Centre, Janakpuri, New Delhi - 110058', phone: '+91 11 4567 8901', hours: 'Mon-Sun: 10 AM - 8 PM', image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', latitude: 28.6289, longitude: 77.0864 },
  { id: 4, name: 'FurnoTech Experience Centre — Gachibowli', city: 'Hyderabad', address: 'Biodiversity Junction, Gachibowli, Hyderabad - 500032', phone: '+91 40 4567 8901', hours: 'Mon-Sun: 10 AM - 8 PM', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', latitude: 17.4400, longitude: 78.3489 },
  { id: 5, name: 'FurnoTech Experience Centre — Hinjewadi', city: 'Pune', address: 'Blue Ridge SEZ, Hinjewadi Phase 1, Pune - 411057', phone: '+91 20 4567 8901', hours: 'Mon-Sun: 10 AM - 8 PM', image_url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', latitude: 18.5912, longitude: 73.7381 },
  { id: 6, name: 'FurnoTech Experience Centre — DLF Phase 5', city: 'Gurgaon', address: 'DLF Cyber City, Phase 5, Gurgaon - 122011', phone: '+91 124 4567 8901', hours: 'Mon-Sun: 10 AM - 8 PM', image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80', latitude: 28.4745, longitude: 77.0940 },
];

const MOCK_CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad',
  'Kochi', 'Lucknow', 'Jaipur', 'Chandigarh', 'Coimbatore',
  'Vizag', 'Mysore', 'Mangalore', 'Indore', 'Nagpur',
];

export default api;
