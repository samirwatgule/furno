import { useRef, useState } from 'react';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { deliveredHomes as fallbackHomes } from '../../data/siteData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import 'swiper/css';

export default function DeliveredHomes() {
  const swiperRef = useRef(null);
  const { data: homes } = useApi(api.getDeliveredHomes, fallbackHomes);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = (homes || []).length;

  /* Pad index to 2 digits: 1 → "01" */
  const fmt = (n) => String(n + 1).padStart(2, '0');
  const fmtTotal = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: '#F0F2F8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          {/* Left: title + sub */}
          <div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{
                color: '#1B2A4A',
                fontFamily: 'var(--font-display, serif)',
              }}
            >
              Real Homes,<br className="hidden sm:block" /> Real Transformations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              From dream to reality — delivered in 45 days or less
            </p>
          </div>

          {/* Right: CTA + slide counter */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold
                         border-2 px-5 py-2.5 rounded-full
                         transition-all duration-200"
              style={{
                borderColor: '#1B2A4A',
                color: '#1B2A4A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1B2A4A';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1B2A4A';
              }}
            >
              View All Projects <HiArrowRight className="w-4 h-4" />
            </Link>

            {/* Slide counter */}
            {total > 0 && (
              <span className="text-sm font-bold tabular-nums" style={{ color: '#1B2A4A' }}>
                <span style={{ color: '#E8733A' }}>{fmt(activeIndex)}</span>
                {' '}
                <span className="text-gray-400 font-normal">/</span>
                {' '}
                {fmtTotal(total)}
              </span>
            )}
          </div>
        </motion.div>

        {/* Slider wrapper — extra horizontal padding to fit external arrows */}
        <div className="relative px-8 sm:px-10">

          {/* Prev arrow */}
          <button
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                       w-14 h-14 rounded-full flex items-center justify-center
                       text-white shadow-lg transition-all duration-200"
            style={{ backgroundColor: '#1B2A4A' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8733A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1B2A4A'; }}
          >
            <HiChevronLeft className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Autoplay]}
            onSwiper={(s) => { swiperRef.current = s; }}
            spaceBetween={20}
            slidesPerView={1.1}
            loop={true}
            grabCursor={true}
            autoplay={{ delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: false }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            breakpoints={{
              640:  { slidesPerView: 2.1 },
              1024: { slidesPerView: 3.1 },
            }}
          >
            {(homes || []).map((home) => (
              <SwiperSlide key={home.id}>
                <Link
                  to="/projects"
                  className="group block rounded-2xl overflow-hidden relative"
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Full-bleed image */}
                  <img
                    src={home.image}
                    alt={home.title}
                    className="absolute inset-0 w-full h-full object-cover
                               group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient overlay — stronger at bottom */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.80) 100%)',
                    }}
                  />
                  {/* Hover: slightly brighter overlay tint */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.12)' }}
                  />

                  {/* Top badge cluster */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {/* Style badge */}
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.18)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    >
                      {home.style}
                    </span>
                    {/* City badge */}
                    <span
                      className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(232,115,58,0.85)',
                        color: '#ffffff',
                      }}
                    >
                      <HiLocationMarker className="w-3 h-3" />
                      {home.city}
                    </span>
                  </div>

                  {/* Bottom content overlaid on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-1 mb-1">
                      {home.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.70)' }}>
                      {home.bhkType} &middot; {home.areaSqft.toLocaleString('en-IN')} sqft &middot; ₹{home.budgetMin}–{home.budgetMax}L
                    </p>

                    {/* View Project button — visible on hover */}
                    <div
                      className="mt-3 overflow-hidden transition-all duration-300"
                      style={{ maxHeight: 0 }}
                      ref={(el) => {
                        if (!el) return;
                        const parent = el.closest('.group');
                        if (!parent) return;
                        const show = () => { el.style.maxHeight = '48px'; };
                        const hide = () => { el.style.maxHeight = '0px'; };
                        parent.addEventListener('mouseenter', show);
                        parent.addEventListener('mouseleave', hide);
                      }}
                    >
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: '#E8733A', color: '#ffffff' }}
                      >
                        View Project <HiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next arrow */}
          <button
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                       w-14 h-14 rounded-full flex items-center justify-center
                       text-white shadow-lg transition-all duration-200"
            style={{ backgroundColor: '#1B2A4A' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8733A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1B2A4A'; }}
          >
            <HiChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
