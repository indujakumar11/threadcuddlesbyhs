import { siteConfig } from '../config/siteConfig.js';
import { getCategoryBySlug } from '../data/categories.js';

const BASE = 'https://wa.me/';

/** Build a wa.me link with a pre-filled, URL-encoded message. */
export function buildWhatsAppUrl(message = '') {
  const number = String(siteConfig.whatsappNumber).replace(/\D/g, '');
  return message ? `${BASE}${number}?text=${encodeURIComponent(message)}` : `${BASE}${number}`;
}

/** Product-specific enquiry message. Always includes the product ID. */
export function getProductEnquiryMessage(product) {
  const category = getCategoryBySlug(product.category)?.name ?? product.category;
  const lines = [
    `Hi! I'm interested in the following product from ${siteConfig.displayName}.`,
    '',
    `Product Name: ${product.name}`,
    `Product ID: ${product.id}`,
    `Category: ${category}`,
  ];
  if (siteConfig.siteUrl) {
    lines.push(`Link: ${siteConfig.siteUrl.replace(/\/$/, '')}/product/${product.id}`);
  }
  lines.push('', 'Could you please share more details about this product?');
  return lines.join('\n');
}

export const getProductWhatsAppUrl = (product) => buildWhatsAppUrl(getProductEnquiryMessage(product));

export const getGeneralEnquiryMessage = () =>
  `Hi! I came across ${siteConfig.displayName} and would love to know more about your handmade collection.`;

export const getGeneralWhatsAppUrl = () => buildWhatsAppUrl(getGeneralEnquiryMessage());
