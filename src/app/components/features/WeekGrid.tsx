import React from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { weekDays, mealSlots, type WeekDay, type Meal } from '../../data/mockData';

export function WeekGrid() {
  const { weekPlan, recipes, setWeekSlot } = useApp();
  const findSlot = (d: WeekDay, m: Meal) => weekPlan.find(s => s.day === d && s.meal === m);

  // Fixed sample fill when user clicks "+ pick" — assign first unused recipe
  const pick = (d: WeekDay, m: Meal) => {
    const pool = recipes.filter(r => r.category === m || (m === 'Lunch' && r.category === 'Lunch') || true);
    const used = new Set(weekPlan.filter(s => s.recipeId).map(s => s.recipeId));
    const next = pool.find(r => !used.has(r.id)) ?? pool[0];
    setWeekSlot(d, m, next.id);
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-[80px_repeat(7,minmax(140px,1fr))] gap-2 min-w-[800px]">
        <div />
        {weekDays.map(d => (
          <div key={d} className="text-[12px] uppercase tracking-[0.04em] font-medium text-[color:var(--color-text-tertiary)] px-1 pb-1">{d}</div>
        ))}
        {mealSlots.map(meal => (
          <React.Fragment key={meal}>
            <div className="flex items-center text-[12px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium">{meal}</div>
            {weekDays.map(d => {
              const slot = findSlot(d, meal);
              const recipe = slot?.recipeId ? recipes.find(r => r.id === slot.recipeId) : null;
              if (!recipe) {
                return (
                  <button
                    key={d + meal}
                    onClick={() => pick(d, meal)}
                    className="h-[88px] rounded-md border border-dashed border-[color:var(--color-border-strong)] flex items-center justify-center gap-1 text-[12px] text-[color:var(--color-text-tertiary)] hover:bg-[color:var(--color-bg-muted)]"
                  >
                    <Plus size={14} /> pick
                  </button>
                );
              }
              return (
                <div key={d + meal} className="h-[88px] rounded-md bg-white border border-[color:var(--color-border-subtle)] p-2 flex gap-2 relative group">
                  <div className="w-10 h-10 rounded-sm bg-[color:var(--color-bg-muted)] flex-shrink-0 flex items-center justify-center text-[16px]">
                    🍽️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium leading-tight line-clamp-2">{recipe.name}</div>
                    <div className="text-[12px] text-[color:var(--color-text-secondary)] mt-0.5 tabular-nums">€{recipe.price.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={() => setWeekSlot(d, meal, null)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white border border-[color:var(--color-border-subtle)] inline-flex items-center justify-center opacity-0 group-hover:opacity-100"
                    aria-label="Remove"
                  >
                    <X size={11} />
                  </button>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
