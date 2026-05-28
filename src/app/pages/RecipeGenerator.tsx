import React, { useState } from 'react';
import { UtensilsCrossed, Sprout, Salad, BadgeCheck, ArrowRight, X } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/BBCard';
import { Button } from '../components/ui/BBButton';
import { Chip } from '../components/ui/Chip';
import { GeneratorStep } from '../components/features/GeneratorStep';

const PRESETS = [
  { label: 'Super cheap (≤€1)', value: 1 },
  { label: 'Budget (≤€2)',      value: 2 },
  { label: 'Standard (≤€3)',    value: 3 },
  { label: 'Flexible (≤€5)',    value: 5 },
];

const DIETS = [
  { id: 'none',  name: 'No Restriction', desc: 'Show all recipes',     icon: UtensilsCrossed },
  { id: 'vegan', name: 'Vegan',          desc: 'Plant-based only',     icon: Sprout },
  { id: 'veg',   name: 'Vegetarian',     desc: 'No meat or fish',      icon: Salad },
  { id: 'halal', name: 'Halal',          desc: 'Halal certified',      icon: BadgeCheck },
];

const QUICK = ['rice', 'lentils', 'tomatoes', 'chicken', 'cheese', 'bread', 'oats', 'milk'];

export function RecipeGenerator() {
  const [budget, setBudget] = useState(3);
  const [diet, setDiet] = useState('none');
  const [kitchen, setKitchen] = useState<string[]>(['eggs', 'pasta', 'garlic', 'onions']);
  const [input, setInput] = useState('');

  const addIngredient = (n: string) => {
    const v = n.trim().toLowerCase();
    if (!v || kitchen.includes(v)) return;
    setKitchen(k => [...k, v]);
  };

  const remove = (n: string) => setKitchen(k => k.filter(i => i !== n));

  return (
    <div>
      <PageHeader
        title="Recipe Generator"
        subtitle="Tell us your budget, diet, and what's in your kitchen"
      />

      <Card className="max-w-[800px] mx-auto p-8 space-y-8">
        <GeneratorStep index={1} title="Set your meal budget" subtitle="Maximum you want to spend per meal">
          <div className="flex items-center gap-4">
            <input
              type="range" min={0.5} max={5} step={0.1}
              value={budget} onChange={e => setBudget(+e.target.value)}
              className="flex-1"
            />
            <span className="inline-flex items-center px-3 h-8 rounded-md bg-[color:var(--color-bg-muted)] text-[13px] font-semibold tabular-nums">€{budget.toFixed(2)}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {PRESETS.map(p => (
              <Chip key={p.value} active={budget === p.value} onClick={() => setBudget(p.value)}>{p.label}</Chip>
            ))}
          </div>
        </GeneratorStep>

        <GeneratorStep index={2} title="Dietary preference">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {DIETS.map(d => {
              const Icon = d.icon;
              const active = diet === d.id;
              return (
                <button
                  key={d.id} onClick={() => setDiet(d.id)}
                  className={`text-left rounded-md p-3 transition ${active ? 'border-2 border-[color:var(--color-accent-warm)] bg-white' : 'border border-[color:var(--color-border-subtle)] hover:bg-[color:var(--color-bg-muted)]'}`}
                >
                  <Icon size={18} className="text-[color:var(--color-text-secondary)]" />
                  <div className="text-[14px] font-semibold mt-2">{d.name}</div>
                  <div className="text-[12px] text-[color:var(--color-text-secondary)] mt-0.5">{d.desc}</div>
                </button>
              );
            })}
          </div>
        </GeneratorStep>

        <GeneratorStep index={3} title="What's in your kitchen?">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { addIngredient(input); setInput(''); } }}
              placeholder="e.g. eggs, pasta, garlic, rice…"
              className="flex-1 h-10 px-3 rounded-md border border-[color:var(--color-border-subtle)] text-[14px]"
            />
            <Button variant="cool" onClick={() => { addIngredient(input); setInput(''); }}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {QUICK.map(q => (
              <Chip key={q} onClick={() => addIngredient(q)}>+ {q}</Chip>
            ))}
          </div>
          {kitchen.length > 0 && (
            <div className="mt-4">
              <div className="text-[13px] text-[color:var(--color-text-secondary)] mb-2">Your kitchen ({kitchen.length} items):</div>
              <div className="flex flex-wrap gap-2">
                {kitchen.map(k => (
                  <span key={k} className="inline-flex items-center gap-1 px-3 h-8 rounded-full bg-[color:var(--color-accent-warm-tint)] text-[color:var(--color-accent-warm)] text-[13px] font-medium">
                    {k}
                    <button onClick={() => remove(k)} className="inline-flex items-center"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </GeneratorStep>

        <Button variant="primary" size="lg" full>
          Generate my recipes <ArrowRight size={16} />
        </Button>
      </Card>
    </div>
  );
}
