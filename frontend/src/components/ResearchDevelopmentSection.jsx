import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const DEFAULT_TIMELINE = [
  {
    year: '2014',
    title: 'Foundation & First Principles',
    description: 'AeroMac Dynamics established with a core mandate to reimagine propulsion systems for the next generation of atmospheric and orbital vehicles.',
    icon: 'Rocket',
    tag: 'Genesis',
  },
  {
    year: '2016',
    title: 'Hypersonic Aerodynamics Lab',
    description: 'Opened a dedicated hypersonic wind tunnel facility capable of sustained Mach 8+ testing, yielding breakthrough drag-reduction coefficients.',
    icon: 'Wind',
    tag: 'Infrastructure',
  },
  {
    year: '2018',
    title: 'Neural Flight Control AI',
    description: 'Deployed first onboard AI co-pilot achieving sub-millisecond adaptive control under extreme turbulence — 40% improvement over legacy fly-by-wire systems.',
    icon: 'Brain',
    tag: 'Artificial Intelligence',
  },
  {
    year: '2020',
    title: 'Autonomous Swarm Drones',
    description: 'Demonstrated coordinated autonomous swarm operations with 128 UAVs over contested airspace, setting a new benchmark for distributed aerial intelligence.',
    icon: 'Radio',
    tag: 'Autonomous Systems',
  },
  {
    year: '2022',
    title: 'Plasma Propulsion Prototype',
    description: 'Successfully tested a compact plasma-ion thruster achieving 6,200 s specific impulse — redefining efficiency targets for deep-space mission profiles.',
    icon: 'Zap',
    tag: 'Propulsion',
  },
  {
    year: '2024',
    title: 'Orbital AI Integration',
    description: 'Integrated real-time machine learning telemetry across a constellation of 24 low-earth-orbit satellites, enabling autonomous orbital correction at scale.',
    icon: 'Globe',
    tag: 'Space Systems',
  },
];

function AnimatedSVGWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0088ff" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0088ff" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#0088ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z"
          fill="url(#waveGrad1)"
          filter="url(#glow)"
          animate={{ d: [
            "M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z",
            "M0,180 C240,100 480,240 720,180 C960,120 1200,240 1440,180 L1440,320 L0,320 Z",
            "M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,200 C360,140 720,260 1080,200 C1260,170 1380,220 1440,200 L1440,320 L0,320 Z"
          fill="url(#waveGrad2)"
          filter="url(#glow)"
          animate={{ d: [
            "M0,200 C360,140 720,260 1080,200 C1260,170 1380,220 1440,200 L1440,320 L0,320 Z",
            "M0,220 C360,260 720,140 1080,220 C1260,250 1380,180 1440,220 L1440,320 L0,320 Z",
            "M0,200 C360,140 720,260 1080,200 C1260,170 1380,220 1440,200 L1440,320 L0,320 Z",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
      <svg
        className="absolute top-0 left-0 w-full opacity-30"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="topWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="40%" stopColor="#00d4ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,80 C480,160 960,0 1440,80 L1440,0 L0,0 Z"
          fill="url(#topWaveGrad)"
          animate={{ d: [
            "M0,80 C480,160 960,0 1440,80 L1440,0 L0,0 Z",
            "M0,60 C480,0 960,140 1440,60 L1440,0 L0,0 Z",
            "M0,80 C480,160 960,0 1440,80 L1440,0 L0,0 Z",
          ]}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function GlowDot({ index, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={`Timeline step ${index + 1}`}
      className="relative flex items-center justify-center w-4 h-4 rounded-full focus:outline-none"
      whileHover={{ scale: 1.4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <span
        className={`absolute inset-0 rounded-full ${
          isActive
            ? 'bg-cyan-400 shadow-[0_0_12px_3px_rgba(0,212,255,0.7)]'
            : 'bg-slate-600'
        } transition-all duration-500`}
      />
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-full bg-cyan-400 opacity-40"
          animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  );
}

function TimelineCard({ item, index, isActive, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const IconComp = Icons[item?.icon] || Icons['HelpCircle'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-pressed={isActive}
      className="cursor-pointer group relative flex flex-col min-w-[260px] max-w-[320px] w-full flex-shrink-0 rounded-2xl p-6 border border-white/10 focus:outline-none"
      style={{}
      }
      whileHover={{ y: -6, scale: 1.025 }}
    >
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isActive
            ? 'bg-gradient-to-br from-cyan-950/60 via-slate-900/80 to-blue-950/60 border border-cyan-500/40 shadow-[0_0_32px_0_rgba(0,212,255,0.18)]'
            : 'bg-white/5 backdrop-blur-sm border-white/10'
        }`}
      />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${
              isActive
                ? 'text-cyan-300 border-cyan-500/50 bg-cyan-900/30'
                : 'text-slate-400 border-slate-700/60 bg-slate-800/40'
            } transition-all duration-500`}
          >
            {item?.tag}
          </span>
          <div
            className={`flex items-center justify-center w-9 h-9 rounded-xl ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                : 'bg-slate-800/60 text-slate-400'
            } transition-all duration-500`}
          >
            <IconComp size={18} strokeWidth={1.8} />
          </div>
        </div>
        <div>
          <p
            className={`text-5xl font-bold tracking-tight leading-none mb-1 ${
              isActive
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400'
                : 'text-slate-600'
            } transition-all duration-500`}
          >
            {item?.year}
          </p>
          <h3
            className={`text-base font-semibold leading-snug ${
              isActive ? 'text-white' : 'text-slate-300'
            } transition-colors duration-500`}
          >
            {item?.title}
          </h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          {item?.description}
        </p>
        {isActive && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full origin-left"
          />
        )}
      </div>
    </motion.div>
  );
}

function ResearchDevelopmentSection({ timeline }) {
  const data = timeline?.length ? timeline : DEFAULT_TIMELINE;
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const ChevronLeft = Icons['ChevronLeft'] || Icons['HelpCircle'];
  const ChevronRight = Icons['ChevronRight'] || Icons['HelpCircle'];
  const FlaskConical = Icons['FlaskConical'] || Icons['HelpCircle'];

  const handlePrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setActiveIndex((i) => Math.min(data.length - 1, i + 1));

  return (
    <section
      ref={sectionRef}
      id="rnd"
      className="relative w-full bg-black overflow-hidden py-24 md:py-32"
      aria-label="Research and Development Timeline"
    >
      <AnimatedSVGWaves />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <FlaskConical size={20} strokeWidth={1.8} />
            </div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400">
              Research & Development
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none mb-5">
            Decade of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300">
              Breakthrough Science
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            From foundational aerodynamics to orbital AI, every milestone in our R&D history
            represents a deliberate leap in aerospace capability and human ambition.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={sectionInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="relative mb-10 origin-left"
        >
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent">
            <motion.div
              className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
              animate={{ opacity: [0.3, 1, 0.3], x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-0">
            {data.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
              >
                <GlowDot
                  index={i}
                  isActive={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-2 px-2">
            <AnimatePresence mode="sync">
              {data.map((item, i) => (
                <div key={item?.year ?? i} className="snap-start flex-shrink-0">
                  <TimelineCard
                    item={item}
                    index={i}
                    isActive={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-between mt-10"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous milestone"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === data.length - 1}
              aria-label="Next milestone"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to milestone ${i + 1}`}
                className={`rounded-full transition-all duration-400 ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.6)]'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="text-sm text-slate-500 font-medium tabular-nums">
            <span className="text-cyan-400">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            <span>{String(data.length).padStart(2, '0')}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 md:mt-20 p-8 md:p-10 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
            >
              <div className="flex-shrink-0">
                <p className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300/40 to-blue-500/40 leading-none">
                  {data[activeIndex]?.year}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-2">
                  {data[activeIndex]?.tag}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  {data[activeIndex]?.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
                  {data[activeIndex]?.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default ResearchDevelopmentSection;
