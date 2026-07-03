const KEYWORDS = [
  'Brand Strategy',
  'Visual Identity',
  'Web Design',
  'Art Direction',
  'Packaging',
  'Social Content',
  'Motion Design',
  'Copywriting',
];

export default function Marquee() {
  // Track is duplicated so the CSS `scroll` keyframe (translateX -50%) loops seamlessly.
  const items = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {items.map((word, i) => (
          <span key={i} aria-hidden={i >= KEYWORDS.length ? 'true' : undefined}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
