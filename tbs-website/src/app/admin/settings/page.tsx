import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function SettingsManager() {
  const settings = await prisma.siteSettings.findFirst({ where: { id: 1 } })

  async function save(formData: FormData) {
    'use server'
    const siteTitle = String(formData.get('siteTitle') || '')
    const logoUrl = String(formData.get('logoUrl') || '')
    const footerText = String(formData.get('footerText') || '')
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: { siteTitle, logoUrl, footerText },
      create: { siteTitle, logoUrl, footerText },
    })
    revalidatePath('/')
    revalidatePath('/admin/settings')
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Website Settings</h2>
      <form action={save} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="siteTitle" defaultValue={settings?.siteTitle || ''} placeholder="Site Title" className="border rounded px-3 py-2" />
        <input name="logoUrl" defaultValue={settings?.logoUrl || ''} placeholder="Logo URL" className="border rounded px-3 py-2" />
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Footer Text</label>
          <textarea name="footerText" defaultValue={settings?.footerText || ''} className="w-full border rounded px-3 py-2" rows={3}></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded md:col-span-2">Save Settings</button>
      </form>
    </div>
  )
}

