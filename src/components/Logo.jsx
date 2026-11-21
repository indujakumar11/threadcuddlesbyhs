import { siteConfig } from '../config/siteConfig.js';
import './Logo.css';

/** Text logo with a minimal two-bangle mark. */
export default function Logo({ size = 'md', className = '' }) {
  return (
    <span className={`logo logo--${size} ${className}`} aria-label={siteConfig.brandName}>
      <svg className="logo__mark" viewBox="0 0 48 40" aria-hidden="true">
        <circle cx="19" cy="23" r="12" fill="none" stroke="var(--gold)" strokeWidth="1.6" />
        <circle cx="29" cy="23" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M24 3.5c1.7 2.4 1.7 4.4 0 6.8-1.7-2.4-1.7-4.4 0-6.8z" fill="var(--gold)" />
      </svg>
      <span className="logo__text" aria-hidden="true">
        <span className="logo__word">threadcuddles</span>
        <span className="logo__by">by hs</span>
      </span>
    </span>
  );
}
