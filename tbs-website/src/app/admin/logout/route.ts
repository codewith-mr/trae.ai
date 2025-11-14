import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL('/admin/login', request.url)
  const res = NextResponse.redirect(url)
  res.cookies.set('admin_session', '', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 })
  return res
}
