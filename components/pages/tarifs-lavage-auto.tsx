/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import { whatsappHref, type SiteInfo } from '@/lib/site-content';

export function TarifsLavageAutoExtras({ info }: { info: SiteInfo }) {
  return (
    <>
      <div className="mobile-sticky" aria-label="Actions rapides mobile">
        <a className="sticky-main" href="contact.html">
          Prendre rendez-vous
        </a>
        {' '}
        <a className="sticky-alt" href={whatsappHref(info, "Bonjour Fast Detailing, je souhaite un devis lavage auto.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>
    </>
  );
}
