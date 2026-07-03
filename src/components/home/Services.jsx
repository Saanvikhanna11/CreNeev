import Reveal from '../common/Reveal.jsx';

const SERVICES = [
  { title: 'Website Design', desc: "Editorial, conversion-focused websites tailored to your brand's tone of voice." },
  { title: 'UI / UX Design', desc: 'Interfaces that feel intuitive on the first click and beautiful on the tenth.' },
  { title: 'Landing Pages', desc: 'Single-focus pages engineered to turn attention into action.' },
  { title: 'Business Websites', desc: "Multi-page sites with everything you need to grow — nothing you don't." },
  { title: 'Brand Identity', desc: 'Logos, palettes and type systems that make your brand look inevitable.' },
  { title: 'SEO Optimization', desc: 'Technical SEO baked in from the first line of markup, not bolted on later.' },
  { title: 'Website Maintenance', desc: 'Quiet, ongoing care so your site stays fast, secure and current.' },
];

export default function Services() {
  return (
    <section className="section-pad" id="services" style={{ background: 'var(--stone)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">02</span>
              <span className="rule"></span>
              <span className="lbl">SERVICES</span>
            </Reveal>
            <Reveal as="h2">
              A small menu,
              <br />
              <em>obsessively refined.</em>
            </Reveal>
          </div>
        </div>

        <div className="serv-list">
          {SERVICES.map((s, i) => (
            <Reveal as="div" className="serv-row" key={s.title}>
              <span className="serv-idx">{String(i + 1).padStart(2, '0')}</span>
              <div className="serv-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <span className="serv-arrow">↗</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
