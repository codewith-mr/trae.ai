import Image from "next/image";

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/ui/Hero';
import CourseCard, { CourseCardProps } from '@/components/cards/CourseCard';
import BlogCard, { BlogCardProps } from '@/components/cards/BlogCard';
import ToolCard, { ToolCardProps } from '@/components/cards/ToolCard';
import Link from 'next/link';

// Mock data for featured courses
const featuredCourses: CourseCardProps[] = [
  {
    id: '1',
    slug: 'freelance-web-development',
    title: 'Freelance Web Development Masterclass',
    description: 'Learn how to build a successful freelance web development business from scratch. This course covers everything from finding clients to delivering projects.',
    instructor: 'Sarah Johnson',
    level: 'Intermediate',
    duration: '12 hours',
    price: 199.99,
    discountPrice: 149.99,
    rating: 4.8,
    reviewCount: 245,
    imageUrl: '/course-freelancing.svg',
    category: 'Freelancing',
  },
  {
    id: '2',
    slug: 'youtube-growth-strategy',
    title: 'YouTube Growth Strategy 2023',
    description: 'Discover proven strategies to grow your YouTube channel, increase engagement, and monetize your content effectively.',
    instructor: 'Michael Chen',
    level: 'Beginner',
    duration: '8 hours',
    price: 149.99,
    rating: 4.7,
    reviewCount: 189,
    imageUrl: '/course-content-creation.svg',
     category: 'Content Creation',
  },
  {
    id: '3',
    slug: 'stock-trading-fundamentals',
    title: 'Stock Trading Fundamentals',
    description: 'Master the basics of stock trading with practical examples and real-world case studies. Learn risk management and portfolio building.',
    instructor: 'Alex Rivera',
    level: 'Advanced',
    duration: '15 hours',
    price: 249.99,
    discountPrice: 199.99,
    rating: 4.9,
    reviewCount: 312,
    imageUrl: '/course-trading.svg',
     category: 'Trading',
  },
];

// Mock data for latest blog posts
const latestBlogPosts: BlogCardProps[] = [
  {
    id: '1',
    slug: 'freelance-success-tips',
    title: '10 Essential Tips for Freelance Success in 2023',
    excerpt: 'Discover the key strategies that successful freelancers are using to find high-paying clients and build sustainable businesses.',
    author: {
      name: 'Jessica Miller',
      avatar: '/user-avatar.svg',
    },
    category: 'Tips & Tricks',
    publishDate: 'June 15, 2023',
    readTime: '5 min read',
    imageUrl: '/blog-post.svg',
  },
  {
    id: '2',
    slug: 'youtube-algorithm-changes',
    title: 'Understanding YouTube\'s Latest Algorithm Changes',
    excerpt: 'A detailed breakdown of the recent YouTube algorithm updates and how content creators can adapt their strategies accordingly.',
    author: {
      name: 'David Wong',
      avatar: '/user-avatar.svg',
    },
    category: 'Content Creation',
    publishDate: 'June 10, 2023',
    readTime: '8 min read',
    imageUrl: '/blog-post.svg',
  },
];

// Mock data for featured tools
const featuredTools: ToolCardProps[] = [
  {
    id: '1',
    slug: 'seo-analyzer',
    title: 'SEO Analyzer',
    description: 'Analyze your website\'s SEO performance and get actionable recommendations to improve your search engine rankings.',
    category: 'SEO',
    imageUrl: '/tool-image.svg',
    isPopular: true,
  },
  {
    id: '2',
    slug: 'income-calculator',
    title: 'Freelance Income Calculator',
    description: 'Calculate your potential freelance income based on your rates, hours, and expenses. Plan your financial future with confidence.',
    category: 'Calculators',
    imageUrl: '/tool-image.svg',
    isNew: true,
  },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero
        title="Learn Practical Skills That Convert Directly Into Income"
        subtitle="Actionable courses, tools, and resources for freelancers, content creators, and side-hustlers"
        ctaText="Explore Courses"
        ctaLink="/courses"
        secondaryCtaText="Try Free Tools"
        secondaryCtaLink="/tools"
      />

      {/* Featured Courses Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-heading font-bold text-text">Featured Courses</h2>
            <Link
              href="/courses"
              className="text-primary hover:text-accent transition-colors font-semibold flex items-center"
            >
              View All Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text mb-4">Why Choose TBS?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We focus on practical skills that directly translate to income opportunities, with a
              proven track record of helping students succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-1 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-text mb-2">Action-Oriented Learning</h3>
              <p className="text-neutral-600">
                Our courses focus on practical skills and actionable steps, not just theory. Learn by doing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-1 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-text mb-2">Expert Instructors</h3>
              <p className="text-neutral-600">
                Learn from industry professionals who have achieved success in their respective fields.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-1 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-text mb-2">Income-Focused</h3>
              <p className="text-neutral-600">
                Our courses are designed to help you earn more money through freelancing, content creation, or trading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-heading font-bold text-text">Latest from the Blog</h2>
            <Link
              href="/blog"
              className="text-primary hover:text-accent transition-colors font-semibold flex items-center"
            >
              View All Posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestBlogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-heading font-bold text-text">Featured Tools</h2>
            <Link
              href="/tools"
              className="text-primary hover:text-accent transition-colors font-semibold flex items-center"
            >
              View All Tools
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-secondary text-xl max-w-2xl mx-auto mb-8">
            Join thousands of students who are already learning practical skills and earning more income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="px-8 py-3 bg-secondary text-primary rounded-md hover:bg-white transition-colors font-body font-bold text-lg"
            >
              Browse Courses
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3 bg-transparent border-2 border-secondary text-white rounded-md hover:bg-accent transition-colors font-body font-bold text-lg"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
