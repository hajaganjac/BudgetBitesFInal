import React from 'react';
import { Link } from 'react-router';
import { Sunrise, Sun, Moon, TrendingUp, Wallet, ChefHat, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/BBCard';
import { Button } from '../components/ui/BBButton';
import { StatCard } from '../components/ui/StatCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { RecipeCard } from '../components/features/RecipeCard';
import { useApp } from '../context/AppContext';
import { useIsReturning } from '../context/LogoutContext';
import { weeklySpending } from '../data/mockData';

const MEAL_ICONS: Record<string, any> = {
  Breakfast: Sunrise, Lunch: Sun, Dinner: Moon,
};

export function Dashboard() {
  const {
    studentName, recipes, todaysPlan, todaysTotals,
    calorieGoal, weeklyBudget, weeklySpent, savedThisMonth,
    weeklyMealsCooked, weeklyMealGoal,
  } = useApp();
  const isReturning = useIsReturning();

  const now = new Date();
  const dayName = now.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const timeGreeting = (() => {
    const h = now.getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();
  const greeting = isReturning ? 'Welcome back' : timeGreeting;
  const subtitle = isReturning
    ? `${dayName} · Your plan, calories, and streak are right where you left them`
    : `${dayName} · You're on track this week`;

  const ringValue = Math.min(1, todaysTotals.kcal / calorieGoal);
  const budgetRemaining = Math.max(0, weeklyBudget - weeklySpent);
  const budgetProgress = (weeklyBudget - budgetRemaining) / weeklyBudget;

  const cheapestPicks = [1, 2, 3].map(id => recipes.find(r => r.id === id)!);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${greeting}, ${studentName}`}
        subtitle={subtitle}
      />

      {/* Block 1 — Today hero */}
      <Card className="p-7">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-center">
          <div>
            <div className="text-[12px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium mb-3">Today's Plan</div>
            <div className="space-y-2">
              {todaysPlan.slice(0, 3).map((entry, i) => {
                const Icon = MEAL_ICONS[entry.meal] ?? Sun;
                const r = recipes.find(x => x.id === entry.recipeId);
                return (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <Icon size={18} />
                    <span className="text-[13px] text-[color:var(--color-text-tertiary)] w-[80px]">{entry.meal}</span>
                    <span className="text-[14px] font-medium flex-1">{r?.name ?? 'Logged meal'}</span>
                    <span className="text-[12px] tabular-nums px-2.5 py-1 rounded-full bg-[color:var(--color-bg-muted)]">{entry.kcal} kcal</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-[color:var(--color-border-subtle)] flex items-center justify-between">
              <span className="text-[13px] text-[color:var(--color-text-secondary)] tabular-nums">Total: {todaysTotals.kcal.toLocaleString()} kcal · €{todaysTotals.cost.toFixed(2)}</span>
              <Link to="/plan" className="text-[12px] text-[color:var(--color-text-tertiary)] hover:text-[color:var(--color-text-primary)] inline-flex items-center gap-1">Edit today's plan <ArrowRight size={11} /></Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <ProgressRing value={ringValue} size={140} stroke={12}>
              <div className="text-[28px] font-bold tabular-nums">{todaysTotals.kcal.toLocaleString()}</div>
              <div className="text-[12px] text-[color:var(--color-text-tertiary)] tabular-nums">/ {calorieGoal.toLocaleString()} kcal</div>
            </ProgressRing>
            <div className="flex gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-full bg-[color:var(--color-bg-muted)] text-[12px] tabular-nums">P {todaysTotals.protein}g</span>
              <span className="px-2.5 py-1 rounded-full bg-[color:var(--color-bg-muted)] text-[12px] tabular-nums">C {todaysTotals.carbs}g</span>
              <span className="px-2.5 py-1 rounded-full bg-[color:var(--color-bg-muted)] text-[12px] tabular-nums">F {todaysTotals.fat}g</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Block 2 — Three stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Saved this month" value={`€${savedThisMonth}`} subtitle="vs eating out" icon={<TrendingUp size={14} />} />
        <StatCard label="Weekly budget" value={`€${budgetRemaining.toFixed(2)}`} subtitle={`left of €${weeklyBudget}`} icon={<Wallet size={14} />} progress={budgetProgress} />
        <StatCard label="Cooked this week" value={`${weeklyMealsCooked} meals`} subtitle={`Goal: ${weeklyMealGoal} / week ✓`} subtitleTone="cool" icon={<ChefHat size={14} />} />
      </div>

      {/* Block 3 — Plan my week hero */}
      <Card className="p-6" style={{ background: 'linear-gradient(90deg, #FFF7F1 0%, #FFFFFF 100%)' }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-semibold tracking-[-0.01em]">Plan your week in 5 minutes</h2>
            <p className="text-[14px] text-[color:var(--color-text-secondary)] mt-1">Pick a few recipes, we'll generate the shopping list.</p>
          </div>
          <Link to="/plan"><Button variant="primary" size="lg">Plan my week <ArrowRight size={16} /></Button></Link>
        </div>
      </Card>

      {/* Block 4 — Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        <Card className="p-5">
          <h3 className="text-[15px] font-semibold mb-3">Weekly spending</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <BarChart data={weeklySpending} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="#E7E5E0" strokeDasharray="2 3" vertical={false} />
                <XAxis dataKey="day" stroke="#8B8680" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8B8680" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#F4F4F2' }} contentStyle={{ borderRadius: 8, border: '1px solid #E7E5E0', fontSize: 12 }} formatter={(v: any) => `€${Number(v).toFixed(2)}`} />
                <Bar dataKey="value" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-[15px] font-semibold mb-3">Quick start</h3>
          <div className="space-y-2">
            <Link to="/generator" className="flex items-center gap-3 p-3 rounded-md hover:bg-[color:var(--color-bg-muted)] transition">
              <Sparkles size={18} className="text-[color:var(--color-text-tertiary)]" />
              <div className="flex-1">
                <div className="text-[14px] font-medium">Generate a recipe</div>
                <div className="text-[12px] text-[color:var(--color-text-tertiary)]">Budget, diet, and what's in your kitchen</div>
              </div>
              <ArrowRight size={14} className="text-[color:var(--color-text-tertiary)]" />
            </Link>
            <Link to="/recipes" className="flex items-center gap-3 p-3 rounded-md hover:bg-[color:var(--color-bg-muted)] transition">
              <BookOpen size={18} className="text-[color:var(--color-text-tertiary)]" />
              <div className="flex-1">
                <div className="text-[14px] font-medium">Browse all recipes</div>
                <div className="text-[12px] text-[color:var(--color-text-tertiary)]">16 budget-friendly meals</div>
              </div>
              <ArrowRight size={14} className="text-[color:var(--color-text-tertiary)]" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Block 5 — Cheapest picks */}
      <div>
        <h2 className="text-[18px] font-semibold tracking-[-0.01em] mb-4">Today's cheapest picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cheapestPicks.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </div>
  );
}
