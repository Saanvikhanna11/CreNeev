import { useEffect, useState } from 'react';
import Reveal from '../common/Reveal.jsx';

const TESTIMONIALS = [
  {
    quote: '"The website looks like it belongs to a brand ten times our size. That\'s exactly what we hoped for."',
    name: 'Daniel V.',
    role: 'Founder, Olive & Oak Café',
  },
  {
    quote: '"Within a week of launch, customers started saying our new site felt like us — before we\'d said a word."',
    name: 'Meera K.',
    role: 'Owner, Bloom Studio',
  },
  {
    quote: "\"CreNeev understood our clinic's tone before we could put it into words ourselves.\"",
    name: 'Dr. Aakash R.',
    role: 'Founder, North Clinic',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((a) => (a + 1) % TESTIMONIALS.length);
        setVisible(true);
      }, 250);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i) => {
    setVisible(false);
    setTimeout(() => {
      setActive(i);
      setVisible(true);
    }, 250);
  };

  const current = TESTIMONIALS[active];

  return (
    <section className="section-pad" style={{ background: 'var(--stone)' }}>
      <div className="wrap">
        <Reveal as="div" className="eyebrow">
          <span className="idx">06</span>
          <span className="rule"></span>
          <span className="lbl">TESTIMONIALS</span>
        </Reveal>

        <Reveal as="div" className="testi-wrap">
          <div
            className="testi-quote serif"
            style={{ transition: 'opacity .3s ease', opacity: visible ? 1 : 0 }}
          >
            {current.quote}
          </div>
          <div className="testi-who">
            <span className="dash"></span>
            <span>
              <strong>{current.name}</strong> — {current.role}
            </span>
          </div>
          <div className="testi-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={i === active ? 'active' : ''}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
