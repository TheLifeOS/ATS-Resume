import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Strip IPs & identifiers from Vercel logs
  res.headers.set('x-omit-log-ip', '1');
  return res;
}
