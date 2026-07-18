import { Bell, Check, KeyRound, LogOut, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/FormControls';
import { cn } from '../utils/cn';

type Section = 'Profile' | 'Change Password' | 'Notifications' | 'Logout';
const sections: { name: Section; icon: typeof UserRound }[] = [{ name: 'Profile', icon: UserRound }, { name: 'Change Password', icon: KeyRound }, { name: 'Notifications', icon: Bell }, { name: 'Logout', icon: LogOut }];

export function Settings() {
  const [section, setSection] = useState<Section>('Profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const navigate = useNavigate();

  const save = () => { setSaving(true); setSaved(false); window.setTimeout(() => { setSaving(false); setSaved(true); window.setTimeout(() => setSaved(false), 1800); }, 700); };

  return (
    <div className="space-y-7 pb-4">
      <section><p className="text-[10px] font-medium uppercase tracking-[0.28em] text-blue-400">03 - Preferences</p><h2 className="mt-3 font-display text-3xl tracking-[-0.02em] sm:text-[38px]">Keep your workspace <span className="brand-text italic">personal.</span></h2><p className="mt-2 text-sm text-muted-dark">Only the essentials for your admin account.</p></section>

      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <nav className="h-fit rounded-[22px] border border-white/[0.075] bg-surface-dark/75 p-2 backdrop-blur-md">
          {sections.map(({ name, icon: Icon }) => <button key={name} onClick={() => setSection(name)} className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-muted-dark transition hover:bg-white/[0.04] hover:text-ghost', section === name && 'bg-white/[0.06] text-ghost')}><Icon className={cn('h-4 w-4', section === name && 'text-blue-400')} />{name}</button>)}
        </nav>

        <section className="min-h-[430px] rounded-[24px] border border-white/[0.075] bg-surface-dark/75 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-7">
          {section === 'Profile' && <div className="max-w-2xl"><div className="flex items-center gap-4 border-b border-white/[0.07] pb-6"><Avatar name="Aarav Singh" size="lg" /><div><h3 className="font-display text-2xl">Profile</h3><p className="mt-1 text-xs text-muted-dark">Your administrator details.</p></div></div><div className="mt-6 grid gap-5 sm:grid-cols-2"><Input label="Full name" defaultValue="Aarav Singh" /><Input label="Email address" type="email" defaultValue="aarav@creneev.com" /><Input label="Role" value="Administrator" readOnly className="opacity-60" /></div><div className="mt-7 flex items-center gap-3"><Button variant="primary" loading={saving} onClick={save}>Save profile</Button>{saved && <span className="flex items-center gap-1.5 text-xs text-emerald-300"><Check className="h-3.5 w-3.5" />Saved</span>}</div></div>}

          {section === 'Change Password' && <div className="max-w-xl"><h3 className="font-display text-2xl">Change password</h3><p className="mt-1 text-sm text-muted-dark">Use at least eight characters for a secure password.</p><div className="mt-7 space-y-5"><Input label="Current password" type="password" placeholder="Enter current password" /><Input label="New password" type="password" placeholder="Enter new password" /><Input label="Confirm new password" type="password" placeholder="Repeat new password" /></div><Button className="mt-7" variant="primary" loading={saving} onClick={save}>Update password</Button></div>}

          {section === 'Notifications' && <div className="max-w-2xl"><h3 className="font-display text-2xl">Notifications</h3><p className="mt-1 text-sm text-muted-dark">Choose how CreNeev keeps you informed.</p><div className="mt-7 flex items-center justify-between gap-5 rounded-2xl border border-white/[0.07] bg-black/10 p-4"><div><p className="text-sm font-medium text-zinc-200">New lead emails</p><p className="mt-1 text-xs leading-5 text-muted-dark">Receive an email whenever a new enquiry arrives.</p></div><button onClick={() => setEmailNotifications((value) => !value)} className={cn('relative h-6 w-11 shrink-0 rounded-full border transition', emailNotifications ? 'border-blue-400/30 bg-blue-600' : 'border-white/10 bg-white/10')} aria-pressed={emailNotifications}><span className={cn('absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all', emailNotifications ? 'left-[21px]' : 'left-0.5')} /></button></div><Button className="mt-7" variant="primary" loading={saving} onClick={save}>Save preferences</Button></div>}

          {section === 'Logout' && <div className="flex min-h-[360px] max-w-lg flex-col justify-center"><span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-red-400/15 bg-red-500/[0.08] text-red-300"><LogOut className="h-5 w-5" /></span><h3 className="font-display text-2xl">Ready to leave?</h3><p className="mt-2 text-sm leading-6 text-muted-dark">You will need to sign in again to access client enquiries.</p><Button className="mt-6 w-fit" variant="danger" onClick={() => navigate('/login')}>Logout securely</Button></div>}
        </section>
      </div>
    </div>
  );
}