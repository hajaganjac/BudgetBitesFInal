import React from 'react';

export function GeneratorStep({
  index, title, subtitle, children,
}: { index: number; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-[color:var(--color-bg-muted)] inline-flex items-center justify-center text-[13px] font-semibold text-[color:var(--color-text-primary)]">{index}</div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-[color:var(--color-text-primary)]">{title}</div>
          {subtitle && <div className="text-[13px] text-[color:var(--color-text-secondary)] mt-0.5">{subtitle}</div>}
        </div>
      </div>
      <div className="pl-10 mt-4">{children}</div>
    </div>
  );
}
