"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
// Import course data from the coursesData.ts file
import { courses } from '@/app/courses/coursesData';

// Mock class data - in a real app, this would come from an API
const classData = {
  'freelance-web-development': [
    { id: 1, title: 'Introduction to Freelance Web Development', videoUrl: 'https://drive.google.com/file/d/1abc123/view' },
    { id: 2, title: 'Finding Your First Clients', videoUrl: 'https://drive.google.com/file/d/2def456/view' },
    { id: 3, title: 'Pricing Your Services', videoUrl: 'https://drive.google.com/file/d/3ghi789/view' },
    { id: 4, title: 'Building a Portfolio', videoUrl: 'https://drive.google.com/file/d/4jkl012/view' },
    { id: 5, title: 'Client Communication', videoUrl: 'https://drive.google.com/file/d/5mno345/view' },
  ],
  'youtube-growth-strategy': [
    { id: 1, title: 'YouTube Algorithm Basics', videoUrl: 'https://drive.google.com/file/d/6pqr678/view' },
    { id: 2, title: 'Content Strategy for Growth', videoUrl: 'https://drive.google.com/file/d/7stu901/view' },
    { id: 3, title: 'Thumbnail and Title Optimization', videoUrl: 'https://drive.google.com/file/d/8vwx234/view' },
    { id: 4, title: 'Audience Engagement Tactics', videoUrl: 'https://drive.google.com/file/d/9yz0567/view' },
  ],
  'stock-trading-fundamentals': [
    { id: 1, title: 'Understanding the Stock Market', videoUrl: 'https://drive.google.com/file/d/10abc890/view' },
    { id: 2, title: 'Technical Analysis Basics', videoUrl: 'https://drive.google.com/file/d/11def123/view' },
    { id: 3, title: 'Fundamental Analysis', videoUrl: 'https://drive.google.com/file/d/12ghi456/view' },
    { id: 4, title: 'Risk Management Strategies', videoUrl: 'https://drive.google.com/file/d/13jkl789/view' },
    { id: 5, title: 'Building a Diversified Portfolio', videoUrl: 'https://drive.google.com/file/d/14mno012/view' },
    { id: 6, title: 'Advanced Trading Techniques', videoUrl: 'https://drive.google.com/file/d/15pqr345/view' },
  ],
  'digital-marketing-essentials': [
    { id: 1, title: 'Digital Marketing Overview', videoUrl: 'https://drive.google.com/file/d/16stu678/view' },
    { id: 2, title: 'SEO Fundamentals', videoUrl: 'https://drive.google.com/file/d/17vwx901/view' },
    { id: 3, title: 'Social Media Marketing', videoUrl: 'https://drive.google.com/file/d/18yz0234/view' },
    { id: 4, title: 'Email Marketing Strategies', videoUrl: 'https://drive.google.com/file/d/19abc567/view' },
    { id: 5, title: 'Paid Advertising Campaigns', videoUrl: 'https://drive.google.com/file/d/20def890/view' },
  ],
  'cryptocurrency-investing': [
    { id: 1, title: 'Blockchain Technology Basics', videoUrl: 'https://drive.google.com/file/d/21ghi123/view' },
    { id: 2, title: 'Understanding Cryptocurrencies', videoUrl: 'https://drive.google.com/file/d/22jkl456/view' },
    { id: 3, title: 'Crypto Wallets and Security', videoUrl: 'https://drive.google.com/file/d/23mno789/view' },
    { id: 4, title: 'Investment Strategies', videoUrl: 'https://drive.google.com/file/d/24pqr012/view' },
  ],
  'graphic-design-freelancing': [
    { id: 1, title: 'Setting Up Your Design Business', videoUrl: 'https://drive.google.com/file/d/25stu345/view' },
    { id: 2, title: 'Finding Design Clients', videoUrl: 'https://drive.google.com/file/d/26vwx678/view' },
    { id: 3, title: 'Pricing Design Projects', videoUrl: 'https://drive.google.com/file/d/27yz0901/view' },
    { id: 4, title: 'Building a Design Portfolio', videoUrl: 'https://drive.google.com/file/d/28abc234/view' },
    { id: 5, title: 'Client Management for Designers', videoUrl: 'https://drive.google.com/file/d/29def567/view' },
  ],
};

export default function CoursePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [course, setCourse] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    // Find the course by slug
    const foundCourse = courses.find((c: any) => c.slug === slug);
    if (foundCourse) {
      setCourse(foundCourse);
    }

    // Get classes for this course
    const courseClasses = classData[slug as keyof typeof classData] || [];
    setClasses(courseClasses);
  }, [slug]);

  if (!course) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-heading font-bold text-text">Course not found</h1>
          <p className="mt-4">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses" className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-accent transition-colors">
            Back to Courses
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Course Header */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  unoptimized={course.imageUrl.endsWith('.svg')}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-white">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-secondary text-primary mr-3">
                  {course.category}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full bg-white text-primary`}>
                  {course.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{course.title}</h1>
              <p className="text-secondary text-lg mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <Image
                    src="/user-avatar.svg"
                    alt={course.instructor}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <span className="block text-white font-semibold">{course.instructor}</span>
                    <span className="text-secondary text-sm">Instructor</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white">
                    {course.rating.toFixed(1)} ({course.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-secondary mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-white">{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-1 p-8">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Course Content</h2>
          
          {/* Class List */}
          <div className="space-y-4">
            {classes.map((classItem) => (
              <a 
                key={classItem.id}
                href={classItem.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-background hover:bg-gray-100 rounded-lg p-4 transition-colors border border-gray-200 hover:border-primary"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">{classItem.id}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-heading font-semibold text-text">Class {classItem.id}: {classItem.title}</h3>
                  </div>
                  <div className="flex-shrink-0">
                    <svg 
                      className="w-6 h-6 text-primary" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}