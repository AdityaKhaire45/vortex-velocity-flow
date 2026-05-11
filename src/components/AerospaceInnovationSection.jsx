import { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import aerospaceLabImg from '../assets/aerospace_engineering_lab_dark.jpg';
import aerospaceTechImg from '../assets/aerospace_technology_dark_futuristic.jpg';
import aiNeuralImg from '../assets/ai_neural_network_dark_blue.jpg';
import droneTechImg from '../assets/drone_technology_dark_background.jpg';
import cockpitImg from '../assets/futuristic_cockpit_dark_cinematic.jpg';
import satelliteImg from '../assets/satellite_space_dark_cinematic.jpg';

const TECH_DATA = [
  {
    id: 'propulsion',
    title: 'Advanced Propulsion Systems',
    description: 'Next-generation ion drives and hybrid rocket engines pushing the boundaries of thrust-to-weight ratios for deep space missions.',
    image: aerospaceTechImg,
    icon: 'Rocket',
    tag: 'Propulsion',
    stat: '4,200 kN',
    statLabel: 'Max Thrust',
  },
  {
    id: 'ai-navigation',
    title: 'AI-Driven Navigation',
    description: 'Real-time autonomous flight path optimization using neural networks trained on petabytes of atmospheric and orbital data.',
    image: aiNeuralImg,
    icon: 'Brain',
    tag: 'Artificial Intelligence',
    stat: '0.003ms',
    statLabel: 'Decision Latency',
  },
  {
    id: 'drone-swarm',
    title: 'Drone Swarm Intelligence',
    description: 'Coordinated multi-agent drone systems enabling precision aerial mapping, surveillance, and autonomous payload delivery at scale.',
    image: droneTechImg,
    icon: 'RadioTower',
    tag: 'Drone Systems',
    stat: '512 Units',
    statLabel: 'Swarm Capacity',
  },
  {
    id: 'cockpit',
    title: 'Holographic Cockpit Interface',
    description: 'Immersive AR/VR cockpit environments with gesture-controlled HUDs, predictive threat modeling, and biometric pilot sync.',
    image: cockpitImg,
    icon: 'Monitor',
    tag: 'Human-Machine Interface',
    stat: '360°',
    statLabel: 'Field of View',
  },
  {
    id: 'satellite',
    title: 'Satellite Mesh Networks',
    description: 'Low-Earth orbit constellation delivering sub-10ms global latency communications for both civilian and defense applications.',
    image: satelliteImg,
    icon: 'Satellite',
    tag: 'Space Systems',
    stat: '< 10ms',
    statLabel: 'Global Latency',
  },
  {
    id: 'rnd',
    title: 'R&D Engineering Labs',
    description: 'State-of-the-art facilities housing hypersonic wind tunnels, quantum materials synthesis, and advanced composites fabrication.',
    image: aerospaceLabImg,
    icon: 'FlaskConical',
    tag: 'Research & Development',
    stat: '47 Patents',
    statLabel: 'Filed in 2024',
  },
];

function TiltCard({ card, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [12, -12]);
  const rotateY = useTransform(x, [-80, 80], [-12, 12]);

  const CardIcon = Icons[card?.icon] || Icons['HelpCircle'];

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer"
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? '0 0 0 1.5px #00d4ff, 0 24px 64px rgba(0, 212, 255, 0.22), 0 8px 24px rgba(0, 136, 255, 0.15)'
            : '0 0 0 1px rgba(0,212,255,0.12), 0 8px 32px rgba(0,0,0,0.5)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(0,20,40,0.92) 0%, rgba(0,8,20,0.96) 100%)' }}
      >
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          {!imgError ? (
            <img
              src={card?.image}
              alt={card?.title}
              onError={(e) => { e.currentTarget.style.display = 'none'; setImgError(true); }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
              <CardIcon className="w-16 h-16 text-cyan-400 opacity-40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[rgba(0,8,20,0.4)] to-transparent" />
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10"
          />
          <div className="absolute top-4 left-4">
            <span className="text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300"
              style={{ background: 'rgba(0,212,255,0.08)' }}>
              {card?.tag}
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1, backgroundColor: hovered ? 'rgba(0,212,255,0.2)' : 'rgba(0,212,255,0.08)' }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-xl border border-cyan-400/40 flex items-center justify-center"
            >
              <CardIcon className="w-5 h-5 text-cyan-300" />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-6 gap-4">
          <div>
            <h3 className="text-white font-bold text-lg leading-snug tracking-tight mb-2 font-inter">
              {card?.title}
            </h3>
            <p className="text-sm leading-relaxed"
              style={{ background: 'linear-gradient(135deg, #60c8ff 0%, #00d4ff 50%, #7eb8ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {card?.description}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold tracking-tight"
                style={{ background: 'linear-gradient(90deg, #00d4ff, #0088ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {card?.stat}
              </div>
              <div className="text-xs text-slate-500 tracking-wider uppercase mt-0.5">{card?.statLabel}</div>
            </div>
            <motion.div
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
              transition={{ duration: 0.25 }}
            >
              {(() => { const ArrowIcon = Icons['ArrowUpRight'] || Icons['HelpCircle']; return <ArrowIcon className="w-5 h-5 text-cyan-400" />; })()}
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }}
        />
      </motion.div>
    </motion.div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,136,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,136,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '256px 256px',
        }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,136,255,0.06) 0%, transparent 70%)' }}
      />

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            top: `${15 + i * 18}%`,
            left: 0,
            right: 0,
            background: `linear-gradient(90deg, transparent, rgba(0,212,255,${0.06 + i * 0.01}), transparent)`,
          }}
          animate={{ opacity: [0, 1, 0], scaleX: [0.3, 1, 0.3] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
        />
      ))}
    </div>
  );
}

function HolographicWidget({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={`rounded-2xl border border-cyan-400/15 p-4 backdrop-blur-md ${className}`}
      style={{ background: 'rgba(0,20,40,0.6)' }}
    >
      {children}
    </motion.div>
  );
}

function AerospaceInnovationSection({ tech_showcase }) {
  const sectionRef = useRef(null);
  const headingInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const dataSource = tech_showcase?.length ? tech_showcase : TECH_DATA;

  const filters = ['All', 'Propulsion', 'Artificial Intelligence', 'Drone Systems', 'Human-Machine Interface', 'Space Systems', 'Research & Development'];

  const filtered = activeFilter === 'All'
    ? dataSource
    : dataSource?.filter((item) => item?.tag === activeFilter);

  const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
  const ZapIcon = Icons['Zap'] || Icons['HelpCircle'];
  const ActivityIcon = Icons['Activity'] || Icons['HelpCircle'];
  const ShieldIcon = Icons['Shield'] || Icons['HelpCircle'];

  return (
    <section
      id="aerospace-innovation"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000814 0%, #000a1a 50%, #000814 100%)' }}
    >
      <GridBackground />

      <div className="relative z-10 mx-auto px-6 md:px-10 lg:px-16" style={{ maxWidth: '1640px' }}>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400">
                Core Technologies
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white mb-5 font-inter"
            >
              Aerospace
              <span className="block"
                style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 60%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Innovation Suite
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-slate-400 text-lg leading-relaxed"
            >
              AeroMac Dynamics integrates cutting-edge propulsion, AI autonomy, and space systems into a unified technology ecosystem redefining what is possible beyond Earth.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <HolographicWidget delay={0.4}>
              <div className="flex flex-col gap-3 min-w-[200px]">
                {[
                  { icon: 'ZapIcon', label: 'Systems Online', value: '99.97%', comp: ZapIcon },
                  { icon: 'ActivityIcon', label: 'Active Projects', value: '24', comp: ActivityIcon },
                  { icon: 'ShieldIcon', label: 'Clearance Level', value: 'ALPHA-7', comp: ShieldIcon },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <item.comp className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs text-slate-400 tracking-wide">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold text-cyan-300 tracking-wider">{item.value}</span>
                  </div>
                ))}
                <div className="mt-1 flex items-center gap-2 pt-3 border-t border-white/5">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-xs text-emerald-400 tracking-wide">All Systems Nominal</span>
                </div>
              </div>
            </HolographicWidget>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 border"
              style={{
                borderColor: activeFilter === filter ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.12)',
                color: activeFilter === filter ? '#00d4ff' : 'rgba(148,163,184,0.8)',
                background: activeFilter === filter ? 'rgba(0,212,255,0.1)' : 'transparent',
              }}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(0,212,255,0.08)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              )}
              {filter}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
          >
            {filtered?.map((card, index) => (
              <TiltCard key={card?.id} card={card} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-slate-500 text-lg">No technologies found for this category.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'R&D Investment', value: '$2.4B', sub: 'Annual Budget 2024', icon: 'TrendingUp' },
            { label: 'Engineers Worldwide', value: '18,400+', sub: 'Across 12 Countries', icon: 'Users' },
            { label: 'Missions Completed', value: '340+', sub: 'Since Founding', icon: 'CheckCircle2' },
          ].map((stat, i) => {
            const StatIcon = Icons[stat?.icon] || Icons['HelpCircle'];
            return (
              <HolographicWidget key={i} delay={0.1 * i} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,136,255,0.08))', border: '1px solid rgba(0,212,255,0.2)' }}>
                  <StatIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tight">{stat?.value}</div>
                  <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">{stat?.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat?.sub}</div>
                </div>
              </HolographicWidget>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-cyan-400/15"
          style={{ background: 'linear-gradient(135deg, rgba(0,20,40,0.8) 0%, rgba(0,8,20,0.9) 100%)' }}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              {(() => { const ZapIconInline = Icons['Zap'] || Icons['HelpCircle']; return <ZapIconInline className="w-4 h-4 text-cyan-400" />; })()}
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400">Partnership Program</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Ready to Pioneer the Future?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Join AeroMac Dynamics as a technology partner or R&D collaborator. Access our innovation labs, co-develop next-gen aerospace solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Vetted Partner Access', 'Shared IP Framework', 'Joint Mission Ops'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300 tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase text-black"
              style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 100%)' }}
            >
              Initiate Partnership
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AerospaceInnovationSection;
