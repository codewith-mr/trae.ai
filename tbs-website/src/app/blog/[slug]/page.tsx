import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ShareButton from '@/components/ui/ShareButton';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const article = await prisma.blog.findUnique({ where: { slug: params.slug } })
  if (!article) return notFound()
  const related = await prisma.blog.findMany({ where: { category: article.category, NOT: { id: article.id } }, take: 3 })
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/blog" className="text-gray-700 hover:text-primary">Blog</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">{article.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image src={article.authorAvatar || '/user-avatar.svg'} alt={article.authorName} width={40} height={40} className="rounded-full mr-3" />
              <span className="text-gray-700">{article.authorName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{article.publishDate}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{article.readTime}</span>
              <ShareButton compact variant="ghost" showLabel={false} url={''} title={article.title} description={article.excerpt} className="text-gray-600 hover:text-primary" />
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-md inline-block">
            <span className="text-primary">{article.category}</span>
          </div>
        </div>

        <div className="mb-8 relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image src={article.imageUrl} alt={article.title} fill style={{ objectFit: 'cover' }} priority />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">{article.excerpt}</p>
          <p>{article.content}</p>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-medium mr-2">Share:</span>
              <button className="text-gray-600 hover:text-primary mr-4">Twitter</button>
              <button className="text-gray-600 hover:text-primary mr-4">Facebook</button>
              <button className="text-gray-600 hover:text-primary">LinkedIn</button>
            </div>
            <div>
              <span className="font-medium mr-2">Tags:</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-2">{article.category}</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2 hover:text-primary transition">{post.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{post.readTime} • {post.publishDate}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
