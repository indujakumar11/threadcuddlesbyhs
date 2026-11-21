import { asset } from '../utils/asset.js';

/**
 * Central business configuration.
 * Update these values in ONE place — every component reads from here.
 */
export const siteConfig = {
  brandName: 'threadcuddlesbyhs',
  displayName: 'ThreadCuddlesByHS',
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

  // Editable copy
  hero: {
    eyebrow: 'Handcrafted with love',
    title: 'Little Details.\nBeautifully Handcrafted.',
    text: 'Discover the beauty of handcrafted silk thread bangles and accessories, thoughtfully created to add elegance to every occasion.',
    image: asset('images/bangles/img_6566.webp'),
    secondaryImage: asset('images/hair-accessories/img_6614.webp'),
  },
  about: {
    eyebrow: 'Our Story',
    title: 'Every little detail tells a story.',
    text: [
      'At ThreadCuddlesByHS, we bring creativity and craftsmanship together to create beautiful handmade accessories that make your special moments even more memorable.',
      'Each piece is wrapped, stitched and finished by hand — thread by thread, stone by stone — so no two are ever quite the same. Colours and sizes can be customised to match your outfit and occasion.',
    ],
    image: asset('images/bangles/img_6606.webp'),
  },
  contact: {
    title: 'Found something you love?',
    text: "Let's make it yours. Connect with us on WhatsApp for enquiries and orders.",
  },
};
