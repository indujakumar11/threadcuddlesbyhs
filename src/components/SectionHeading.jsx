import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, text, align = 'center', as = 'h2', children }) {
  const H = as;
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className="section-heading__title">{title}</H>
      {text && <p className="section-heading__text">{text}</p>}
      {children}
    </Reveal>
  );
}
