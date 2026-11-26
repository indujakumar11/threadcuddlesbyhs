import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { smallImage, srcSet, handleImageError, PLACEHOLDER_IMAGE } from '../utils/images.js';
import './ProductGallery.css';

export default function ProductGallery({ images = [], name }) {
  const list = images.length ? images : [PLACEHOLDER_IMAGE];
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const thumbsRef = useRef(null);

  // Reset when navigating between products.
  useEffect(() => setActive(0), [images]);

  // Keep the active thumbnail visible inside the (scrollable) thumbnail strip, without moving the page.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active];
    if (!strip || !thumb) return;
    const vertical = strip.scrollHeight > strip.clientHeight;
    if (vertical) {
      const top = thumb.offsetTop - strip.offsetTop;
      if (top < strip.scrollTop || top + thumb.offsetHeight > strip.scrollTop + strip.clientHeight)
        strip.scrollTo({ top: top - (strip.clientHeight - thumb.offsetHeight) / 2, behavior: 'smooth' });
    } else {
      const left = thumb.offsetLeft - strip.offsetLeft;
      if (left < strip.scrollLeft || left + thumb.offsetWidth > strip.scrollLeft + strip.clientWidth)
        strip.scrollTo({ left: left - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [active]);

  const go = (dir) => setActive((i) => (i + dir + list.length) % list.length);

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="gallery">
      <div
        className="gallery__main"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        tabIndex={list.length > 1 ? 0 : -1}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} images`}
      >
        {list.map((src, i) => (
          <img
            key={src + i}
            src={src}
            srcSet={srcSet(src)}
            sizes="(max-width: 900px) 100vw, 55vw"
            alt={`${name} — view ${i + 1} of ${list.length}`}
            className={`gallery__img ${i === active ? 'is-active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchpriority={i === 0 ? 'high' : undefined}
            decoding="async"
            onError={handleImageError}
            aria-hidden={i !== active}
          />
        ))}
        {list.length > 1 && (
          <>
            <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button type="button" className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next image">
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
            <span className="gallery__counter" aria-live="polite">
              {active + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="gallery__thumbs" role="tablist" aria-label="Choose image" ref={thumbsRef}>
          {list.map((src, i) => (
            <button
              type="button"
              key={src + i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show image ${i + 1}`}
              className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <img src={smallImage(src)} alt="" loading="lazy" decoding="async" onError={handleImageError} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
