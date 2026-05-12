# FurnoTech — CLAUDE.md

## Project Overview

**FurnoTech** is a production-quality React + Vite frontend for a furniture and interior-design e-commerce platform (modelled after Livspace). It is a multi-page application with 7 routes, a fully mocked API layer that mirrors a Django REST backend, and a polished brand aesthetic (navy + coral orange + off-white).

---

## Tech Stack

| Layer | Library / Version |
|-------|-------------------|
| UI | React 19.2.5 |
| Build tool | Vite 8.0.10 |
| Routing | React Router DOM 7.14.2 |
| Styling | Tailwind CSS 4.2.4 |
| Animations | Framer Motion 12.38.0 |
| Carousel | Swiper 12.1.3 |
| Icons | React Icons 5.6.0 |
| Fonts | Inter + Playfair Display (Google Fonts) |

---

## Dev Commands

```bash
npm run dev       # Start Vite dev server (HMR enabled)
npm run build     # Production build → dist/
npm run lint      # ESLint
npm run preview   # Preview the production build locally
```

No test framework is configured.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```env
VITE_API_URL=http://localhost:8000          # Django backend base URL
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name  # Cloudinary image hosting
VITE_CLOUDINARY_UPLOAD_PRESET=furno_uploads
VITE_USE_MOCK_API=true                      # true = use static mock data
```

To switch to the real backend, set `VITE_USE_MOCK_API=false` and set `VITE_API_URL`.
Internally the toggle is the `USE_MOCK` constant in `src/services/api.js`.

---

## Project Architecture

```
src/
├── main.jsx              # Entry point — mounts <BrowserRouter><App/>
├── App.jsx               # Route definitions (6 routes, all inside <Layout>)
├── index.css             # Tailwind import + CSS custom properties + keyframes
│
├── layouts/
│   └── Layout.jsx        # Navbar + <Outlet> + Footer + scroll-to-top on nav
│
├── pages/                # One file per route
│   ├── Home.jsx          # Assembles 13 homepage sections
│   ├── DesignIdeas.jsx   # Inspiration gallery with search & category filters
│   ├── Projects.jsx      # Completed-project showcase with city filters
│   ├── StoreLocator.jsx  # Experience-centre map + booking CTA
│   ├── About.jsx         # Company story, values, timeline, team, stats
│   ├── Contact.jsx       # Contact form + info cards
│   └── MagazinePage.jsx  # Articles with category tabs
│
├── components/           # Reusable UI components
│   ├── Navbar.jsx        # Responsive navbar with mega-menus & mobile hamburger
│   ├── Footer.jsx        # Multi-column footer with social links
│   ├── Hero.jsx          # Full-width hero slider with lead-capture form
│   ├── Offerings.jsx     # Service cards (Modular / Design / Fit-out)
│   ├── InspirationGallery.jsx
│   ├── WhyChooseUs.jsx   # 7 stat cards
│   ├── PriceCalculators.jsx
│   ├── CustomerReviews.jsx  # Swiper carousel
│   ├── DeliveredHomes.jsx
│   ├── HowItWorks.jsx    # 5-step process with gradient connector
│   ├── Magazine.jsx
│   ├── Awards.jsx
│   ├── FAQ.jsx           # Accordion (Framer Motion)
│   ├── ConsultationCTA.jsx
│   └── ui/
│       └── Skeleton.jsx  # Loading placeholders (HeroSkeleton, CardSkeleton…)
│
├── hooks/
│   └── useApi.js         # Generic data-fetching hook with fallback support
│
├── services/
│   └── api.js            # API layer — 15+ endpoints, mock/real toggle
│
└── data/
    └── siteData.js       # All static mock data (~18 KB)
```

---

## Routing

Routes are defined in [src/App.jsx](src/App.jsx):

| Path | Page component |
|------|----------------|
| `/` | `Home` |
| `/design-ideas` | `DesignIdeas` |
| `/projects` | `Projects` |
| `/stores` | `StoreLocator` |
| `/about` | `About` |
| `/contact` | `Contact` |

All routes are wrapped in `<Layout>` which provides the Navbar and Footer.

---

## Key Patterns

### Data Fetching
Every component that needs remote data calls `useApi()`:
```js
const { data, loading, error } = useApi(api.getHeroSlides, fallbackData);
```
While `USE_MOCK = true`, `api.js` resolves immediately from `siteData.js`.
When connecting to the real backend, flip the flag — no component changes needed.

### Brand Tokens (CSS custom properties in `src/index.css`)
```css
--color-navy        /* #1B2A4A — primary dark */
--color-gold        /* #E8733A — coral orange CTAs & accents */
--color-off-white   /* #F8F5F0 — background tint */
```

### Utility CSS Classes
- `.glass-effect` — frosted-glass card style
- `.gradient-navy` / `.gradient-gold` — directional gradients
- Custom Swiper overrides (pagination dots, nav arrows)

### Animations
- **Framer Motion** — accordion expand/collapse, page transitions, card reveals
- **CSS keyframes** — `float`, `shimmer` (skeleton), `pulse-gold`

### Form Handling
Controlled inputs with `useState`; submitted via `api.submitLead()` or `api.submitContact()`.

### State Management
No global state manager. Components use local `useState` + prop-drilling.

---

## Backend Integration Notes

The project is wired to connect to a **Django REST Framework** backend:
- All API calls go through `src/services/api.js`
- Form endpoints expected: `POST /api/leads/` and `POST /api/contact/`
- Images are hosted on Cloudinary (configured via env vars)
- Switching from mock → real requires only `VITE_USE_MOCK_API=false` + `VITE_API_URL=<backend>`

---

## Changelog Highlights

- **v3 (2026-04-25)** — Dynamic architecture: API service layer, `useApi` hook, loading skeletons, icon migration (emoji → React Icons), micro-interactions
- **v2 (2026-04-24)** — Multi-page routing, 7 pages, navy/coral-orange/off-white palette, responsive design
