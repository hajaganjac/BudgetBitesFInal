import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowRight, ChefHat, Lock, User, Mail, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import logoMark from '../../imports/image.png';

interface StoredUser {
  email: string;
  password: string;
  name: string;
  emoji: string;
}

const USERS_KEY = 'budgetbites_users';

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUser(u: StoredUser) {
  const users = getUsers().filter(x => x.email !== u.email);
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, u]));
}
function findUser(email: string, password: string): StoredUser | null {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password) ?? null;
}
function emailExists(email: string): boolean {
  return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
}

const AVATARS = ['👨‍🎓', '👩‍🎓', '🧑‍🍳', '👨‍🍳', '👩‍🍳', '🧑‍💻', '🦊', '🐧'];

function Field({
  label, icon: Icon, type, value, onChange, placeholder, onFocus, onBlur, error, action,
}: {
  label: string; icon: React.ElementType; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  onFocus?: () => void; onBlur?: () => void;
  error?: string; action?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          color: '#57534E', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em',
          textTransform: 'uppercase', display: 'block', marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon
          size={16}
          strokeWidth={1.75}
          style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: error ? '#C24A3F' : focused ? '#1C1B1A' : '#8B8680',
            transition: 'color 0.15s', pointerEvents: 'none',
          }}
        />
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { setFocused(true); onFocus?.(); }}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          style={{
            width: '100%',
            padding: '12px 16px 12px 40px',
            paddingRight: action ? 44 : 16,
            borderRadius: 12,
            border: `1px solid ${error ? '#C24A3F' : focused ? '#1C1B1A' : '#E7E5E0'}`,
            background: '#FFFFFF',
            fontSize: 14,
            lineHeight: '22px',
            outline: 'none',
            fontFamily: 'inherit',
            color: '#1C1B1A',
            boxSizing: 'border-box',
            boxShadow: focused ? '0 0 0 3px rgba(28,27,26,0.06)' : 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
        />
        {action && (
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
            {action}
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              color: '#C24A3F', fontSize: 12, marginTop: 6, marginBottom: 0,
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <AlertCircle size={12} strokeWidth={1.75} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface LoginScreenProps {
  onLogin: (name: string, emoji: string, email: string, rememberMe: boolean) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [tab,         setTab]         = useState<'login' | 'register'>('login');
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [avatar,      setAvatar]      = useState('👨‍🎓');
  const [rememberMe,  setRememberMe]  = useState(true);
  const [celebrating, setCelebrating] = useState(false);
  const [errors,      setErrors]      = useState<Record<string, string>>({});

  useEffect(() => {
    setErrors({});
    setPassword('');
  }, [tab]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (tab === 'register' && !name.trim()) e.name = 'Please enter your name';
    if (!email.includes('@')) e.email = 'Enter a valid email address';
    if (password.length < 4) e.password = 'Password must be at least 4 characters';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const fireConfetti = () => {
      confetti({ particleCount: 60, angle: 60,  spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#E85A4F', '#2A9D8F', '#FF5C8A'] });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#E85A4F', '#2A9D8F', '#FF5C8A'] });
    };

    if (tab === 'register') {
      if (emailExists(email)) { setErrors({ email: 'An account with this email already exists' }); return; }
      saveUser({ email, password, name: name.trim(), emoji: avatar });
      setCelebrating(true);
      setTimeout(fireConfetti, 200);
      setTimeout(() => onLogin(name.trim(), avatar, email.toLowerCase(), rememberMe), 1400);
    } else {
      const user = findUser(email, password);
      if (!user) { setErrors({ password: 'Incorrect email or password' }); return; }
      setCelebrating(true);
      setTimeout(fireConfetti, 200);
      setTimeout(() => onLogin(user.name, user.emoji, user.email.toLowerCase(), rememberMe), 1400);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, display: 'flex',
        background: '#FAFAF9', overflow: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ── LEFT: brand panel (desktop only) ─────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '44%', flexShrink: 0, flexDirection: 'column',
          position: 'relative', overflow: 'hidden',
          background: '#1C1B1A', color: '#E7E5E0',
          padding: '48px 56px',
        }}
      >
        {/* Subtle warm orb */}
        <div
          style={{
            position: 'absolute', top: -120, right: -120,
            width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,90,79,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Brand */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={logoMark}
              alt="BudgetBites"
              style={{ width: 36, height: 36, objectFit: 'contain', display: 'block' }}
            />
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>BudgetBites</div>
            <div style={{ color: '#8B8680', fontSize: 12 }}>Student Kitchen</div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', marginBottom: 'auto' }}>
          <FeatureCarousel />
        </div>

        {/* Footer note */}
        
      </div>

      {/* ── RIGHT: form panel ────────────────────────────────────────── */}
      <div
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px 20px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>

          {/* Mobile-only brand */}
          <div className="flex lg:hidden" style={{ alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div
              style={{
                width: 36, height: 36, borderRadius: 10, background: '#E85A4F',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ChefHat size={18} strokeWidth={1.75} color="#FFFFFF" />
            </div>
            <div style={{ color: '#1C1B1A', fontSize: 16, fontWeight: 600 }}>BudgetBites</div>
          </div>

          {!celebrating && (
            <>
              {/* Heading */}
              <h2
                style={{
                  color: '#1C1B1A', fontSize: 28, lineHeight: '32px', fontWeight: 700,
                  letterSpacing: '-0.02em', margin: 0, marginBottom: 8,
                }}
              >
                {tab === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p style={{ color: '#57534E', fontSize: 14, lineHeight: '22px', margin: 0, marginBottom: 28 }}>
                {tab === 'login'
                  ? "Sign in to pick up where you left off."
                  : 'A minute now saves you €€€ this semester.'}
              </p>

              {/* Tab switcher */}
              <div
                style={{
                  display: 'flex', background: '#F4F4F2', borderRadius: 12, padding: 4, marginBottom: 24,
                }}
              >
                {(['login', 'register'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1, padding: '9px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: tab === t ? '#FFFFFF' : 'transparent',
                      color: tab === t ? '#1C1B1A' : '#8B8680',
                      fontSize: 13, fontWeight: tab === t ? 600 : 500,
                      fontFamily: 'inherit',
                      boxShadow: tab === t ? '0 1px 2px rgba(28,27,26,0.06)' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {t === 'login' ? 'Sign in' : 'Register'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: tab === 'register' ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                  onKeyDown={handleKey}
                >
                  {tab === 'register' && (
                    <Field
                      label="Your name"
                      icon={User}
                      type="text"
                      value={name}
                      onChange={setName}
                      placeholder="e.g. Alex, Mia, Sam"
                      error={errors.name}
                    />
                  )}

                  <Field
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@university.edu"
                    error={errors.email}
                  />

                  <Field
                    label="Password"
                    icon={Lock}
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={setPassword}
                    placeholder={tab === 'register' ? 'Choose a password' : 'Enter your password'}
                    error={errors.password}
                    action={
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: '#8B8680', padding: 4, display: 'flex',
                        }}
                      >
                        {showPass ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                      </button>
                    }
                  />

                  {tab === 'register' && (
                    <div>
                      <label
                        style={{
                          color: '#57534E', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em',
                          textTransform: 'uppercase', display: 'block', marginBottom: 8,
                        }}
                      >
                        Pick your avatar
                      </label>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {AVATARS.map((e) => (
                          <button
                            key={e}
                            type="button"
                            onClick={() => setAvatar(e)}
                            style={{
                              width: 40, height: 40, borderRadius: 10,
                              border: avatar === e ? '1.5px solid #1C1B1A' : '1px solid #E7E5E0',
                              background: avatar === e ? '#F4F4F2' : '#FFFFFF',
                              cursor: 'pointer', fontSize: 20,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.12s',
                              fontFamily: 'inherit',
                            }}
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <label
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      color: '#57534E', fontSize: 13, userSelect: 'none', marginTop: -4,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{
                        width: 16, height: 16, accentColor: '#1C1B1A',
                        cursor: 'pointer', margin: 0,
                      }}
                    />
                    Stay logged in on this device
                  </label>

                  {/* Primary gradient CTA — the screen's ONE gradient button */}
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    style={{
                      width: '100%', padding: '13px 0', marginTop: 8,
                      borderRadius: 12, border: 'none', cursor: 'pointer',
                      background: 'linear-gradient(135deg, #FF5C8A 0%, #2A9D8F 100%)',
                      color: '#FFFFFF', fontSize: 14, fontWeight: 600,
                      fontFamily: 'inherit', letterSpacing: '-0.005em',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 4px 12px rgba(28,27,26,0.10)',
                    }}
                  >
                    {tab === 'login' ? 'Sign in' : 'Create account'}
                    <ArrowRight size={16} strokeWidth={1.75} />
                  </motion.button>

                  <p style={{ textAlign: 'center', color: '#8B8680', fontSize: 13, marginTop: 4, marginBottom: 0 }}>
                    {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                      onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
                      style={{
                        background: 'none', border: 'none', color: '#1C1B1A',
                        fontWeight: 600, cursor: 'pointer', fontSize: 13,
                        fontFamily: 'inherit', padding: 0, textDecoration: 'underline',
                      }}
                    >
                      {tab === 'login' ? 'Register' : 'Sign in'}
                    </button>
                  </p>
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {celebrating && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '48px 0' }}
            >
              <div
                style={{
                  width: 56, height: 56, borderRadius: 16, background: '#E6F4F2',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <ChefHat size={28} strokeWidth={1.75} color="#2A9D8F" />
              </div>
              <div
                style={{
                  color: '#1C1B1A', fontSize: 20, fontWeight: 700,
                  letterSpacing: '-0.01em', marginBottom: 6,
                }}
              >
                {tab === 'register' ? `Welcome, ${name}` : 'Welcome back'}
              </div>
              <p style={{ color: '#57534E', fontSize: 14, margin: 0 }}>Loading your kitchen…</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: 'Plan your week in 5 minutes.',
    body: 'Pick a few recipes and we generate the shopping list for you — no spreadsheet, no second-guessing.',
  },
  {
    title: 'Recipes from what you already have.',
    body: 'Tell us what’s in your kitchen and your budget. Get meal ideas you can actually cook tonight.',
  },
  {
    title: 'Shop the cheapest store.',
    body: 'See when the same item is €1.20 cheaper at Lidl — and skip the aisle math.',
  },
  {
    title: 'Track calories without thinking.',
    body: 'Hit "Cook It!" and we log the meal, kcal, and macros to your day automatically.',
  },
  {
    title: 'Gentle progress, on your terms.',
    body: 'Streaks, weekly goals, and badges if you want them — Quiet mode hides them if you don’t.',
  },
  {
    title: 'Built for a €35 weekly budget.',
    body: 'Every recipe comes in under €2 and shows you what you’ve saved vs. eating out.',
  },
];

function FeatureCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % FEATURES.length), 4800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: 168, maxWidth: 380 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h1
            style={{
              color: '#FFFFFF', fontSize: 36, lineHeight: '44px', fontWeight: 700,
              letterSpacing: '-0.02em', margin: 0, marginBottom: 16, maxWidth: 360,
            }}
          >
            {FEATURES[idx].title}
          </h1>
          <p style={{ color: '#8B8680', fontSize: 15, lineHeight: '24px', margin: 0, maxWidth: 380 }}>
            {FEATURES[idx].body}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 6, marginTop: 24, alignItems: 'center' }}>
        {FEATURES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Show feature ${i + 1}`}
            style={{
              height: 4, width: i === idx ? 24 : 6,
              borderRadius: 2, border: 'none', padding: 0, cursor: 'pointer',
              background: i === idx ? '#E7E5E0' : 'rgba(231,229,224,0.25)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          color: '#FFFFFF', fontSize: 22, fontWeight: 700,
          letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div
        style={{
          color: '#8B8680', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}
