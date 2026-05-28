import React from 'react';
import { cn } from './cn';

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  as?: 'button' | 'span';
  tone?: 'neutral' | 'warm' | 'cool';
  leadingIcon?: React.ReactNode;
}

export function Chip({
  active = false, tone = 'neutral', leadingIcon, as = 'button', className, children, ...rest
}: ChipProps) {
  let cls = 'inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[13px] font-medium transition';
  if (active) {
    cls += ' bg-[color:var(--color-accent-warm-tint)] text-[color:var(--color-accent-warm)] border border-[color:var(--color-accent-warm)]';
  } else if (tone === 'warm') {
    cls += ' bg-[color:var(--color-accent-warm-tint)] text-[color:var(--color-accent-warm)] border border-transparent';
  } else if (tone === 'cool') {
    cls += ' bg-[color:var(--color-accent-cool-tint)] text-[color:var(--color-accent-cool)] border border-transparent';
  } else {
    cls += ' bg-white text-[color:var(--color-text-secondary)] border border-[color:var(--color-border-subtle)] hover:bg-[color:var(--color-bg-muted)]';
  }
  const Tag = as as any;
  return (
    <Tag className={cn(cls, className)} {...(rest as any)}>
      {leadingIcon}
      {children}
    </Tag>
  );
}
