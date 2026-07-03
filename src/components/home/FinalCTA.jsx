import Reveal from '../common/Reveal.jsx';
import useMagnetic from '../../hooks/useMagnetic.js';

export default function FinalCTA() {
  const magnetic = useMagnetic();

  return (
    <section className="final-cta" id="contact">
      <div className="wrap">
        <Reveal as="div" className="eyebrow" style={{ justifyContent: 'center' }}>
          <span className="idx">09</span>
          <span className="rule"></span>
          <span className="lbl">LET'S TALK</span>
        </Reveal>
        <Reveal as="h2">
          Let's build
          <br />
          your <em>brand.</em>
        </Reveal>
        <Reveal as="p">
          One conversation. No obligation. Just a clearer idea of what your foundation could look
          like.
        </Reveal>
        <Reveal
          as="a"
          href="#"
          className="btn btn-primary magnetic"
          style={{ padding: '19px 40px' }}
          {...magnetic}
        >
          Book a Free Discovery Call <span className="btn-arrow">→</span>
        </Reveal>
      </div>
    </section>
  );
}
