import 'server-only';

type AnalyticsCount = {
  pageviews: number;
  visitors: number;
};

type DailyPoint = {
  timestamp: string;
  pageviews: number;
  visitors: number;
};

type BreakdownPoint = {
  dimension: string;
  pageviews: number;
  visitors: number;
};

export type VercelAnalyticsResult =
  | { status: 'not-configured' }
  | { status: 'error'; reason: 'api'; httpStatus: number }
  | { status: 'error'; reason: 'network' | 'invalid-response' }
  | {
      status: 'ready';
      from: string;
      until: string;
      updatedAt: string;
      total: { pageviews: number; visitors: number | null };
      visitorsUnavailable: boolean;
      daily: DailyPoint[];
      pages: BreakdownPoint[];
      referrers: BreakdownPoint[];
    };

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCount(value: unknown): value is AnalyticsCount {
  return isRecord(value)
    && typeof value.pageviews === 'number'
    && Number.isFinite(value.pageviews)
    && typeof value.visitors === 'number'
    && Number.isFinite(value.visitors);
}

function hasCountFields(value: JsonRecord): value is JsonRecord & AnalyticsCount {
  return typeof value.pageviews === 'number'
    && Number.isFinite(value.pageviews)
    && typeof value.visitors === 'number'
    && Number.isFinite(value.visitors);
}

function parseDaily(value: unknown): DailyPoint[] | null {
  if (!isRecord(value) || !Array.isArray(value.data)) return null;

  const points: DailyPoint[] = [];
  for (const row of value.data) {
    if (
      !isRecord(row)
      || typeof row.timestamp !== 'string'
      || !hasCountFields(row)
    ) return null;

    points.push({ timestamp: row.timestamp, pageviews: row.pageviews, visitors: row.visitors });
  }

  return points;
}

function parseBreakdown(value: unknown, dimension: 'requestPath' | 'referrerHostname'): BreakdownPoint[] | null {
  if (!isRecord(value) || !Array.isArray(value.data)) return null;

  const points: BreakdownPoint[] = [];
  for (const row of value.data) {
    if (!isRecord(row) || !hasCountFields(row)) return null;
    const rawDimension = row[dimension];
    const dimensionValue = typeof rawDimension === 'string' && rawDimension
      ? rawDimension
      : dimension === 'referrerHostname' ? 'Accès direct / non renseigné' : null;
    if (!dimensionValue) return null;

    points.push({
      dimension: dimensionValue,
      pageviews: row.pageviews,
      visitors: row.visitors,
    });
  }

  return points;
}

function endpoint(
  projectId: string,
  teamId: string | undefined,
  since: string,
  until: string,
  by?: string,
) {
  const url = new URL('https://api.vercel.com/v1/query/web-analytics/visits/');
  url.pathname += by ? 'aggregate' : 'count';
  url.searchParams.set('projectId', projectId);
  url.searchParams.set('since', since);
  url.searchParams.set('until', until);
  url.searchParams.set(
    'filter',
    "not (startswith(requestPath, '/admin') or startswith(requestPath, '/auth') or startswith(requestPath, '/api'))",
  );
  if (teamId) url.searchParams.set('teamId', teamId);
  if (by) {
    url.searchParams.set('by', by);
    url.searchParams.set('limit', '100');
  }
  return url;
}

export async function getVercelAnalytics(days: 7 | 30): Promise<VercelAnalyticsResult> {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID;
  const teamId = process.env.VERCEL_ANALYTICS_TEAM_ID;
  if (!token || !projectId) return { status: 'not-configured' };

  const until = new Date();
  const since = new Date(Date.UTC(
    until.getUTCFullYear(),
    until.getUTCMonth(),
    until.getUTCDate() - days + 1,
  ));
  const sinceValue = since.toISOString();
  const untilValue = until.toISOString();
  const urls = [
    endpoint(projectId, teamId, sinceValue, untilValue),
    endpoint(projectId, teamId, sinceValue, untilValue, 'day'),
    endpoint(projectId, teamId, sinceValue, untilValue, 'requestPath'),
    endpoint(projectId, teamId, sinceValue, untilValue, 'referrerHostname'),
  ];

  let responses: Response[];
  try {
    responses = await Promise.all(urls.map((url) => fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      cache: 'no-store',
    })));
  } catch (error) {
    if (error instanceof TypeError) return { status: 'error', reason: 'network' };
    throw error;
  }

  const failedResponse = responses.find((response) => !response.ok);
  if (failedResponse) return { status: 'error', reason: 'api', httpStatus: failedResponse.status };

  let payloads: unknown[];
  try {
    payloads = await Promise.all(responses.map((response) => response.json()));
  } catch (error) {
    if (error instanceof SyntaxError) return { status: 'error', reason: 'invalid-response' };
    throw error;
  }

  const total = isRecord(payloads[0]) && isCount(payloads[0].data) ? payloads[0].data : null;
  const daily = parseDaily(payloads[1]);
  const pages = parseBreakdown(payloads[2], 'requestPath');
  const referrers = parseBreakdown(payloads[3], 'referrerHostname');
  if (!total || !daily || !pages || !referrers) return { status: 'error', reason: 'invalid-response' };

  const dailyPageviews = daily.reduce((sum, point) => sum + point.pageviews, 0);
  const visitorsUnavailable = dailyPageviews > 0 && total.visitors === 0;

  return {
    status: 'ready',
    from: sinceValue,
    until: untilValue,
    updatedAt: new Date().toISOString(),
    total: {
      pageviews: dailyPageviews,
      visitors: visitorsUnavailable ? null : total.visitors,
    },
    visitorsUnavailable,
    daily,
    pages,
    referrers,
  };
}
