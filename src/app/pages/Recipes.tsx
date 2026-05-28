import React, { useState } from 'react';
import { Heart, Filter } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/BBButton';
import { RecipeCard } from '../components/features/RecipeCard';
import { useApp } from '../context/AppContext';

const FILTERS = ['All', 'Vegan', 'Vegetarian', 'Halal'] as const;
type Filter = typeof FILTERS[number];

export function Recipes() {
  const { recipes, favorites } = useApp();
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = filter === 'All' ? recipes : recipes.filter(r => r.dietary.includes(filter as any));

  return (
    <div>
      <PageHeader
        title="Recipes"
        subtitle="16 budget-friendly meals for your €35/week"
        right={
          <>
            <Chip tone="warm" as="span" leadingIcon={<Heart size={12} />}>{favorites.length}</Chip>
            <Button variant="outline" size="sm"><Filter size={14} /> Filters</Button>
          </>
        }
      />
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map(f => (
          <Chip key={f} active={f === filter} onClick={() => setFilter(f)}>{f}</Chip>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}
