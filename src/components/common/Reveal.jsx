import useInView from '../../hooks/useInView.js';

// Drop-in replacement for the old `data-reveal` attribute + IntersectionObserver
// wiring. Usage: <Reveal as="p" className="lead">text</Reveal>
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} data-reveal="" className={`${className} ${inView ? 'in-view' : ''}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
