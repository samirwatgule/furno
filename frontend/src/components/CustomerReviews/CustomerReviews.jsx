import { useRef } from 'react';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { reviews as fallbackReviews } from '../../data/siteData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ReviewSkeleton } from '../ui/Skeleton';
import 'swiper/css';
import 'swiper/css/pagination';

export default function CustomerReviews() {
  const swiperRef = useRef(null);
  const { data: reviewsData, loading } = useApi(api.getReviews, fallbackReviews);

  return (
    <section className="py-16 sm:py-20 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          {/* Left: heading */}
          <div className="max-w-md">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4A] leading-tight"
              style={{ fontFamily: 'var(--font-display, serif)' }}
            >
              What Our Customers Say
            </h2>
          </div>

          {/* Right: rating block + nav arrows */}
          <div className="flex flex-col items-start sm:items-end gap-4">
            {/* Rating display */}
            <div className="flex flex-col items-start sm:items-end gap-1">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: '#E8733A' }}
                >
                  4.9
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <HiStar key={i} className="w-5 h-5" style={{ color: '#E8733A' }} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    from 1,00,000+ homes
                  </span>
                </div>
              </div>
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous review"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center
                           text-[#1B2A4A] border-[#1B2A4A]
                           hover:bg-[#E8733A] hover:border-[#E8733A] hover:text-white
                           transition-all duration-200 flex-shrink-0"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="Next review"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-11 h-11 rounded-full border-2 flex items-center justify-center
                           text-[#1B2A4A] border-[#1B2A4A]
                           hover:bg-[#E8733A] hover:border-[#E8733A] hover:text-white
                           transition-all duration-200 flex-shrink-0"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <ReviewSkeleton key={i} />)}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            onSwiper={(s) => { swiperRef.current = s; }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {(reviewsData || []).map((review, idx) => {
              const timestamps = ['2 weeks ago', '1 month ago', '3 weeks ago', '5 days ago', '2 months ago'];
              const ts = timestamps[idx % timestamps.length];

              return (
                <SwiperSlide key={review.id} className="h-auto">
                  <div
                    className="relative bg-white rounded-3xl p-7 border border-gray-100 shadow-md
                                hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Verified Purchase badge — absolute top-right */}
                    <span
                      className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
                    >
                      Verified Purchase
                    </span>

                    {/* Decorative quote mark */}
                    <div
                      className="font-serif text-6xl leading-none select-none mb-2"
                      style={{ color: 'rgba(232,115,58,0.20)' }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </div>

                    {/* Review text */}
                    <p className="italic text-gray-700 text-base leading-relaxed line-clamp-4 flex-1 mb-5">
                      {review.text}
                    </p>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      {/* Avatar + name + location */}
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#1B2A4A] truncate">
                            {review.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">{review.location}</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 flex-shrink-0 ml-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <HiStar
                            key={i}
                            className="w-4 h-4"
                            style={{ color: i < review.rating ? '#E8733A' : '#E5E7EB' }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Timestamp subtle footnote */}
                    <p className="text-[10px] text-gray-300 mt-2 text-right">{ts}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
