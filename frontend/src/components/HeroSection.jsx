import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import satelliteImg from '../assets/satellite_space_dark_cinematic.jpg';
import cockpitImg from '../assets/futuristic_cockpit_dark_cinematic.jpg';
import aeroTechImg from '../assets/aerospace_technology_dark_futuristic.jpg';

const ChevronDown = Icons['ChevronDown'] || Icons['HelpCircle'];

const CAROUSEL_IMAGES = [
  { src: satelliteImg, alt: 'Satellite in deep space' },
  { src: cockpitImg, alt: 'Futuristic cockpit' },
  { src: aeroTechImg, alt: 'Aerospace technology' },
];

const PARTICLE_COUNT = 80;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

const particles = generateParticles();

export default function HeroSection({
  headline = 'Defining the Future of Flight',
  typing_phrases = [
    'AI-Powered Aerospace Systems',
    'Next-Gen Drone Architecture',
    'Deep Space R&D Intelligence',
    'Autonomous Navigation at Scale',
  ],
  cta_primary = { label: 'Explore Our Tech', href: '#aerospace-innovation' },
  cta_secondary = { label: 'Meet Our Team', href: '#about' },
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const typeRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const phrase = typing_phrases?.[phraseIndex] ?? '';
    let timeout;

    if (!isDeleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length + 1));
      }, 60);
    } else if (!isDeleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(phrase.slice(0, displayed.length - 1));
      }, 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % (typing_phrases?.length ?? 1));
    }

    typeRef.current = timeout;
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, typing_phrases]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const handlePrimaryClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(cta_primary?.href ?? '#');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSecondaryClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(cta_secondary?.href ?? '#');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollChevron = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="crossfade">
          {CAROUSEL_IMAGES.map((img, idx) =>
            idx === activeImage ? (
              <motion.div
                key={idx}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center blur-sm scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/1920x1080/000014/0088ff?text=AeroMac+Dynamics';
                  }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,136,255,0.10),transparent)]" />

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 py-32 max-w-6xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AeroMac Dynamics — Est. 2010
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-bold text-white leading-none tracking-tight drop-shadow-2xl mb-8 font-inter"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
        >
          {headline}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-0 min-h-[2.5rem] mb-10"
          aria-live="polite"
          aria-label={`Current focus: ${displayed}`}
        >
          <span
            className="text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight"
          >
            {displayed}
          </span>
          <motion.span
            className="ml-1 inline-block w-0.5 h-7 md:h-8 bg-cyan-400 rounded-sm"
            animate={{ opacity: cursorVisible ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-12"
        >
          Engineering the intersection of artificial intelligence, autonomous
          systems, and deep-space exploration. Pushing the boundaries of what
          aerospace can achieve.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            onClick={handlePrimaryClick}
            className="relative px-10 py-4 rounded-full text-black font-bold text-base tracking-wide bg-cyan-400 hover:bg-cyan-300 transition-colors duration-300 shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 32px 8px rgba(0,212,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
            aria-label={cta_primary?.label}
          >
            <span className="relative z-10">{cta_primary?.label}</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={handleSecondaryClick}
            className="relative px-10 py-4 rounded-full text-white font-semibold text-base tracking-wide border border-white/25 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px 4px rgba(255,255,255,0.10)' }}
            whileTap={{ scale: 0.97 }}
            aria-label={cta_secondary?.label}
          >
            {cta_secondary?.label}
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mt-16"
        >
          {CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              aria-label={`Switch to slide ${idx + 1}`}
              className="transition-all duration-500 rounded-full"
            >
              <motion.div
                className="rounded-full bg-white/40"
                animate={{
                  width: idx === activeImage ? '2rem' : '0.5rem',
                  opacity: idx === activeImage ? 1 : 0.4,
                  backgroundColor:
                    idx === activeImage
                      ? 'rgba(0,212,255,0.9)'
                      : 'rgba(255,255,255,0.4)',
                }}
                style={{ height: '0.5rem' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
        onClick={handleScrollChevron}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  );
}
