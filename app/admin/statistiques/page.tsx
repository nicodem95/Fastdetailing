import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth/server';
import { pageData } from '@/lib/page-data';
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

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(new Date(value));
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

function allPageStats(pages: { dimension: string; pageviews: number }[]) {
  const viewsByPath = new Map<string, number>();
  for (const page of pages) {
    viewsByPath.set(page.dimension, (viewsByPath.get(page.dimension) ?? 0) + page.pageviews);
  }

  return Object.entries(pageData)
    .map(([slug, page]) => {
      const canonicalPath = new URL(page.canonical).pathname;
      const routePath = slug === 'index' ? '/' : `/${slug}`;
      const paths = new Set([canonicalPath, routePath]);
      const pageviews = [...paths].reduce((sum, path) => sum + (viewsByPath.get(path) ?? 0), 0);

      return { dimension: canonicalPath, pageviews };
    })
    .sort((a, b) => b.pageviews - a.pageviews || a.dimension.localeCompare(b.dimension, 'fr'));
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
  const series = result.status === 'ready'
    ? dailySeries(result.from, result.until, result.daily)
    : [];
  const pageStats = result.status === 'ready' ? allPageStats(result.pages) : [];
  const maxPageviews = Math.max(1, ...series.map((point) => point.pageviews));

  return (
    <main className="section-pad">
      <div className="admin analytics-page">
        <header className="analytics-header">
          <div>
            <p className="analytics-eyebrow">Vue d’ensemble</p>
            <h1>Fréquentation du site</h1>
            <p className="analytics-intro">Suivi des visites de tes pages publiques.</p>
          </div>
          <div className="analytics-header-tools">
            {result.status === 'ready' && (
              <p className="analytics-updated">
                Mis à jour le <time dateTime={result.updatedAt}>{formatDateTime(result.updatedAt)}</time>
              </p>
            )}
            <nav className="analytics-period" aria-label="Période des statistiques">
              {[7, 30].map((option) => (
                <Link
                  key={option}
                  className="analytics-period-link"
                  href={`/admin/statistiques?period=${option}`}
                  aria-current={days === option ? 'page' : undefined}
                >
                  {option} jours
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {result.status !== 'ready' ? (
          <AnalyticsUnavailable
            status={result.status}
            reason={result.status === 'error' ? result.reason : undefined}
            httpStatus={result.status === 'error' && result.reason === 'api' ? result.httpStatus : undefined}
          />
        ) : (
          <>
            <p className="analytics-range">
              Période du <strong>{formatDate(result.from)}</strong> au <strong>{formatDate(result.until)}</strong>
            </p>

            <div className="analytics-summary" aria-label="Totaux sur la période">
              <section className="analytics-metric analytics-metric-primary">
                <div>
                  <h2>Pages vues</h2>
                  <p>Total sur la période</p>
                </div>
                <strong>{formatNumber(result.total.pageviews)}</strong>
              </section>
              <section className="analytics-metric">
                <div>
                  <h2>Visiteurs uniques</h2>
                  <p>{result.visitorsUnavailable ? 'Indisponible pour le moment' : 'Sur la période'}</p>
                </div>
                <strong>{result.total.visitors === null ? '—' : formatNumber(result.total.visitors)}</strong>
              </section>
            </div>

            <section className="admin-card analytics-panel">
              <div className="analytics-panel-heading">
                <div>
                  <h2>Pages vues par jour</h2>
                  <p>Évolution sur la période choisie</p>
                </div>
                <span className="analytics-panel-total">{formatNumber(result.total.pageviews)} vues</span>
              </div>
              <div className="analytics-chart-scroll" role="region" aria-label="Graphique des pages vues par jour" tabIndex={0}>
                <ol className={`analytics-chart${series.length > 10 ? ' analytics-chart-month' : ''}`}>
                  {series.map((point, index) => {
                    const showDate = index === 0 || index === series.length - 1 || index % Math.ceil(series.length / 5) === 0;
                    return (
                      <li
                        key={point.date}
                        aria-label={`${formatDate(`${point.date}T00:00:00.000Z`)} : ${formatNumber(point.pageviews)} pages vues`}
                      >
                        <span className="analytics-chart-value">{formatNumber(point.pageviews)}</span>
                        <span className="analytics-chart-bar" aria-hidden="true">
                          <span className={point.pageviews > 0 ? 'has-views' : undefined} style={{ height: `${(point.pageviews / maxPageviews) * 100}%` }} />
                        </span>
                        <time dateTime={point.date} aria-hidden={!showDate}>
                          {showDate ? formatDate(`${point.date}T00:00:00.000Z`) : ''}
                        </time>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>

            <div className="analytics-breakdowns">
              <section className="admin-card analytics-panel">
                <div className="analytics-panel-heading">
                  <div>
                    <h2>Ce que regardent vos visiteurs</h2>
                    <p>Toutes les pages du site, même sans visite</p>
                  </div>
                </div>
                <ol className="analytics-ranking">
                  {pageStats.map((page) => (
                    <li key={page.dimension}>
                      <span>{page.dimension}</span>
                      <strong>{formatNumber(page.pageviews)} vues</strong>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="admin-card analytics-panel">
                <div className="analytics-panel-heading">
                  <div>
                    <h2>D’où viennent les visiteurs ?</h2>
                    <p>Sites ou applications qui les ont dirigés ici</p>
                  </div>
                </div>
                {result.referrers.length ? (
                  <ol className="analytics-ranking">
                    {result.referrers.map((referrer) => (
                      <li key={referrer.dimension}>
                        <span>{referrer.dimension || 'Référent inconnu'}</span>
                        <strong>{formatNumber(referrer.visitors)} visiteurs · {formatNumber(referrer.pageviews)} vues</strong>
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
