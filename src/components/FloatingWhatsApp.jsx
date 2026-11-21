import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './BrandIcons.jsx';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp.js';

/** Floating enquiry button for mobile. Hidden on product pages, which have their own sticky bar. */
export default function FloatingWhatsApp() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/product/')) return null;
  return (
    <a
      href={getGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
