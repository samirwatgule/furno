import { useState, useEffect, useRef } from 'react';
import { navLinks } from '../../data/siteData';
import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineUser,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const filteredNavLinks = navLinks;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMega(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleEnter = (name) => {
    clearTimeout(timeoutRef.current);
    setActiveMega(name);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  const getRoute = (link) => {
    const routes = {
      'Design Ideas': '/design-ideas',
      'Projects': '/projects',
      'Store Locator': '/stores',
    };
    return routes[link.name] || link.href || '#';
  };

  const isActive = (link) => {
    const route = getRoute(link);
    return location.pathname === route;
  };

  return (
    <>
      {/* Main Navbar — always white */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group">
              {logoError ? (
                <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-navy">
                  Furno<span className="text-gold">Tech</span>
                </span>
              ) : (
                <img
                  src="/assets/logo.png"
                  alt="FurnoTech"
                  className="h-10 w-auto"
                  onError={() => setLogoError(true)}
                />
              )}
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 ml-8">
              {filteredNavLinks.map((link) => {
                const route = getRoute(link);
                const active = isActive(link);
                const isOpen = activeMega === link.name;

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.megaMenu ? handleEnter(link.name) : null}
                    onMouseLeave={() => link.megaMenu ? handleLeave() : null}
                  >
                    <Link
                      to={route}
                      className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 rounded-full ${
                        active || isOpen
                          ? 'text-gold'
                          : 'text-gray-700 hover:text-navy'
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.megaMenu && (
                        <HiChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      )}
                      {active && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                      )}
                    </Link>
                  </div>
                );
              })}
              <Link
                to="/about"
                className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-full ${
                  location.pathname === '/about' ? 'text-gold' : 'text-gray-700 hover:text-navy'
                }`}
              >
                About Us
                {location.pathname === '/about' && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
              </Link>
              <Link
                to="/contact"
                className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-full ${
                  location.pathname === '/contact' ? 'text-gold' : 'text-gray-700 hover:text-navy'
                }`}
              >
                Contact
                {location.pathname === '/contact' && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Account"
                className="hidden sm:flex p-2.5 rounded-full text-gray-600 hover:text-navy hover:bg-gray-100 transition-all duration-200"
              >
                <HiOutlineUser className="w-5 h-5" />
              </button>

              <Link
                to="/#consultation"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gold text-white hover:bg-gold-hover shadow-md shadow-gold/20 transition-all duration-200"
              >
                Book Free Consultation
              </Link>

              <button
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className="lg:hidden p-2.5 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200"
                onClick={() => setMobileOpen(true)}
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMega && filteredNavLinks.find((l) => l.name === activeMega)?.megaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute left-0 right-0 bg-white border-t border-gray-100 shadow-2xl shadow-navy/10 z-40"
              onMouseEnter={() => handleEnter(activeMega)}
              onMouseLeave={handleLeave}
            >
              <div className="max-w-7xl mx-auto px-6 py-10">
                {(() => {
                  const menu = filteredNavLinks.find((l) => l.name === activeMega)?.megaMenu;
                  if (!menu) return null;
                  return (
                    <div className="flex gap-10">
                      {menu.featured && (
                        <div className="flex gap-4 pr-10 border-r border-gray-100">
                          {menu.featured.map((f) => (
                            <Link
                              key={f.name}
                              to="/design-ideas"
                              className="group w-44"
                              onClick={() => setActiveMega(null)}
                            >
                              <div className="rounded-2xl overflow-hidden mb-3 aspect-[4/3] shadow-md">
                                <img
                                  src={f.image}
                                  alt={f.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                              <p className="text-xs font-semibold text-gray-700 group-hover:text-navy transition-colors">
                                {f.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                      {menu.columns?.map((col) => (
                        <div key={col.title} className="min-w-[180px]">
                          <h4 className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-4">
                            {col.title}
                          </h4>
                          <ul className="space-y-2">
                            {col.links.map((link) => (
                              <li key={link}>
                                <Link
                                  to="/design-ideas"
                                  className="text-sm text-gray-600 hover:text-navy font-medium flex items-center gap-1.5 group transition-all"
                                  onClick={() => setActiveMega(null)}
                                >
                                  <span className="w-0 group-hover:w-3 h-0.5 bg-gold transition-all duration-200 rounded-full" />
                                  {link}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to push content below the fixed navbar */}
      <div className="h-[73px]" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-white z-50 overflow-y-auto flex flex-col"
            >
              {/* Panel Header */}
              <div
                className="relative px-6 py-8 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #162044 0%, #2F3D7A 60%, #4052A0 100%)' }}
              >
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-gold/10 pointer-events-none" />

                <div className="relative flex items-center justify-between">
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    {logoError ? (
                      <span className="text-xl font-bold text-white font-[family-name:var(--font-display)]">
                        Furno<span className="text-gold">Tech</span>
                      </span>
                    ) : (
                      <img
                        src="/assets/logo.png"
                        alt="FurnoTech"
                        className="h-9 w-auto brightness-0 invert"
                        onError={() => setLogoError(true)}
                      />
                    )}
                  </Link>
                  <button
                    aria-label="Close navigation menu"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <HiOutlineX className="w-5 h-5 text-white" />
                  </button>
                </div>
                <p className="relative mt-4 text-white/60 text-xs">
                  Premium furniture & interior design
                </p>
              </div>

              <div className="px-6 py-4">
                <Link
                  to="/#consultation"
                  className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-hover text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-gold/25"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Free Consultation
                </Link>
              </div>

              <div className="flex-1 px-4 pb-6 space-y-0.5">
                {filteredNavLinks.map((link) => (
                  <div key={link.name} className="rounded-xl overflow-hidden">
                    {link.megaMenu ? (
                      <>
                        <button
                          className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold transition-colors rounded-xl ${
                            mobileExpanded === link.name
                              ? 'bg-gray-50 text-navy'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-navy'
                          }`}
                          onClick={() =>
                            setMobileExpanded(mobileExpanded === link.name ? null : link.name)
                          }
                        >
                          {link.name}
                          <HiChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpanded === link.name ? 'rotate-90 text-gold' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 px-4 space-y-4 bg-gray-50/50 rounded-b-xl">
                                {link.megaMenu.columns?.map((col) => (
                                  <div key={col.title} className="pt-3">
                                    <h5 className="text-[10px] font-bold text-navy/40 uppercase tracking-widest mb-2">
                                      {col.title}
                                    </h5>
                                    <div className="space-y-1">
                                      {col.links.slice(0, 6).map((l) => (
                                        <Link
                                          key={l}
                                          to="/design-ideas"
                                          className="block py-1.5 text-xs text-gray-600 hover:text-navy font-medium transition-colors"
                                          onClick={() => setMobileOpen(false)}
                                        >
                                          {l}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={getRoute(link)}
                        className={`block px-4 py-3.5 text-sm font-semibold transition-colors rounded-xl ${
                          isActive(link)
                            ? 'bg-gold/10 text-gold'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-navy'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {[
                  { label: 'About Us', to: '/about' },
                  { label: 'Contact Us', to: '/contact' },
                ].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`block px-4 py-3.5 text-sm font-semibold transition-colors rounded-xl ${
                      location.pathname === to
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-navy'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="px-6 py-5 border-t border-gray-100">
                <a
                  href="tel:1800-309-0930"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors"
                >
                  <span className="text-gold text-base">☎</span>
                  1800-309-0930 (Toll Free)
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
