import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import Reveal from './Reveal.jsx';
import './ProductCarousel.css';

/**
 * Horizontal product row: native scroll-snap (touch/trackpad friendly) plus
 * arrow buttons and a "View all" link.
 */
export default function ProductCarousel({ eyebrow, title, products, viewAllTo, viewAllLabel = 'View all', badge, tone }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    el?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, products]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (!products?.length) return null;
  return (
    <section className={`carousel section ${tone === 'peach' ? 'section--peach' : ''}`} aria-label={typeof title === 'string' ? title : undefined}>
      <div className="container">
        <Reveal className="carousel__head">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="carousel__title">{title}</h2>
          </div>
          <div className="carousel__controls">
            {viewAllTo && (
              <Link to={viewAllTo} className="text-link carousel__all">
                {viewAllLabel} <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            )}
            <button type="button" className="carousel__arrow" onClick={() => scroll(-1)} disabled={!canPrev} aria-label="Previous products">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button type="button" className="carousel__arrow" onClick={() => scroll(1)} disabled={!canNext} aria-label="Next products">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>
      <div className="carousel__viewport">
        <ul className="carousel__track" ref={trackRef}>
          {products.map((p) => (
            <li key={p.id} className="carousel__item">
              <ProductCard product={p} badge={badge} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
