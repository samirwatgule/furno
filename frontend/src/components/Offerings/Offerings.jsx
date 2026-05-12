import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { offerings as fallbackOfferings } from '../../data/siteData';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { CardSkeleton } from '../ui/Skeleton';

const CATEGORY_LABELS = ['Modular', 'Full Home', 'Luxury', 'Renovation'];

export default function Offerings() {
  const { data: offeringsData, loading } = useApi(api.getOfferings, fallbackOfferings);

  return (
    <section id="offerings" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] leading-tight"
            style={{ color: '#1B2A4A' }}>
            Everything Your Home
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #E8733A 0%, #f5a26a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Deserves
            </span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office.
          </p>

          {/* Gold accent underline bar */}
          <div
            className="mx-auto mt-5 rounded-full"
            style={{
              height: '4px',
              width: '56px',
              background: 'linear-gradient(90deg, #E8733A, #f5a26a)',
            }}
          />
        </motion.div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(offeringsData || []).map((item, i) => (
              <motion.a
                key={item.id}
                href={item.link}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden block cursor-pointer"
                style={{
                  boxShadow: '0 4px 24px rgba(27,42,74,0.10)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 16px 48px rgba(27,42,74,0.18)',
                }}
              >
                {/* Tall image — 3/4 aspect */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category badge — top left */}
                  <span
                    className="absolute top-4 left-4 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{ background: '#E8733A' }}
                  >
                    {CATEGORY_LABELS[i] || item.title}
                  </span>

                  {/* Content overlay — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white leading-tight font-[family-name:var(--font-display)]">
                      {item.title}
                    </h3>

                    {/* Desc — hidden by default, fades in on hover */}
                    <p
                      className="text-sm mt-1 mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: 'rgba(255,255,255,0.70)' }}
                    >
                      {item.description}
                    </p>

                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
                      style={{ color: '#E8733A' }}
                    >
                      Explore <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
