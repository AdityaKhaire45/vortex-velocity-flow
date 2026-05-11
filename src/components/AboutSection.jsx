import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import * as Icons from 'lucide-react';
import aerospaceImg from '../assets/aerospace_engineering_lab_dark.jpg';

const defaultStats = [
  { key: 'projects', icon: 'Rocket', value: 340, label: 'Projects Delivered', suffix: '+' },
  { key: 'countries', icon: 'Globe2', value: 48, label: 'Countries Reached', suffix: '' },
  { key: 'engineers', icon: 'Users', value: 1200, label: 'Elite Engineers', suffix: '+' },
  { key: 'patents', icon: 'ShieldCheck', value: 92, label: 'Patents Filed', suffix: '' },
];

const defaultDescription = `AeroMac Dynamics stands at the convergence of aerospace engineering, artificial intelligence, and advanced R&D. From orbital systems to autonomous drone fleets, we architect the future of flight—precision-engineered, AI-augmented, and built for the demands of tomorrow's world.`;

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index, inView }) {
  const IconComponent = Icons[stat?.icon] || Icons['HelpCircle'];
  const count = useCountUp(stat?.value ?? 0, 1800, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,212,255,0.06) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.18)',
        boxShadow: '0 0 24px rgba(0,212,255,0.08), 0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
        style={{
          background: 'linear-gradient(135deg, transparent 60%, rgba(0,212,255,0.08) 100%)',
        }}
      />

      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,136,255,0.2), rgba(0,212,255,0.15))',
          border: '1px solid rgba(0,212,255,0.3)',
          boxShadow: '0 0 16px rgba(0,212,255,0.2)',
        }}
      >
        <IconComponent size={22} className="text-cyan-400" strokeWidth={1.5} />
      </div>

      <div className="text-center">
        <div
          className="text-4xl font-bold tracking-tight text-white"
          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', letterSpacing: '-0.02em' }}
        >
          {count}{stat?.suffix ?? ''}
        </div>
        <div
          className="mt-1 text-xs font-bold uppercase tracking-widest"
          style={{ color: '#00d4ff', letterSpacing: '0.12em' }}
        >
          {stat?.label ?? ''}
        </div>
      </div>
    </motion.div>
  );
}

function AboutSection({ company_description, stats }) {
  const resolvedDescription = company_description ?? defaultDescription;
  const resolvedStats = stats ?? defaultStats;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const GlobeIcon = Icons['Globe2'] || Icons['HelpCircle'];
  const CheckIcon = Icons['CheckCircle2'] || Icons['HelpCircle'];

  const pillars = [
    'Next-Gen Propulsion Systems',
    'AI-Driven Autonomous Navigation',
    'Hypersonic Vehicle Engineering',
    'Orbital & Satellite Integration',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #000000 0%, #010d1f 50%, #000a18 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(0,136,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 30%, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 flex items-center gap-3"
        >
          <div
            className="h-px flex-1 max-w-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6))' }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#00d4ff', letterSpacing: '0.18em' }}
          >
            About AeroMac Dynamics
          </span>
          <div
            className="h-px flex-1 max-w-24"
            style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.6), transparent)' }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden px-10 py-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,136,255,0.07) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,136,255,0.08)',
            }}
          >
            <div
              className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none select-none opacity-5"
              style={{
                fontSize: '12rem',
                lineHeight: 1,
                fontFamily: 'Space Grotesk, Inter, sans-serif',
                fontWeight: 800,
                color: '#00d4ff',
                userSelect: 'none',
                overflow: 'hidden',
              }}
            >
              AM
            </div>

            <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), rgba(0,136,255,0.4), transparent)',
            }} />

            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <GlobeIcon size={16} className="text-cyan-400" strokeWidth={1.5} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(0,212,255,0.7)', letterSpacing: '0.15em' }}
                >
                  Our Mission
                </span>
              </div>

              <h2
                className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight"
                style={{
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  letterSpacing: '-0.03em',
                }}
              >
                Engineering
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #00d4ff, #0088ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Tomorrow's
                </span>{' '}
                <span className="text-white">Flight</span>
              </h2>

              <p
                className="mt-6 text-base leading-relaxed"
                style={{ color: 'rgba(220,230,255,0.65)', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}
              >
                {resolvedDescription}
              </p>

              <div className="mt-8 space-y-3">
                {pillars.map((pillar, i) => (
                  <motion.div
                    key={pillar}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                    className="flex items-center gap-3"
                  >
                    <CheckIcon size={15} strokeWidth={2} style={{ color: '#00d4ff', flexShrink: 0 }} />
                    <span
                      className="text-sm"
                      style={{ color: 'rgba(200,220,255,0.75)', fontFamily: 'Inter, sans-serif' }}
                    >
                      {pillar}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-10 overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
                style={{ border: '1px solid rgba(0,212,255,0.12)' }}
              >
                <img
                  src={aerospaceImg}
                  alt="AeroMac Dynamics aerospace engineering lab"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="mb-2"
            >
              <h3
                className="text-2xl font-bold text-white"
                style={{
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                By the Numbers
              </h3>
              <p
                className="mt-2 text-sm"
                style={{ color: 'rgba(180,200,255,0.5)', fontFamily: 'Inter, sans-serif' }}
              >
                A decade of precision engineering distilled into data.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {resolvedStats?.map((stat, index) => (
                <StatCard
                  key={stat?.key ?? index}
                  stat={stat}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
              className="mt-4 rounded-2xl px-8 py-7 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,136,255,0.1) 0%, rgba(0,212,255,0.06) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)',
                }}
              />
              <p
                className="text-sm leading-relaxed italic"
                style={{
                  color: 'rgba(200,220,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.75,
                }}
              >
                "We don't just build aerospace systems — we redefine what's possible at the boundary of
                human ambition and machine precision."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #0088ff, #00d4ff)',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  CM
                </div>
                <div>
                  <div
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Dr. Carter MacAllister
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'rgba(0,212,255,0.6)', letterSpacing: '0.05em' }}
                  >
                    Founder & Chief Engineer
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
