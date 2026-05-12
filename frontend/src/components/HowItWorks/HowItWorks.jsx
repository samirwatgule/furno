import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { howItWorks as fallbackSteps } from '../../data/siteData';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HiPhone, HiPencil, HiCube, HiTruck, HiHome } from 'react-icons/hi';

const STEP_ICONS = [HiPhone, HiPencil, HiCube, HiTruck, HiHome];

export default function HowItWorks() {
  const { data: steps } = useApi(api.getProcessSteps, fallbackSteps);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);
  const [instant, setInstant] = useState(false);
  const currentRef = useRef(0);

  useEffect(() => {
    if (!inView || !steps || steps.length === 0) return;

    const advance = () => {
      currentRef.current += 1;
      if (currentRef.current > steps.length) {
        setInstant(true);
        setActiveStep(0);
        currentRef.current = 0;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setInstant(false);
            currentRef.current = 1;
            setActiveStep(1);
          })
        );
      } else {
        setInstant(false);
        setActiveStep(currentRef.current);
      }
    };

    const startTimer = setTimeout(() => {
      currentRef.current = 1;
      setActiveStep(1);
    }, 400);

    const interval = setInterval(advance, 700);
    return () => { clearTimeout(startTimer); clearInterval(interval); };
  }, [inView, steps]);

  if (!steps || steps.length === 0) return null;

  const lineProgress = steps.length > 1
    ? Math.max(0, ((activeStep - 1) / (steps.length - 1)) * 100)
    : 0;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-10 sm:py-16 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="text-[#E8733A] text-xs font-bold uppercase tracking-[0.2em]">
            Your Journey
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: '#1B2A4A', fontFamily: 'var(--font-display, serif)' }}
          >
            How It Works
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-lg mx-auto">
            From your first call to moving in — simple, fast, and fully handled.
          </p>
        </motion.div>

        {/* ── Desktop: horizontal stepper ── */}
        <div className="hidden lg:block">
          {/* Step circles + connector */}
          <div className="relative flex items-start justify-between mb-12">
            {/* Background track */}
            <div
              className="absolute top-7 left-[calc(10%)] right-[calc(10%)] h-[2px]"
              style={{ background: '#E5E7EB' }}
            >
              <motion.div
                className="h-full origin-left"
                style={{ background: 'linear-gradient(90deg, #E8733A, #f4a06b)' }}
                animate={{ width: `${lineProgress}%` }}
                transition={{ duration: instant ? 0 : 0.5, ease: 'easeInOut' }}
              />
            </div>

            {steps.map((step, idx) => {
              const isActive = step.step <= activeStep;
              const isCurrent = step.step === activeStep;
              const Icon = STEP_ICONS[idx] || HiPhone;

              return (
                <div key={step.step} className="flex flex-col items-center flex-1">
                  {/* Circle */}
                  <motion.div
                    animate={{
                      background: isActive
                        ? 'linear-gradient(135deg, #E8733A 0%, #f4a06b 100%)'
                        : '#F3F4F6',
                      boxShadow: isCurrent
                        ? '0 0 0 6px rgba(232,115,58,0.15), 0 4px 16px rgba(232,115,58,0.3)'
                        : 'none',
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-14 h-14 rounded-full flex items-center justify-center relative z-10 mb-5"
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: isActive ? '#fff' : '#9CA3AF' }}
                    />
                  </motion.div>

                  {/* Step label */}
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: isActive ? '#E8733A' : '#D1D5DB' }}
                  >
                    Step {step.step}
                  </span>

                  {/* Title */}
                  <motion.h3
                    animate={{ color: isActive ? '#1B2A4A' : '#9CA3AF' }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-bold text-center leading-tight px-2"
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    animate={{ opacity: isActive ? 0.7 : 0.35 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-xs text-gray-500 text-center leading-relaxed px-3"
                  >
                    {step.description}
                  </motion.p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: vertical stepper ── */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, idx) => {
            const isActive = step.step <= activeStep;
            const isCurrent = step.step === activeStep;
            const isLast = idx === steps.length - 1;
            const Icon = STEP_ICONS[idx] || HiPhone;

            return (
              <div key={step.step} className="flex gap-4">
                {/* Left: circle + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    animate={{
                      background: isActive
                        ? 'linear-gradient(135deg, #E8733A 0%, #f4a06b 100%)'
                        : '#F3F4F6',
                      boxShadow: isCurrent ? '0 0 0 5px rgba(232,115,58,0.15)' : 'none',
                    }}
                    transition={{ duration: 0.35 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: isActive ? '#fff' : '#9CA3AF' }}
                    />
                  </motion.div>
                  {!isLast && (
                    <div
                      className="w-[2px] flex-1 min-h-[40px] mt-1 rounded-full overflow-hidden"
                      style={{ background: '#E5E7EB' }}
                    >
                      <motion.div
                        className="w-full rounded-full"
                        style={{ background: '#E8733A' }}
                        animate={{ height: isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                      />
                    </div>
                  )}
                </div>

                {/* Right: content */}
                <div className="flex-1 pb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: isActive ? '#E8733A' : '#D1D5DB' }}
                  >
                    Step {step.step}
                  </span>
                  <motion.h3
                    animate={{ color: isActive ? '#1B2A4A' : '#9CA3AF' }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 text-sm font-bold leading-tight"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    animate={{ opacity: isActive ? 0.65 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 text-xs text-gray-500 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
