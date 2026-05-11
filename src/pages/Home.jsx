import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AerospaceInnovationSection from '../components/AerospaceInnovationSection';
import DroneTechnologySection from '../components/DroneTechnologySection';
import ResearchDevelopmentSection from '../components/ResearchDevelopmentSection';
import CareersSection from '../components/CareersSection';
import ContactSection from '../components/ContactSection';
import AISection from '../components/AISection';

const NAV_LINKS = [
  { label: 'About', route: '#about' },
  { label: 'Aerospace Innovation', route: '#aerospace-innovation' },
  { label: 'AI & ML', route: '#ai' },
  { label: 'Drones', route: '#drones' },
  { label: 'R&D', route: '#rnd' },
  { label: 'Careers', route: '#careers' },
  { label: 'Contact', route: '#contact' },
];

const FOOTER_LINKS = [
  { label: 'Contact', route: '#contact' },
  { label: 'Careers', route: '#careers' },
];

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
    </div>
  );
}

function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <Header nav_links={NAV_LINKS} />

      <main className="relative w-full">
        <section className="relative z-40">
          <HeroSection
            headline="Defining the Future of Flight"
            typing_phrases={[
              'AI-Powered Aerospace Systems',
              'Next-Gen Drone Architecture',
              'Deep Space R&D Intelligence',
              'Autonomous Navigation at Scale',
            ]}
            cta_primary={{ label: 'Explore Our Tech', href: '#aerospace-innovation' }}
            cta_secondary={{ label: 'Meet Our Team', href: '#about' }}
          />
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-30"
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <AerospaceInnovationSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <AISection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <DroneTechnologySection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <ResearchDevelopmentSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <CareersSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20"
        >
          <ContactSection />
        </motion.div>
      </main>

      <Footer footer_links={FOOTER_LINKS} />
    </div>
  );
}

export default Home;
