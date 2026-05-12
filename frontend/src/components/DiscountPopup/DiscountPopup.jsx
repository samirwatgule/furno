import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCheck, HiLockOpen } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

export default function DiscountPopup() {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const close = () => setVisible(false);

  const validate = () => {
    let ok = true;
    if (!/^\d{10}$/.test(phone)) {
      setPhoneErr('Enter a valid 10-digit mobile number');
      ok = false;
    } else setPhoneErr('');
    if (!/^\d{6}$/.test(pin)) {
      setPinErr('Enter a valid 6-digit PIN code');
      ok = false;
    } else setPinErr('');
    return ok;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(close, 2800);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer wrapper — relative context for close button, no overflow-hidden so button isn't clipped */}
            <div className="relative w-full max-w-[820px] my-auto">

              {/* Close button — outside overflow-hidden, always visible */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-3 -right-3 z-30 w-9 h-9 rounded-full bg-white shadow-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <HiX className="w-4 h-4 text-gray-600" />
              </button>

            <div className="w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/40 flex flex-col sm:flex-row max-h-[calc(100dvh-48px)] overflow-y-auto">

              {/* ── Left panel: offer visual ── */}
              <div
                className="relative sm:w-[45%] flex-shrink-0 flex flex-col justify-between p-8 overflow-hidden min-h-[200px] sm:min-h-0"
                style={{
                  backgroundImage: `linear-gradient(160deg, rgba(13,21,38,0.82) 0%, rgba(27,42,74,0.72) 60%, rgba(232,115,58,0.40) 100%), url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=700&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Decorative ring */}
                <div
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[40px] opacity-10 pointer-events-none"
                  style={{ borderColor: '#E8733A' }}
                />
                <div
                  className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-[28px] opacity-10 pointer-events-none"
                  style={{ borderColor: '#fff' }}
                />

                {/* Top: brand */}
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-sm">
                    ✦ Exclusive Offer
                  </span>
                </div>

                {/* Middle: big discount */}
                <div className="relative z-10 my-6">
                  <p className="text-white/70 text-sm font-medium mb-1">Save up to</p>
                  <div className="flex items-end gap-1 leading-none mb-3">
                    <span
                      className="text-[4.5rem] font-black leading-none"
                      style={{ color: '#E8733A', fontFamily: 'var(--font-display, serif)' }}
                    >
                      ₹25K
                    </span>
                  </div>
                  <p className="text-white font-bold text-xl leading-tight">
                    Off on your<br />dream interiors
                  </p>
                  <p className="text-white/55 text-xs mt-2 leading-relaxed">
                    Valid for new customers only.<br />Limited period offer.
                  </p>
                </div>

                {/* Bottom: trust badges */}
                <div className="relative z-10 flex flex-col gap-2">
                  {['Free design consultation', '45-day move-in guarantee', 'EMI starting ₹3,999/mo'].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center flex-shrink-0">
                        <HiCheck className="w-2.5 h-2.5 text-gold" />
                      </div>
                      <span className="text-white/75 text-xs">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right panel: form ── */}
              <div className="flex-1 bg-white flex flex-col p-6 sm:p-9">

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── Success state ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="flex-1 flex flex-col items-center justify-center text-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.25, 1] }}
                        transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.1 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #E8733A 0%, #f4a06b 100%)' }}
                      >
                        <HiCheck className="w-10 h-10 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-navy font-[family-name:var(--font-display)]">
                          Discount Unlocked! 🎉
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                          Our designer will call you shortly<br />with your exclusive offer details.
                        </p>
                      </div>
                      <div
                        className="w-full rounded-2xl px-5 py-4 text-center"
                        style={{ background: 'rgba(232,115,58,0.08)', border: '1px dashed #E8733A' }}
                      >
                        <p className="text-xs text-gray-500 mb-1">Your discount code</p>
                        <p className="text-xl font-black tracking-widest" style={{ color: '#E8733A' }}>
                          FURNO25K
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── Form state ── */
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col"
                    >
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'rgba(232,115,58,0.12)' }}
                          >
                            <HiLockOpen className="w-4 h-4" style={{ color: '#E8733A' }} />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#E8733A' }}>
                            Unlock Your Discount
                          </span>
                        </div>
                        <h2
                          className="text-2xl sm:text-3xl font-bold leading-tight"
                          style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}
                        >
                          Get ₹25,000 Off<br />Your Dream Home
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">
                          Enter your details below to instantly unlock your exclusive discount.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 flex-1">

                        {/* Mobile */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                            Mobile Number
                          </label>
                          <div
                            className={`flex items-center rounded-xl border overflow-hidden transition-all ${
                              phoneErr ? 'border-red-400' : 'border-gray-200 focus-within:border-[#E8733A] focus-within:ring-2 focus-within:ring-[#E8733A]/15'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 px-3 py-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                              <span className="text-base">🇮🇳</span>
                              <span className="text-sm text-gray-600 font-medium">+91</span>
                            </div>
                            <input
                              type="tel"
                              inputMode="numeric"
                              placeholder="98765 43210"
                              value={phone}
                              maxLength={10}
                              onChange={(e) => {
                                setPhone(e.target.value.replace(/\D/g, ''));
                                if (phoneErr) setPhoneErr('');
                              }}
                              className="flex-1 px-4 py-3 text-sm text-gray-800 focus:outline-none bg-white placeholder-gray-300"
                            />
                          </div>
                          {phoneErr && <p className="text-[10px] text-red-500 mt-1">⚠ {phoneErr}</p>}
                        </div>

                        {/* Pin Code */}
                        <div>
                          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                            PIN Code
                          </label>
                          <div
                            className={`flex items-center rounded-xl border overflow-hidden transition-all ${
                              pinErr ? 'border-red-400' : 'border-gray-200 focus-within:border-[#E8733A] focus-within:ring-2 focus-within:ring-[#E8733A]/15'
                            }`}
                          >
                            <div className="flex items-center justify-center px-3 py-3 bg-gray-50 border-r border-gray-200 flex-shrink-0">
                              <span className="text-base">📍</span>
                            </div>
                            <input
                              type="tel"
                              inputMode="numeric"
                              placeholder="560 001"
                              value={pin}
                              maxLength={6}
                              onChange={(e) => {
                                setPin(e.target.value.replace(/\D/g, ''));
                                if (pinErr) setPinErr('');
                              }}
                              className="flex-1 px-4 py-3 text-sm text-gray-800 focus:outline-none bg-white placeholder-gray-300"
                            />
                          </div>
                          {pinErr && <p className="text-[10px] text-red-500 mt-1">⚠ {pinErr}</p>}
                        </div>

                        {/* Live PIN hint */}
                        {pin.length >= 3 && pin.length < 6 && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] text-gray-400"
                          >
                            {6 - pin.length} more digit{6 - pin.length !== 1 ? 's' : ''} needed
                          </motion.p>
                        )}

                        {/* CTA */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-2 mt-auto"
                          style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #f4a06b 0%, #E8733A 100%)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)';
                          }}
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Unlocking…
                            </>
                          ) : (
                            <>
                              Unlock My ₹25,000 Discount
                              <FiArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        {/* Skip */}
                        <button
                          type="button"
                          onClick={close}
                          className="text-xs text-gray-400 hover:text-gray-600 transition-colors text-center mt-1"
                        >
                          No thanks, I&apos;ll pay full price
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
