import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/BBCard';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/BBButton';
import { WeekGrid } from '../components/features/WeekGrid';
import { useApp } from '../context/AppContext';

const DIETS = ['All', 'Vegan', 'Vegetarian', 'Halal'] as const;

export function PlanMyWeek() {
  const { weekPlan, recipes, weeklyBudget, setWeeklyBudget, setWeekSlot } = useApp();
  const [diet, setDiet] = useState<typeof DIETS[number]>('All');
  const [people, setPeople] = useState(1);

  const filled = weekPlan.filter(s => s.recipeId);
  const totals = useMemo(() => {
    const filledRecipes = filled.map(s => recipes.find(r => r.id === s.recipeId)!).filter(Boolean);
    const cost = filledRecipes.reduce((s, r) => s + r.price, 0) * people;
    const kcal = filledRecipes.reduce((s, r) => s + r.kcal, 0);
    const items = filledRecipes.reduce((s, r) => s + r.ingredients.length, 0);
    const days = new Set(filled.map(s => s.day)).size || 1;
    return { cost, avgKcal: Math.round(kcal / days), items };
  }, [filled, recipes, people]);

  const autoFill = () => {
    let pool = recipes.slice();
    if (diet !== 'All') pool = pool.filter(r => r.dietary.includes(diet as any));
    let idx = 0;
    weekPlan.forEach(slot => {
      if (slot.recipeId) return;
      const r = pool[idx % pool.length];
      setWeekSlot(slot.day, slot.meal, r.id);
      idx++;
    });
  };

  const costPct = Math.min(1, totals.cost / weeklyBudget);

  return (
    <div className="space-y-6">
      <PageHeader title="Plan My Week" subtitle="Pick recipes for the week — we'll make the grocery list" />

      <Card className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-[13px] text-[color:var(--color-text-secondary)]">Weekly budget</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[color:var(--color-text-tertiary)]">€</span>
              <input type="number" min={5} max={150} value={weeklyBudget} onChange={e => setWeeklyBudget(+e.target.value || 0)}
                     className="h-9 w-24 pl-7 pr-2 rounded-md border border-[color:var(--color-border-subtle)] text-[14px] tabular-nums" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {DIETS.map(d => <Chip key={d} active={diet === d} onClick={() => setDiet(d)}>{d}</Chip>)}
          </div>
          <div className="lg:ml-auto flex items-center gap-2">
            <span className="text-[13px] text-[color:var(--color-text-secondary)]">People</span>
            <button onClick={() => setPeople(p => Math.max(1, p - 1))} className="w-8 h-8 rounded-md border border-[color:var(--color-border-subtle)]">−</button>
            <span className="w-6 text-center text-[14px] font-medium tabular-nums">{people}</span>
            <button onClick={() => setPeople(p => p + 1)} className="w-8 h-8 rounded-md border border-[color:var(--color-border-subtle)]">+</button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        <Card className="p-5">
          <WeekGrid />
        </Card>
        <Card className="p-5 h-fit space-y-4">
          <div>
            <div className="text-[12px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium">Estimated cost</div>
            <div className="text-[24px] font-bold tabular-nums mt-1">€{totals.cost.toFixed(2)} <span className="text-[14px] text-[color:var(--color-text-tertiary)] font-medium">/ €{weeklyBudget}</span></div>
            <div className="mt-2 h-1 rounded-full bg-[color:var(--color-bg-muted)] overflow-hidden">
              <div className="h-full" style={{ width: `${costPct * 100}%`, background: 'var(--color-accent-cool)' }} />
            </div>
          </div>
          <div>
            <div className="text-[12px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium">Avg kcal / day</div>
            <div className="text-[18px] font-semibold tabular-nums mt-1">~{totals.avgKcal} kcal</div>
          </div>
          <div>
            <div className="text-[12px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium">Items needed</div>
            <div className="text-[18px] font-semibold tabular-nums mt-1">{totals.items} ingredients</div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" onClick={autoFill}>Auto-fill week</Button>
        <Button variant="primary">Generate grocery list <ArrowRight size={16} /></Button>
      </div>
    </div>
  );
}
