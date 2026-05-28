import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame } from 'lucide-react';
import { useApp, type MotivationStyle } from '../context/AppContext';
import { Button } from './ui/BBButton';

const AVATARS = ['👨‍🎓', '👩‍🎓', '👨‍🍳', '👩‍🍳', '🧑‍🍳', '👩‍💻', '👨‍💻', '🧑‍🦱', '🧙', '🐧', '🦊'];

interface Props { open: boolean; onClose: () => void; }

export function ProfileModal({ open, onClose }: Props) {
  const {
    studentName, setStudentName,
    studentEmoji, setStudentEmoji,
    calorieGoal, setCalorieGoal,
    weeklyBudget, setWeeklyBudget,
    motivationStyle, setMotivationStyle,
    weeklyMealGoal, setWeeklyMealGoal,
    streakDays, level, levelName, xp, xpForNext,
    weeklyMealsCooked, savedThisMonth, badges,
  } = useApp();

  const [name, setName] = useState(studentName);
  const [emoji, setEmoji] = useState(studentEmoji);
  const [cal, setCal] = useState(calorieGoal);
  const [bud, setBud] = useState(weeklyBudget);
  const [mot, setMot] = useState<MotivationStyle>(motivationStyle);
  const [goal, setGoal] = useState(weeklyMealGoal);

  useEffect(() => {
    if (open) {
      setName(studentName); setEmoji(studentEmoji); setCal(calorieGoal);
      setBud(weeklyBudget); setMot(motivationStyle); setGoal(weeklyMealGoal);
    }
  }, [open]);

  const save = () => {
    setStudentName(name || studentName);
    setStudentEmoji(emoji);
    setCalorieGoal(cal);
    setWeeklyBudget(bud);
    setMotivationStyle(mot);
    setWeeklyMealGoal(goal);
    onClose();
  };

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalBadges = badges.length;
  const levelPct = Math.round((xp / xpForNext) * 100);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28,27,26,0.45)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-[16px] w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-8 relative"
            initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-[color:var(--color-bg-muted)]" aria-label="Close"><X size={18} /></button>
            <h2 className="text-[20px] font-bold mb-4">Edit Profile</h2>

            {/* Header card */}
            <div className="rounded-md bg-[color:var(--color-bg-muted)] p-4 flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[24px]">{emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold">{name || studentName}</div>
                <div className="flex gap-1.5 mt-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--color-accent-cool-tint)] text-[color:var(--color-accent-cool)] font-medium">{levelName}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[color:var(--color-accent-warm-tint)] text-[color:var(--color-accent-warm)] font-medium inline-flex items-center gap-1"><Flame size={10} />{streakDays}d streak</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-white overflow-hidden">
                  <div className="h-full" style={{ width: `${levelPct}%`, background: 'var(--color-accent-cool)' }} />
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              <Stat label="Meals" value={`${weeklyMealsCooked + 4}`} />
              <Stat label="Saved" value={`€${savedThisMonth}`} />
              <Stat label="Badges" value={`${unlockedCount}/${totalBadges}`} />
              <Stat label="Streak" value={`${streakDays}d`} />
            </div>

            {/* Name */}
            <Section title="Your Name">
              <input value={name} onChange={e => setName(e.target.value)} className="w-full h-10 px-3 rounded-md border border-[color:var(--color-border-subtle)] text-[14px]" />
            </Section>

            {/* Avatar */}
            <Section title="Avatar">
              <div className="flex flex-wrap gap-2">
                {AVATARS.map(a => (
                  <button key={a} onClick={() => setEmoji(a)} className={`w-10 h-10 rounded-md text-[20px] inline-flex items-center justify-center transition ${emoji === a ? 'border-2 border-[color:var(--color-accent-warm)] bg-[color:var(--color-bg-muted)]' : 'border border-[color:var(--color-border-subtle)] hover:bg-[color:var(--color-bg-muted)]'}`}>{a}</button>
                ))}
              </div>
            </Section>

            {/* Calorie goal */}
            <Section title={`Daily Calorie Goal: ${cal} kcal`}>
              <input type="range" min={1200} max={3500} step={50} value={cal} onChange={e => setCal(+e.target.value)} />
            </Section>

            {/* Budget */}
            <Section title={`Weekly Grocery Budget: €${bud}`}>
              <input type="range" min={10} max={80} step={1} value={bud} onChange={e => setBud(+e.target.value)} />
            </Section>

            {/* Motivation style */}
            <Section title="Motivation style">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {([
                  { id: 'calm',       title: 'Calm',       desc: 'Hide streaks, XP, and badges from main views' },
                  { id: 'balanced',   title: 'Balanced',   desc: 'Show small progress hints only' },
                  { id: 'motivated',  title: 'Motivated',  desc: 'Show streaks, daily missions, and full gamification' },
                ] as const).map(opt => (
                  <button key={opt.id} onClick={() => setMot(opt.id)} className={`text-left rounded-md p-3 transition ${mot === opt.id ? 'border-2 border-[color:var(--color-accent-warm)] bg-[color:var(--color-bg-muted)]' : 'border border-[color:var(--color-border-subtle)]'}`}>
                    <div className="text-[14px] font-semibold">{opt.title}</div>
                    <div className="text-[12px] text-[color:var(--color-text-secondary)] mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <p className="text-[12px] text-[color:var(--color-text-tertiary)] mt-2">You can change this anytime. We won't pressure you.</p>
            </Section>

            {/* Weekly goal */}
            <Section title={`Weekly goal: ${goal} meals / week`}>
              <input type="range" min={2} max={7} step={1} value={goal} onChange={e => setGoal(+e.target.value)} />
              <p className="text-[12px] text-[color:var(--color-text-tertiary)] mt-2">We'll celebrate weekly progress instead of daily streaks.</p>
            </Section>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="solid" onClick={save}>Save Changes</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-[13px] font-medium text-[color:var(--color-text-primary)] mb-2">{title}</div>
      {children}
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[color:var(--color-bg-muted)] p-2 text-center">
      <div className="text-[14px] font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] text-[color:var(--color-text-tertiary)]">{label}</div>
    </div>
  );
}
