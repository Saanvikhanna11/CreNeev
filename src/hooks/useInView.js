import { useEffect, useRef, useState } from 'react';

// Observes an element and flips `inView` to true the first time it
// crosses the given threshold, then stops watching (mirrors the
// one-shot scroll-reveal behaviour from the original vanilla JS).
export default function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
