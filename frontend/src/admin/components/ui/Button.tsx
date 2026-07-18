import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'icon';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'secondary', size = 'md', loading, disabled, children, ...props }, ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-45 active:translate-y-px',
        variant === 'primary' && 'brand-gradient border-blue-500/30 text-white shadow-[0_10px_30px_rgba(25,91,204,0.2)] hover:brightness-110',
        variant === 'secondary' && 'border-white/[0.09] bg-white/[0.035] text-ghost hover:border-white/[0.16] hover:bg-white/[0.065]',
        variant === 'ghost' && 'border-transparent bg-transparent text-muted-dark hover:bg-white/[0.05] hover:text-ghost',
        variant === 'danger' && 'border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/15',
        size === 'sm' && 'h-9 px-3.5',
        size === 'md' && 'h-11 px-5',
        size === 'icon' && 'h-10 w-10 p-0',
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});