import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

export function EmptyState({ title, description, icon: Icon = Inbox, actionLabel, onAction, compact }: EmptyStateProps) {
  return (
    <div className={compact ? 'px-5 py-7 text-center' : 'flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center'}>
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-muted-dark"><Icon className="h-5 w-5" /></div>
      <h3 className="font-display text-xl text-ghost">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-muted-dark">{description}</p>
      {actionLabel && onAction && <Button className="mt-5" size="sm" onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return <EmptyState title="Unable to load data" description="Something interrupted the request. Check your connection and try again." icon={AlertTriangle} actionLabel="Retry" onAction={onRetry} />;
}