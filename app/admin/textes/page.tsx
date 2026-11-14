import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getTexts, textFields } from '@/lib/site-content';
import { saveTextsAction } from '../settings-actions';
import { Icon, PageTitle } from '../icons';

export const metadata: Metadata = { title: 'Textes', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function TextesPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const { ok } = await searchParams;
  if (!(await getAdminUser())) redirect('/admin');
  const texts = await getTexts();

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="text" hint="Modifiez les textes principaux. Pour revenir au texte d’origine, remettez-le tel quel.">Textes de la page d’accueil</PageTitle></div>
        <section className="admin-card">
          {ok ? <p className="admin-success" role="status">Textes enregistrés ✓ (visibles sur le site sous environ 1 minute)</p> : null}
          <form className="admin-form" action={saveTextsAction}>
            {textFields.map((field) => (
              <label className="admin-field" key={field.key}>
                {field.label}
                {field.multiline ? (
                  <textarea name={field.key} rows={3} maxLength={400} defaultValue={texts[field.key] ?? field.defaultValue} required />
                ) : (
                  <input name={field.key} maxLength={400} defaultValue={texts[field.key] ?? field.defaultValue} required />
                )}
              </label>
            ))}
            <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
          </form>
        </section>
      </div>
    </main>
  );
}
