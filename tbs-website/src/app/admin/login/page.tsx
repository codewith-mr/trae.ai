import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PasswordInput from '@/components/ui/PasswordInput'

async function computeSessionToken(username: string, secret: string) {
  const data = new TextEncoder().encode(`${username}|${secret}`)
  const buf = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(buf)
  let hex = ''
  for (let b of bytes) hex += b.toString(16).padStart(2, '0')
  return hex
}

export default function AdminLoginPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  async function login(formData: FormData) {
    'use server'
    const normalize = (s: string) => s
      .replace(/[\u2018\u2019\u02BC]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\u00A0/g, ' ')
      .trim()
    const username = normalize(String(formData.get('username') || ''))
    const password = normalize(String(formData.get('password') || ''))

    const validUsername = 'mr1yt.tbs'
    const validPassword = 'sikhopakistan1,'
    const isValid = username === validUsername && password === validPassword
    if (!isValid) {
      redirect('/admin/login?error=1')
    }

    const secret = process.env.SESSION_SECRET || ''
    const token = await computeSessionToken(process.env.ADMIN_USERNAME || validUsername, secret)
    cookies().set('admin_session', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    })
    redirect('/admin')
  }

  return (
    <div className="max-w-md mx-auto">
      {searchParams?.error && (
        <div className="mb-4 p-3 rounded border border-red-300 text-red-700 bg-red-50">Invalid username or password</div>
      )}
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form action={login} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
          <input id="username" name="username" type="text" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <PasswordInput id="password" name="password" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Login</button>
      </form>
      <p className="text-sm text-neutral-500 mt-4">After login you will be redirected automatically.</p>
    </div>
  )
}
