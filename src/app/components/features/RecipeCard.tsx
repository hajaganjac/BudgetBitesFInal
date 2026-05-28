import React, { useState } from 'react';
import { Heart, Flame, Clock, Star, ChefHat, ChevronDown } from 'lucide-react';
import { Card } from '../ui/BBCard';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/BBButton';
import { StoreBadge } from '../ui/StoreBadge';
import type { Recipe } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const FOOD_IMAGES: Record<string, string> = {
  Breakfast: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=60',
  Lunch:     'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60',
  Dinner:    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=60',
  Soup:      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=60',
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { favorites, toggleFavorite, cookRecipe } = useApp();
  const fav = favorites.includes(recipe.id);
  const [openIng, setOpenIng] = useState(false);
  const [openSteps, setOpenSteps] = useState(false);

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
        <img src={FOOD_IMAGES[recipe.category]} alt="" className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-white text-[color:var(--color-text-primary)] text-[11px] font-semibold px-2.5 py-1 rounded-full">{recipe.category}</span>
        <span className="absolute top-3 right-3"><StoreBadge store={recipe.store} /></span>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white inline-flex items-center justify-center"
          aria-label="Favourite"
        >
          <Heart size={16} strokeWidth={1.75}
            style={{ color: fav ? '#E85A4F' : '#57534E', fill: fav ? '#E85A4F' : 'none' }} />
        </button>
        <span className="absolute bottom-3 right-3 bg-black text-white text-[13px] font-semibold px-2.5 py-1 rounded-full tabular-nums">€{recipe.price.toFixed(2)}</span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <h3 className="text-[15px] leading-[20px] font-semibold text-[color:var(--color-text-primary)]">{recipe.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {recipe.dietary.map(d => (
            <span key={d} className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[color:var(--color-accent-cool-tint)] text-[color:var(--color-accent-cool)]">{d}</span>
          ))}
        </div>
        <p className="text-[13px] text-[color:var(--color-text-secondary)] leading-[20px]">{recipe.description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          <span className="inline-flex items-center gap-1 px-2.5 h-7 rounded-full bg-[color:var(--color-bg-muted)] text-[12px] text-[color:var(--color-text-secondary)]"><Flame size={12} /> {recipe.kcal} kcal</span>
          <span className="inline-flex items-center gap-1 px-2.5 h-7 rounded-full bg-[color:var(--color-bg-muted)] text-[12px] text-[color:var(--color-text-secondary)]"><Clock size={12} /> {recipe.timeMin} min</span>
          <span className="inline-flex items-center gap-1 px-2.5 h-7 rounded-full bg-[color:var(--color-bg-muted)] text-[12px] text-[color:var(--color-text-secondary)]"><Star size={12} /> {recipe.difficulty}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md bg-[color:var(--color-bg-muted)] px-2 py-1.5 text-center">
            <div className="text-[13px] font-semibold tabular-nums">{recipe.protein}g</div>
            <div className="text-[11px] text-[color:var(--color-text-tertiary)]">Protein</div>
          </div>
          <div className="rounded-md bg-[color:var(--color-bg-muted)] px-2 py-1.5 text-center">
            <div className="text-[13px] font-semibold tabular-nums">{recipe.carbs}g</div>
            <div className="text-[11px] text-[color:var(--color-text-tertiary)]">Carbs</div>
          </div>
          <div className="rounded-md bg-[color:var(--color-bg-muted)] px-2 py-1.5 text-center">
            <div className="text-[13px] font-semibold tabular-nums">{recipe.fat}g</div>
            <div className="text-[11px] text-[color:var(--color-text-tertiary)]">Fat</div>
          </div>
        </div>

        <div className="border-t border-[color:var(--color-border-subtle)] pt-2">
          <button className="w-full flex items-center justify-between text-[13px] font-medium text-[color:var(--color-text-secondary)] py-1.5" onClick={() => setOpenIng(o => !o)}>
            <span>Show ingredients</span>
            <ChevronDown size={14} className="transition-transform" style={{ transform: openIng ? 'rotate(180deg)' : 'none' }} />
          </button>
          {openIng && (
            <ul className="pl-4 list-disc text-[13px] text-[color:var(--color-text-secondary)] space-y-0.5 pb-2">
              {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
          )}
          <button className="w-full flex items-center justify-between text-[13px] font-medium text-[color:var(--color-text-secondary)] py-1.5" onClick={() => setOpenSteps(o => !o)}>
            <span>Show steps</span>
            <ChevronDown size={14} className="transition-transform" style={{ transform: openSteps ? 'rotate(180deg)' : 'none' }} />
          </button>
          {openSteps && (
            <ol className="pl-5 list-decimal text-[13px] text-[color:var(--color-text-secondary)] space-y-0.5 pb-2">
              {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
            </ol>
          )}
        </div>

        <Button variant="solid" full onClick={() => cookRecipe(recipe)}>
          <ChefHat size={16} /> Cook It!
        </Button>
      </div>
    </Card>
  );
}
