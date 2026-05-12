import { useState } from 'react';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiCheckCircle } from 'react-icons/hi';

const features = [
  'Free consultation',
  '45-day move-in',
  'Lifetime warranty',
  '146 quality checks',
];

const avatarColors = ['#E8733A', '#4052A0', '#2F3D7A'];

export default function ConsultationCTA() {
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitLead(formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', city: '' });
      }, 3000);
    } catch (err) {
      console.error('Lead submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="consultation"
      className="relative overflow-hidden py-14 sm:py-20"
      style={{
        background:
          'linear-gradient(135deg, #162044 0%, #2F3D7A 40%, #4052A0 70%, #1a1f40 100%)',
      }}
    >
      {/* Decorative: large blurred gold circle */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'rgba(232,115,58,0.10)',
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.05,
        }}
      />

      {/* Small floating gold orb */}
      <div
        className="pointer-events-none absolute bottom-10 left-10 w-32 h-32 rounded-full"
        style={{
          background: 'rgba(64,82,160,0.20)',
          filter: 'blur(48px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(232,115,58,0.18)', color: '#E8733A', border: '1px solid rgba(232,115,58,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] inline-block" />
              Free Consultation
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight font-[family-name:var(--font-display)]">
              Transform Your Home{' '}
              <span style={{ color: '#E8733A' }}>with Expert</span> Design
            </h2>

            <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-md">
              Talk to our designer for free and get a detailed quote for your
              home interiors. No obligation. No pressure.
            </p>

            {/* Feature grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(232,115,58,0.20)' }}
                  >
                    <HiCheck className="w-3.5 h-3.5" style={{ color: '#E8733A' }} />
                  </span>
                  <span className="text-white/80 text-sm font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center">
                {avatarColors.map((color, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#2F3D7A] flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      background: color,
                      marginLeft: i === 0 ? 0 : '-10px',
                      zIndex: 3 - i,
                      position: 'relative',
                    }}
                  >
                    {['R', 'A', 'S'][i]}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#E8733A">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-xs mt-0.5">
                  <span className="text-white font-semibold">1,00,000+</span> Happy Families
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <h3 className="text-xl font-bold text-white mb-1">Book Free Consultation</h3>
              <p className="text-white/50 text-sm mb-7">
                Get personalised quotes and design ideas
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="flex flex-col items-center justify-center py-14 gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(34,197,94,0.15)' }}
                    >
                      <HiCheckCircle className="w-9 h-9 text-green-400" />
                    </div>
                    <p className="text-white text-lg font-semibold text-center">
                      We'll call you within 2 hours!
                    </p>
                    <p className="text-white/50 text-sm text-center">
                      Our design expert will reach out shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.20)',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#E8733A';
                        e.target.style.background = 'rgba(255,255,255,0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.20)';
                        e.target.style.background = 'rgba(255,255,255,0.10)';
                      }}
                    />

                    {/* Phone row */}
                    <div
                      className="flex rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.20)',
                      }}
                    >
                      <select
                        className="shrink-0 w-20 px-2 py-3.5 text-sm text-white/80 focus:outline-none"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          borderRight: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        <option style={{ color: '#000' }}>+91</option>
                        <option style={{ color: '#000' }}>+1</option>
                        <option style={{ color: '#000' }}>+44</option>
                        <option style={{ color: '#000' }}>+61</option>
                        <option style={{ color: '#000' }}>+971</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        required
                        className="min-w-0 flex-1 px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none"
                        style={{ background: 'transparent' }}
                      />
                    </div>

                    {/* City */}
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.20)',
                        color: formData.city ? '#fff' : 'rgba(255,255,255,0.40)',
                      }}
                    >
                      <option value="" style={{ color: '#333' }}>Select City</option>
                      {['Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad'].map(
                        (city) => (
                          <option key={city} style={{ color: '#333' }}>{city}</option>
                        )
                      )}
                    </select>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white transition-all duration-300"
                      style={{
                        background: loading
                          ? 'rgba(232,115,58,0.60)'
                          : 'linear-gradient(135deg, #E8733A 0%, #d4612a 100%)',
                        boxShadow: loading ? 'none' : '0 8px 32px rgba(232,115,58,0.35)',
                      }}
                    >
                      {loading ? 'Submitting...' : 'Get Free Quote'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {!submitted && (
                <p className="text-[10px] text-white/30 mt-4 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="#" className="text-white/50 underline hover:text-white/80 transition-colors">
                    Privacy Policy
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
