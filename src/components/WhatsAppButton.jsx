import { WhatsAppIcon } from './BrandIcons.jsx';
import { getGeneralWhatsAppUrl, getProductWhatsAppUrl } from '../utils/whatsapp.js';

/**
 * Opens WhatsApp with a pre-filled message.
 * Pass `product` for a product-specific enquiry, otherwise a general one.
 */
export default function WhatsAppButton({
  product,
  label = 'Enquire on WhatsApp',
  variant = 'primary',
  size,
  className = '',
  iconOnly = false,
}) {
  const href = product ? getProductWhatsAppUrl(product) : getGeneralWhatsAppUrl();
  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, iconOnly && 'btn--icon', className]
    .filter(Boolean)
    .join(' ');
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
    >
      <WhatsAppIcon size={iconOnly ? 20 : 18} />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}
