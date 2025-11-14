import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function HomeManager() {
  const home = await prisma.homeSettings.findFirst({ where: { id: 1 } })
  const courses = await prisma.course.findMany({ orderBy: { title: 'asc' } })
  const blogs = await prisma.blog.findMany({ orderBy: { publishDate: 'desc' } })
  const tips = await prisma.tip.findMany({ orderBy: { updatedAt: 'desc' } })
  const selectedCourseIds = (await prisma.homeSettingsFeaturedCourse.findMany({ where: { homeSettingsId: home?.id || 1 } })).map(x => x.courseId)
  const selectedBlogIds = (await prisma.homeSettingsLatestBlog.findMany({ where: { homeSettingsId: home?.id || 1 } })).map(x => x.blogId)
  const selectedTipIds = (await prisma.homeSettingsLatestTip.findMany({ where: { homeSettingsId: home?.id || 1 } })).map(x => x.tipId)

  async function saveBanner(formData: FormData) {
    'use server'
    const bannerTitle = String(formData.get('bannerTitle') || '')
    const bannerSubtitle = String(formData.get('bannerSubtitle') || '')
    const bannerCtaText = String(formData.get('bannerCtaText') || '')
    const bannerCtaLink = String(formData.get('bannerCtaLink') || '')
    const bannerSecondaryCtaText = String(formData.get('bannerSecondaryCtaText') || '')
    const bannerSecondaryCtaLink = String(formData.get('bannerSecondaryCtaLink') || '')
    await prisma.homeSettings.upsert({
      where: { id: 1 },
      update: { bannerTitle, bannerSubtitle, bannerCtaText, bannerCtaLink, bannerSecondaryCtaText, bannerSecondaryCtaLink },
      create: { bannerTitle, bannerSubtitle, bannerCtaText, bannerCtaLink, bannerSecondaryCtaText, bannerSecondaryCtaLink },
    })
    revalidatePath('/')
    revalidatePath('/admin/home')
  }

  async function saveFeatured(formData: FormData) {
    'use server'
    const courseIds = formData.getAll('courseIds').map(v => Number(String(v))).filter(Boolean)
    const blogIds = formData.getAll('blogIds').map(v => Number(String(v))).filter(Boolean)
    const tipIds = formData.getAll('tipIds').map(v => Number(String(v))).filter(Boolean)
    const id = 1
    await prisma.homeSettingsFeaturedCourse.deleteMany({ where: { homeSettingsId: id } })
    await prisma.homeSettingsLatestBlog.deleteMany({ where: { homeSettingsId: id } })
    await prisma.homeSettingsLatestTip.deleteMany({ where: { homeSettingsId: id } })
    for (const cid of courseIds) await prisma.homeSettingsFeaturedCourse.create({ data: { homeSettingsId: id, courseId: cid } })
    for (const bid of blogIds) await prisma.homeSettingsLatestBlog.create({ data: { homeSettingsId: id, blogId: bid } })
    for (const tid of tipIds) await prisma.homeSettingsLatestTip.create({ data: { homeSettingsId: id, tipId: tid } })
    revalidatePath('/')
    revalidatePath('/admin/home')
    revalidatePath('/admin')
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Home Page Manager</h2>
      <form action={saveBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="bannerTitle" defaultValue={home?.bannerTitle || ''} placeholder="Banner Title" className="border rounded px-3 py-2" />
        <input name="bannerSubtitle" defaultValue={home?.bannerSubtitle || ''} placeholder="Banner Subtitle" className="border rounded px-3 py-2" />
        <input name="bannerCtaText" defaultValue={home?.bannerCtaText || ''} placeholder="CTA Text" className="border rounded px-3 py-2" />
        <input name="bannerCtaLink" defaultValue={home?.bannerCtaLink || ''} placeholder="CTA Link" className="border rounded px-3 py-2" />
        <input name="bannerSecondaryCtaText" defaultValue={home?.bannerSecondaryCtaText || ''} placeholder="Secondary CTA Text" className="border rounded px-3 py-2" />
        <input name="bannerSecondaryCtaLink" defaultValue={home?.bannerSecondaryCtaLink || ''} placeholder="Secondary CTA Link" className="border rounded px-3 py-2" />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded md:col-span-2">Save Banner</button>
      </form>

      <form action={saveFeatured} className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Featured Courses</h3>
          <div className="flex flex-wrap gap-2">
            {courses.map(c => (
              <label key={c.id} className={`px-3 py-1 border rounded ${selectedCourseIds.includes(c.id) ? 'border-primary text-primary' : 'border-neutral-300'}`}>
                <input name="courseIds" type="checkbox" className="mr-2" defaultChecked={selectedCourseIds.includes(c.id)} value={String(c.id)} />{c.title}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Latest Blogs</h3>
          <div className="flex flex-wrap gap-2">
            {blogs.map(b => (
              <label key={b.id} className={`px-3 py-1 border rounded ${selectedBlogIds.includes(b.id) ? 'border-primary text-primary' : 'border-neutral-300'}`}>
                <input name="blogIds" type="checkbox" className="mr-2" defaultChecked={selectedBlogIds.includes(b.id)} value={String(b.id)} />{b.title}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Latest Tips</h3>
          <div className="flex flex-wrap gap-2">
            {tips.map(t => (
              <label key={t.id} className={`px-3 py-1 border rounded ${selectedTipIds.includes(t.id) ? 'border-primary text-primary' : 'border-neutral-300'}`}>
                <input name="tipIds" type="checkbox" className="mr-2" defaultChecked={selectedTipIds.includes(t.id)} value={String(t.id)} />{t.title}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Save Featured Sections</button>
      </form>
    </div>
  )
}
