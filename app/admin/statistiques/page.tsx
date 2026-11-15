import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { getVercelAnalytics } from '@/lib/services/vercel-analytics';

export const metadata: Metadata = {
  title: 'Statistiques de fréquentation',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ period?: string }>;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('fr-FR').format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', timeZone: 'UTC' })
    .format(new Date(value));
}

function dailySeries(from: string, until: string, points: { timestamp: string; pageviews: number }[]) {
  const firstDay = new Date(from);
  const lastDay = new Date(until);
  const pointByDay = new Map(points.map((point) => [point.timestamp.slice(0, 10), point.pageviews]));
  const series: { date: string; pageviews: number }[] = [];

  for (
    const date = new Date(Date.UTC(firstDay.getUTCFullYear(), firstDay.getUTCMonth(), firstDay.getUTCDate()));
    date <= lastDay;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const key = date.toISOString().slice(0, 10);
    series.push({ date: key, pageviews: pointByDay.get(key) ?? 0 });
  }

  return series;
}

function AnalyticsUnavailable({
  status,
  reason,
  httpStatus,
}: {
  status: 'not-configured' | 'error';
  reason?: string;
  httpStatus?: number;
}) {
  return (
    <section className="admin-card" role="status">
      <h2>Statistiques indisponibles</h2>
      {status === 'not-configured' ? (
        <>
          <p>Configure les variables serveur Vercel pour afficher les statistiques :</p>
          <ul>
            <li><code>VERCEL_ANALYTICS_TOKEN</code></li>
            <li><code>VERCEL_ANALYTICS_PROJECT_ID</code></li>
            <li><code>VERCEL_ANALYTICS_TEAM_ID</code> si le projet appartient à une équipe</li>
          </ul>
        </>
      ) : (
        <>
          <p>Impossible de récupérer les données de Vercel Web Analytics.</p>
          {status === 'error' && (
            <p>
              {reason === 'api' && httpStatus === 400 && 'Paramètres refusés par Vercel. Vérifie VERCEL_ANALYTICS_PROJECT_ID et, si le projet appartient à une équipe, VERCEL_ANALYTICS_TEAM_ID.'}
              {reason === 'api' && httpStatus === 401 && 'Le jeton Vercel est invalide ou expiré.'}
              {reason === 'api' && httpStatus === 403 && 'Le jeton Vercel n’a pas accès aux données Analytics de ce projet.'}
              {reason === 'api' && httpStatus !== 400 && httpStatus !== 401 && httpStatus !== 403 && `L’API Vercel a répondu avec le statut HTTP ${httpStatus}. Vérifie l’accès au projet et les droits du jeton.`}
              {reason === 'network' && 'La connexion à l’API Vercel a échoué. Réessaie plus tard.'}
              {reason === 'invalid-response' && 'La réponse de l’API Vercel n’a pas le format attendu.'}
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default async function StatistiquesPage({ searchParams }: PageProps) {
  if (!(await getAdminUser())) redirect('/admin');
  const { period } = await searchParams;
  const days = period === '30' ? 30 : 7;
  const result = await getVercelAnalytics(days);

  return (
    <main className="section-pad">
      <div className="admin analytics-page">
        <header className="admin-header">
          <div>
            <h1>Statistiques de fréquentation</h1>
            <p className="admin-help">Données de production, agrégées par Vercel Web Analytics.</p>
          </div>
          <nav className="analytics-period" aria-label="Période des statistiques">
            {[7, 30].map((option) => (
              <Link
                key={option}
                className="admin-small-btn"
                href={`/admin/statistiques?period=${option}`}
                aria-current={days === option ? 'page' : undefined}
              >
                {option} jours
              </Link>
            ))}
          </nav>
        </header>

        {result.status !== 'ready' ? (
          <AnalyticsUnavailable
            status={result.status}
            reason={result.status === 'error' ? result.reason : undefined}
            httpStatus={result.status === 'error' && result.reason === 'api' ? result.httpStatus : undefined}
          />
        ) : (
          <>
            <div className="analytics-summary" aria-label="Totaux sur la période">
              <section className="admin-stat">
                <strong>{formatNumber(result.total.visitors)}</strong>
                <span>Visiteurs</span>
              </section>
              <section className="admin-stat">
                <strong>{formatNumber(result.total.pageviews)}</strong>
                <span>Pages vues</span>
              </section>
            </div>

            <section className="admin-card">
              <h2>Pages vues par jour</h2>
              {(() => {
                const series = dailySeries(result.from, result.until, result.daily);
                const maxPageviews = Math.max(1, ...series.map((point) => point.pageviews));
                return (
                  <ol className="analytics-daily">
                    {series.map((point) => (
                      <li key={point.date}>
                        <time dateTime={point.date}>{formatDate(`${point.date}T00:00:00.000Z`)}</time>
                        <span className="analytics-track" aria-hidden="true">
                          <span style={{ width: `${(point.pageviews / maxPageviews) * 100}%` }} />
                        </span>
                        <strong>{formatNumber(point.pageviews)}</strong>
                      </li>
                    ))}
                  </ol>
                );
              })()}
            </section>

            <div className="analytics-breakdowns">
              <section className="admin-card">
                <h2>Pages les plus vues</h2>
                {result.pages.length ? (
                  <ol className="analytics-ranking">
                    {result.pages.map((page) => (
                      <li key={page.dimension}>
                        <span>{page.dimension}</span>
                        <strong>{formatNumber(page.pageviews)}</strong>
                      </li>
                    ))}
                  </ol>
                ) : <p>Aucune page vue sur cette période.</p>}
              </section>
              <section className="admin-card">
                <h2>Principaux référents</h2>
                {result.referrers.length ? (
                  <ol className="analytics-ranking">
                    {result.referrers.map((referrer) => (
                      <li key={referrer.dimension}>
                        <span>{referrer.dimension || 'Référent inconnu'}</span>
                        <strong>{formatNumber(referrer.pageviews)}</strong>
                      </li>
                    ))}
                  </ol>
                ) : <p>Aucun référent enregistré sur cette période.</p>}
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
