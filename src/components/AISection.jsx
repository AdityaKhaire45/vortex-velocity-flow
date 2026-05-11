import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const DEFAULT_AI_FEATURES = [
  {
    id: 1,
    icon: 'Brain',
    title: 'Adaptive Neural Intelligence',
    description: 'Self-evolving deep learning models trained on terabytes of aerospace telemetry, enabling real-time predictive analytics and autonomous decision-making at Mach speeds.',
    bullets: [
      'Transformer-based flight path optimization',
      'Anomaly detection with sub-millisecond latency',
      'Federated learning across distributed drone swarms',
    ],
  },
  {
    id: 2,
    icon: 'Cpu',
    title: 'Edge AI Processing',
    description: 'Custom silicon and firmware pipelines push inference to the hardware boundary — zero cloud dependency, full autonomy in signal-denied environments.',
    bullets: [
      'Onboard NPU delivering 38 TOPS at 4W',
      'RTOS-integrated TensorFlow Lite runtime',
      'ISO 26262 ASIL-D safety certification path',
    ],
  },
  {
    id: 3,
    icon: 'Radar',
    title: 'Sensor Fusion & Perception',
    description: 'Multi-modal sensor arrays fused through probabilistic Kalman filters and vision transformers deliver centimeter-accurate situational awareness in any weather.',
    bullets: [
      'LiDAR + IMU + optical flow fusion',
      '3D occupancy grid reconstruction at 120 Hz',
      'Adversarial-robust object classification',
    ],
  },
];

function NeuralCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 52;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const CONNECT_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        glow.addColorStop(0, `rgba(0, 212, 255, ${0.6 + 0.4 * Math.sin(n.pulse)})`);
        glow.addColorStop(1, 'rgba(0, 136, 255, 0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.8 + 0.2 * Math.sin(n.pulse)})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
    />
  );
}

function FloatingDot({ delay, x, y }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-cyan-400"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -18, 0],
        opacity: [0.3, 0.9, 0.3],
        scale: [1, 1.6, 1],
      }}
      transition={{
        duration: 3.5 + delay,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const FLOAT_DOTS = [
  { delay: 0, x: 12, y: 25 },
  { delay: 0.8, x: 85, y: 15 },
  { delay: 1.4, x: 55, y: 80 },
  { delay: 0.3, x: 92, y: 65 },
  { delay: 1.9, x: 8, y: 72 },
  { delay: 0.6, x: 45, y: 10 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: 'easeOut',
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const GlowIcon = Icons[feature?.icon] || Icons['HelpCircle'];
  const CheckIcon = Icons['ChevronRight'] || Icons['HelpCircle'];

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative z-20 flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'rgba(0, 10, 30, 0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(0, 212, 255, 0.22)',
        boxShadow: hovered
          ? '0 0 40px rgba(0, 212, 255, 0.22), 0 0 80px rgba(0, 136, 255, 0.10), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 0 20px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? '0 0 0 1.5px rgba(0,212,255,0.55)'
            : '0 0 0 1px rgba(0,212,255,0.18)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      <div className="relative p-8 flex flex-col gap-6 h-full">
        <div className="flex items-start justify-between">
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-xl"
              animate={{
                background: hovered
                  ? 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              animate={{ scale: hovered ? 1.12 : 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative"
            >
              <GlowIcon
                size={28}
                className="text-cyan-400"
                strokeWidth={1.6}
              />
            </motion.div>
          </div>

          <span className="text-xs font-mono text-cyan-500/50 tracking-widest uppercase select-none">
            {String(feature?.id).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-white tracking-tight leading-snug">
            {feature?.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {feature?.description}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          {feature?.bullets?.map((bullet, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-2.5"
              initial={{ opacity: 0, x: isLeft ? -14 : 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <CheckIcon
                size={14}
                className="text-cyan-400 mt-0.5 shrink-0"
                strokeWidth={2.5}
              />
              <span className="text-sm text-cyan-100/80 leading-snug">{bullet}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AISection({ ai_features }) {
  const features = ai_features?.length ? ai_features : DEFAULT_AI_FEATURES;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const ZapIcon = Icons['Zap'] || Icons['HelpCircle'];

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-28 md:py-36"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,136,255,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,212,255,0.08) 0%, transparent 60%), #000000',
          }}
        />
        <NeuralCanvas />
        {FLOAT_DOTS.map((dot, i) => (
          <FloatingDot key={i} delay={dot.delay} x={dot.x} y={dot.y} />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-16 md:mb-20 flex flex-col items-center text-center gap-5"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/25 bg-cyan-950/30 px-4 py-1.5">
            <ZapIcon size={13} className="text-cyan-400" strokeWidth={2.5} />
            <span className="text-xs font-semibold tracking-[0.18em] text-cyan-400 uppercase">
              Machine Intelligence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            AI &amp; ML{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Innovations
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
            AeroMac Dynamics deploys frontier machine learning pipelines — from silicon to sky — enabling autonomous, adaptive, and resilient aerospace systems.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60" />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features?.map((feature, index) => (
            <FeatureCard key={feature?.id ?? index} feature={feature} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 md:mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(0,212,255,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-cyan-950/30 px-10 py-4 text-sm font-semibold tracking-wide text-cyan-300 uppercase overflow-hidden"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  'linear-gradient(90deg, rgba(0,212,255,0.04) 0%, rgba(0,136,255,0.04) 100%)',
                  'linear-gradient(90deg, rgba(0,136,255,0.10) 0%, rgba(0,212,255,0.10) 100%)',
                  'linear-gradient(90deg, rgba(0,212,255,0.04) 0%, rgba(0,136,255,0.04) 100%)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <ZapIcon size={15} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10">Explore Full AI Capabilities</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default AISection;
