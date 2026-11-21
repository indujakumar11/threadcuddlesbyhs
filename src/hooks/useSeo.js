import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig.js';

function setMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Sets document title, description and Open Graph tags per page. */
export function useSeo({ title, description, image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.displayName}` : `${siteConfig.displayName} — ${siteConfig.tagline}`;
    document.title = fullTitle;
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }
    setMeta('property', 'og:title', fullTitle);
    if (image) setMeta('property', 'og:image', image);
  }, [title, description, image]);
}
