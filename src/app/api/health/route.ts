import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lightweight liveness probe. Phase 3 extends this to ping the database.
export function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
