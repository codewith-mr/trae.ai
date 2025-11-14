

// Levels for filtering

import MainLayout from '@/components/layout/MainLayout';
import CourseCard from '@/components/cards/CourseCard';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CoursesClient from '@/components/pages/CoursesClient';
import { CourseCardProps } from '@/components/cards/CourseCard';

const categories = [
  'All',
  'Freelancing',
  'Content Creation',
  'Trading',
  'Marketing',
  'Investing',
  'AI & Machine Learning',
  'Data Science',
  'Cloud Computing',
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

export default async function CoursesPage() {
  const allCourses = await prisma.course.findMany();
  const mapped: CourseCardProps[] = allCourses.map((c: any) => ({
    id: String(c.id),
    slug: c.slug,
    title: c.title,
    description: c.description,
    instructor: c.instructor,
    level: c.level,
    duration: c.duration,
    price: c.price,
    discountPrice: c.discountPrice ?? undefined,
    rating: c.rating ?? 0,
    reviewCount: c.reviewCount ?? 0,
    imageUrl: c.imageUrl,
    category: c.category,
  }));
  return (
    <MainLayout>
      <CoursesClient courses={mapped} />
    </MainLayout>
  )
}
