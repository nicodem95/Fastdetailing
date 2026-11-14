import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getTexts, textFields } from '@/lib/site-content';
import { saveTextsAction } from '../settings-actions';
import { Icon, PageTitle, type IconName } from '../icons';

export const metadata: Metadata = { title: 'Textes', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const groups: { title: string; icon: IconName; hint: string; keys: string[] }[] = [
  { title: 'Bandeau d’accueil (hero)', icon: 'text', hint: 'Titre principal et accroche affichés en tête de la page d’accueil.', keys: ['accueil-titre', 'accueil-texte'] },
  { title: 'Bandeau « Offre client »', icon: 'sparkle', hint: 'Encadré promotionnel de l’accueil : offre franchise, mention légale, titre assurance et bouton.', keys: ['offre-etiquette', 'offre-ligne1', 'offre-ligne2', 'offre-note', 'offre-titre', 'offre-texte', 'offre-bouton'] },
  { title: 'Section « Contact rapide »', icon: 'phone', hint: 'Texte d’introduction de la section contact, en bas de l’accueil.', keys: ['accueil-contact'] },
  ];

export default async function TextesPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const texts = await getTexts();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Modifiez les textes principaux. Pour revenir au texte d’origine, remettez-le tel quel.">Textes de la page d’accueil</PageTitle></div>
          {ok ? <p className="admin-success" role="status">Textes enregistrés ✓ (visibles sur le site sous environ 1 minute)</p> : null}
          <form className="admin-form" action={saveTextsAction}>
            {groups.map((group) => (
              <section className="admin-card" key={group.title}>
                <h2 className="admin-section-title"><Icon name={group.icon} />{group.title}</h2>
                <p className="admin-help">{group.hint}</p>
                <div className="admin-form">
                  {textFields.filter((field) => group.keys.includes(field.key)).map((field) => (
                    <label className="admin-field" key={field.key}>
                      {field.label.replace('Bandeau offre : ', '')}
                      {field.multiline ? (
                        <textarea name={field.key} rows={3} maxLength={400} defaultValue={texts[field.key] ?? field.defaultValue} required />
                      ) : (
                        <input name={field.key} maxLength={400} defaultValue={texts[field.key] ?? field.defaultValue} required />
                      )}
                    </label>
                  ))}
                </div>
              </section>
            ))}
            <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
          </form>
      </div>
    </main>
  );
}
