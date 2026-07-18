import { AlertCircle, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/FormControls';
import { Logo } from '../components/ui/Logo';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and a password with at least 6 characters.');
      return;
    }
    setLoading(true);
    window.setTimeout(() => { setLoading(false); navigate('/'); }, 900);
  };

  const sessionExpired = searchParams.get('expired') === '1';

  return (
    <main className="relative flex h-screen min-h-[620px] items-center justify-center overflow-hidden bg-abyss px-4 py-8">
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-[44%] h-[620px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/[0.12] blur-[130px]" />
      <svg className="pointer-events-none absolute left-1/2 top-0 h-full min-w-[900px] -translate-x-1/2 opacity-30" viewBox="0 0 1200 800" fill="none" aria-hidden="true"><path d="M150-80C180 240 330 620 600 850M1050-80C1020 240 870 620 600 850M470-100C520 200 580 480 600 850M730-100C680 200 620 480 600 850" stroke="url(#line)" strokeWidth="1"/><defs><linearGradient id="line" x1="600" y1="0" x2="600" y2="800"><stop stopColor="#246bd6"/><stop offset="1" stopColor="#4032a8" stopOpacity="0"/></linearGradient></defs></svg>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="glass-panel relative z-10 w-full max-w-[440px] rounded-[28px] p-6 sm:p-9">
        <div className="mb-9 flex justify-center"><Logo /></div>
        <div className="mb-7 text-center"><p className="text-[9px] font-medium uppercase tracking-[0.28em] text-blue-400">Secure admin access</p><h1 className="mt-3 font-display text-3xl">Welcome back.</h1></div>

        {(error || sessionExpired) && <div className="mb-5 flex gap-3 rounded-xl border border-red-400/15 bg-red-500/[0.07] px-3.5 py-3 text-xs leading-5 text-red-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /><span>{error || 'Your session has expired. Please sign in again.'}</span></div>}

        <form onSubmit={submit} className="space-y-5">
          <Input label="Email address" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@creneev.com" />
          <Input label="Password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
          <label className="flex w-fit cursor-pointer items-center gap-2.5 text-xs text-muted-dark"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-white/15 bg-black/30 accent-blue-600" />Remember me</label>
          <Button className="mt-2 w-full" variant="primary" type="submit" loading={loading}>{!loading && <LockKeyhole className="h-4 w-4" />}Sign in</Button>
        </form>
      </motion.section>
    </main>
  );
}