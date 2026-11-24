import { siteConfig } from '../config/siteConfig.js';
import { asset } from '../utils/asset.js';
import './Logo.css';

/**
 * Brand logo (gold HS monogram + "threadcuddlesbyhs" wordmark).
 *  - default: horizontal lockup for the header
 *  - variant="full": the stacked logo with the tagline (footer)
 * Source artwork: brand/logo-original.png
 */
export default function Logo({ variant = 'header', className = '' }) {
  const full = variant === 'full';
  return (
    <img
      className={`logo logo--${variant} ${className}`}
      src={asset(full ? 'images/brand/logo-full.webp' : 'images/brand/logo-header.webp')}
      width={full ? 760 : 876}
      height={full ? 525 : 150}
      alt={siteConfig.brandName}
      decoding="async"
    />
  );
}
