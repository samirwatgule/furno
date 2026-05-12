import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiPhone, HiClock, HiSearch } from 'react-icons/hi';
import { FaArrowRight, FaPlay, FaMapMarkerAlt, FaVrCardboard, FaCalendarAlt } from 'react-icons/fa';
import useApi from '../hooks/useApi';
import { api } from '../services/api';
import { CardSkeleton } from '../components/ui/Skeleton';

const MotionLink = motion(Link);

function SectionLabel({ text, center = false }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : ''}`}>
      <div className="w-7 h-0.5" style={{ background: '#E8733A' }} />
      <div className="w-3 h-0.5" style={{ background: '#E8733A' }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>{text}</span>
    </div>
  );
}

export default function StoreLocator() {
  const { data: stores, loading } = useApi(api.getStores, []);
  const [searchCity, setSearchCity] = useState('');
  const [tourPlaying, setTourPlaying] = useState(false);
  const [bookedStore, setBookedStore] = useState(null);

  const filteredStores = (stores || []).filter(
    (s) => s.city.toLowerCase().includes(searchCity.toLowerCase()) ||
           s.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: '#1e3a6e' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=30" alt=""
            className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,42,90,0.92) 0%, rgba(30,58,110,0.82) 60%, rgba(64,90,180,0.6) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.15) 0%, transparent 65%)', transform: 'translate(30%,-30%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest mb-7"
            style={{ background: 'rgba(232,115,58,0.15)', borderColor: 'rgba(232,115,58,0.4)', color: '#E8733A' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
            50+ Experience Centres Across India
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            style={{ fontFamily: 'var(--font-display, serif)' }}>
            Visit Our Experience<br /><span style={{ color: '#E8733A' }}>Centres</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Touch, feel and experience our materials, finishes and designs first-hand at a centre near you.
          </motion.p>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 max-w-lg mx-auto relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input type="text" placeholder="Search by city…" value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-white text-sm focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
              onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.18)'; e.target.style.borderColor = 'rgba(232,115,58,0.6)'; }}
              onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            />
          </motion.div>

          {/* Stat pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            {[{ n: '50+', s: 'Centres' }, { n: '35+', s: 'Cities' }, { n: '2L+', s: 'Sq.ft Display' }].map(({ n, s }) => (
              <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <span className="font-bold text-white text-sm">{n}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── GOOGLE MAP ── */}
      <section className="bg-white pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-8">
            <SectionLabel text="Find Us" center />
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
              Our Head Office Location
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-lg mx-auto">
              Visit us at our flagship experience centre or find a centre near you on the map.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative">
            {/* Map header bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100"
              style={{ background: '#1B2A4A' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                <FaMapMarkerAlt className="w-3 h-3" style={{ color: '#E8733A' }} />
                Skywood Furniture Pvt. Ltd., Nagpur
              </div>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '50%', minHeight: '280px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14877.136286855688!2d79.12740224486751!3d21.220581091459316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c5d13da082d3%3A0x93a93d0db0a6e75a!2sSkywood%20Furniture%20Pvt.%20Ltd.%20%7C%20Furniture%20Manufacturer%20in%20Nagpur%7C%20Chair%20Manufacturer%20in%20Nagpur!5e0!3m2!1sen!2sin!4v1778413702220!5m2!1sen!2sin"
                style={{ border: 0, display: 'block', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FurnoTech Location"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STORE CARDS ── */}
      <section className="py-14" style={{ background: '#F6F7F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <SectionLabel text="Experience Centres" />
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                Centres Near You
              </h2>
            </div>
            <span className="text-sm text-gray-400">
              <span className="font-bold" style={{ color: '#E8733A' }}>{filteredStores.length}</span> found
            </span>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : filteredStores.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
              <FaMapMarkerAlt className="w-10 h-10 mx-auto mb-4" style={{ color: '#E8733A', opacity: 0.4 }} />
              <p className="text-gray-400 text-sm">No centres found for &quot;{searchCity}&quot;</p>
              <button onClick={() => setSearchCity('')}
                className="mt-3 text-sm font-bold hover:-translate-y-0.5 transition-transform"
                style={{ color: '#E8733A' }}>
                Show all centres
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store, i) => (
                <motion.div key={store.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src={store.image_url || store.image} alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" loading="lazy" />
                    {/* City badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: 'rgba(27,42,74,0.75)', backdropFilter: 'blur(8px)' }}>
                      {store.city}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-sm mb-3" style={{ color: '#1B2A4A' }}>{store.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-xs text-gray-400">
                        <HiLocationMarker className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#E8733A' }} />
                        <span className="leading-relaxed">{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <HiPhone className="w-4 h-4 flex-shrink-0" style={{ color: '#E8733A' }} />
                        <a href={`tel:${store.phone}`} className="hover:text-[#E8733A] transition-colors">{store.phone}</a>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-gray-400">
                        <HiClock className="w-4 h-4 flex-shrink-0" style={{ color: '#E8733A' }} />
                        <span>{store.hours}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setBookedStore(store.name)}
                        className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wide transition-all hover:shadow-lg hover:-translate-y-0.5"
                        style={{ background: '#E8733A' }}>
                        Book Visit
                      </button>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5 border"
                        style={{ borderColor: '#E8733A', color: '#E8733A' }}>
                        <FaMapMarkerAlt className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 360° VIRTUAL TOUR ── */}
      <section className="py-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left: Stacked mockup images */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative select-none pb-16 sm:pb-16">

              {/* Dot grid */}
              <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, #E8733A 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />

              {/* Back image — website/store mockup */}
              <div className="rounded-2xl overflow-hidden shadow-xl ml-8 mt-4"
                style={{ aspectRatio: '4/3', border: '8px solid #1B2A4A' }}>
                <div className="w-full h-6 flex items-center gap-1.5 px-3" style={{ background: '#1B2A4A' }}>
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80"
                  alt="Store interior" className="w-full h-full object-cover" />
              </div>

              {/* Front 360° image */}
              <div className="absolute bottom-0 right-0 w-[55%] sm:w-[62%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                style={{ aspectRatio: '4/3' }}>
                <img src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80"
                  alt="360 virtual tour" className="w-full h-full object-cover" />
                {/* 360° overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'rgba(15,28,53,0.45)' }}>
                  <p className="text-5xl font-black text-white leading-none" style={{ fontFamily: 'var(--font-display, serif)' }}>360°</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-8 h-0.5 bg-white/60 rounded-full" />
                    <div className="w-3 h-3 rounded-full border-2 border-white/70 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white" />
                    </div>
                    <div className="w-8 h-0.5 bg-white/60 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
                onClick={() => setTourPlaying(true)}
                className="absolute z-20 flex items-center justify-center rounded-full shadow-2xl"
                style={{ width: 60, height: 60, top: '44%', left: '32%', transform: 'translate(-50%,-50%)', background: '#E8733A' }}
                aria-label="Play 360 tour">
                <FaPlay className="text-white w-5 h-5 ml-0.5" />
              </motion.button>
            </motion.div>

            {/* Right: Content */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionLabel text="Virtual Experience" />
              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1]"
                style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}>
                Showroom<br />Virtual Tour
              </h2>
              <p className="mt-5 leading-relaxed text-[15px]" style={{ color: '#6B7280' }}>
                Explore our experience centres without leaving your home. Our 360° virtual tours let you walk through every corner, examine materials up close, and visualise your dream space before your visit.
              </p>

              {/* Feature list */}
              <div className="mt-7 space-y-3">
                {['Explore every corner in full 360°', 'Examine materials & finishes up close', 'Available 24/7 from any device'].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(232,115,58,0.12)' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E8733A' }} />
                    </div>
                    <span className="text-sm" style={{ color: '#6B7280' }}>{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-9">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setTourPlaying(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-sm font-bold uppercase tracking-wide transition-all hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: '#1B2A4A' }}>
                  Discover More <FaArrowRight className="w-3.5 h-3.5" />
                </motion.button>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(232,115,58,0.1)' }}>
                    <FaVrCardboard className="w-4 h-4" style={{ color: '#E8733A' }} />
                  </div>
                  <span className="text-xs text-gray-400 leading-snug">VR<br />Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOOK CTA BANNER ── */}
      <section className="py-14 overflow-hidden" style={{ background: '#F6F7F9' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden relative"
            style={{ background: 'linear-gradient(130deg, #0F1C35 0%, #1B2A4A 45%, #243665 100%)' }}>

            {/* Animated dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Glowing orbs */}
            <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.18) 0%, transparent 65%)', transform: 'translate(-35%, 35%)' }} />
            <div className="absolute right-[45%] top-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(100,140,255,0.12) 0%, transparent 65%)', transform: 'translateY(-40%)' }} />

            <div className="grid lg:grid-cols-2 items-center">

              {/* Left — Content */}
              <div className="p-10 sm:p-14 relative z-10">
                {/* Live badge */}
                <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
                  style={{ background: 'rgba(232,115,58,0.15)', border: '1px solid rgba(232,115,58,0.35)', color: '#E8733A' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8733A] animate-pulse" />
                  Free — No Commitment
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-white leading-[1.15] mb-4"
                  style={{ fontFamily: 'var(--font-display, serif)' }}>
                  Ready to Visit<br /><span style={{ color: '#E8733A' }}>in Person?</span>
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.25 }}
                  className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Book a free appointment with one of our design consultants at the centre nearest to you. Walk-ins welcome too.
                </motion.p>

                {/* CTA button with glow */}
                <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-4">
                  <MotionLink to="/#consultation"
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white text-sm font-bold uppercase tracking-wide relative group"
                    style={{ background: '#E8733A', boxShadow: '0 4px 18px rgba(232,115,58,0.3)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,115,58,0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 18px rgba(232,115,58,0.3)'; }}>
                    Book Free Consultation
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </MotionLink>
                  <a href="tel:18003090930"
                    className="text-xs font-semibold transition-colors hover:text-[#E8733A]"
                    style={{ color: 'rgba(255,255,255,0.40)' }}>
                    or call 1800-309-0930
                  </a>
                </motion.div>

                {/* Trust row */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 }}
                  className="flex items-center gap-5 mt-8">
                  {[{ n: '10k+', l: 'Happy Clients' }, { n: '45d', l: 'Delivery' }, { n: '5★', l: 'Rating' }].map(({ n, l }) => (
                    <div key={l} className="flex flex-col">
                      <span className="text-base font-bold text-white leading-none">{n}</span>
                      <span className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — Image collage */}
              <div className="relative hidden lg:block h-full min-h-[360px] overflow-hidden">
                {/* Right edge orange strip */}
                <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ background: '#E8733A' }} />

                {/* Main image */}
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=80"
                    alt="Experience centre" className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #1B2A4A 0%, transparent 50%)' }} />
                </div>

                {/* Floating card — consultant */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.35 }}
                  animate={{ y: [0, -6, 0] }}
                  className="absolute bottom-10 right-6 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#E8733A]">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
                      alt="Consultant" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-bold">Priya Sharma</p>
                    <p className="text-white/50 text-[10px]">Senior Design Consultant</p>
                  </div>
                  <div className="flex items-center gap-0.5 ml-1">
                    {[1,2,3,4,5].map((s) => <span key={s} className="text-[#E8733A] text-[9px]">★</span>)}
                  </div>
                </motion.div>

                {/* Floating card — slots */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.45 }}
                  animate={{ y: [0, 6, 0] }}
                  className="absolute top-10 right-8 z-20 px-4 py-3 rounded-2xl shadow-xl"
                  style={{ background: '#E8733A', minWidth: 148 }}>
                  <p className="text-white text-[10px] font-bold uppercase tracking-wide mb-1.5">Next Available</p>
                  <p className="text-white text-sm font-bold">Today, 3:00 PM</p>
                  <p className="text-white/70 text-[10px] mt-0.5">6 slots remaining</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 360 TOUR LIGHTBOX ── */}
      <AnimatePresence>
        {tourPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            onClick={() => setTourPlaying(false)}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-900 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}>
              <div className="text-center p-12">
                <FaVrCardboard className="w-14 h-14 mx-auto mb-4 text-white/20" />
                <p className="text-white/50 text-sm">360° Virtual Tour</p>
                <p className="text-white/30 text-xs mt-1">Coming soon — connect your VR device to explore</p>
                <button onClick={() => setTourPlaying(false)}
                  className="mt-6 text-xs text-white/40 hover:text-white transition-colors underline">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOOK VISIT TOAST ── */}
      <AnimatePresence>
        {bookedStore && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3"
            style={{ background: '#1B2A4A', minWidth: 280 }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E8733A' }}>
              <FaCalendarAlt className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-bold">Visit Booked!</p>
              <p className="text-white/50 text-[11px]">We'll confirm your slot at {bookedStore}</p>
            </div>
            <button onClick={() => setBookedStore(null)} className="text-white/40 hover:text-white text-lg leading-none">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
