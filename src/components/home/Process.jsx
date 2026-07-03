import Reveal from '../common/Reveal.jsx';

const CHAPTERS = [
  { chapter: 'CHAPTER 01', title: 'Discover', desc: 'We listen. Learn your business, customers, and edges.' },
  { chapter: 'CHAPTER 02', title: 'Plan', desc: 'Sitemap, tone, priorities. Every decision on paper first.' },
  { chapter: 'CHAPTER 03', title: 'Design', desc: 'Editorial layouts. Typography systems. Real content, always.' },
  { chapter: 'CHAPTER 04', title: 'Develop', desc: 'Hand-crafted code. Fast, accessible, engineered to last.' },
  { chapter: 'CHAPTER 05', title: 'Launch', desc: 'Careful QA. Smooth handoff. A quiet, confident debut.' },
  { chapter: 'CHAPTER 06', title: 'Grow', desc: 'Iterate on data. Refine. Compound the momentum.' },
];

export default function Process() {
  return (
    <section className="section-pad" id="process">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">03</span>
              <span className="rule"></span>
              <span className="lbl">PROCESS</span>
            </Reveal>
            <Reveal as="h2">
              Six chapters,
              <br />
              <em>one story.</em>
            </Reveal>
          </div>
        </div>

        <div className="proc-grid">
          {CHAPTERS.map((c) => (
            <Reveal as="div" className="proc-card" key={c.chapter}>
              <div className="proc-top">
                <span className="proc-chap">{c.chapter}</span>
                <span className="proc-sq"></span>
              </div>
              <div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
