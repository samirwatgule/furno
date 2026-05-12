import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { calculators as fallbackCalcs } from '../../data/siteData';
import { motion } from 'framer-motion';
import { HiChevronRight, HiHome, HiCube } from 'react-icons/hi';
import { HiCalculator } from 'react-icons/hi2';
import { CardSkeleton } from '../ui/Skeleton';

const CALC_TYPE_MAP = {
  '🏠': 'full_home', home:     'full_home',
  '🍳': 'kitchen',   kitchen:  'kitchen',
  '🗄️': 'wardrobe', wardrobe: 'wardrobe',
};

const calcIconMap = {
  '🏠': HiHome,       home:     HiHome,
  '🍳': HiCalculator, kitchen:  HiCalculator,
  '🗄️': HiCube,      wardrobe: HiCube,
};

export default function PriceCalculators() {
  const { data: calcs, loading } = useApi(api.getCalculators, fallbackCalcs);
  const navigate = useNavigate();

  function openEstimator(icon) {
    const type = CALC_TYPE_MAP[icon] ?? 'full_home';
    navigate(`/estimate?type=${type}`);
  }

  return (
    <section id="calculator" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy font-[family-name:var(--font-display)]">
            Get a Cost Estimate for Your Home Interiors
          </h2>
          <p className="mt-2 text-sm text-gray-500">Instant estimates · No sign-up needed · 2 minutes</p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-5">
            {(calcs || []).map((calc, i) => {
              const IconComp = calcIconMap[calc.icon] || HiCalculator;
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => openEstimator(calc.icon)}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-gold/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={calc.image}
                      alt={calc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <IconComp className="w-4 h-4 text-gold" />
                      </div>
                      <h3 className="text-lg font-bold text-navy">{calc.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{calc.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 text-gold text-sm font-bold group-hover:gap-2.5 transition-all">
                        <span>{calc.cta}</span>
                        <HiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-xs text-gray-400 font-medium">⚡ 2 min</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
