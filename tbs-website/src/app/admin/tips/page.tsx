import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'

export default async function TipsManager() {
  async function addTip(formData: FormData) {
    'use server'
    const title = String(formData.get('title') || '')
    const slug = String(formData.get('slug') || '')
    const description = String(formData.get('description') || '')
    const content = String(formData.get('content') || '')
    const category = String(formData.get('category') || '')
    let imageUrl = String(formData.get('imageUrl') || '')
    const readTime = String(formData.get('readTime') || '')
    const file = formData.get('image') as File | null
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-]/g, '')}`
      await fs.writeFile(path.join(uploadDir, filename), buffer)
      imageUrl = `/uploads/${filename}`
    }
    await prisma.tip.create({ data: { title, slug, description, content, category, imageUrl, readTime } })
    revalidatePath('/tips-tricks')
    revalidatePath('/admin/tips')
    revalidatePath('/admin')
  }

  async function deleteTip(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    await prisma.tip.delete({ where: { id } })
    revalidatePath('/tips-tricks')
    revalidatePath('/admin/tips')
    revalidatePath('/admin')
  }

  const tips = await prisma.tip.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Tips & Tricks Manager</h2>
      <form action={addTip} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="Slug" className="border rounded px-3 py-2" required />
        <input name="category" placeholder="Category" className="border rounded px-3 py-2" />
        <input name="readTime" placeholder="Read Time" className="border rounded px-3 py-2" />
        <input name="imageUrl" placeholder="Image URL (optional)" className="border rounded px-3 py-2" />
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input name="image" type="file" accept="image/*" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" rows={3}></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Content</label>
          <textarea name="content" className="w-full border rounded px-3 py-2" rows={6}></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded md:col-span-2">Add Tip</button>
      </form>
      <div>
        <h3 className="font-semibold mb-2">Existing Tips</h3>
        <ul className="divide-y">
          {tips.map(t => (
            <li key={t.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-neutral-500">{t.slug}</div>
              </div>
              <form action={deleteTip}>
                <input type="hidden" name="id" value={String(t.id)} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
