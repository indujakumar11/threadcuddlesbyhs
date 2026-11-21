# threadcuddlesbyhs — product catalogue

Static catalogue for handmade silk thread bangles and accessories. React 18, Vite and React Router. There is no cart or checkout: enquiries go through WhatsApp.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Where things live

| What | File |
| --- | --- |
| WhatsApp number, Instagram, site URL, hero/about copy | `src/config/siteConfig.js` |
| Products (IDs, names, images, price, availability, featured) | `src/data/products.js` |
| Categories | `src/data/categories.js` |
| WhatsApp message format | `src/utils/whatsapp.js` |
| Colours, fonts, spacing | `src/styles/global.css` (`:root` tokens) |

## Common tasks

- **Set the real WhatsApp number:** edit `whatsappNumber` in `siteConfig.js`, using digits only with the country code (e.g. `919812345678`).
- **Add a product:** add an object to `products.js` with the next unused ID for its prefix (BGL / HAR / SRP). Never reuse or renumber IDs.
- **Add a price:** set `price: 1299`. Leave it as `null` to hide the price.
- **Add a category:** add an entry to `categories.js` with a new `slug` and `idPrefix`, then add products with that `category`. No UI changes are needed.
- **Add or upgrade photos:** put the originals in the raw image folders and run `npm run images`. Web-sized copies (`.webp` at 1400px plus a `-sm` 640px version) are written to `public/images/<category>/`. Originals are never modified. To use a different source folder, set `RAW_IMAGES_DIR`.

## Deploying

Any static host works. `public/_redirects` (Netlify) and `vercel.json` route deep links such as `/product/BGL001` to the app.
