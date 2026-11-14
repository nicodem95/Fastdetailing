import { NextResponse } from 'next/server';
import { getReviews } from '@/lib/extra-content';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getReviews());
}
