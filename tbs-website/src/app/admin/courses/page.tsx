import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

export default async function CoursesManager() {
  async function addCourse(formData: FormData) {
    'use server'
    const title = String(formData.get('title') || '')
    const slug = String(formData.get('slug') || '')
    const description = String(formData.get('description') || '')
    const instructor = String(formData.get('instructor') || '')
    const level = String(formData.get('level') || '')
    const duration = String(formData.get('duration') || '')
    const price = Number(formData.get('price') || 0)
    const category = String(formData.get('category') || '')
    let imageUrl = String(formData.get('imageUrl') || '')
    const file = formData.get('thumbnail') as File | null
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })
      const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-]/g, '')}`
      await fs.writeFile(path.join(uploadDir, filename), buffer)
      imageUrl = `/uploads/${filename}`
    }
    await prisma.course.create({
      data: { title, slug, description, instructor, level, duration, price, imageUrl, category },
    })
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    revalidatePath('/admin')
  }

  async function deleteCourse(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    await prisma.course.delete({ where: { id } })
    revalidatePath('/courses')
    revalidatePath('/admin/courses')
    revalidatePath('/admin')
  }

  const courses = await prisma.course.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Course Manager</h2>

      <form action={addCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="Slug" className="border rounded px-3 py-2" required />
        <input name="instructor" placeholder="Instructor" className="border rounded px-3 py-2" />
        <input name="level" placeholder="Level" className="border rounded px-3 py-2" />
        <input name="duration" placeholder="Duration" className="border rounded px-3 py-2" />
        <input name="price" placeholder="Price" type="number" step="0.01" className="border rounded px-3 py-2" />
        <input name="category" placeholder="Category" className="border rounded px-3 py-2" />
        <input name="imageUrl" placeholder="Image URL (optional)" className="border rounded px-3 py-2" />
        <div>
          <label className="block text-sm mb-1">Upload Thumbnail</label>
          <input name="thumbnail" type="file" accept="image/*" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" rows={3}></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded md:col-span-2">Add Course</button>
      </form>

      <div>
        <h3 className="font-semibold mb-2">Existing Courses</h3>
        <ul className="divide-y">
          {courses.map(c => (
            <li key={c.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-neutral-500">{c.slug}</div>
              </div>
              <form action={deleteCourse}>
                <input type="hidden" name="id" value={String(c.id)} />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
