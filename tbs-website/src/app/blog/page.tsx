import MainLayout from '@/components/layout/MainLayout';
import BlogCard from '@/components/cards/BlogCard';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import BlogClient from '@/components/pages/BlogClient';
import { BlogCardProps } from '@/components/cards/BlogCard';

const categories = [
  'All',
  'Tips & Tricks',
  'Content Creation',
  'Investing',
  'Marketing',
  'Trading',
  'Freelancing'
];

const defaultCategory = 'All';

export default async function BlogPage() {
  const allPosts = await prisma.blog.findMany({ orderBy: { publishDate: 'desc' } });
  const mapped: BlogCardProps[] = allPosts.map((post: any) => ({
    id: String(post.id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: { name: post.authorName, avatar: post.authorAvatar || '/user-avatar.svg' },
    category: post.category,
    publishDate: post.publishDate,
    readTime: post.readTime ?? '',
    imageUrl: post.imageUrl,
  }));
  return (
    <MainLayout>
      <BlogClient posts={mapped} />
    </MainLayout>
  )
}
