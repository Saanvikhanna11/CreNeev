import { useEffect, useState } from 'react';
import Reveal from '../common/Reveal.jsx';
import useMagnetic from '../../hooks/useMagnetic.js';

export default function Hero() {
  const [dots, setDots] = useState([]);
  const primaryBtn = useMagnetic();
  const ghostBtn = useMagnetic();

  useEffect(() => {
    setDots(
      Array.from({ length: 22 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        opacity: 0.25 + Math.random() * 0.4,
      }))
    );
  }, []);

  return (
    <section className="hero" id="top">
      <div className="dot-field">
        {dots.map((d, i) => (
          <span
            key={i}
            style={{ left: d.left, top: d.top, animationDelay: d.delay, opacity: d.opacity }}
          />
        ))}
      </div>

      <div className="wrap hero-inner">
        <div className="eyebrow">
          <span className="idx">00</span>
          <span className="rule"></span>
          <span className="lbl">EST. 2024 — STUDIO</span>
        </div>

        <h1>
          <span className="line"><span>Where</span></span>
          <span className="line"><span>Brands</span></span>
          <span className="line"><span>Begin.</span></span>
        </h1>

        <div className="hero-foot">
          <Reveal as="p">
            We craft premium websites that turn ambitious small businesses — restaurants, salons,
            clinics, studios — into brands people remember.
          </Reveal>
          <Reveal as="div" className="hero-actions">
            <a href="#contact" className="btn btn-primary magnetic" {...primaryBtn}>
              Start Your Project <span className="btn-arrow">→</span>
            </a>
            <a href="#work" className="btn btn-ghost magnetic" {...ghostBtn}>
              View Portfolio
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
