import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { dayNames, getSiteInfo, hoursGroups } from '@/lib/site-content';
import { saveSiteInfoAction } from '../settings-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Infos du site', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function InfosPage({ searchParams }: { searchParams: Promise<{ ok?: string; erreur?: string }> }) {
  const { ok, erreur } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const info = await getSiteInfo();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="info" hint="Affichées sur toutes les pages : en-tête, contact, pied de page…">Infos du site</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Informations enregistrées ✓ (visibles sur le site sous environ 1 minute)</p> : null}
        {erreur ? <p className="admin-alert" role="alert">Vérifiez les champs : téléphone (10 chiffres), e-mail, lien Instagram complet, horaires cohérents.</p> : null}

        <section className="admin-card admin-preview" aria-label="Aperçu actuel">
          <h2>Aperçu actuel sur le site</h2>
          <div className="admin-preview-grid">
            <div><Icon name="phone" /><span>{info.telephone}</span></div>
            <div><Icon name="mail" /><span>{info.email}</span></div>
            <div><Icon name="pin" /><span>{info.adresse}</span></div>
            <div><Icon name="pin" /><span>{info.zones.join(' · ')}</span></div>
            <div className="admin-preview-hours">
              <Icon name="clock" />
              <span>{hoursGroups(info).map((group) => <span key={group.days}>{group.days} <b>{group.hours}</b></span>)}</span>
            </div>
          </div>
        </section>

        <form className="admin-form" action={saveSiteInfoAction}>
          <section className="admin-card">
            <h2 className="admin-section-title"><Icon name="phone" />Contact</h2>
            <div className="admin-form">
              <label className="admin-field">Téléphone<input name="telephone" defaultValue={info.telephone} placeholder="06 12 34 56 78" required /></label>
              <label className="admin-field">E-mail<input name="email" type="email" defaultValue={info.email} required /></label>
              <label className="admin-field">Lien Instagram<input name="instagram" defaultValue={info.instagram} required /></label>
              <label className="admin-field">Lien Facebook (facultatif)<input name="facebook" defaultValue={info.facebook} placeholder="https://www.facebook.com/votre-page" /></label>
              <label className="admin-field">Adresse de l’atelier<input name="adresse" defaultValue={info.adresse} maxLength={160} required /></label>
              <label className="admin-field">Délai de réponse annoncé<input name="delaiReponse" defaultValue={info.delaiReponse} maxLength={30} placeholder="24h" required /></label>
            </div>
          </section>

          <section className="admin-card">
            <h2 className="admin-section-title"><Icon name="clock" />Horaires d’ouverture</h2>
            <fieldset className="admin-hours">
              {dayNames.map((name, index) => (
                <div key={name} className={`admin-hours-row${info.horaires[index].ouvert ? '' : ' is-closed'}`}>
                  <label>
                    <input type="checkbox" name={`ouvert-${index}`} defaultChecked={info.horaires[index].ouvert} /> {name}
                  </label>
                  <input type="time" name={`de-${index}`} defaultValue={info.horaires[index].de} required aria-label={`${name} : ouverture`} />
                  <span>à</span>
                  <input type="time" name={`a-${index}`} defaultValue={info.horaires[index].a} required aria-label={`${name} : fermeture`} />
                </div>
              ))}
            </fieldset>
          </section>

          <section className="admin-card">
            <h2 className="admin-section-title"><Icon name="pin" />Zones desservies</h2>
            <label className="admin-field">
              Une zone par ligne
              <textarea name="zones" rows={5} defaultValue={info.zones.join('\n')} required />
            </label>
          </section>

          <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
        </form>
      </div>
    </main>
  );
}
