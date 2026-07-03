import Reveal from '../common/Reveal.jsx';
import useMagnetic from '../../hooks/useMagnetic.js';

const PLANS = [
  {
    tag: 'One-Page Presence',
    tier: 'Starter',
    price: '$690',
    features: ['1-page website', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '2 rounds of revisions', '7-day delivery'],
    featured: false,
  },
  {
    tag: 'Popular',
    tier: 'Growth',
    price: '$1,490',
    features: ['5-page website', 'Editorial design system', 'Advanced SEO', 'CMS setup', 'Analytics + Search Console', '4 rounds of revisions', '14-day delivery', '30-day support'],
    featured: true,
  },
  {
    tag: 'Full Brand Experience',
    tier: 'Premium',
    price: '$2,890',
    features: ['10+ page website', 'Custom animations', 'Brand identity system', 'Copy direction', 'Full SEO strategy', 'Unlimited revisions', '21-day delivery', '90-day support'],
    featured: false,
  },
];

function PriceCard({ plan }) {
  const magnetic = useMagnetic();
  return (
    <Reveal as="div" className={`price-card ${plan.featured ? 'feat' : ''}`}>
      {plan.featured && <span className="badge">MOST CHOSEN</span>}
      <div className="price-tag">{plan.tag}</div>
      <div className="price-tier serif">{plan.tier}</div>
      <div className="price-amt">{plan.price}</div>
      <ul>
        {plan.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`btn magnetic ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}
        {...magnetic}
      >
        Start your project <span className="btn-arrow">→</span>
      </a>
    </Reveal>
  );
}

export default function Pricing() {
  return (
    <section className="section-pad" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Reveal as="div" className="eyebrow">
              <span className="idx">07</span>
              <span className="rule"></span>
              <span className="lbl">PRICING</span>
            </Reveal>
            <Reveal as="h2">
              <em>No hidden pages.</em>
            </Reveal>
          </div>
        </div>

        <div className="price-grid">
          {PLANS.map((plan) => (
            <PriceCard plan={plan} key={plan.tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
