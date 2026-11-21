import { siteConfig } from '../config/siteConfig.js';

/** Returns a formatted price, or null when no price is set. */
export function formatPrice(price) {
  if (price === null || price === undefined || price === '') return null;
  return new Intl.NumberFormat(siteConfig.locale, {
    style: 'currency',
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  }).format(price);
}
