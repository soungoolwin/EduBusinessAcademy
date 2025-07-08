import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD environment variable not set.');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const { password } = await request.json();

  if (password === ADMIN_PASSWORD) {
    const cookieStore = cookies();
    cookieStore.set('auth_token', 'super_secret_auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return new NextResponse('Login successful', { status: 200 });
  }

  return new NextResponse('Invalid password', { status: 401 });
}
