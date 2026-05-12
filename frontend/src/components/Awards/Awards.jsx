import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { awards as fallbackAwards } from '../../data/siteData';
import { motion } from 'framer-motion';
import { HiStar, HiBadgeCheck, HiLightBulb, HiGlobe, HiAcademicCap, HiSparkles } from 'react-icons/hi';

// Map award icons — using icons that definitely exist in react-icons/hi
const awardIconMap = {
  '🏆': HiAcademicCap,
  '🥇': HiBadgeCheck,
  '💡': HiLightBulb,
  '🌍': HiGlobe,
  '⭐': HiStar,
  'trophy': HiAcademicCap,
  'badge': HiBadgeCheck,
  'bulb': HiLightBulb,
  'globe': HiGlobe,
  'star': HiStar,
  'sparkles': HiSparkles,
};

export default function Awards() {
  const { data: awardsData } = useApi(api.getAwards, fallbackAwards);

  if (!awardsData || awardsData.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-bold uppercase tracking-widest mb-10"
          style={{ color: 'rgba(107,114,128,0.70)', letterSpacing: '0.20em' }}
        >
          Recognized by India's Top Institutions
        </motion.p>

        {/* Award items */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {awardsData.map((award, i) => {
            const IconComp = awardIconMap[award.icon] || HiBadgeCheck;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group flex flex-col items-center gap-3 cursor-default"
              >
                {/* Icon container */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #f0f2f8 0%, #ffffff 100%)',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
                    e.currentTarget.style.borderColor = 'rgba(232,115,58,0.30)';
                    e.currentTarget.style.background =
                      'linear-gradient(135deg, rgba(232,115,58,0.06) 0%, #ffffff 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background =
                      'linear-gradient(135deg, #f0f2f8 0%, #ffffff 100%)';
                  }}
                >
                  <IconComp className="w-8 h-8 transition-colors duration-300" style={{ color: '#E8733A' }} />
                </div>

                {/* Title */}
                <span
                  className="text-xs font-semibold text-center leading-tight max-w-[120px] transition-colors duration-300 group-hover:text-navy"
                  style={{ color: '#4b5563' }}
                >
                  {award.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
