# FurnoTech — Bug & Issue Tracker

> Audited: 2026-05-10 | Status: Pending fixes

---

## Routing & Navigation

1. **Navbar mega menu hardcoded links** — Every link in the desktop and mobile mega menu hardcodes `to="/design-ideas"` regardless of what item is clicked. Clicking "Living Room", "Wardrobe", "Modular Kitchen" etc. all navigate to the same page.

2. **`filteredNavLinks` dead code** — Defined in `Navbar.jsx` as just `navLinks` with no actual filtering applied. Unused rename, should be cleaned up.

3. **Footer "Get an Estimate" button wrong route** — Links to `/contact` but the button text says "Get an Estimate" — should link to `/estimate`.

4. **Hero "Calculate Now" CTA hardcoded** — Navigates to `/estimate?type=kitchen` hardcoded, only contextually correct for slide 2. Other slides use it incorrectly.

---

## Dead `href="#"` Links (go nowhere when clicked)

5. **InspirationGallery image cards** — All 6+ image cards per tab link to `href="#"`. Clicking any image does nothing.

6. **MagazinePage article cards** — Featured article and all article grid cards link to `href="#"`. No article detail route exists.

7. **StoreLocator social media links** — 6 social media links (Facebook, Instagram, Twitter, YouTube, LinkedIn, etc.) in the store section all use `href="#"`.

8. **About page team member LinkedIn buttons** — All 4 team member LinkedIn/social buttons use `href="#"`.

9. **Contact page social media links** — 5 social media icon links (Facebook, Instagram, Twitter, YouTube, LinkedIn) all use `href="#"`.

10. **Footer dead links** — 6 Instagram photo grid links use `href="#"`. "Privacy Policy", "Terms of Service", and "Sitemap" footer links also all use `href="#"`.

11. **Navbar mobile menu Privacy Policy** — "Privacy Policy" link in the mobile menu footer uses `href="#"`.

---

## Design & UX Problems

12. **Design Ideas "Get This Look" wrong destination** — CTA on every design card links to `/#consultation` (home page anchor), which navigates away from the Design Ideas page entirely.

13. **Projects "Get Quote" wrong destination** — Same issue as #12; links to `/#consultation` instead of a dedicated contact/quote flow.

14. **Phone number format inconsistency** — StoreLocator displays `18003090930` in one place and `1800-309-0930` in another. Should be uniform.

15. **MagazinePage no article detail pages** — No route exists for individual articles. Clicking any article card goes nowhere. Needs either article detail pages or a different UX pattern.

16. **About page hero broken link** — Contains a "Privacy Policy" `href="#"` link inside the hero section that goes nowhere.

---

## Code Quality

17. **`console.error` in production — `useApi.js` line 32** — `console.error('[useApi]', err.message)` is left in production code and will log to browser console on every API error.

18. **`console.log` in production — `api.js` line 208** — `console.log('[Mock API] POST ${endpoint}', data)` logs every form submission to the browser console. Should be removed before production.
