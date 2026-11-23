import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Search, Store } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons.jsx';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp.js';
import './MobileTabBar.css';

/** Sticky bottom navigation for phones. Hidden on product pages (they have their own enquiry bar). */
export default function MobileTabBar() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/product/')) return null;
  const tab = (to, label, Icon, active) => (
    <Link to={to} className={`tabbar__item ${active ? 'is-active' : ''}`} aria-current={active ? 'page' : undefined}>
      <Icon size={20} strokeWidth={1.5} />
      <span>{label}</span>
    </Link>
  );
  return (
    <nav className="tabbar" aria-label="Quick navigation">
      {tab('/', 'Home', Home, pathname === '/')}
      {tab('/shop', 'Shop', Store, pathname === '/shop')}
      {tab('/categories', 'Categories', LayoutGrid, pathname === '/categories')}
      <button type="button" className="tabbar__item" onClick={() => window.dispatchEvent(new Event('tc:open-search'))}>
        <Search size={20} strokeWidth={1.5} />
        <span>Search</span>
      </button>
      <a href={getGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="tabbar__item tabbar__item--wa">
        <WhatsAppIcon size={20} />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}
