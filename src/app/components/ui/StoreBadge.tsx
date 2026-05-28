import React from 'react';
import type { Store } from '../../data/mockData';

const COLORS: Record<Store, { fg: string; bg: string }> = {
  'Aldi':         { fg: '#C24A3F', bg: '#FDECEC' },
  'Lidl':         { fg: '#0056A0', bg: '#E6EFF7' },
  'Albert Heijn': { fg: '#0086B0', bg: '#E5F6FD' },
};

export function StoreBadge({ store }: { store: Store }) {
  const c = COLORS[store];
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ color: c.fg, background: c.bg }}
    >
      {store}
    </span>
  );
}
