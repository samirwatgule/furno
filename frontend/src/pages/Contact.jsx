import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaCheckCircle, FaFacebookF, FaInstagram, FaTwitter,
  FaYoutube, FaLinkedinIn, FaWhatsapp, FaPaperPlane, FaArrowRight,
} from 'react-icons/fa';
import { api } from '../services/api';

const MOCK_CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad',
  'Kochi', 'Lucknow', 'Jaipur', 'Chandigarh', 'Coimbatore',
  'Vizag', 'Mysore', 'Indore', 'Nagpur', 'Goa',
];

const contactItems = [
  { Icon: FaPhone,        label: 'Toll-Free',     value: '1800-309-0930',         sub: 'Mon–Sun: 9 AM – 9 PM',   href: 'tel:1800-309-0930' },
  { Icon: FaEnvelope,     label: 'Email Us',      value: 'hello@furno.com',        sub: 'We reply within 24 hrs', href: 'mailto:hello@furno.com' },
  { Icon: FaMapMarkerAlt, label: 'Head Office',   value: 'HSR Layout, Bangalore',  sub: 'Visit us in person',     href: 'https://maps.google.com/?q=HSR+Layout+Bangalore' },
  { Icon: FaClock,        label: 'Working Hours', value: 'Mon–Sun: 10 AM – 8 PM',  sub: 'All experience centres', href: null },
];

const subjects = ['General Enquiry', 'Design Consultation', 'Partnership', 'Career', 'Other'];

const socialLinks = [
  { Icon: FaFacebookF,  label: 'Facebook',  href: '#', color: '#1877F2' },
  { Icon: FaInstagram,  label: 'Instagram', href: '#', color: '#E1306C' },
  { Icon: FaTwitter,    label: 'Twitter',   href: '#', color: '#1DA1F2' },
  { Icon: FaYoutube,    label: 'YouTube',   href: '#', color: '#FF0000' },
  { Icon: FaLinkedinIn, label: 'LinkedIn',  href: '#', color: '#0A66C2' },
];

const INITIAL_FORM = { name: '', email: '', countryCode: '+91', phone: '', city: '', subject: '', message: '' };
const REQUIRED_FIELDS = ['name', 'email', 'phone', 'city', 'subject', 'message'];

function validateField(name, value) {
  switch (name) {
    case 'name':    return value.trim() ? '' : 'Full name is required';
    case 'email':
      if (!value.trim()) return 'Email is required';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
    case 'phone':
      if (!value.trim()) return 'Phone number is required';
      return /^\d{10}$/.test(value.replace(/\s/g, '')) ? '' : 'Enter a valid 10-digit number';
    case 'city':    return value ? '' : 'Please select your city';
    case 'subject': return value ? '' : 'Please select a subject';
    case 'message':
      if (!value.trim()) return 'Message is required';
      return value.trim().length >= 20 ? '' : 'At least 20 characters required';
    default: return '';
  }
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [refNumber] = useState(() => `REF-${Math.floor(Math.random() * 900000) + 100000}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
  };

  const pickSubject = (s) => {
    setFormData((p) => ({ ...p, subject: s }));
    setErrors((p) => ({ ...p, subject: '' }));
    setTouched((p) => ({ ...p, subject: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allErrors = {};
    REQUIRED_FIELDS.forEach((f) => { const err = validateField(f, formData[f]); if (err) allErrors[f] = err; });
    setErrors(allErrors);
    setTouched(REQUIRED_FIELDS.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    if (Object.keys(allErrors).length > 0) return;
    setLoading(true);
    try { await api.submitContact(formData); setSubmitted(true); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const resetForm = () => { setFormData(INITIAL_FORM); setErrors({}); setTouched({}); setSubmitted(false); };

  const fieldBase = (name) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all placeholder-gray-300 ${
      touched[name] && errors[name]
        ? 'border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-400'
        : 'border-gray-200 bg-white focus:border-[#E8733A] focus:ring-[#E8733A]/15 hover:border-gray-300'
    }`;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: '#1e3a6e' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=30" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,42,90,0.88) 0%, rgba(30,58,110,0.78) 55%, rgba(64,90,180,0.55) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.16) 0%, transparent 65%)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(100,140,255,0.14) 0%, transparent 70%)', transform: 'translate(-40%,40%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest mb-7"
            style={{ background: 'rgba(232,115,58,0.15)', borderColor: 'rgba(232,115,58,0.4)', color: '#E8733A' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
            Get in Touch
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, serif)' }}>
            Let&apos;s Start a<br /><span style={{ color: '#E8733A' }}>Conversation</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
            Have a question, need help, or want to start your home design journey? We respond within 24 hours.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {[{ n: '24 hr', s: 'Response Time' }, { n: '100+', s: 'Cities Served' }, { n: '2,000+', s: 'Expert Designers' }].map(({ n, s }) => (
              <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="font-bold text-white text-sm">{n}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="bg-white pt-4 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[390px_1fr] gap-8 xl:gap-12 items-start">

            {/* ── LEFT PANEL ── */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24 rounded-3xl overflow-hidden"
              style={{ background: 'linear-gradient(150deg, #1e3a6e 0%, #2a4e8a 55%, #3560a8 100%)' }}>
              <div className="relative p-8">
                {/* Inner orbs */}
                <div className="absolute top-0 right-0 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.18) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
                <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(100,140,255,0.2) 0%, transparent 70%)', transform: 'translate(-35%,35%)' }} />

                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display, serif)' }}>Contact Information</h2>
                  <p className="text-xs mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>Reach us through any of these channels</p>

                  <div className="space-y-5">
                    {contactItems.map(({ Icon, label, value, sub, href }, i) => (
                      <motion.div key={label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                        className="flex items-start gap-4 group">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                          style={{ background: 'rgba(232,115,58,0.18)' }}>
                          <Icon className="w-4 h-4" style={{ color: '#E8733A' }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</p>
                          {href ? (
                            <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-white font-semibold text-sm hover:text-[#E8733A] transition-colors">{value}</a>
                          ) : (
                            <p className="text-white font-semibold text-sm">{value}</p>
                          )}
                          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{sub}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Image */}
                  <div className="mt-8 rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=70"
                      alt="FurnoTech experience centre" className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity duration-500" />
                  </div>

                  {/* Socials */}
                  <div className="mt-7 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.38)' }}>Follow Us</p>
                    <div className="flex gap-2.5">
                      {socialLinks.map(({ Icon, label, href, color }) => (
                        <a key={label} href={href} title={label}
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                          style={{ background: 'rgba(255,255,255,0.1)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = color; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: FORM ── */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-20 px-8 rounded-3xl border border-green-100"
                    style={{ background: 'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <FaCheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>Message Sent!</h3>
                    <p className="text-gray-500 mb-3">Your message is on its way to our team.</p>
                    <div className="text-sm font-mono px-5 py-2.5 rounded-xl mb-5 border border-gray-200 bg-white" style={{ color: '#1B2A4A' }}>
                      Reference: <strong>{refNumber}</strong>
                    </div>
                    <p className="text-gray-400 text-sm mb-7">We&apos;ll respond within 24 hours.</p>
                    <button onClick={resetForm}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: '#E8733A' }}>
                      <FaArrowRight className="w-3.5 h-3.5" /> Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                        Send us a Message
                      </h2>
                      <p className="text-sm text-gray-400 mt-1.5">Fill in the details — we&apos;ll get back within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Full Name *</label>
                          <input type="text" name="name" value={formData.name}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="Priya Sharma" className={fieldBase('name')} />
                          {touched.name && errors.name && <p className="text-[11px] text-red-500 mt-1">⚠ {errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Email Address *</label>
                          <input type="email" name="email" value={formData.email}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="priya@example.com" className={fieldBase('email')} />
                          {touched.email && errors.email && <p className="text-[11px] text-red-500 mt-1">⚠ {errors.email}</p>}
                        </div>
                      </div>

                      {/* Phone + City */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Phone Number *</label>
                          <div className={`flex rounded-xl border overflow-hidden transition-all ${
                            touched.phone && errors.phone
                              ? 'border-red-300'
                              : 'border-gray-200 focus-within:border-[#E8733A] focus-within:ring-2 focus-within:ring-[#E8733A]/15'
                          }`}>
                            <select name="countryCode" value={formData.countryCode} onChange={handleChange}
                              className="shrink-0 px-2 py-3.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-600 focus:outline-none">
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+44">🇬🇧 +44</option>
                              <option value="+971">🇦🇪 +971</option>
                            </select>
                            <input type="tel" name="phone" value={formData.phone}
                              onChange={handleChange} onBlur={handleBlur}
                              placeholder="98765 43210" maxLength={10}
                              className="flex-1 px-3 py-3.5 text-sm focus:outline-none bg-white placeholder-gray-300" />
                          </div>
                          {touched.phone && errors.phone && <p className="text-[11px] text-red-500 mt-1">⚠ {errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">City *</label>
                          <select name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur}
                            className={`${fieldBase('city')} ${!formData.city ? 'text-gray-300' : 'text-gray-900'}`}>
                            <option value="">Select your city</option>
                            {MOCK_CITIES.map((c) => <option key={c}>{c}</option>)}
                          </select>
                          {touched.city && errors.city && <p className="text-[11px] text-red-500 mt-1">⚠ {errors.city}</p>}
                        </div>
                      </div>

                      {/* Subject — interactive pill buttons */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-2.5 uppercase tracking-widest">Subject *</label>
                        <div className="flex flex-wrap gap-2">
                          {subjects.map((s) => (
                            <motion.button key={s} type="button" onClick={() => pickSubject(s)}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                              style={formData.subject === s
                                ? { background: '#E8733A', borderColor: '#E8733A', color: 'white', boxShadow: '0 4px 14px rgba(232,115,58,0.35)' }
                                : { background: 'white', borderColor: '#e5e7eb', color: '#6B7280' }}>
                              {s}
                            </motion.button>
                          ))}
                        </div>
                        {touched.subject && errors.subject && <p className="text-[11px] text-red-500 mt-1.5">⚠ {errors.subject}</p>}
                      </div>

                      {/* Message + char counter */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Message *</label>
                          <span className={`text-[10px] font-medium transition-colors ${formData.message.length > 450 ? 'text-red-400' : 'text-gray-300'}`}>
                            {formData.message.length} / 500
                          </span>
                        </div>
                        <textarea name="message" value={formData.message} rows={5}
                          onChange={handleChange} onBlur={handleBlur}
                          placeholder="Tell us how we can help you…" maxLength={500}
                          className={`${fieldBase('message')} resize-none`} />
                        {touched.message && errors.message && <p className="text-[11px] text-red-500 mt-1">⚠ {errors.message}</p>}
                      </div>

                      {/* Submit row */}
                      <div className="flex items-center gap-4 pt-1">
                        <motion.button type="submit" disabled={loading}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-all hover:shadow-xl hover:shadow-orange-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{ background: '#E8733A' }}>
                          {loading ? (
                            <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</>
                          ) : (
                            <><FaPaperPlane className="w-3.5 h-3.5" />Send Message</>
                          )}
                        </motion.button>
                        <p className="text-[11px] text-gray-300 leading-relaxed">We&apos;ll respond<br />within 24 hours</p>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Quick Connect Strip ── */}
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {[
                  { Icon: FaPhone,    label: 'Call Us',   value: '1800-309-0930', href: 'tel:1800-309-0930',           color: '#E8733A' },
                  { Icon: FaWhatsapp, label: 'WhatsApp',  value: 'Chat with us',  href: 'https://wa.me/911800309930',  color: '#25D366' },
                  { Icon: FaEnvelope, label: 'Email',     value: 'hello@furno.com', href: 'mailto:hello@furno.com',    color: '#1B2A4A' },
                ].map(({ Icon, label, value, href, color }) => (
                  <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: '#1B2A4A' }}>{value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
