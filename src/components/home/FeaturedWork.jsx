import Reveal from '../common/Reveal.jsx';

const PROJECTS = [
  { title: 'Maison Rouge', bodyClass: 'mb1' },
  { title: 'Atelier 09', bodyClass: 'mb2' },
];

export default function FeaturedWork() {
  return (
    <section className="section-pad" id="work" style={{ background: 'var(--stone)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">04</span>
              <span className="rule"></span>
              <span className="lbl">FEATURED WORK</span>
            </Reveal>
            <Reveal as="h2">
              Selected
              <br />
              <em>first impressions.</em>
            </Reveal>
          </div>
        </div>

        <div className="work-grid">
          {PROJECTS.map((p) => (
            <Reveal as="div" className="mockup" key={p.title}>
              <div className="mockup-bar">
                <i></i><i></i><i></i>
              </div>
              <div className={`mockup-body ${p.bodyClass}`}></div>
              <div className="mockup-label">
                <span className="mt serif">{p.title}</span>
                <a href="#">View project →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
