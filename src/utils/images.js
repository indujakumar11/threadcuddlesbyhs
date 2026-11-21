/**
 * Image helpers. Every product image has a large version (/x.webp) and a
 * small card version (/x-sm.webp) produced by `npm run images`.
 */
export const PLACEHOLDER_IMAGE = '/images/placeholder.svg';

export const smallImage = (src) => (src ? src.replace(/\.webp$/, '-sm.webp') : PLACEHOLDER_IMAGE);

export const srcSet = (src) =>
  src && src.endsWith('.webp') ? `${smallImage(src)} 640w, ${src} 1400w` : undefined;

/** Swap a broken image for the placeholder (once). */
export const handleImageError = (e) => {
  if (!e.currentTarget.src.endsWith(PLACEHOLDER_IMAGE)) {
    e.currentTarget.srcset = '';
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  }
};
