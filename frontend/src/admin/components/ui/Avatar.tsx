import { cn } from '../../utils/cn';

export function Avatar({ name, size = 'md', className }: { name: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-violet-500/20 font-medium text-blue-100', size === 'sm' && 'h-8 w-8 text-[11px]', size === 'md' && 'h-10 w-10 text-xs', size === 'lg' && 'h-14 w-14 text-sm', className)}>
      {initials}
    </span>
  );
}