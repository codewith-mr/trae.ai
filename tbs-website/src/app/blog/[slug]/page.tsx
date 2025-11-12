"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { BlogCardProps } from '@/components/cards/BlogCard';
import ShareButton from '@/components/ui/ShareButton';

// Import the mock data directly from blogData
import { blogPosts } from '../blogData';

export default function BlogArticle() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<BlogCardProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the article with the matching slug
    const foundArticle = blogPosts.find((post) => post.slug === slug);
    setArticle(foundArticle || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading article...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col justify-center items-center h-64">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition">
              Back to Blog
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/blog" className="text-gray-700 hover:text-primary">
                    Blog
                  </Link>
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

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image 
                src={article.author.avatar} 
                alt={article.author.name} 
                width={40} 
                height={40} 
                className="rounded-full mr-3"
              />
              <span className="text-gray-700">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{article.publishDate}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{article.readTime}</span>
              <ShareButton compact variant="ghost" showLabel={false} url={typeof window !== 'undefined' ? window.location.href : ''} title={article.title} description={article.excerpt} className="text-gray-600 hover:text-primary" />
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-md inline-block">
            <span className="text-primary">{article.category}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image 
            src={article.imageUrl} 
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          <p className="text-lg mb-6">{article.excerpt}</p>
          
          {/* Sample content - in a real app, this would come from a CMS or database */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
            nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
            nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Key Points</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Point one about {article.title}</li>
            <li className="mb-2">Another important consideration for this topic</li>
            <li className="mb-2">How this relates to {article.category}</li>
            <li className="mb-2">Practical applications and examples</li>
            <li className="mb-2">Future trends and predictions</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Detailed Analysis</h2>
          <p className="mb-4">
            Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          
          <blockquote className="border-l-4 border-primary pl-4 italic my-6">
            "This is an important quote related to {article.title} that emphasizes the key message of this article."
            <cite className="block mt-2 text-sm">— Industry Expert</cite>
          </blockquote>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
          <p className="mb-4">
            In conclusion, we've explored the important aspects of {article.title}. The key takeaways include
            understanding the fundamentals, applying best practices, and staying updated with industry trends.
          </p>
        </div>

        {/* Share and Tags */}
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
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Tips</span>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter((post: BlogCardProps) => post.id !== article.id && post.category === article.category)
              .slice(0, 3)
              .map((post: BlogCardProps) => (
                <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full">
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
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
  );
}
