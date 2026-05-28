import React from 'react';
import { Card } from './BBCard';

interface Props {
  label: string;
  value: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  progress?: number; // 0..1
  subtitleTone?: 'tertiary' | 'cool';
}

export function StatCard({ label, value, subtitle, icon, progress, subtitleTone = 'tertiary' }: Props) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.04em] text-[color:var(--color-text-tertiary)] font-medium">
        {icon && <span className="text-[color:var(--color-text-tertiary)] inline-flex">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-[28px] leading-[32px] font-bold tabular-nums text-[color:var(--color-text-primary)]">{value}</div>
      {subtitle && (
        <div className={subtitleTone === 'cool'
          ? 'text-[13px] mt-1 text-[color:var(--color-accent-cool)]'
          : 'text-[13px] mt-1 text-[color:var(--color-text-tertiary)]'}>
          {subtitle}
        </div>
      )}
      {progress !== undefined && (
        <div className="mt-3 h-1 rounded-full bg-[color:var(--color-bg-muted)] overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${Math.min(100, progress * 100)}%`, background: 'var(--color-accent-cool)' }} />
        </div>
      )}
    </Card>
  );
}
