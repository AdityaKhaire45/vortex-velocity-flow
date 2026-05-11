import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import droneImg from '../assets/drone_technology_dark_background.jpg';

const DRONES = [
  {
    id: 1,
    name: 'AeroMac Phantom X1',
    tagline: 'Stealth Reconnaissance',
    image: droneImg,
    specs: [
      { label: 'Range', value: '120 km' },
      { label: 'Altitude', value: '18,000 ft' },
      { label: 'Payload', value: '8.5 kg' },
      { label: 'Speed', value: '340 km/h' },
      { label: 'Endurance', value: '14 hrs' },
    ],
    badge: 'CLASSIFIED',
    accentColor: '#00d4ff',
  },
  {
    id: 2,
    name: 'AeroMac Raptor-7',
    tagline: 'AI Combat Systems',
    image: droneImg,
    specs: [
      { label: 'Range', value: '280 km' },
      { label: 'Altitude', value: '32,000 ft' },
      { label: 'Payload', value: '22 kg' },
      { label: 'Speed', value: '720 km/h' },
      { label: 'Endurance', value: '9 hrs' },
    ],
    badge: 'ADVANCED',
    accentColor: '#0088ff',
  },
  {
    id: 3,
    name: 'AeroMac Sentinel S3',
    tagline: 'Border Intelligence',
    image: droneImg,
    specs: [
      { label: 'Range', value: '500 km' },
      { label: 'Altitude', value: '45,000 ft' },
      { label: 'Payload', value: '35 kg' },
      { label: 'Speed', value: '890 km/h' },
      { label: 'Endurance', value: '22 hrs' },
    ],
    badge: 'NEXT-GEN',
    accentColor: '#00ffcc',
  },
  {
    id: 4,
    name: 'AeroMac Nova Micro',
    tagline: 'Urban Swarm AI',
    image: droneImg,
    specs: [
      { label: 'Range', value: '15 km' },
      { label: 'Altitude', value: '3,200 ft' },
      { label: 'Payload', value: '0.8 kg' },
      { label: 'Speed', value: '95 km/h' },
      { label: 'Endurance', value: '45 min' },
    ],
    badge: 'PROTOTYPE',
    accentColor: '#7c3aed',
  },
];

function SpecTicker({ specs }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % (specs?.length || 1));
    }, 2200);
    return () => clearInterval(id);
  }, [specs?.length]);

  const current = specs?.[index];

  return (
    <div className="flex items-center gap-3 h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex items-center gap-2 w-full"
        >
          <span className="text-xs font-medium tracking-widest text-cyan-400/70 uppercase">
            {current?.label}
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
          <span className="text-sm font-bold tracking-tight text-white">
            {current?.value}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PulseRing({ delay = 0, size = 'w-3 h-3', color = 'bg-cyan-400' }) {
  return (
    <motion.span
      className={`absolute rounded-full ${size} ${color} opacity-70`}
      animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function DroneCard({ drone, index }) {
  const [hovered, setHovered] = useState(false);

  const ZapIcon = Icons['Zap'] || Icons['HelpCircle'];
  const ShieldIcon = Icons['Shield'] || Icons['HelpCircle'];
  const CpuIcon = Icons['Cpu'] || Icons['HelpCircle'];
  const AirplayIcon = Icons['Airplay'] || Icons['HelpCircle'];
  const badgeIcons = [ZapIcon, ShieldIcon, CpuIcon, AirplayIcon];
  const BadgeIcon = badgeIcons[index % badgeIcons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.14, ease: 'easeOut' }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none z-0"
        style={{
          background: hovered
            ? `radial-gradient(ellipse at 50% 0%, ${drone?.accentColor}44 0%, transparent 70%)`
            : 'transparent',
          transition: 'background 0.5s ease',
        }}
      />

      <div className="absolute top-4 right-4 z-20">
        <PulseRing delay={index * 0.6} size="w-2 h-2" color="bg-cyan-400" />
      </div>
      <div className="absolute bottom-8 left-3 z-20">
        <PulseRing delay={index * 0.3 + 1} size="w-1.5 h-1.5" color="bg-blue-400" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl"
        style={{ background: 'rgba(0,8,20,0.72)' }}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: hovered
              ? `0 0 0 1.5px ${drone?.accentColor}66, 0 8px 48px ${drone?.accentColor}22, inset 0 0 32px ${drone?.accentColor}11`
              : '0 0 0 1px rgba(255,255,255,0.07), inset 0 0 24px rgba(0,212,255,0.04)',
            transition: 'box-shadow 0.45s ease',
          }}
        />

        <div className="relative overflow-hidden rounded-t-2xl h-48">
          <motion.img
            src={drone?.image}
            alt={drone?.name}
            className="w-full h-full object-cover"
            animate={hovered ? { scale: 1.08, y: -6 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x300/001020/00d4ff?text=DRONE';
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,8,20,0.95) 0%, rgba(0,8,20,0.3) 50%, transparent 100%)',
            }}
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: `${drone?.accentColor}22`,
                border: `1px solid ${drone?.accentColor}66`,
                color: drone?.accentColor,
              }}
            >
              {BadgeIcon ? <BadgeIcon size={10} /> : null}
              {drone?.badge}
            </span>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${drone?.accentColor}18 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="flex flex-col flex-1 p-6 gap-4">
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: drone?.accentColor }}
            >
              {drone?.tagline}
            </p>
            <h3 className="text-lg font-bold tracking-tight text-white leading-snug font-mono">
              {drone?.name}
            </h3>
          </div>

          <div
            className="rounded-xl px-4 py-3"
            style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.10)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: drone?.accentColor }}
              />
              <span className="text-xs text-white/30 tracking-widest uppercase font-medium">
                Live Specs
              </span>
            </div>
            <SpecTicker specs={drone?.specs} />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-auto">
            {drone?.specs?.slice(0, 3)?.map((spec) => (
              <div
                key={spec?.label}
                className="flex flex-col items-center rounded-lg py-2 px-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs font-bold text-white/90 leading-tight">
                  {spec?.value}
                </span>
                <span className="text-[10px] text-white/30 tracking-wide uppercase mt-0.5">
                  {spec?.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DroneTechnologySection({ drones }) {
  const droneData = drones ?? DRONES;

  const CpuIcon = Icons['Cpu'] || Icons['HelpCircle'];
  const ChevronRightIcon = Icons['ChevronRight'] || Icons['HelpCircle'];
  const RadioIcon = Icons['Radio'] || Icons['HelpCircle'];

  return (
    <section
      id="drones"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #000d1a 50%, #000510 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,136,255,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 30% at 80% 80%, rgba(0,212,255,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(0,212,255,0.10)',
                border: '1px solid rgba(0,212,255,0.30)',
                color: '#00d4ff',
              }}
            >
              <RadioIcon size={11} />
              Drone Division
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-none mb-4"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Drone{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Technology
            </span>
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-xl leading-relaxed">
            Next-generation autonomous aerial systems engineered for defense, intelligence, and
            precision operations across all operational domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {droneData?.map((drone, index) => (
            <DroneCard key={drone?.id ?? index} drone={drone} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            background: 'rgba(0,20,40,0.6)',
            border: '1px solid rgba(0,212,255,0.12)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}
            >
              <CpuIcon size={18} color="#00d4ff" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm tracking-tight">
                Advanced AI Autonomy Stack
              </p>
              <p className="text-white/35 text-xs mt-0.5">
                All drones powered by AeroMac Neural OS v4.2
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-wide text-white shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0088ff 0%, #00d4ff 100%)',
              boxShadow: '0 4px 24px rgba(0,136,255,0.30)',
            }}
          >
            Explore Full Fleet
            <ChevronRightIcon size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}