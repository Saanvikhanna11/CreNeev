import { useEffect, useRef, useState } from 'react';
import Reveal from '../common/Reveal.jsx';

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'Between 7 and 21 days depending on scope. We hold to the timeline agreed at the start — no drift.',
  },
  {
    q: "Do I own the website when it's finished?",
    a: 'Yes, entirely. Once the final invoice is settled, the site, code and content are yours outright.',
  },
  {
    q: 'Do you help with copy and photography?',
    a: 'We can write your copy and direct or source photography as part of Growth and Premium plans.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: "Absolutely — we regularly rebuild existing sites, keeping what works and rethinking what doesn't.",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (!bodyRef.current) return;
    setMaxHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <Reveal as="div" className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-q" onClick={onToggle}>
        {item.q} <span className="icon">+</span>
      </button>
      <div className="faq-a" ref={bodyRef} style={{ maxHeight }}>
        <p>{item.a}</p>
      </div>
    </Reveal>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-pad" style={{ background: 'var(--stone)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">08</span>
              <span className="rule"></span>
              <span className="lbl">FAQ</span>
            </Reveal>
            <Reveal as="h2">
              Questions,
              <br />
              <em>answered plainly.</em>
            </Reveal>
          </div>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
