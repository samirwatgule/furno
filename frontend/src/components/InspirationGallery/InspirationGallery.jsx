import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { inspirationTabs as fallbackTabs, inspirationImages as fallbackImages } from '../../data/siteData';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { SectionSkeleton } from '../ui/Skeleton';

export default function InspirationGallery() {
  const { data: inspirationData, loading } = useApi(
    api.getInspirationTabs,
    { tabs: fallbackTabs, images: fallbackImages }
  );

  const tabs = inspirationData?.tabs || fallbackTabs;
  const allImages = inspirationData?.images || fallbackImages;

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsRef = useRef(null);
  const images = allImages[activeTab] || [];

  const scrollTabs = (dir) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="py-10 sm:py-14"
      id="inspiration"
      style={{ background: '#F8F9FA' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start sm:items-center justify-between mb-10 flex-col sm:flex-row gap-5"
        >
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] leading-tight"
              style={{ color: '#1B2A4A' }}
            >
              Find Your Design Style
            </h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-lg">
              Give your home a new look with these interior design ideas curated for you.
            </p>
          </div>

          {/* "View All" pill button */}
          <Link
            to="/design-ideas"
            className="group inline-flex items-center gap-2 flex-shrink-0 font-semibold text-sm px-6 py-2.5 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: '#E8733A',
              color: '#E8733A',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8733A';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#E8733A';
            }}
          >
            View All
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Tabs — pill style */}
        <div className="relative mb-8">
          {/* Mobile scroll arrows */}
          <button
            onClick={() => scrollTabs(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 sm:hidden"
            style={{ color: '#1B2A4A' }}
          >
            <HiChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-colors duration-200 focus:outline-none"
                  style={{
                    background: isActive ? '#1B2A4A' : '#ffffff',
                    color: isActive ? '#ffffff' : '#6b7280',
                    border: isActive ? '1px solid #1B2A4A' : '1px solid #e5e7eb',
                    boxShadow: isActive ? '0 2px 8px rgba(27,42,74,0.18)' : 'none',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-tab-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: '#1B2A4A', zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollTabs(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 sm:hidden"
            style={{ color: '#1B2A4A' }}
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <SectionSkeleton count={6} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {images.map((img, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`group relative overflow-hidden rounded-2xl block ${
                    i === 0 ? 'row-span-2 col-span-1' : 'aspect-[4/3]'
                  }`}
                  style={i === 0 ? { minHeight: 'clamp(200px, 40vw, 320px)' } : {}}
                >
                  {/* Image with zoom on hover */}
                  <img
                    src={img}
                    alt={`${activeTab} design ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                  {/* "View Design" pill — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm"
                      style={{
                        background: 'rgba(255,255,255,0.92)',
                        color: '#1B2A4A',
                      }}
                    >
                      View Design <HiArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
