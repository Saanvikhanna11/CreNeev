import { Bell, ChevronDown, LogOut, Menu, Search, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { Dropdown, DropdownItem } from '../components/ui/Dropdown';
import { EmptyState } from '../components/ui/EmptyState';

const titles: Record<string, string> = { '/': 'Dashboard', '/leads': 'Leads', '/settings': 'Settings' };

export function Header({ onMenu }: { onMenu: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (search.trim()) navigate(`/leads?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="relative z-40 flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.065] bg-[#080b11]/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMenu} className="rounded-xl p-2 text-muted-dark transition hover:bg-white/[0.05] hover:text-ghost md:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
        <div>
          <p className="hidden text-[9px] font-medium uppercase tracking-[0.24em] text-blue-400 sm:block">CreNeev Admin</p>
          <h1 className="font-display text-xl leading-tight text-ghost sm:mt-0.5">{titles[location.pathname] ?? 'Admin'}</h1>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <form onSubmit={submitSearch} className="relative hidden lg:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-dark" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search enquiries" className="h-10 w-64 rounded-full border border-white/[0.08] bg-black/20 pl-10 pr-4 text-xs text-ghost outline-none transition placeholder:text-muted-dark/60 focus:w-72 focus:border-brand/50 focus:ring-2 focus:ring-brand/10" />
        </form>

        <Dropdown width="w-72" trigger={<button className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-dark transition hover:bg-white/[0.05] hover:text-ghost" aria-label="Notifications"><Bell className="h-[18px] w-[18px]" /></button>}>
          <div className="border-b border-white/[0.07] px-4 py-3 text-sm font-medium">Notifications</div>
          <EmptyState compact title="You're all caught up" description="New enquiry updates will appear here." icon={Bell} />
        </Dropdown>

        <div className="mx-1 hidden h-6 w-px bg-white/[0.08] sm:block" />

        <Dropdown width="w-56" trigger={<button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 text-left transition hover:bg-white/[0.04] sm:pr-2"><Avatar name="Aarav Singh" size="sm" /><span className="hidden lg:block"><span className="block text-xs font-medium text-ghost">Aarav Singh</span><span className="mt-0.5 block text-[10px] text-muted-dark">Administrator</span></span><ChevronDown className="mr-1 hidden h-3.5 w-3.5 text-muted-dark sm:block" /></button>}>
          <div className="border-b border-white/[0.07] px-3 py-3 lg:hidden"><p className="text-xs font-medium">Aarav Singh</p><p className="mt-1 text-[10px] text-muted-dark">Administrator</p></div>
          <DropdownItem icon={UserRound} onClick={() => navigate('/settings')}>Profile settings</DropdownItem>
          <DropdownItem icon={LogOut} danger onClick={() => navigate('/login')}>Logout</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}