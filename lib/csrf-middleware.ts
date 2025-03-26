import { NextRequest, NextResponse } from 'next/server';

export function validateCsrfRequest(req: NextRequest) {
  // Skip CSRF check for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return null;
  }
  
  const csrfCookie = req.cookies.get('csrf_token')?.value;
  const csrfHeader = req.headers.get('X-CSRF-Token');
  
  if (!csrfCookie || !csrfHeader) {
    return NextResponse.json(
      { error: 'CSRF token missing' },
      { status: 403 }
    );
  }
  
  // Simple equality check for Edge runtime
  if (csrfCookie !== csrfHeader) {
    return NextResponse.json(
      { error: 'CSRF token validation failed' },
      { status: 403 }
    );
  }
  
  return null;
}