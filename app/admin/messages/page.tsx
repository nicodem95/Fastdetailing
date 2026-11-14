import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { listContactMessages } from '@/lib/services/messages';
import { deleteMessageAction, toggleMessageReadAction } from '../content-actions';
import { Icon, PageTitle } from '../icons';
import { ConfirmForm } from '../confirm-form';

export const metadata: Metadata = { title: 'Demandes de devis', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' });

export default async function MessagesPage() {
  if (!(await getAdminUser())) redirect('/admin');
  const messages = await listContactMessages();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="mail" hint="Les demandes envoyées depuis le formulaire de la page Contact.">Demandes de devis</PageTitle></div>
        {messages.length === 0 ? (
          <section className="admin-card admin-empty"><p>Aucune demande pour le moment.</p></section>
        ) : (
          <ul className="admin-list">
            {messages.map((item) => (
              <li className="admin-item admin-message" key={item.id}>
                <div className="admin-item-info">
                  <strong>{item.nom} · <a href={`tel:${item.telephone.replace(/[^\d+]/g, '')}`}>{item.telephone}</a></strong>
                  <span>{dateFormat.format(item.createdAt)}{item.email ? ` · ${item.email}` : ''}{item.codePostal ? ` · ${item.codePostal}` : ''}</span>
                  <span>{[item.vehicule, item.prestation].filter(Boolean).join(' · ')}</span>
                  {item.message ? <p>{item.message}</p> : null}
                  <span className={`admin-pill ${item.lu ? 'on' : 'off'}`}>{item.lu ? 'Traitée' : 'Nouvelle'}</span>
                </div>
                <div className="admin-actions">
                  <form action={toggleMessageReadAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="lu" value={String(item.lu)} />
                    <button className="admin-small-btn" type="submit"><Icon name="check" size={15} />{item.lu ? 'Marquer nouvelle' : 'Marquer traitée'}</button>
                  </form>
                  <ConfirmForm action={deleteMessageAction} message={`Supprimer définitivement la demande de ${item.nom} ?`}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="admin-small-btn danger" type="submit" title="Supprimer" aria-label={`Supprimer la demande de ${item.nom}`}><Icon name="trash" size={15} /></button>
                  </ConfirmForm>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
