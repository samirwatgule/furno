import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HiHome, HiLocationMarker, HiUserGroup, HiStar,
  HiShieldCheck, HiClock, HiCheckCircle,
} from 'react-icons/hi';

const COUNTER_STATS = [
  { Icon: HiHome,         label: 'Happy Homes',      end: 100000, display: '1,00,000+' },
  { Icon: HiLocationMarker, label: 'Cities Served',  end: 50,     display: '50+'       },
  { Icon: HiUserGroup,    label: 'Expert Designers',  end: 150,    display: '150+'      },
  { Icon: HiStar,         label: 'Awards Won',        end: 25,     display: '25+'       },
];

const SKILLS = [
  { label: 'Design Quality',        percent: 95, Icon: HiShieldCheck },
  { label: 'On-Time Delivery',      percent: 90, Icon: HiClock       },
  { label: 'Customer Satisfaction', percent: 98, Icon: HiCheckCircle },
];

function useCountUp(target, active, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const raf = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function CounterItem({ Icon, label, end, display, active }) {
  const count = useCountUp(end, active);
  const formatted =
    end >= 1000
      ? count.toLocaleString('en-IN') + '+'
      : count + '+';

  return (
    <div className="flex items-center gap-4 px-6 sm:px-8 py-6">
      {/* Orange circle icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          border: '2px solid #E8733A',
          background: 'rgba(232,115,58,0.12)',
        }}
      >
        <Icon className="w-6 h-6" style={{ color: '#E8733A' }} />
      </div>

      {/* Label + number */}
      <div>
        <p className="text-xs sm:text-sm font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
          {label}
        </p>
        <p className="text-2xl sm:text-3xl font-black text-white leading-none">
          {active ? formatted : display}
        </p>
      </div>
    </div>
  );
}

function SkillBar({ label, percent, Icon, index, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
      className="mb-5"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: '#E8733A' }} />
          <span className="text-sm font-semibold text-gray-800">{label}</span>
        </div>
        <span className="text-sm font-bold" style={{ color: '#E8733A' }}>{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: '#F0F0F0' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #E8733A, #f4a06b)' }}
          initial={{ width: 0 }}
          animate={active ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: 0.35 + index * 0.15, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} id="why-us" className="relative">

      {/* ── Top: Dark counter banner ── */}
      <div
        className="relative pt-16 sm:pt-20 pb-32 sm:pb-40 overflow-hidden"
        style={{ backgroundColor: '#0d1526' }}
      >
        {/* Background image layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1400&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(13,21,38,0.6) 0%, rgba(13,21,38,0.3) 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {/* COUNTER label */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: '#E8733A' }} />
              <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: '#E8733A' }}>
                Counter
              </span>
              <div className="h-px w-10" style={{ background: '#E8733A' }} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display, serif)' }}
            >
              What We Have Achieved
            </h2>
          </motion.div>

          {/* Counter stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.04)' }}
          >
            {COUNTER_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`${i % 2 !== 0 ? 'border-l' : ''} ${i >= 2 ? 'border-t' : ''} lg:border-t-0 ${i > 0 ? 'lg:border-l' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.10)' }}
              >
                <CounterItem {...stat} active={inView} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* ── Bottom: White card with image + skill bars ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-0 -mt-24 sm:-mt-28 relative z-10 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
            style={{ border: '1px solid #F0F0F0' }}
          >
            {/* Left: image */}
            <div className="relative lg:w-[45%] min-h-[320px] lg:min-h-[420px] overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=85"
                alt="Interior design showcase"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Diagonal pattern overlay */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.06) 8px, rgba(255,255,255,0.06) 9px)',
                }}
              />
              {/* Award badge */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-white text-xs font-bold shadow-lg"
                style={{ background: '#E8733A' }}
              >
                <HiStar className="w-4 h-4" />
                25+ Industry Awards Won
              </div>
            </div>

            {/* Right: content */}
            <div className="flex-1 px-8 sm:px-10 py-10 lg:py-12 flex flex-col justify-center">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: '#E8733A' }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#E8733A' }}>
                  Why Choose Us
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-bold leading-snug mb-3"
                style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}
              >
                We Are Giving You A<br />
                Beautifully Designed Home
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-md">
                From the first design consultation to the final nail — we handle everything.
                Our experts deliver spaces that are stunning, functional, and built to last,
                with a guaranteed 45-day move-in timeline.
              </p>

              {/* Skill bars */}
              <div>
                {SKILLS.map((skill, i) => (
                  <SkillBar key={skill.label} {...skill} index={i} active={inView} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
