import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { NAV_LINKS } from './Header.jsx';
import { WhatsAppIcon, InstagramIcon } from './BrandIcons.jsx';
import { categories } from '../data/categories.js';
import { siteConfig } from '../config/siteConfig.js';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" aria-label="threadcuddlesbyhs — home">
            <Logo size="lg" />
          </Link>
          <p className="footer__desc">
            Handmade silk thread bangles, hair accessories and saree pins — crafted thread by thread to add a
            little elegance to every occasion.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="footer__heading">Explore</h3>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3 className="footer__heading">Collections</h3>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/shop?category=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Get in touch</h3>
          <ul>
            <li>
              <a href={getGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="footer__social">
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            </li>
            {siteConfig.instagramUrl && (
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer__social">
                  <InstagramIcon size={16} /> Instagram
                </a>
              </li>
            )}
          </ul>
          <p className="footer__note">Every piece is made to order. Custom colours welcome.</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {siteConfig.brandName}. All rights reserved.
        </p>
        <p className="footer__made">Handmade with love in India</p>
      </div>
    </footer>
  );
}
