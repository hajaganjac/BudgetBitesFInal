import React, { useState } from 'react';
import { NavLink } from 'react-router';
import {
  LayoutDashboard, BookOpen, Sparkles, ShoppingCart, CalendarCheck, Trophy,
  Moon, Settings, LogOut, Flame, Star, X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProfileModal } from './ProfileModal';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const NAV = [
  { to: '/',             label: 'Dashboard',        icon: LayoutDashboard, end: true },
  { to: '/recipes',      label: 'Recipes',          icon: BookOpen },
  { to: '/generator',    label: 'Recipe Generator', icon: Sparkles },
  { to: '/grocery',      label: 'Grocery Notes',    icon: ShoppingCart },
  { to: '/plan',         label: 'Plan My Week',     icon: CalendarCheck },
  { to: '/achievements', label: 'Achievements',     icon: Trophy },
];

export function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const {
    studentName, studentEmoji,
    quietMode, setQuietMode,
    weeklyBudget, weeklySpent,
    calorieGoal,
    streakDays, level, levelName, xp, xpForNext,
  } = useApp();

  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const remaining = Math.max(0, weeklyBudget - weeklySpent);
  const budgetPct = Math.min(100, (weeklySpent / weeklyBudget) * 100);
  const caloriesThisWeek = 1050;
  const caloriesPct = Math.min(100, (caloriesThisWeek / calorieGoal) * 100);
  const levelPct = Math.round((xp / xpForNext) * 100);

  const sidebarContent = (
    <aside
      className="h-full w-[248px] flex flex-col text-[color:var(--color-sidebar-fg)] overflow-y-auto"
      style={{ background: 'var(--color-sidebar-bg)' }}
    >
      <div className="px-5 pt-5 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-md flex items-center justify-center text-white text-[16px] font-bold"
             style={{ background: 'var(--color-accent-warm)' }}>
          B
        </div>
        <div className="min-w-0">
          <div className="text-[16px] font-semibold text-white truncate">BudgetBites</div>
          <div className="text-[12px] text-[color:var(--color-sidebar-fg-muted)]">Student Kitchen</div>
        </div>
        <button onClick={onClose} className="lg:hidden ml-auto text-white/70"><X size={18} /></button>
      </div>

      <div className="px-3">
        <div className="px-2 mb-1 text-[11px] uppercase tracking-[0.08em] text-[color:var(--color-sidebar-fg-muted)] font-medium">Menu</div>
        <nav className="flex flex-col">
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-3 h-10 rounded-md text-[14px] font-medium transition ${
                    isActive ? 'text-white' : 'text-[color:var(--color-sidebar-fg)] hover:bg-white/5'
                  }`
                }
                style={({ isActive }) => isActive ? { background: 'rgba(255,255,255,0.06)' } : undefined}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full" style={{ background: 'var(--color-accent-warm)' }} />}
                    <Icon size={20} strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="px-5 mt-6">
        <div className="text-[11px] uppercase tracking-[0.08em] text-[color:var(--color-sidebar-fg-muted)] font-medium mb-2">This Week</div>
        <div className="rounded-md bg-white/5 p-3 mb-2">
          <div className="flex items-center justify-between text-[12px]"><span className="text-[color:var(--color-sidebar-fg-muted)]">Budget</span><span className="text-white font-medium tabular-nums">€{remaining.toFixed(2)} left</span></div>
          <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full" style={{ width: `${budgetPct}%`, background: 'var(--color-accent-cool)' }} /></div>
          <div className="mt-1.5 text-[11px] text-[color:var(--color-sidebar-fg-muted)] tabular-nums">€{weeklySpent.toFixed(2)} spent / €{weeklyBudget}</div>
        </div>
        <div className="rounded-md bg-white/5 p-3">
          <div className="flex items-center justify-between text-[12px]"><span className="text-[color:var(--color-sidebar-fg-muted)]">Calories</span><span className="text-white font-medium tabular-nums">{caloriesThisWeek} kcal</span></div>
          <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full" style={{ width: `${caloriesPct}%`, background: 'var(--color-accent-cool)' }} /></div>
          <div className="mt-1.5 text-[11px] text-[color:var(--color-sidebar-fg-muted)] tabular-nums">Goal: {calorieGoal.toLocaleString()} kcal</div>
        </div>
      </div>

      {!quietMode && (
        <div className="px-5 mt-4">
          <div className="flex gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium"
                  style={{ background: 'rgba(232,90,79,0.18)', color: '#F4A39B' }}>
              <Flame size={11} /> {streakDays}d streak
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium"
                  style={{ background: 'rgba(42,157,143,0.18)', color: '#7FCBC0' }}>
              <Star size={11} /> Lv.{level} · {xp} XP
            </span>
          </div>
          <div className="text-[11px] text-[color:var(--color-sidebar-fg-muted)] mb-1">{levelName} · {levelPct}%</div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full" style={{ width: `${levelPct}%`, background: 'var(--color-accent-cool)' }} /></div>
        </div>
      )}

      <div className="px-5 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] text-[color:var(--color-sidebar-fg)]"><Moon size={16} /> Quiet mode</div>
        <button
          role="switch"
          aria-checked={quietMode}
          onClick={() => setQuietMode(!quietMode)}
          className="w-9 h-5 rounded-full relative transition"
          style={{ background: quietMode ? 'var(--color-accent-cool)' : 'rgba(255,255,255,0.15)' }}
        >
          <span className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all" style={{ left: quietMode ? '18px' : '2px' }} />
        </button>
      </div>

      <div className="flex-1" />

      <div className="px-3 pb-3 pt-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[16px]">{studentEmoji}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-white truncate">{studentName}</div>
            <div className="text-[11px] text-[color:var(--color-sidebar-fg-muted)] truncate">{levelName}</div>
          </div>
          <button onClick={() => setProfileOpen(true)} className="p-1.5 rounded-md hover:bg-white/10 text-[color:var(--color-sidebar-fg-muted)]" aria-label="Profile settings"><Settings size={16} /></button>
        </div>
        <button
          onClick={() => setConfirmLogout(true)}
          className="mt-2 w-full h-10 rounded-md border border-white/15 text-[color:var(--color-danger)] inline-flex items-center justify-center gap-2 text-[13px] font-medium hover:bg-white/5"
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <LogoutConfirm
        open={confirmLogout}
        name={studentName}
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => { setConfirmLogout(false); onLogout(); }}
      />
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block sticky top-0 h-screen flex-shrink-0">{sidebarContent}</div>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative z-50 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

function LogoutConfirm({
  open, name, onCancel, onConfirm,
}: { open: boolean; name: string; onCancel: () => void; onConfirm: () => void }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(28,27,26,0.5)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-[400px] p-6 shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                   style={{ background: 'rgba(194,74,63,0.12)' }}>
                <LogOut size={18} className="text-[color:var(--color-danger)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-semibold text-[color:var(--color-text-primary)]">Log out of BudgetBites?</div>
                <p className="text-[13px] text-[color:var(--color-text-secondary)] mt-1 leading-relaxed">
                  Hey {name}, we'll keep your week's plan, calories, groceries and streak saved so it's all here when you come back.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={onCancel}
                className="px-4 h-10 rounded-md border border-[color:var(--color-border-subtle)] text-[13px] font-medium hover:bg-[color:var(--color-bg-muted)]"
              >
                Stay logged in
              </button>
              <button
                onClick={onConfirm}
                className="px-4 h-10 rounded-md text-white text-[13px] font-medium inline-flex items-center gap-2"
                style={{ background: 'var(--color-danger)' }}
              >
                <LogOut size={14} /> Log out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

