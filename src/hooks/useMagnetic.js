// Gives an element a subtle "magnetic" pull toward the cursor.
// Uses event.currentTarget rather than a ref, so it composes cleanly
// with other components (like Reveal) that also need the DOM node's ref.
// Usage: <a {...useMagnetic()}>Click me</a>
export default function useMagnetic() {
  const onMouseMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.16}px, ${y * 0.3}px)`;
  };

  const onMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0,0)';
  };

  return { onMouseMove, onMouseLeave };
}
