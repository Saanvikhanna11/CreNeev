import { forwardRef } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FieldProps {
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FieldProps>(
  function Input({ className, label, hint, ...props }, ref) {
    return (
      <label className="block min-w-0">
        {label && <span className="mb-2 block text-xs font-medium text-muted-dark">{label}</span>}
        <input ref={ref} className={cn('h-11 w-full rounded-xl border border-white/[0.09] bg-black/20 px-3.5 text-sm text-ghost outline-none transition placeholder:text-muted-dark/55 hover:border-white/[0.14] focus:border-brand/60 focus:ring-2 focus:ring-brand/10', className)} {...props} />
        {hint && <span className="mt-1.5 block text-[11px] text-muted-dark">{hint}</span>}
      </label>
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & FieldProps>(
  function Select({ className, label, children, ...props }, ref) {
    return (
      <label className="block min-w-0">
        {label && <span className="mb-2 block text-xs font-medium text-muted-dark">{label}</span>}
        <span className="relative block">
          <select ref={ref} className={cn('h-11 w-full appearance-none rounded-xl border border-white/[0.09] bg-[#0b0f17] px-3.5 pr-9 text-sm text-ghost outline-none transition hover:border-white/[0.14] focus:border-brand/60 focus:ring-2 focus:ring-brand/10', className)} {...props}>
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-dark" />
        </span>
      </label>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps>(
  function Textarea({ className, label, ...props }, ref) {
    return (
      <label className="block min-w-0">
        {label && <span className="mb-2 block text-xs font-medium text-muted-dark">{label}</span>}
        <textarea ref={ref} className={cn('min-h-28 w-full resize-none rounded-xl border border-white/[0.09] bg-black/20 px-3.5 py-3 text-sm leading-6 text-ghost outline-none transition placeholder:text-muted-dark/55 hover:border-white/[0.14] focus:border-brand/60 focus:ring-2 focus:ring-brand/10', className)} {...props} />
      </label>
    );
  },
);