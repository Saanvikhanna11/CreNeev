import Reveal from '../common/Reveal.jsx';

const REASONS = [
  { title: 'Modern Design', desc: 'Editorial layouts and typography that age well past every trend.' },
  { title: 'Lightning Fast', desc: 'Engineered for sub-second loads on every device, every connection.' },
  { title: 'SEO Optimized', desc: 'Technical foundations that let Google actually see your brand.' },
  { title: 'Mobile Responsive', desc: 'Designed mobile-first, then scaled to widescreen. Not the reverse.' },
  { title: 'Conversion Focused', desc: 'Every section engineered around one clear next action.' },
  { title: 'Affordable', desc: 'Studio-grade design at pricing built for real small businesses.' },
  { title: 'Dedicated Support', desc: 'One point of contact. Real responses. No ticket queues.' },
  { title: 'Beautiful Animations', desc: 'Motion used with restraint — never for its own sake.' },
];

export default function WhyUs() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">05</span>
              <span className="rule"></span>
              <span className="lbl">WHY CRENEEV</span>
            </Reveal>
            <Reveal as="h2">
              Eight reasons this
              <br />
              <em>won't feel like a template.</em>
            </Reveal>
          </div>
        </div>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal as="div" className="why-cell" key={r.title}>
              <span className="wnum">{String(i + 1).padStart(2, '0')}</span>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
