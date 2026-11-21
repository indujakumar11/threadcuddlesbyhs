import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import './Header.css';

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (to) => {
    if (to.includes('#')) return location.pathname === '/' && location.hash === to.slice(1);
    if (to === '/') return location.pathname === '/' && !location.hash;
    return location.pathname.startsWith(to);
  };

  return (
    <header className={`header ${scrolled || open ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="threadcuddlesbyhs — home">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`header__link ${isActive(l.to) ? 'is-active' : ''}`}
              aria-current={isActive(l.to) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <WhatsAppButton variant="outline" size="sm" label="Enquire" className="header__wa" />
          <WhatsAppButton variant="ghost" iconOnly label="Enquire on WhatsApp" className="header__wa-icon" />
          <button
            type="button"
            className="header__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              className={`mobile-menu__link ${isActive(l.to) ? 'is-active' : ''}`}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton className="mobile-menu__cta" />
      </div>
    </header>
  );
}
