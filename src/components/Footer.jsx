import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const DEFAULT_SOCIAL_LINKS = [
  { label: 'LinkedIn', icon: 'Linkedin', href: '#' },
  { label: 'Twitter', icon: 'Twitter', href: '#' },
  { label: 'Github', icon: 'Github', href: '#' },
  { label: 'Youtube', icon: 'Youtube', href: '#' },
];

const DEFAULT_FOOTER_LINKS = [
  { label: 'Contact', route: '#contact' },
  { label: 'Careers', route: '#careers' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', route: '#privacy' },
  { label: 'Terms of Service', route: '#terms' },
];

export default function Footer({ social_links, footer_links }) {
  const socials = social_links?.length ? social_links : DEFAULT_SOCIAL_LINKS;
  const navLinks = footer_links?.length ? footer_links : DEFAULT_FOOTER_LINKS;

  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <footer className="relative z-30 w-full">
      <div
        className={`
          absolute inset-x-0 top-0 h-0.5
          transition-all duration-700
          ${
            pulsePhase === 0
              ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent'
              : pulsePhase === 1
              ? 'bg-gradient-to-r from-transparent via-blue-400 to-cyan-300'
              : 'bg-gradient-to-r from-cyan-300 via-blue-500 to-transparent'
          }
        `}
      />

      <div
        className="
          relative
          bg-black/70
          backdrop-blur-xl
          border-t border-white/5
          px-8 py-6
        "
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-r from-cyan-950/20 via-black/0 to-blue-950/20
            pointer-events-none
          "
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="
            relative
            max-w-screen-xl mx-auto
            flex flex-col md:flex-row
            items-center md:items-center
            justify-between
            gap-5 md:gap-4
          "
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-1">
            <motion.a
              href="#"
              className="
                text-lg font-bold tracking-widest
                bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200
                bg-clip-text text-transparent
                font-inter
                select-none
                uppercase
                letter-spacing-widest
              "
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              AeroMac
              <span className="text-white/60 font-light ml-1">Dynamics</span>
            </motion.a>
            <p className="text-xs text-white/30 font-inter tracking-widest uppercase">
              Aerospace · AI · R&D
            </p>
          </motion.div>

          <motion.nav
            variants={itemVariants}
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            {navLinks?.map((link) => (
              <motion.a
                key={link?.label}
                href={link?.route ?? '#'}
                className="
                  text-sm text-white/50 font-inter tracking-wide
                  hover:text-cyan-300
                  transition-colors duration-300
                  uppercase
                "
                whileHover={{ y: -1 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {link?.label}
              </motion.a>
            ))}
            {LEGAL_LINKS?.map((link) => (
              <motion.a
                key={link?.label}
                href={link?.route ?? '#'}
                className="
                  text-sm text-white/30 font-inter tracking-wide
                  hover:text-white/60
                  transition-colors duration-300
                  hidden md:inline-block
                "
                whileHover={{ y: -1 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {link?.label}
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
            aria-label="Social media links"
          >
            {socials?.map((social) => {
              const IconComp = Icons[social?.icon ?? ''] || Icons['Globe'];
              return (
                <motion.a
                  key={social?.label}
                  href={social?.href ?? '#'}
                  aria-label={social?.label}
                  className="
                    relative group
                    w-8 h-8
                    flex items-center justify-center
                    rounded-lg
                    border border-white/10
                    bg-white/5
                    text-white/40
                    hover:text-cyan-300
                    hover:border-cyan-500/40
                    hover:bg-cyan-950/40
                    transition-all duration-300
                    overflow-hidden
                  "
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <span
                    className="
                      absolute inset-0
                      bg-gradient-to-br from-cyan-400/0 to-blue-500/0
                      group-hover:from-cyan-400/10 group-hover:to-blue-500/10
                      transition-all duration-300
                      rounded-lg
                    "
                  />
                  <IconComp size={15} strokeWidth={1.6} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="
            relative max-w-screen-xl mx-auto
            mt-5 pt-4
            border-t border-white/5
            flex flex-col md:flex-row
            items-center justify-between
            gap-2
          "
        >
          <p className="text-xs text-white/25 font-inter tracking-widest uppercase">
            &copy; {new Date().getFullYear()} AeroMac Dynamics Inc. All rights reserved.
          </p>
          <p className="text-xs text-white/20 font-inter tracking-wide">
            Pioneering the future of aerospace &amp; AI since 2018.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
