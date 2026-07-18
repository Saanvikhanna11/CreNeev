import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: { page: number; totalPages: number; totalItems: number; pageSize: number; onPageChange: (page: number) => void }) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  return (
    <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-xs text-muted-dark">Showing <span className="text-zinc-300">{start}-{end}</span> of <span className="text-zinc-300">{totalItems}</span> enquiries</p>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></Button>
        <span className="min-w-20 text-center text-xs text-muted-dark">{page} / {Math.max(totalPages, 1)}</span>
        <Button size="icon" variant="ghost" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}