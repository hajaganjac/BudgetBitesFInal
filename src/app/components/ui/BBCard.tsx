import React from 'react';
import { cn } from './cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'muted';
}

export function Card({ variant = 'default', className, ...rest }: CardProps) {
  const base = 'rounded-[12px]';
  const styles =
    variant === 'muted'
      ? 'bg-[color:var(--color-bg-muted)]'
      : variant === 'elevated'
      ? 'bg-white border border-[color:var(--color-border-subtle)] bb-shadow-elevated'
      : 'bg-white border border-[color:var(--color-border-subtle)] bb-shadow-card';
  return <div className={cn(base, styles, className)} {...rest} />;
}
