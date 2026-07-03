import Reveal from '../common/Reveal.jsx';

const INDUSTRIES = [
  { name: 'Restaurants', gradient: 'gi1', row: 'r1' },
  { name: 'Cafés', gradient: 'gi2', row: 'r2' },
  { name: 'Clinics', gradient: 'gi3', row: 'r3' },
  { name: 'Salons', gradient: 'gi4', row: 'r1' },
  { name: 'Gyms', gradient: 'gi5', row: 'r2' },
  { name: 'Real Estate', gradient: 'gi6', row: 'r4' },
  { name: 'Bakeries', gradient: 'gi7', row: 'r3' },
  { name: 'Local Services', gradient: 'gi8', row: 'r2' },
  { name: 'Boutiques', gradient: 'gi9', row: 'r4' },
  { name: 'Coaching', gradient: 'gi10', row: 'r2' },
];

export default function Industries() {
  return (
    <section className="section-pad" id="industries">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">01</span>
              <span className="rule"></span>
              <span className="lbl">INDUSTRIES</span>
            </Reveal>
            <Reveal as="h2">
              Built for the businesses
              <br />
              <em>people talk about.</em>
            </Reveal>
          </div>
        </div>

        <div className="ind-grid">
          {INDUSTRIES.map((ind) => (
            <Reveal
              key={ind.name}
              as="div"
              className={`ind-card ${ind.gradient} ${ind.row}`}
            >
              <span className="ind-view">/ VIEW</span>
              <span className="ind-name">{ind.name}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
