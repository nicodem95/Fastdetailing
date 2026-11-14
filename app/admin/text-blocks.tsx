import { getTexts, textFields } from '@/lib/site-content';
import { saveTextGroupAction } from './settings-actions';
import { Icon, type IconName } from './icons';

export interface TextBlock {
  title: string;
  icon: IconName;
  hint: string;
  keys: string[];
}

export async function TextBlocks({ blocks, back, ok }: { blocks: TextBlock[]; back: string; ok?: string }) {
  const texts = await getTexts();

  return (
    <>
      {ok ? <p className="admin-success" role="status">Textes enregistrés ✓ (visibles sur le site sous environ 1 minute)</p> : null}
      <form className="admin-form" action={saveTextGroupAction}>
        <input type="hidden" name="back" value={back} />
        {blocks.map((block) => (
          <section className="admin-card" key={block.title}>
            <h2 className="admin-section-title"><Icon name={block.icon} />{block.title}</h2>
            <p className="admin-help">{block.hint}</p>
            <div className="admin-form">
              {textFields.filter((field) => block.keys.includes(field.key)).map((field) => (
                <label className="admin-field" key={field.key}>
                  <input type="hidden" name="keys" value={field.key} />
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
    </>
  );
}
