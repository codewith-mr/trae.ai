'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullContent(!showFullContent);
  };

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
          onClick={(e) => {
            if (showFullContent) {
              e.preventDefault();
            }
          }}
        >
          <h3 className="text-xl font-heading font-bold text-text mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <div className="text-neutral-600 mb-4 text-sm">
          {showFullContent ? (
            <div>
              <p>{excerpt}</p>
              <div className="mt-4">
                <p>
                  This is the full content of the blog post. When you click "Read More", 
                  you'll see the complete article content here. In a real implementation, 
                  this would contain the full article text from your database or CMS.
                </p>
                <p className="mt-2">
                  The article would continue with more paragraphs, images, and other content
                  that makes up the complete blog post.
                </p>
              </div>
            </div>
          ) : (
            <p className="line-clamp-3">{excerpt}</p>
          )}
          
          <button 
            onClick={toggleContent}
            className="mt-3 px-4 py-1 bg-primary text-white rounded hover:bg-accent transition-colors"
          >
            {showFullContent ? 'Show Less' : 'Read More'}
          </button>
        </div>

        {/* Author and Meta */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <Image
              src={author.avatar}
              alt={author.name}
              width={32}
              height={32}
              className="rounded-full mr-2"
              unoptimized={author.avatar.endsWith('.svg')}
            />
            <div>
              <span className="text-sm font-semibold text-text block">{author.name}</span>
              <div className="flex items-center text-xs text-neutral-500">
                <span>{publishDate}</span>
                <span className="mx-1">•</span>
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          <Link 
            href={`/blog/${slug}`} 
            className="text-primary hover:text-accent transition-colors"
            onClick={(e) => {
              if (showFullContent) {
                e.preventDefault();
              }
            }}
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
  );
};

export default BlogCard;