import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [coursesCount, blogsCount, tipsCount] = await Promise.all([
    prisma.course.count(),
    prisma.blog.count(),
    prisma.tip.count(),
  ])
  const recentCourses = await prisma.course.findMany({ orderBy: { updatedAt: 'desc' }, take: 5 })
  const recentBlogs = await prisma.blog.findMany({ orderBy: { updatedAt: 'desc' }, take: 5 })
  const recentTips = await prisma.tip.findMany({ orderBy: { updatedAt: 'desc' }, take: 5 })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <div className="text-sm text-neutral-500">Total Courses</div>
          <div className="text-2xl font-bold">{coursesCount}</div>
          <div className="mt-3">
            <Link href="/admin/courses" className="text-primary">Manage Courses</Link>
          </div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-neutral-500">Total Blogs</div>
          <div className="text-2xl font-bold">{blogsCount}</div>
          <div className="mt-3">
            <Link href="/admin/blogs" className="text-primary">Manage Blogs</Link>
          </div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-neutral-500">Total Tips</div>
          <div className="text-2xl font-bold">{tipsCount}</div>
          <div className="mt-3">
            <Link href="/admin/tips" className="text-primary">Manage Tips</Link>
          </div>
        </div>
      </div>

      <div>
        <Link href="/admin/home" className="inline-block px-4 py-2 bg-primary text-white rounded">Manage Home & Hero Section</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Recent Courses</h3>
          <ul className="space-y-1">
            {recentCourses.map(c => (<li key={c.id} className="text-sm">{c.title}</li>))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recent Blogs</h3>
          <ul className="space-y-1">
            {recentBlogs.map(b => (<li key={b.id} className="text-sm">{b.title}</li>))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recent Tips</h3>
          <ul className="space-y-1">
            {recentTips.map(t => (<li key={t.id} className="text-sm">{t.title}</li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}
