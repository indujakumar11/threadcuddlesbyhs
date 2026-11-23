import { asset } from '../utils/asset.js';

/**
 * Central business configuration.
 * Update these values in ONE place — every component reads from here.
 */
export const siteConfig = {
  brandName: 'threadcuddlesbyhs',
  displayName: 'Thread Cuddles by HS',
  tagline: 'Handmade silk thread bangles & accessories',

  // WhatsApp number in international format, digits only (country code + number).
  // TODO: replace this placeholder with the real business number, e.g. "919812345678".
  whatsappNumber: '910000000000',

  // Full Instagram profile URL. Leave empty to hide Instagram links.
  instagramUrl: '',

  // Public website URL, without a trailing slash. When set, product enquiry
  // messages include a direct link to the product page.
  // Update this if you move to a custom domain.
  siteUrl: 'https://indujakumar11.github.io/threadcuddlesbyhs',

  currency: 'INR',
  locale: 'en-IN',

  // Slim announcement bar (rotates through these messages)
  announcements: ['Handcrafted with Love', 'Exclusive Handmade Collections', 'Custom Orders Available on WhatsApp'],

  // Editable copy
  hero: {
    eyebrow: 'Handcrafted with love',
    title: 'Elegance,\nHandcrafted with Love',
    text: 'Discover beautifully handcrafted silk thread bangles and traditional accessories, thoughtfully designed to make every occasion special.',
    // Hero slides use real product photography. `productId` links the slide to that product.
    slides: [
      { image: asset('images/bangles/img_6566.webp'), productId: 'BGL006', label: 'Kundan Kada Collection' },
      { image: asset('images/saree-pins/img_6586.webp'), productId: 'SRP001', label: 'Violet Bloom Saree Pin' },
      { image: asset('images/hair-accessories/img_6614.webp'), productId: 'HAR001', label: 'Pearl Lotus Hair Brooch' },
      { image: asset('images/bangles/img_6588.webp'), productId: 'BGL008', label: 'Emerald Stone Bangle Set' },
    ],
  },
  usps: [
    { title: 'Handmade', text: 'Every piece wrapped & finished by hand' },
    { title: 'Customisable', text: 'Colours and sizes made for you' },
    { title: 'Made to Order', text: 'Crafted fresh for every customer' },
    { title: 'Easy WhatsApp Orders', text: 'Enquire in one tap' },
  ],
  about: {
    eyebrow: 'Our Story',
    title: 'Every Detail, Handcrafted with Love',
    text: [
      'At Thread Cuddles by HS, we bring creativity and craftsmanship together to create beautiful handmade accessories that make your special moments even more memorable.',
      'Each piece is wrapped, stitched and finished by hand — thread by thread, stone by stone — so no two are ever quite the same. Colours and sizes can be customised to match your outfit and occasion.',
    ],
    image: asset('images/bangles/img_6606.webp'),
  },
  contact: {
    title: 'Found something you love?',
    text: "Let's make it yours. Connect with us on WhatsApp for enquiries and orders.",
  },
};
