import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import aiNeuralImg from '../assets/ai_neural_network_dark_blue.jpg';
import cockpitImg from '../assets/futuristic_cockpit_dark_cinematic.jpg';
import aeroLabImg from '../assets/aerospace_engineering_lab_dark.jpg';


const AI_CAPABILITIES = [
  {
    id: 'neural-flight',
    icon: 'Brain',
    title: 'Neural Flight Control',
    description: 'Deep reinforcement learning models trained on 2.4B flight simulations, enabling sub-millisecond adaptive response to dynamic atmospheric variables.',
    metric: '0.8ms',
    metricLabel: 'Avg. Response Time',
    tag: 'Core AI',
    color: '#00d4ff',
  },
  {
    id: 'predictive-maint',
    icon: 'Activity',
    title: 'Predictive Maintenance AI',
    description: 'Multivariate anomaly detection across 40,000+ sensor streams per vehicle, predicting component failure up to 72 hours in advance with 99.4% accuracy.',
    metric: '99.4%',
    metricLabel: 'Prediction Accuracy',
    tag: 'Operations',
    color: '#0088ff',
  },
  {
    id: 'swarm-coord',
    icon: 'Network',
    title: 'Swarm Coordination Engine',
    description: 'Distributed multi-agent AI enabling real-time consensus among 512+ autonomous units without central control, using federated mesh communication.',
    metric: '512+',
    metricLabel: 'Simultaneous Agents',
    tag: 'Autonomy',
    color: '#00d4ff',
  },
  {
    id: 'vision-recon',
    icon: 'Eye',
    title: 'Vision Intelligence Suite',
    description: 'Real-time hyperspectral imaging fusion with transformer-based object classification achieving 98.7% target identification at 32,000ft altitude.',
    metric: '98.7%',
    metricLabel: 'Detection Rate',
    tag: 'Perception',
    color: '#0088ff',
  },
  {
    id: 'nav-ai',
    icon: 'Compass',
    title: 'Autonomous Navigation AI',
    description: 'GPS-denied SLAM-based navigation using LiDAR, radar, and visual-inertial odometry fusion — achieving centimeter-level positioning accuracy.',
    metric: '±2cm',
    metricLabel: 'Positioning Accuracy',
    tag: 'Navigation',
    color: '#00d4ff',
  },
  {
    id: 'nlp-command',
    icon: 'Mic',
    title: 'Natural Language Command Interface',
    description: 'Mission-grade LLM integration enabling natural voice and text command interpretation with context-aware multi-step mission planning.',
    metric: '< 1s',
    metricLabel: 'Command Latency',
    tag: 'Human-AI',
    color: '#0088ff',
  },
];

const AI_MODELS = [
  { name: 'AeroNet-7B', type: 'Flight Control', accuracy: 99.1, status: 'Production', color: '#00d4ff' },
  { name: 'SwarmGPT-3', type: 'Multi-Agent', accuracy: 97.8, status: 'Production', color: '#0088ff' },
  { name: 'VisionCore-X', type: 'Object Detection', accuracy: 98.7, status: 'Production', color: '#00d4ff' },
  { name: 'PredictOS-2', type: 'Maintenance', accuracy: 99.4, status: 'Beta', color: '#7c3aed' },
  { name: 'NavFusion-4', type: 'Navigation', accuracy: 96.5, status: 'Production', color: '#0088ff' },
];

const SHOWCASE_IMAGES = [
  { src: aiNeuralImg, label: 'Neural Architecture' },
  { src: cockpitImg, label: 'AI Cockpit Interface' },
  { src: aeroLabImg, label: 'AI Research Lab' },
];

function NeuralNetworkViz() {
  const nodes = [
    { id: 0, x: 10, y: 50 },
    { id: 1, x: 10, y: 25 },
    { id: 2, x: 10, y: 75 },
    { id: 3, x: 35, y: 15 },
    { id: 4, x: 35, y: 38 },
    { id: 5, x: 35, y: 62 },
    { id: 6, x: 35, y: 85 },
    { id: 7, x: 62, y: 30 },
    { id: 8, x: 62, y: 55 },
    { id: 9, x: 62, y: 78 },
    { id: 10, x: 88, y: 40 },
    { id: 11, x: 88, y: 65 },
  ];

  const edges = [
    [0,3],[0,4],[0,5],[1,3],[1,4],[2,5],[2,6],
    [3,7],[3,8],[4,7],[4,8],[5,8],[5,9],[6,9],
    [7,10],[7,11],[8,10],[8,11],[9,11],
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0088ff" stopOpacity="0.4" />
        </radialGradient>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {edges.map(([from, to], i) => {
        const fromNode = nodes[from];
        const toNode = nodes[to];
        return (
          <motion.line
            key={i}
            x1={fromNode?.x}
            y1={fromNode?.y}
            x2={toNode?.x}
            y2={toNode?.y}
            stroke="rgba(0,212,255,0.15)"
            strokeWidth="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.04, ease: 'easeOut' }}
          />
        );
      })}
      {nodes.map((node, i) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="2.2"
          fill="url(#nodeGrad)"
          filter="url(#nodeGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={`pulse-${node.id}`}
          cx={node.x}
          cy={node.y}
          r="2.2"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="0.5"
          animate={{ r: [2.2, 5, 2.2], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

function ModelBar({ model, index, inView }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView && !animated) {
      const t = setTimeout(() => setAnimated(true), index * 150 + 400);
      return () => clearTimeout(t);
    }
  }, [inView, animated, index]);

  const statusColors = {
    Production: 'text-emerald-400',
    Beta: 'text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white tracking-tight">{model?.name}</span>
          <span className="text-xs text-white/40 font-medium">{model?.type}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold tracking-wider ${statusColors[model?.status] ?? 'text-slate-400'}`}>
            {model?.status}
          </span>
          <span className="text-sm font-bold text-white">{model?.accuracy}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${model?.color}, ${model?.color}aa)` }}
          initial={{ width: '0%' }}
          animate={{ width: animated ? `${model?.accuracy}%` : '0%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function CapabilityCard({ cap, index }) {
  const [hovered, setHovered] = useState(false);
  const CardIcon = Icons[cap?.icon] || Icons['HelpCircle'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex flex-col rounded-2xl overflow-hidden cursor-default"
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 0 0 1.5px ${cap?.color}99, 0 16px 48px ${cap?.color}22`
            : '0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.4)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col h-full rounded-2xl p-6 gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(0,12,28,0.95) 0%, rgba(0,6,16,0.98) 100%)' }}
      >
        <div className="flex items-start justify-between gap-3">
          <motion.div
            animate={{
              backgroundColor: hovered ? `${cap?.color}22` : 'rgba(255,255,255,0.04)',
              borderColor: hovered ? `${cap?.color}66` : 'rgba(255,255,255,0.08)',
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-11 h-11 rounded-xl border flex-shrink-0"
          >
            <CardIcon
              size={20}
              style={{ color: hovered ? cap?.color : 'rgba(148,163,184,0.7)' }}
              strokeWidth={1.6}
            />
          </motion.div>
          <span
            className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
            style={{
              color: cap?.color,
              borderColor: `${cap?.color}44`,
              background: `${cap?.color}10`,
            }}
          >
            {cap?.tag}
          </span>
        </div>

        <div>
          <h3 className="text-white font-bold text-base leading-snug tracking-tight mb-2">
            {cap?.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {cap?.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-end justify-between">
          <div>
            <div
              className="text-2xl font-bold tracking-tight"
              style={{ color: cap?.color }}
            >
              {cap?.metric}
            </div>
            <div className="text-xs text-slate-500 tracking-wider uppercase mt-0.5">
              {cap?.metricLabel}
            </div>
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.25 }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `${cap?.color}18`, border: `1px solid ${cap?.color}44` }}
          >
            {(() => {
              const ArrowIcon = Icons['ArrowUpRight'] || Icons['HelpCircle'];
              return <ArrowIcon size={14} style={{ color: cap?.color }} />;
            })()}
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${cap?.color}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
}

function AISection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('capabilities');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'capabilities', label: 'AI Capabilities' },
    { id: 'models', label: 'Model Performance' },
  ];

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000814 0%, #00050f 60%, #000814 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,136,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative z-10 mx-auto px-6 md:px-10 lg:px-16"
        style={{ maxWidth: '1640px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400">
                Artificial Intelligence & Machine Learning
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white mb-6"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Machines That
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 60%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Think at Mach Speed
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              AeroMac's proprietary AI stack runs entirely on-board — no cloud dependency, no latency tax.
              From neural flight control to predictive maintenance, every system learns, adapts, and
              outperforms in real-time.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'AI Models Deployed', value: '47', icon: 'Cpu' },
                { label: 'Training Compute', value: '18 ExaFLOP', icon: 'Zap' },
                { label: 'Inference Edge Nodes', value: '2,400+', icon: 'Network' },
                { label: 'Data Points/Day', value: '4.2T', icon: 'Database' },
              ].map((stat, i) => {
                const StatIcon = Icons[stat?.icon] || Icons['HelpCircle'];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                    className="flex items-center gap-3 rounded-xl p-4 border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,136,255,0.08))',
                        border: '1px solid rgba(0,212,255,0.2)',
                      }}
                    >
                      <StatIcon size={16} className="text-cyan-400" strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white tracking-tight leading-none">
                        {stat?.value}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 tracking-wide">{stat?.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-5"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <div className="relative h-56 overflow-hidden">
                <AnimatePresence mode="crossfade">
                  {SHOWCASE_IMAGES.map((img, idx) =>
                    idx === activeImg ? (
                      <motion.img
                        key={idx}
                        src={img?.src}
                        alt={img?.label}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : null
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(0,212,255,0.15)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      color: '#00d4ff',
                    }}
                  >
                    {SHOWCASE_IMAGES[activeImg]?.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {SHOWCASE_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        aria-label={`Show image ${idx + 1}`}
                        className="transition-all duration-300"
                      >
                        <motion.div
                          className="rounded-full"
                          animate={{
                            width: idx === activeImg ? '1.5rem' : '0.4rem',
                            backgroundColor:
                              idx === activeImg ? '#00d4ff' : 'rgba(255,255,255,0.3)',
                            opacity: idx === activeImg ? 1 : 0.5,
                          }}
                          style={{ height: '0.4rem' }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="p-5"
                style={{ background: 'rgba(0,8,20,0.96)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">
                    Live Neural Network Status
                  </span>
                  <motion.div
                    className="flex items-center gap-1.5"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">Active</span>
                  </motion.div>
                </div>
                <div className="h-28">
                  <NeuralNetworkViz />
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(0,136,255,0.08), rgba(0,212,255,0.05))',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const ShieldIcon = Icons['ShieldCheck'] || Icons['HelpCircle'];
                  return <ShieldIcon size={16} className="text-cyan-400" strokeWidth={1.6} />;
                })()}
                <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
                  Certifications & Compliance
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'DO-178C Level A',
                  'MIL-STD-1553',
                  'ISO 26262 ASIL-D',
                  'ITAR Compliant',
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {(() => {
                      const CheckIcon = Icons['CheckCircle2'] || Icons['HelpCircle'];
                      return <CheckIcon size={13} className="text-emerald-400 flex-shrink-0" strokeWidth={2} />;
                    })()}
                    <span className="text-xs text-slate-300 tracking-wide">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-10"
        >
          <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  color: activeTab === tab.id ? '#00d4ff' : 'rgba(148,163,184,0.7)',
                }}
                aria-pressed={activeTab === tab.id}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="ai-tab-bg"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.25)',
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'capabilities' ? (
            <motion.div
              key="capabilities"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6"
            >
              {AI_CAPABILITIES.map((cap, index) => (
                <CapabilityCard key={cap?.id} cap={cap} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="models"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 md:p-10"
              style={{ boxShadow: '0 8px 60px rgba(0,0,0,0.5)' }}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  AeroMac AI Model Performance
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Accuracy benchmarks across all production-grade models deployed on AeroMac platforms.
                </p>
              </div>
              <div className="flex flex-col gap-7">
                {AI_MODELS.map((model, i) => (
                  <ModelBar key={model?.name} model={model} index={i} inView={inView} />
                ))}
              </div>
              <div
                className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  Benchmarks measured on proprietary AeroMac validation datasets. Models retrained quarterly
                  on live operational telemetry.
                </p>
                <div className="flex items-center gap-4">
                  {['Production', 'Beta'].map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          status === 'Production' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span className="text-xs text-slate-400">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-16 rounded-2xl p-8 md:p-12 border border-cyan-400/15 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: 'linear-gradient(135deg, rgba(0,136,255,0.08) 0%, rgba(0,20,40,0.8) 100%)',
          }}
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              {(() => {
                const BrainIcon = Icons['Brain'] || Icons['HelpCircle'];
                return <BrainIcon size={16} className="text-cyan-400" />;
              })()}
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400">
                AI Research Collaboration
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Partner with Our AI Research Division
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Co-develop next-generation aerospace AI systems. Access our proprietary training
              infrastructure, flight simulation environments, and world-class ML engineering team.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Joint Research Programs', 'Model Licensing', 'On-Site Collaboration'].map((item, i) => {
                const CheckIcon = Icons['Check'] || Icons['HelpCircle'];
                return (
                  <div key={i} className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-slate-300 tracking-wide">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase text-black"
            style={{ background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 100%)' }}
          >
            Request AI Briefing
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default AISection;
