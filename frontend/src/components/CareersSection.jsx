import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const POSITIONS = [
  { value: '', label: 'Select a position' },
  { value: 'aerospace-engineer', label: 'Aerospace Systems Engineer' },
  { value: 'ai-researcher', label: 'AI & ML Research Scientist' },
  { value: 'drone-specialist', label: 'Autonomous Drone Specialist' },
  { value: 'propulsion-engineer', label: 'Propulsion Engineer' },
  { value: 'mission-systems', label: 'Mission Systems Architect' },
  { value: 'rnd-lead', label: 'R&D Technology Lead' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  position: '',
  message: '',
};

const INITIAL_ERRORS = {
  name: '',
  email: '',
  position: '',
  message: '',
};

function validate(form) {
  const errors = { name: '', email: '', position: '', message: '' };
  let valid = true;

  if (!form?.name?.trim()) {
    errors.name = 'Full name is required.';
    valid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form?.email?.trim()) {
    errors.email = 'Email address is required.';
    valid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
    valid = false;
  }

  if (!form?.position) {
    errors.position = 'Please select a position.';
    valid = false;
  }

  if (!form?.message?.trim()) {
    errors.message = 'A brief message is required.';
    valid = false;
  } else if (form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
    valid = false;
  }

  return { errors, valid };
}

const UserIcon = Icons['User'] || Icons['HelpCircle'];
const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
const BriefcaseIcon = Icons['Briefcase'] || Icons['HelpCircle'];
const MessageSquareIcon = Icons['MessageSquare'] || Icons['HelpCircle'];
const SendIcon = Icons['Send'] || Icons['HelpCircle'];
const CheckCircleIcon = Icons['CheckCircle'] || Icons['HelpCircle'];
const LoaderIcon = Icons['Loader'] || Icons['HelpCircle'];
const AlertCircleIcon = Icons['AlertCircle'] || Icons['HelpCircle'];
const RocketIcon = Icons['Rocket'] || Icons['HelpCircle'];
const ChevronDownIcon = Icons['ChevronDown'] || Icons['HelpCircle'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const errorVariants = {
  hidden: { opacity: 0, y: -6, height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -4, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

function FieldWrapper({ label, icon: IconComp, error, children, focused }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-widest uppercase text-slate-400 flex items-center gap-2">
        <IconComp size={13} className="text-cyan-400" />
        {label}
      </label>
      <div
        className={`relative rounded-xl transition-all duration-300 ${
          focused
            ? 'shadow-[0_0_0_1.5px_#00d4ff,0_0_18px_2px_rgba(0,212,255,0.18)]'
            : error
            ? 'shadow-[0_0_0_1.5px_rgba(239,68,68,0.7)]'
            : 'shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
        }`}
      >
        {children}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key={error}
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center gap-1.5 overflow-hidden"
          >
            <AlertCircleIcon size={12} className="text-red-400 shrink-0" />
            <span className="text-xs text-red-400">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CareersSection({ fields, submit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState('idle');

  const handleChange = useCallback((e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleFocus = useCallback((e) => {
    setFocused(e.currentTarget.name);
  }, []);

  const handleBlur = useCallback((e) => {
    setFocused('');
    const { name } = e.currentTarget;
    const { errors: newErrors } = validate({ ...form, [name]: e.currentTarget.value });
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  }, [form]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { errors: newErrors, valid } = validate(form);
      if (!valid) {
        setErrors(newErrors);
        return;
      }
      setStatus('loading');
      await new Promise((res) => setTimeout(res, 1800));
      if (typeof submit === 'function') {
        submit(form);
      }
      setStatus('success');
    },
    [form, submit]
  );

  const handleReset = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setStatus('idle');
  }, []);

  const inputBase =
    'w-full bg-white/[0.04] text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3.5 outline-none border-0 transition-colors duration-200 focus:bg-white/[0.07]';

  return (
    <section
      id="careers"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black px-4 py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,136,255,0.13),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(0,212,255,0.07),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{}}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <RocketIcon size={16} className="text-cyan-400" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cyan-400">
            Join AeroMac Dynamics
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4"
          style={{ fontFamily: 'Inter, Space Grotesk, sans-serif' }}
        >
          Shape the{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Future
          </span>{' '}
          of Flight
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm text-slate-400 leading-relaxed mb-10 max-w-sm"
        >
          We're assembling the world's most ambitious aerospace team. Tell us who you are and where
          you want to take humanity next.
        </motion.p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative rounded-2xl border border-cyan-500/20 bg-white/[0.04] backdrop-blur-xl px-10 py-14 flex flex-col items-center text-center gap-6 shadow-[0_0_60px_0px_rgba(0,212,255,0.08)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center"
              >
                <CheckCircleIcon size={32} className="text-cyan-400" />
              </motion.div>
              <div>
                <p className="text-xl font-semibold text-white mb-2">Application Received</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Thank you for your interest in AeroMac Dynamics. Our talent team will review your
                  profile and reach out within 5–7 business days.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="mt-2 text-xs font-medium tracking-widest uppercase text-cyan-400 border border-cyan-400/30 rounded-full px-6 py-2.5 hover:bg-cyan-400/10 transition-colors duration-200"
              >
                Submit Another
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              noValidate
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl px-8 py-10 md:px-10 md:py-12 flex flex-col gap-6 shadow-[0_8px_80px_0px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              </div>

              <FieldWrapper
                label="Full Name"
                icon={UserIcon}
                error={errors?.name}
                focused={focused === 'name'}
              >
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Dr. Elena Vasquez"
                  value={form?.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={inputBase}
                  aria-label="Full Name"
                  aria-invalid={!!errors?.name}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Email Address"
                icon={MailIcon}
                error={errors?.email}
                focused={focused === 'email'}
              >
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="elena@aeromac.io"
                  value={form?.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={inputBase}
                  aria-label="Email Address"
                  aria-invalid={!!errors?.email}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Position of Interest"
                icon={BriefcaseIcon}
                error={errors?.position}
                focused={focused === 'position'}
              >
                <div className="relative">
                  <select
                    name="position"
                    value={form?.position}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`${inputBase} appearance-none pr-10 cursor-pointer ${
                      form?.position ? 'text-white' : 'text-slate-500'
                    }`}
                    aria-label="Position of Interest"
                    aria-invalid={!!errors?.position}
                  >
                    {POSITIONS.map((p) => (
                      <option
                        key={p.value}
                        value={p.value}
                        disabled={p.value === ''}
                        className="bg-[#0a0a14] text-white"
                      >
                        {p?.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    size={14}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper
                label="Brief Message"
                icon={MessageSquareIcon}
                error={errors?.message}
                focused={focused === 'message'}
              >
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Describe your background, passion for aerospace, and what drives you to push the boundaries of flight..."
                  value={form?.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`${inputBase} resize-none leading-relaxed`}
                  aria-label="Brief Message"
                  aria-invalid={!!errors?.message}
                />
              </FieldWrapper>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                className="relative mt-2 w-full rounded-full py-4 px-8 text-sm font-semibold tracking-widest uppercase overflow-hidden group disabled:cursor-not-allowed"
                aria-label="Submit Application"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 rounded-full shadow-[0_0_24px_4px_rgba(0,212,255,0.35)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2.5 text-black">
                  {status === 'loading' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                        className="flex"
                      >
                        <LoaderIcon size={16} />
                      </motion.span>
                      <span>Transmitting&hellip;</span>
                    </>
                  ) : (
                    <>
                      <SendIcon size={15} />
                      <span>Submit Application</span>
                    </>
                  )}
                </span>
              </motion.button>

              <p className="text-center text-xs text-slate-600 leading-relaxed">
                Your information is encrypted and handled with absolute discretion. AeroMac
                Dynamics is an equal opportunity employer.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default CareersSection;
