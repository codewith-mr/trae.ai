import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import fs from 'fs/promises'
import path from 'path'

export default async function BlogsManager() {
  async function addBlog(formData: FormData) {
    'use server'
    const title = String(formData.get('title') || '')
    const slug = String(formData.get('slug') || '')
    const excerpt = String(formData.get('excerpt') || '')
    const content = String(formData.get('content') || '')
    const tags = String(formData.get('tags') || '')
    const authorName = String(formData.get('authorName') || '')
    const publishDate = String(formData.get('publishDate') || '')
    const readTime = String(formData.get('readTime') || '')
    const category = String(formData.get('category') || '')
    let imageUrl = String(formData.get('imageUrl') || '')
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
    await prisma.blog.create({
      data: { title, slug, excerpt, content, tags, authorName, category, publishDate, readTime, imageUrl },
    })
    revalidatePath('/blog')
    revalidatePath('/admin/blogs')
    revalidatePath('/admin')
  }

  async function deleteBlog(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    await prisma.blog.delete({ where: { id } })
    revalidatePath('/blog')
    revalidatePath('/admin/blogs')
    revalidatePath('/admin')
  }

  const blogs = await prisma.blog.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Blog Manager</h2>
      <form action={addBlog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="Slug" className="border rounded px-3 py-2" required />
        <input name="authorName" placeholder="Author" className="border rounded px-3 py-2" />
        <input name="category" placeholder="Category" className="border rounded px-3 py-2" />
        <input name="publishDate" placeholder="Publish Date" className="border rounded px-3 py-2" />
        <input name="readTime" placeholder="Read Time" className="border rounded px-3 py-2" />
        <input name="imageUrl" placeholder="Image URL (optional)" className="border rounded px-3 py-2" />
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input name="image" type="file" accept="image/*" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Excerpt</label>
          <textarea name="excerpt" className="w-full border rounded px-3 py-2" rows={2}></textarea>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Content</label>
          <textarea name="content" className="w-full border rounded px-3 py-2" rows={6}></textarea>
        </div>
        <input name="tags" placeholder="Tags (comma separated)" className="border rounded px-3 py-2 md:col-span-2" />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded md:col-span-2">Add Blog</button>
      </form>
      <div>
        <h3 className="font-semibold mb-2">Existing Blogs</h3>
        <ul className="divide-y">
          {blogs.map(b => (
            <li key={b.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{b.title}</div>
                <div className="text-sm text-neutral-500">{b.slug}</div>
              </div>
              <form action={deleteBlog}>
                <input type="hidden" name="id" value={String(b.id)} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
