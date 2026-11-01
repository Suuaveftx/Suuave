import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL!;

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const url = `${API_URL}/${path.join('/')}${req.nextUrl.search}`;

  const headers = new Headers();

  // Forward Better Auth session cookie
  const cookie = req.headers.get('cookie');

  if (cookie) {
    headers.set('cookie', cookie);
  }

  const contentType = req.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }

  const body =
    req.method !== 'GET' && req.method !== 'HEAD' ? await req.arrayBuffer() : undefined;

  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
    cache: 'no-store',
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') || 'application/json',
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
