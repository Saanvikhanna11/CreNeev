import { useEffect, useState } from 'react';
import useMagnetic from '../../hooks/useMagnetic.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const magnetic = useMagnetic();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="logo-mark">
          <span className="logo-plus">+</span>CreNeev
        </a>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#industries">Industries</a>
          <a href="#work">Portfolio</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="pill-btn magnetic" {...magnetic}>
          Book a Free Call <span className="dot"></span>
        </a>
      </div>
    </header>
  );
}
