import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const DEFAULT_NAV_LINKS = [
  { label: 'About', route: '#about' },
  { label: 'Aerospace Innovation', route: '#aerospace-innovation' },
  { label: 'AI & ML', route: '#ai' },
  { label: 'Drones', route: '#drones' },
  { label: 'R&D', route: '#rnd' },
  { label: 'Careers', route: '#careers' },
  { label: 'Contact', route: '#contact' },
];

function NavLink({ label, route, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={route}
      className="relative text-white/80 text-xs tracking-widest uppercase font-medium px-1 py-2 transition-colors duration-300 hover:text-[#00d4ff] focus:outline-none focus-visible:text-[#00d4ff]"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.07, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#0088ff] to-[#00d4ff] rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        style={{ width: '100%', transformOrigin: 'left' }}
      />
    </motion.a>
  );
}

function Header({ logo_src, nav_links }) {
  const links = nav_links ?? DEFAULT_NAV_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const MenuIcon = Icons['Menu'] || Icons['HelpCircle'];
  const XIcon = Icons['X'] || Icons['HelpCircle'];
  const ZapIcon = Icons['Zap'] || Icons['HelpCircle'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={[
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500',
          scrolled
            ? 'bg-black/70 backdrop-blur-xl shadow-2xl border-b border-white/[0.06]'
            : 'bg-black/30 backdrop-blur-md border-b border-transparent',
        ].join(' ')}
        initial={{ y: -96, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{ height: '96px' }}
        role="banner"
      >
        <div
          className="w-full h-full flex items-center justify-between px-6 md:px-10 lg:px-16"
          style={{ maxWidth: '1640px', margin: '0 auto' }}
        >
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
            aria-label="AeroMac Dynamics home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#0088ff] to-[#00d4ff] shadow-lg shadow-[#00d4ff]/30 group-hover:shadow-[#00d4ff]/60 transition-shadow duration-300">
              <ZapIcon size={16} className="text-black" strokeWidth={2.5} />
            </span>
            <span className="text-white font-bold text-lg tracking-tight leading-none select-none">
              Aero<span className="text-[#00d4ff]">Mac</span>
              <span className="ml-1.5 text-white/40 font-light text-sm tracking-widest uppercase">Dynamics</span>
            </span>
          </motion.a>

          <nav
            className="hidden lg:flex items-center gap-8 xl:gap-10"
            aria-label="Primary navigation"
          >
            {links?.map((link, i) => (
              <NavLink
                key={link?.route ?? i}
                label={link?.label ?? ''}
                route={link?.route ?? '#'}
                index={i}
              />
            ))}
            <motion.a
              href="#contact"
              className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#0088ff] to-[#00d4ff] text-black text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full shadow-lg shadow-[#0088ff]/30 hover:shadow-[#00d4ff]/60 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.7, ease: 'easeOut' }}
              aria-label="Get in touch"
            >
              Get in Touch
            </motion.a>
          </nav>

          <motion.button
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 backdrop-blur text-white hover:bg-white/10 hover:border-[#00d4ff]/40 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
          >
            {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: scrolled
              ? 'linear-gradient(90deg, transparent 0%, #0088ff44 30%, #00d4ff66 60%, transparent 100%)'
              : 'transparent',
          }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 bg-black/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0088ff]/5 blur-3xl" />
            </div>

            <nav className="relative flex flex-col items-center justify-center flex-1 gap-2 px-8 pb-12">
              {links?.map((link, i) => (
                <motion.a
                  key={link?.route ?? i}
                  href={link?.route ?? '#'}
                  className="w-full max-w-xs text-center text-white/80 text-sm tracking-widest uppercase font-medium py-4 border-b border-white/[0.06] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-colors duration-200 focus:outline-none focus-visible:text-[#00d4ff]"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, delay: i * 0.055, ease: 'easeOut' }}
                  onClick={() => setMobileOpen(false)}
                  aria-label={link?.label}
                >
                  {link?.label ?? ''}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center w-full max-w-xs bg-gradient-to-r from-[#0088ff] to-[#00d4ff] text-black text-sm font-bold tracking-widest uppercase px-6 py-4 rounded-full shadow-lg shadow-[#0088ff]/30 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: (links?.length ?? 0) * 0.055 + 0.05, ease: 'easeOut' }}
                onClick={() => setMobileOpen(false)}
                aria-label="Get in touch"
              >
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
