import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="flex gap-3 mb-6">
          <Link href="/admin" className="px-3 py-1 border rounded">Dashboard</Link>
          <Link href="/admin/home" className="px-3 py-1 border rounded">Home</Link>
          <Link href="/admin/courses" className="px-3 py-1 border rounded">Courses</Link>
          <Link href="/admin/blogs" className="px-3 py-1 border rounded">Blogs</Link>
          <Link href="/admin/tips" className="px-3 py-1 border rounded">Tips</Link>
          <Link href="/admin/settings" className="px-3 py-1 border rounded">Settings</Link>
          <Link href="/admin/logout" className="px-3 py-1 border rounded text-red-600">Logout</Link>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
