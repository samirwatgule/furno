import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { trendingProducts } from '../../data/siteData';
import { HiChevronLeft, HiChevronRight, HiStar, HiHeart } from 'react-icons/hi';

const BADGE_STYLES = {
  gold:   'bg-gold text-white',
  green:  'bg-emerald-500 text-white',
  navy:   'bg-navy text-white',
  purple: 'bg-purple-600 text-white',
};

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <HiStar
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

const OFFSETS = {
  0: { scale: 1,    opacity: 1,    zIndex: 20, z: 60  },
  1: { scale: 0.88, opacity: 0.85, zIndex: 10, z: 0   },
  2: { scale: 0.75, opacity: 0.60, zIndex: 5,  z: -40 },
};

const STEP = 270;
const CARD_W = 255;

function getConfig(offset) {
  const abs = Math.abs(offset);
  return OFFSETS[abs] ?? { scale: 0.6, opacity: 0, zIndex: 0, z: -80 };
}

function ProductCard({ product, isActive }) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden flex flex-col transition-shadow duration-300 ${
        isActive ? 'shadow-2xl' : 'shadow-lg'
      }`}
      style={{ width: CARD_W }}
    >
      {/* Image — landscape 4:3 */}
      <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '4/3' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badge top-left */}
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${BADGE_STYLES[product.badgeVariant] ?? 'bg-gold text-white'}`}>
            {product.badge}
          </span>
        )}
        {/* Diagonal discount ribbon top-right */}
        {product.discount > 0 && (
          <div className="absolute top-0 right-0 overflow-hidden w-16 h-16">
            <div className="absolute -right-3 top-2 bg-red-500 text-white text-[9px] font-bold py-0.5 w-20 text-center rotate-45 shadow-sm">
              -{product.discount}%
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</p>
        <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-black text-gold">{formatINR(product.price)}</span>
          <span className="text-xs text-gray-400 line-through">{formatINR(product.originalPrice)}</span>
        </div>
        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          <button className="flex-1 py-2 border border-navy text-navy text-xs font-semibold rounded-lg hover:bg-navy hover:text-white transition-all duration-200 flex items-center justify-center gap-1">
            <HiHeart className="w-3.5 h-3.5" /> Wishlist
          </button>
          <button className="flex-1 py-2 bg-gold text-white text-xs font-semibold rounded-lg hover:bg-gold-hover transition-all duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrendingProducts() {
  const products = trendingProducts;
  const [active, setActive] = useState(0);
  const total = products.length;
  const timerRef = useRef(null);

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  return (
    <section className="py-10 sm:py-14 bg-[#eef0f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">What&apos;s Hot</span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-navy font-[family-name:var(--font-display)]">
            Trending This Season
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            The pieces everyone&apos;s talking about — don&apos;t miss out
          </p>
        </motion.div>
      </div>

      {/* Carousel stage — perspective creates 3D depth for translateZ children */}
      <div className="relative" style={{ height: 400, perspective: '1400px' }}>

        {products.map((product, i) => {
          const normOffset = (i - active + total) % total;
          const signed = normOffset > total / 2 ? normOffset - total : normOffset;
          if (Math.abs(signed) > 2) return null;

          const { scale, opacity, zIndex, z } = getConfig(signed);
          const x = signed * STEP - CARD_W / 2;

          return (
            <motion.div
              key={product.id}
              className="absolute top-1/2 cursor-pointer"
              style={{ left: '50%' }}
              animate={{ x, y: '-50%', scale, opacity, zIndex, z }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => { if (signed !== 0) { setActive(i); resetTimer(); } }}
            >
              <ProductCard product={product} isActive={signed === 0} />
            </motion.div>
          );
        })}

        {/* Nav arrows */}
        <button
          onClick={() => { prev(); resetTimer(); }}
          aria-label="Previous product"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors duration-200"
        >
          <HiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => { next(); resetTimer(); }}
          aria-label="Next product"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-gold hover:text-white transition-colors duration-200"
        >
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators — active: 16×8px gold oval, inactive: 8px gray circle */}
      <div className="flex justify-center gap-2 mt-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); resetTimer(); }}
            aria-label={`Go to product ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active ? 'w-4 h-2 bg-gold' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
