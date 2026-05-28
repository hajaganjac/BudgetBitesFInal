import React from 'react';
import {
  Trophy, Egg, Flame, CalendarDays, Sprout, Zap, PiggyBank, Heart, ChefHat, Crown,
  CalendarCheck, ShoppingBag, Cookie, UtensilsCrossed, Check, Lock,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/BBCard';
import { useApp } from '../context/AppContext';

const ICONS: Record<string, any> = {
  Egg, Flame, CalendarDays, Sprout, Zap, PiggyBank, Heart, ChefHat, Crown,
  CalendarCheck, ShoppingBag, Cookie, UtensilsCrossed, Trophy,
};

export function Achievements() {
  const { badges, levels, level, levelName, xp, xpForNext, streakDays, weeklyMealsCooked, savedThisMonth, studentName, studentEmoji } = useApp();
  const unlocked = badges.filter(b => b.unlocked);
  const locked = badges.filter(b => !b.unlocked);
  const levelPct = Math.round((xp / xpForNext) * 100);

  return (
    <div className="space-y-6">
      <PageHeader title="Achievements" subtitle={`${unlocked.length} of ${badges.length} unlocked`} />

      {/* Profile summary */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[color:var(--color-bg-muted)] flex items-center justify-center text-[24px]">{studentEmoji}</div>
            <div>
              <div className="text-[18px] font-semibold">{studentName}</div>
              <div className="flex gap-1.5 mt-1">
                <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[color:var(--color-accent-cool-tint)] text-[color:var(--color-accent-cool)]">{levelName}</span>
                <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[color:var(--color-accent-warm-tint)] text-[color:var(--color-accent-warm)] inline-flex items-center gap-1"><Flame size={10} />{streakDays}-day streak</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:ml-auto">
            <TinyStat icon={<ChefHat size={14} />} label="Meals"  value={`${weeklyMealsCooked + 4}`} />
            <TinyStat icon={<PiggyBank size={14} />} label="Saved" value={`€${savedThisMonth}`} />
            <TinyStat icon={<Trophy size={14} />}    label="Badges" value={`${unlocked.length}/${badges.length}`} />
            <TinyStat icon={<Flame size={14} />}     label="Streak" value={`${streakDays}d`} />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[12px] text-[color:var(--color-text-secondary)] mb-1 tabular-nums">Level {level} → Level {level + 1} · {xp} / {xpForNext} XP</div>
          <div className="h-2 rounded-full bg-[color:var(--color-bg-muted)] overflow-hidden">
            <div className="h-full" style={{ width: `${levelPct}%`, background: 'var(--color-accent-cool)' }} />
          </div>
        </div>
      </Card>

      {/* Level Roadmap */}
      <Card className="p-6">
        <h2 className="text-[15px] font-semibold mb-4">Level Roadmap</h2>
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {levels.map((lvl, i) => {
            const Icon = ICONS[lvl.iconName] ?? Trophy;
            const past = lvl.level < level;
            const current = lvl.level === level;
            return (
              <React.Fragment key={lvl.level}>
                <div className="flex flex-col items-center gap-1.5 min-w-[88px]">
                  <div
                    className={`w-12 h-12 rounded-md flex items-center justify-center transition ${
                      current ? '' : past ? 'bg-[color:var(--color-bg-muted)]' : 'bg-[color:var(--color-bg-muted)] opacity-50'
                    }`}
                    style={current ? { border: '2px solid var(--color-accent-cool)', background: 'var(--color-accent-cool-tint)' } : undefined}
                  >
                    {past ? <Check size={20} className="text-[color:var(--color-accent-cool)]" /> : <Icon size={20} className="text-[color:var(--color-text-secondary)]" />}
                  </div>
                  <div className="text-[11px] text-center text-[color:var(--color-text-secondary)] font-medium">{lvl.name}</div>
                  <div className="text-[10px] text-[color:var(--color-text-tertiary)]">Lv.{lvl.level}</div>
                </div>
                {i < levels.length - 1 && <div className="flex-1 h-px bg-[color:var(--color-border-subtle)] min-w-[12px]" />}
              </React.Fragment>
            );
          })}
        </div>
      </Card>

      {/* Badges */}
      <Card className="p-6">
        <h2 className="text-[15px] font-semibold mb-4">All Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map(b => {
            const Icon = ICONS[b.iconName] ?? Trophy;
            return (
              <div key={b.id} className={`rounded-md border border-[color:var(--color-border-subtle)] p-4 relative ${b.unlocked ? '' : 'opacity-75'}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                       style={{ background: b.unlocked ? 'var(--color-accent-warm-tint)' : 'var(--color-bg-muted)' }}>
                    {b.unlocked
                      ? <Icon size={20} className="text-[color:var(--color-accent-warm)]" />
                      : <Lock size={18} className="text-[color:var(--color-text-tertiary)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[14px] font-semibold">{b.name}</div>
                      <span className="text-[11px] font-semibold text-[color:var(--color-accent-cool)] flex-shrink-0">+{b.xp} XP</span>
                    </div>
                    <div className="text-[12px] text-[color:var(--color-text-secondary)] mt-0.5">{b.description}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 text-[11px] text-[color:var(--color-text-tertiary)] tabular-nums">
                  <span>{b.progressLabel}</span>
                  <span>{Math.round(b.progress * 100)}%</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-[color:var(--color-bg-muted)] overflow-hidden">
                  <div className="h-full" style={{ width: `${b.progress * 100}%`, background: b.unlocked ? 'var(--color-accent-cool)' : 'var(--color-border-strong)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <p className="text-center text-[13px] text-[color:var(--color-text-secondary)]">Keep planning, cooking, and saving to unlock more.</p>
    </div>
  );
}

function TinyStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md bg-[color:var(--color-bg-muted)] px-3 py-2">
      <div className="text-[11px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] flex items-center gap-1">{icon} {label}</div>
      <div className="text-[15px] font-semibold tabular-nums mt-0.5">{value}</div>
    </div>
  );
}
