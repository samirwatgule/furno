import { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { footerData as fallbackFooter } from '../../data/siteData';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowUp, HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi';

const SOCIAL_PHOTOS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80',
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80',
];

const SOCIAL = [
  { Icon: FaFacebookF, label: 'Facebook' },
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaTwitter,   label: 'Twitter' },
  { Icon: FaYoutube,   label: 'YouTube' },
  { Icon: FaLinkedinIn, label: 'LinkedIn' },
];

export default function Footer() {
  const { data: footerContent } = useApi(api.getFooterData, fallbackFooter);
  const [showTop, setShowTop] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const data = footerContent || fallbackFooter;

  return (
    <footer className="relative" style={{ background: '#1a3060', color: '#fff' }}>

      {/* ── Curved top ── */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: -58, lineHeight: 0, height: 60 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="#1a3060" />
        </svg>
      </div>

      {/* ── Main 3-column footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Column 1 — In Short */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              In Short
            </h4>

            <Link to="/" className="inline-flex mb-5">
              <img
                src="/assets/logo.png"
                alt="FurnoTech"
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.50)' }}>
              India&apos;s most trusted interior design platform. We transform houses into
              beautiful homes with premium furniture, expert design, and a 45-day delivery
              guarantee.
            </p>

            <Link
              to="/estimate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: '#E8733A', color: '#fff' }}
            >
              Get a Free Estimate →
            </Link>
          </div>

          {/* Column 2 — Contact */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Contact
            </h4>

            <ul className="space-y-5">
              <li className="flex gap-3">
                <HiLocationMarker
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: '#E8733A' }}
                />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  5th Floor, FurnoTech Towers,<br />
                  MG Road, Bangalore – 560 001,<br />
                  Karnataka, India
                </p>
              </li>

              <li className="flex items-center gap-3">
                <HiPhone className="w-4 h-4 flex-shrink-0" style={{ color: '#E8733A' }} />
                <div className="space-y-1">
                  <a
                    href="tel:18003090930"
                    className="block text-sm transition-colors hover:text-[#E8733A]"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    1800-309-0930 (Toll Free)
                  </a>
                  <a
                    href="tel:+918045678901"
                    className="block text-sm transition-colors hover:text-[#E8733A]"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    +91 80 4567 8901
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <HiMail className="w-4 h-4 flex-shrink-0" style={{ color: '#E8733A' }} />
                <a
                  href="mailto:hello@furnotech.in"
                  className="text-sm transition-colors hover:text-[#E8733A]"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  hello@furnotech.in
                </a>
              </li>
            </ul>

          </div>

          {/* Column 3 — Social */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-widest mb-6"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Social
            </h4>

            {/* 3×2 photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-6">
              {SOCIAL_PHOTOS.map((url, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="View on Instagram"
                  className="aspect-square overflow-hidden rounded-lg block group"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>

            {/* Circular social icons */}
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.60)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E8733A';
                    e.currentTarget.style.borderColor = '#E8733A';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.60)';
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cities Section ── */}
        <div
          className="mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h4
            className="text-[10px] font-bold uppercase tracking-widest mb-5"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Interior designers in our cities
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {data.cities.slice(0, showAllCities ? undefined : 10).map((city) => (
              <Link
                key={city}
                to="/stores"
                className="text-xs transition-colors duration-200 hover:text-[#E8733A]"
                style={{ color: 'rgba(255,255,255,0.38)' }}
              >
                Interior designers in {city}
              </Link>
            ))}
          </div>
          {data.cities.length > 10 && (
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="text-xs mt-3 font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ color: '#E8733A' }}
            >
              {showAllCities ? 'Show less' : `+${data.cities.length - 10} more cities`}
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ background: 'rgba(0,0,0,0.14)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            &copy; {new Date().getFullYear()} FurnoTech. All rights reserved. *T&amp;C Apply
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-[#E8733A]"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Back to Top ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="fixed bottom-6 left-6 w-11 h-11 rounded-full flex items-center justify-center text-white z-50 transition-all duration-300"
        style={{
          background: showTop ? '#E8733A' : 'rgba(27,42,74,0.80)',
          boxShadow: showTop ? '0 0 20px rgba(232,115,58,0.45)' : '0 2px 12px rgba(0,0,0,0.30)',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: showTop ? 'auto' : 'none',
        }}
      >
        <HiArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
