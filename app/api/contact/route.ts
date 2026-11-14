import { NextResponse } from 'next/server';
import { createContactMessage } from '@/lib/services/messages';

const recent = new Map<string, number[]>();

// Best-effort limit per server instance: 5 messages per 10 minutes and per IP.
function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const clean = (value: unknown, max: number) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (tooMany(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || body.website) return NextResponse.json({ ok: true });

  const nom = clean(body.name, 80);
  const telephone = clean(body.phone, 30);
  if (!nom || !telephone) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    await createContactMessage({
      nom,
      telephone,
      email: clean(body.email, 120) || null,
      codePostal: clean(body.postalCode, 10) || null,
      vehicule: clean(body.vehicle, 40) || null,
      prestation: clean(body.service, 80) || null,
      message: String(body.message ?? '').trim().slice(0, 2000) || null,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
