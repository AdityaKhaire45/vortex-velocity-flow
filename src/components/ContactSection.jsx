import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import satelliteImg from '../assets/satellite_space_dark_cinematic.jpg';

const SendIcon = Icons['Send'] || Icons['HelpCircle'];
const UserIcon = Icons['User'] || Icons['HelpCircle'];
const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
const MessageSquareIcon = Icons['MessageSquare'] || Icons['HelpCircle'];
const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
const PhoneIcon = Icons['Phone'] || Icons['HelpCircle'];
const ClockIcon = Icons['Clock'] || Icons['HelpCircle'];
const CheckCircleIcon = Icons['CheckCircle'] || Icons['HelpCircle'];
const LoaderIcon = Icons['Loader'] || Icons['HelpCircle'];
const ArrowRightIcon = Icons['ArrowRight'] || Icons['HelpCircle'];
const GlobeIcon = Icons['Globe'] || Icons['HelpCircle'];
const ShieldIcon = Icons['Shield'] || Icons['HelpCircle'];

const OFFICE_INFO = {
  name: 'AeroMac Dynamics HQ',
  address: '1 Innovation Drive, Cape Canaveral, FL 32920',
  phone: '+1 (321) 800-AERO',
  email: 'contact@aeromac.aero',
  hours: 'Mon – Fri: 08:00 – 18:00 EST',
  clearance: 'ITAR Compliant Facility',
  cta: 'Schedule a Mission Briefing',
};

const INITIAL_FIELDS = {
  name: '',
  email: '',
  message: '',
};

const VALIDATION = {
  name: (v) => (v?.trim().length >= 2 ? '' : 'Full name must be at least 2 characters.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim()) ? '' : 'Enter a valid email address.'),
  message: (v) => (v?.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'),
};

function ContactSection({ fields, submit, office_info }) {
  const officeData = office_info || OFFICE_INFO;

  const [form, setForm] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const validate = (name, value) => {
    const fn = VALIDATION[name];
    return fn ? fn(value) : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.currentTarget;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(INITIAL_FIELDS).forEach((key) => {
      newErrors[key] = validate(key, form[key]);
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    const hasErrors = Object.values(newErrors).some((err) => err !== '');
    if (hasErrors) return;
    setStatus('loading');
    await new Promise((res) => setTimeout(res, 2000));
    setStatus('success');
    setTimeout(() => {
      setForm(INITIAL_FIELDS);
      setTouched({});
      setErrors({});
      setStatus('idle');
    }, 4000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-28 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020d1a] to-black" />
      <div className="absolute inset-0 opacity-20"
        style={undefined}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00d4ff] blur-[160px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#0088ff] blur-[140px] opacity-15" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] text-[#00d4ff] uppercase mb-4 font-inter">
              Direct Communications
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight font-inter leading-tight">
              Initiate Contact
            </h2>
            <p className="mt-4 text-white/50 text-base md:text-lg max-w-xl mx-auto font-inter leading-relaxed">
              Reach our mission team. Whether it's R&D partnerships, procurement, or aerospace innovation — we respond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-stretch">
            <motion.div variants={itemVariants}>
              <div className="relative rounded-2xl border border-[#00d4ff]/25 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-2xl overflow-hidden h-full">
                <div className="absolute inset-0 rounded-2xl border border-[#00d4ff]/10 pointer-events-none" />
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent" />

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="flex flex-col items-center justify-center py-16 text-center h-full min-h-80"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/40 flex items-center justify-center mb-6"
                      >
                        <CheckCircleIcon className="w-10 h-10 text-[#00d4ff]" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white font-inter mb-2">Transmission Received</h3>
                      <p className="text-white/50 font-inter text-sm max-w-xs">
                        Our mission team will respond within 24 hours. Stand by.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="flex flex-col gap-6"
                    >
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-white font-inter tracking-tight">Send a Message</h3>
                        <p className="text-white/40 text-sm font-inter mt-1">All fields are required.</p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-white/60 tracking-widest uppercase font-inter">
                          Full Name
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00d4ff]/60 pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isDisabled}
                            placeholder="Commander Jane Doe"
                            aria-label="Full Name"
                            aria-invalid={!!errors.name}
                            className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 font-inter text-sm focus:outline-none focus:border-[#00d4ff]/60 focus:bg-white/[0.07] transition-all duration-300 disabled:opacity-50"
                          />
                        </div>
                        <AnimatePresence>
                          {touched.name && errors.name && (
                            <motion.p
                              key="name-err"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-red-400/80 text-xs font-inter pl-1"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-white/60 tracking-widest uppercase font-inter">
                          Email Address
                        </label>
                        <div className="relative">
                          <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00d4ff]/60 pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isDisabled}
                            placeholder="jane.doe@agency.aero"
                            aria-label="Email Address"
                            aria-invalid={!!errors.email}
                            className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 font-inter text-sm focus:outline-none focus:border-[#00d4ff]/60 focus:bg-white/[0.07] transition-all duration-300 disabled:opacity-50"
                          />
                        </div>
                        <AnimatePresence>
                          {touched.email && errors.email && (
                            <motion.p
                              key="email-err"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-red-400/80 text-xs font-inter pl-1"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-white/60 tracking-widest uppercase font-inter">
                          Message
                        </label>
                        <div className="relative">
                          <MessageSquareIcon className="absolute left-4 top-4 w-4 h-4 text-[#00d4ff]/60 pointer-events-none" />
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isDisabled}
                            placeholder="Describe your mission, partnership inquiry, or technical requirement..."
                            rows={5}
                            aria-label="Message"
                            aria-invalid={!!errors.message}
                            className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 font-inter text-sm focus:outline-none focus:border-[#00d4ff]/60 focus:bg-white/[0.07] transition-all duration-300 resize-none disabled:opacity-50"
                          />
                        </div>
                        <AnimatePresence>
                          {touched.message && errors.message && (
                            <motion.p
                              key="msg-err"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-red-400/80 text-xs font-inter pl-1"
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isDisabled}
                        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
                        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        aria-label="Send message"
                        className="relative w-full py-4 px-8 rounded-xl font-semibold text-sm tracking-widest uppercase font-inter text-black overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#0088ff] to-[#00d4ff] bg-size-200 animate-pulse" />
                        <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#0088ff] opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {status === 'loading' ? (
                            <>
                              <LoaderIcon className="w-4 h-4 animate-spin" />
                              Transmitting...
                            </>
                          ) : (
                            <>
                              <SendIcon className="w-4 h-4" />
                              Send Transmission
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6 h-full">
              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-64">
                <img
                  src={satelliteImg}
                  alt="AeroMac Dynamics facility"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover object-center blur-sm scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-[#00d4ff]/5" />
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full">
                  <span className="text-xs font-semibold tracking-[0.3em] text-[#00d4ff] uppercase font-inter mb-2">
                    Global Operations
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-inter tracking-tight leading-snug">
                    {officeData?.name}
                  </h3>
                  <p className="text-white/50 text-sm font-inter mt-2 leading-relaxed">
                    Pioneer-class aerospace research & manufacturing facility, engineered for the next frontier.
                  </p>
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden">
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InfoRow Icon={MapPinIcon} label="Address" value={officeData?.address} />
                  <InfoRow Icon={PhoneIcon} label="Mission Line" value={officeData?.phone} />
                  <InfoRow Icon={MailIcon} label="Secure Email" value={officeData?.email} />
                  <InfoRow Icon={ClockIcon} label="Operations" value={officeData?.hours} />
                  <InfoRow Icon={GlobeIcon} label="Jurisdiction" value="USA / NATO Allied" />
                  <InfoRow Icon={ShieldIcon} label="Compliance" value={officeData?.clearance} />
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <motion.a
                    href="#contact"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold font-inter tracking-wide group"
                    aria-label="Schedule a Mission Briefing"
                  >
                    <span>{officeData?.cta}</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.a>
                  <p className="text-white/30 text-xs font-inter mt-2">
                    Classified engagements available upon NDA clearance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-[#00d4ff]" />
      </div>
      <div className="min-w-0">
        <p className="text-white/40 text-xs font-inter tracking-widest uppercase mb-0.5">{label}</p>
        <p className="text-white/90 text-sm font-inter leading-snug break-words">{value}</p>
      </div>
    </div>
  );
}

export default ContactSection;
