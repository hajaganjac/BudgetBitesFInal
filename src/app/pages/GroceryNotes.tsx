import React, { useState } from 'react';
import { Link } from 'react-router';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/BBCard';
import { Chip } from '../components/ui/Chip';
import { Button } from '../components/ui/BBButton';
import { StoreBadge } from '../components/ui/StoreBadge';
import { useApp } from '../context/AppContext';
import type { Store } from '../data/mockData';

const QUICK = ['Eggs', 'Pasta', 'Rice', 'Onions', 'Lentils', 'Bread'];
const STORES: (Store | 'All Stores')[] = ['All Stores', 'Lidl', 'Albert Heijn', 'Aldi'];

export function GroceryNotes() {
  const { groceryItems, toggleGrocery, clearBought, addGrocery } = useApp();
  const [name, setName] = useState('');
  const [store, setStore] = useState<Store | 'Any Store'>('Any Store');
  const [storeFilter, setStoreFilter] = useState<Store | 'All Stores'>('All Stores');

  const visible = storeFilter === 'All Stores' ? groceryItems : groceryItems.filter(g => g.store === storeFilter);
  const toBuy = visible.filter(g => !g.bought);
  const bought = visible.filter(g => g.bought);
  const total = groceryItems.length;
  const boughtCount = groceryItems.filter(g => g.bought).length;
  const progress = total ? boughtCount / total : 0;

  const submit = () => {
    if (!name.trim()) return;
    addGrocery(name, store === 'Any Store' ? undefined : store);
    setName('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grocery Notes"
        subtitle="Plan your shopping list and stay on budget"
        right={
          <>
            <Chip as="span">{toBuy.length} to buy</Chip>
            <Chip as="span" tone="cool">{boughtCount} bought</Chip>
          </>
        }
      />

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2 text-[13px] text-[color:var(--color-text-secondary)]">
          <span>Shopping progress</span><span className="tabular-nums">{boughtCount}/{total} items</span>
        </div>
        <div className="h-2 rounded-full bg-[color:var(--color-bg-muted)] overflow-hidden">
          <div className="h-full" style={{ width: `${progress * 100}%`, background: 'var(--color-accent-cool)' }} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Red lentils, Pasta, Eggs…"
                 className="flex-1 h-10 px-3 rounded-md border border-[color:var(--color-border-subtle)] text-[14px]" />
          <select value={store} onChange={e => setStore(e.target.value as any)} className="h-10 px-3 rounded-md border border-[color:var(--color-border-subtle)] text-[14px] bg-white">
            <option>Any Store</option><option>Aldi</option><option>Lidl</option><option>Albert Heijn</option>
          </select>
          <Button variant="solid" onClick={submit}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {QUICK.map(q => <Chip key={q} onClick={() => addGrocery(q)}>+ {q}</Chip>)}
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {STORES.map(s => <Chip key={s} active={storeFilter === s} onClick={() => setStoreFilter(s)}>{s}</Chip>)}
      </div>

      <Card className="p-5">
        <div className="text-[11px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium mb-3">To Buy ({toBuy.length})</div>
        <div className="space-y-2">
          {toBuy.map(item => (
            <div key={item.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-[color:var(--color-bg-muted)]">
              <button onClick={() => toggleGrocery(item.id)} className="w-5 h-5 mt-0.5 rounded-md border border-[color:var(--color-border-strong)] hover:border-[color:var(--color-accent-cool)] flex-shrink-0" aria-label="Mark bought" />
              <div className="flex-1 min-w-0">
                <div className="text-[14px]">{item.name}</div>
                {item.cheaperAt && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-[color:var(--color-accent-cool-tint)] text-[color:var(--color-accent-cool)] text-[12px]">
                    <Lightbulb size={11} /> Same item at {item.cheaperAt.store}: −€{item.cheaperAt.saving.toFixed(2)}
                  </span>
                )}
              </div>
              {item.store && <StoreBadge store={item.store} />}
            </div>
          ))}
        </div>
      </Card>

      {bought.length > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium">Already Bought ({bought.length})</div>
            <button onClick={clearBought} className="text-[12px] text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]">Clear bought</button>
          </div>
          <div className="space-y-2">
            {bought.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-md opacity-60">
                <button onClick={() => toggleGrocery(item.id)} className="w-5 h-5 rounded-md inline-flex items-center justify-center" style={{ background: 'var(--color-accent-cool)' }}>
                  <span className="text-white text-[12px]">✓</span>
                </button>
                <div className="flex-1 min-w-0 line-through text-[14px] text-[color:var(--color-text-secondary)]">{item.name}</div>
                {item.store && <StoreBadge store={item.store} />}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="text-center text-[13px] text-[color:var(--color-text-secondary)]">
        This list comes from your weekly plan. <Link to="/plan" className="inline-flex items-center gap-1 text-[color:var(--color-text-primary)] underline-offset-2 hover:underline">Edit plan <ArrowRight size={11} /></Link>
      </div>
    </div>
  );
}
