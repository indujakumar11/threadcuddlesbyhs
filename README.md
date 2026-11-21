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

## Deploying (GitHub Pages)

Live URL: https://indujakumar11.github.io/threadcuddlesbyhs/

- Every push to `main` builds and deploys automatically via `.github/workflows/deploy.yml`. You can also run it by hand from the **Actions** tab.
- The site uses `HashRouter`, so page URLs look like `/#/product/BGL001`. These work on refresh and when shared, with no server setup.
- Production builds use the base path `/threadcuddlesbyhs/` (set in `vite.config.js`). Reference files in `public/` from JS with `asset('images/...')` from `src/utils/asset.js`, never with a hard-coded leading `/`.
- `npm run build && npm run preview` serves the build at `http://localhost:4173/threadcuddlesbyhs/`, exactly as on GitHub Pages.
- **Custom domain:** build with `BASE_PATH=/` (set it in the workflow's Build step) and update `siteUrl` in `siteConfig.js`.
