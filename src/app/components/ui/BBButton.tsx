import React from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'solid' | 'outline' | 'ghost' | 'danger' | 'cool';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
}

export function Button({
  variant = 'solid', size = 'md', full = false, className, style, children, ...rest
}: ButtonProps) {
  const h = size === 'sm' ? 'h-8 px-3 text-[13px]' : size === 'lg' ? 'h-12 px-5 text-[15px]' : 'h-10 px-4 text-[14px]';
  let v = '';
  let extra: React.CSSProperties | undefined = undefined;
  switch (variant) {
    case 'primary':
      v = 'text-white font-semibold';
      extra = { background: 'linear-gradient(135deg, #FF5C8A 0%, #2A9D8F 100%)' };
      break;
    case 'solid':
      v = 'text-white font-semibold';
      extra = { background: 'var(--color-accent-warm)' };
      break;
    case 'cool':
      v = 'text-white font-semibold';
      extra = { background: 'var(--color-accent-cool)' };
      break;
    case 'outline':
      v = 'bg-white text-[color:var(--color-text-primary)] border border-[color:var(--color-border-strong)] font-medium hover:bg-[color:var(--color-bg-muted)]';
      break;
    case 'ghost':
      v = 'bg-transparent text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-bg-muted)] font-medium';
      break;
    case 'danger':
      v = 'bg-transparent text-[color:var(--color-danger)] font-medium hover:bg-[color:var(--color-bg-muted)]';
      break;
  }
  return (
    <button
      className={cn('inline-flex items-center justify-center gap-2 rounded-[12px] transition-opacity hover:opacity-95 active:opacity-90', h, v, full && 'w-full', className)}
      style={{ ...extra, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
