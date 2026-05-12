import { useState } from 'react';
import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { faqs as fallbackFaqs } from '../../data/siteData';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiMinus, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { data: faqData } = useApi(api.getFaqs, fallbackFaqs);

  if (!faqData || faqData.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-[#F0F2F8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Eyebrow pill */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(232,115,58,0.12)',
              color: '#E8733A',
              border: '1px solid rgba(232,115,58,0.30)',
            }}
          >
            FAQ
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-display)]"
            style={{ color: '#1B2A4A' }}>
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            Everything you need to know about our home interior services
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqData.map((faq, i) => {
            const isOpen = openIndex === i;
            const num = String(i + 1).padStart(2, '0') + '.';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden bg-white transition-all duration-300"
                style={{
                  border: isOpen
                    ? '1px solid rgba(232,115,58,0.30)'
                    : '1px solid transparent',
                  boxShadow: isOpen
                    ? '0 4px 20px rgba(0,0,0,0.07)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Gold left accent bar when open */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="accent"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm origin-top"
                      style={{ background: '#E8733A' }}
                    />
                  )}
                </AnimatePresence>

                {/* Question row */}
                <button
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="flex items-start gap-3 flex-1 pr-4">
                    <span
                      className="text-xs font-mono font-semibold flex-shrink-0 mt-0.5"
                      style={{ color: 'rgba(232,115,58,0.50)' }}
                    >
                      {num}
                    </span>
                    <span
                      className="text-sm sm:text-base font-semibold transition-colors duration-200"
                      style={{ color: isOpen ? '#E8733A' : '#1B2A4A' }}
                    >
                      {faq.q}
                    </span>
                  </span>

                  {/* Toggle icon */}
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={
                      isOpen
                        ? { background: '#E8733A', color: '#fff' }
                        : { background: 'rgba(27,42,74,0.08)', color: '#1B2A4A' }
                    }
                  >
                    {isOpen ? (
                      <HiMinus className="w-3.5 h-3.5" />
                    ) : (
                      <HiPlus className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-14 text-sm text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-sm mb-3">
            Still have questions?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:gap-3"
            style={{ color: '#E8733A' }}
          >
            Contact our team
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
