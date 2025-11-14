import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function computeSessionToken(username: string, secret: string) {
  const data = new TextEncoder().encode(`${username}|${secret}`);
  // Edge runtime supports crypto.subtle
  // We return hex digest
  return crypto.subtle.digest('SHA-256', data).then((buf) => {
    const bytes = new Uint8Array(buf);
    let hex = '';
    for (let b of bytes) hex += b.toString(16).padStart(2, '0');
    return hex;
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/logout') return NextResponse.next();
    const session = request.cookies.get('admin_session')?.value;
    const username = process.env.ADMIN_USERNAME || 'admin';
    const secret = process.env.SESSION_SECRET || '';
    const expected = await computeSessionToken(username, secret);
    if (!session || session !== expected) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
