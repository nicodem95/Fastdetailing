/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { whatsappHref, type SiteInfo } from '@/lib/site-content';

export function IndexExtras({ info }: { info: SiteInfo }) {
  return (
    <>
      <div className="mobile-sticky-cta mobile-sticky-cta-home" aria-label="Navigation rapide mobile">
        <a href="contact.html">
          Prendre rendez-vous
        </a>
        {' '}
        <a href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite prendre rendez-vous pour mon pare-brise.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        {' '}
        <a href="administratif.html">
          Assurance
        </a>
      </div>
    </>
  );
}
