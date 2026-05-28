import React from 'react';

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[28px] leading-[32px] font-bold tracking-[-0.02em] text-[color:var(--color-text-primary)]">{title}</h1>
        {subtitle && <p className="mt-1 text-[14px] text-[color:var(--color-text-secondary)]">{subtitle}</p>}
      </div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </div>
  );
}
