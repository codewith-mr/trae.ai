'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  publishDate: string;
  readTime: string;
  imageUrl: string;
}

const BlogCard = ({
  slug,
  title,
  excerpt,
  author,
  category,
  publishDate,
  readTime,
  imageUrl,
}: BlogCardProps) => {
  // Removed expandable content and Read More button per design update

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-1 transition-shadow hover:shadow-2 flex flex-col h-full">
      {/* Blog Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized={imageUrl.endsWith('.svg')}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <Link href={`/blog/category/${category.toLowerCase()}`}>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white hover:bg-accent transition-colors">
              {category}
            </span>
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link 
          href={`/blog/${slug}`} 
          className="group"
        >
          <h3 className="text-xl font-heading font-bold text-text mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <div className="text-neutral-600 mb-4 text-sm">
          <p className="line-clamp-3">{excerpt}</p>
        </div>

        {/* Meta (date and read time only) */}
        <div className="flex justify-between items-center mt-auto">
          <div className="text-xs text-neutral-500">
            <span>{publishDate}</span>
            <span className="mx-1">•</span>
            <span>{readTime}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              href={`/blog/${slug}`} 
              className="text-primary hover:text-accent transition-colors"
            >
              <span className="sr-only">View full article about {title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
