'use client';

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';

function beforeSend(event: BeforeSendEvent) {
  const pathname = new URL(event.url, 'https://fastdetailing.fr').pathname;
  const excludedPrefixes = ['/admin', '/auth', '/api'];

  if (excludedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return null;
  }

  return event;
}

export function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
