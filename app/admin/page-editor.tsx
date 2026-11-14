import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getPageContent, type EditablePage } from '@/lib/page-content';
import { savePageContentAction } from './settings-actions';
import { Icon, PageTitle } from './icons';

export async function PageEditor({ page, ok }: { page: EditablePage; ok?: string }) {
  if (!(await getAdminUser())) redirect('/admin');
  const saved = await getPageContent(page);

  return (
    <main className="section-pad">
      <div className="admin">
        <div className="admin-header"><PageTitle icon="draft" hint={page.hint}>{page.title}</PageTitle></div>
        {ok ? <p className="admin-success" role="status">Page enregistrée ✓ (visible sur le site sous environ 1 minute)</p> : null}
        <form className="admin-form" action={savePageContentAction}>
          <input type="hidden" name="slug" value={page.slug} />
          {page.sections.map((section) => (
            <section className="admin-card" key={section.id}>
              <h2 className="admin-section-title"><Icon name={section.icon} />{section.title}</h2>
              <p className="admin-help">{section.hint}</p>
              {section.groups.map((group, index) => (
                <div className="admin-subgroup" key={index}>
                  {group.title ? <h3>{group.title}</h3> : null}
                  <div className="admin-form">
                    {group.fields.map((field) => (
                      <label className="admin-field" key={field.key}>
                        {field.label}
                        {field.multiline ? (
                          <textarea name={field.key} rows={3} maxLength={800} defaultValue={saved[field.key] ?? field.defaultValue} required />
                        ) : (
                          <input name={field.key} maxLength={800} defaultValue={saved[field.key] ?? field.defaultValue} required />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
          <button className="btn btn-primary admin-btn-icon" type="submit"><Icon name="save" />Enregistrer</button>
        </form>
      </div>
    </main>
  );
}
