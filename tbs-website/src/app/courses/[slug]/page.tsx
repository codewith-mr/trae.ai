"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
// Import course data from the coursesData.ts file
import { courses } from '@/app/courses/coursesData';

// Mock course data with single format per course
const courseFormats = {
  'freelance-web-development': {
    format: 'video'
  },
  'youtube-growth-strategy': {
    format: 'text'
  },
  'stock-trading-fundamentals': {
    format: 'video'
  },
  'digital-marketing-essentials': {
    format: 'text'
  },
  'cryptocurrency-investing': {
    format: 'video'
  },
  'graphic-design-freelancing': {
    format: 'text'
  }
};

// Mock class data - in a real app, this would come from an API
const classData = {
  'freelance-web-development': [
    { 
      id: 1, 
      title: 'Introduction to Freelance Web Development', 
      videoUrl: 'https://drive.google.com/file/d/1abc123/view',
      textContent: 'This is the text version of the Introduction to Freelance Web Development course. It covers all the basics you need to know to get started as a freelance web developer.'
    },
    { 
      id: 2, 
      title: 'Finding Your First Clients', 
      videoUrl: 'https://drive.google.com/file/d/2def456/view',
      textContent: 'Learn effective strategies for finding and securing your first clients as a freelance web developer. This text course covers networking, online platforms, and pitching techniques.'
    },
    { 
      id: 3, 
      title: 'Pricing Your Services', 
      videoUrl: 'https://drive.google.com/file/d/3ghi789/view',
      textContent: 'This text guide explains how to price your web development services competitively while ensuring profitability. Learn about hourly vs. project-based pricing and value-based pricing models.'
    },
    { 
      id: 4, 
      title: 'Building a Portfolio', 
      videoUrl: 'https://drive.google.com/file/d/4jkl012/view',
      textContent: 'This text guide walks you through the process of building an effective portfolio that showcases your web development skills and attracts potential clients.'
    },
    { 
      id: 5, 
      title: 'Client Communication', 
      videoUrl: 'https://drive.google.com/file/d/5mno345/view',
      textContent: 'Effective client communication is essential for successful freelancing. This text course covers communication tools, setting expectations, and handling difficult conversations.'
    },
  ],
  'youtube-growth-strategy': [
    { 
      id: 1, 
      title: 'YouTube Algorithm Basics', 
      videoUrl: 'https://drive.google.com/file/d/6pqr678/view',
      textContent: 'Understanding the YouTube algorithm is crucial for channel growth. This text guide explains how the algorithm works and how to optimize your content for better visibility.'
    },
    { 
      id: 2, 
      title: 'Content Strategy for Growth', 
      videoUrl: 'https://drive.google.com/file/d/7stu901/view',
      textContent: 'Develop a content strategy that drives channel growth. This text guide covers content pillars, audience research, and content calendars.'
    },
    { 
      id: 3, 
      title: 'Thumbnail and Title Optimization', 
      videoUrl: 'https://drive.google.com/file/d/8vwx234/view',
      textContent: 'Learn how to create compelling thumbnails and titles that drive clicks and views. This text course covers design principles, psychology, and A/B testing strategies.'
    },
    { 
      id: 4, 
      title: 'Audience Engagement Tactics', 
      videoUrl: 'https://drive.google.com/file/d/9yz0567/view',
      textContent: 'Engaging with your audience is key to building a loyal community. This text guide covers comment strategies, community posts, and other engagement techniques.'
    },
  ],
  'stock-trading-fundamentals': [
    { 
      id: 1, 
      title: 'Understanding the Stock Market', 
      videoUrl: 'https://drive.google.com/file/d/10abc890/view'
    },
    { 
      id: 2, 
      title: 'Technical Analysis Basics', 
      videoUrl: 'https://drive.google.com/file/d/11def123/view'
    },
    { 
      id: 3, 
      title: 'Fundamental Analysis', 
      videoUrl: 'https://drive.google.com/file/d/12ghi456/view'
    },
    { 
      id: 4, 
      title: 'Risk Management Strategies', 
      videoUrl: 'https://drive.google.com/file/d/13jkl789/view',
      hasTextContent: false
    },
    { 
      id: 5, 
      title: 'Building a Diversified Portfolio', 
      videoUrl: 'https://drive.google.com/file/d/14mno012/view',
      hasTextContent: true,
      textContent: 'This text guide explains the principles of portfolio diversification, asset allocation, and risk management to help you build a resilient investment portfolio.'
    },
    { 
      id: 6, 
      title: 'Advanced Trading Techniques', 
      videoUrl: 'https://drive.google.com/file/d/15pqr345/view',
      hasTextContent: false
    },
  ],
  'digital-marketing-essentials': [
    { 
      id: 1, 
      title: 'Digital Marketing Overview', 
      videoUrl: 'https://drive.google.com/file/d/16stu678/view',
      hasTextContent: true,
      textContent: 'This comprehensive text guide provides an overview of digital marketing channels, strategies, and metrics to help you build an effective online presence.'
    },
    { 
      id: 2, 
      title: 'SEO Fundamentals', 
      videoUrl: 'https://drive.google.com/file/d/17vwx901/view',
      hasTextContent: true,
      textContent: 'Learn the basics of search engine optimization, including keyword research, on-page optimization, and link building strategies in this detailed text course.'
    },
    { 
      id: 3, 
      title: 'Social Media Marketing', 
      videoUrl: 'https://drive.google.com/file/d/18yz0234/view',
      hasTextContent: false
    },
    { 
      id: 4, 
      title: 'Email Marketing Strategies', 
      videoUrl: 'https://drive.google.com/file/d/19abc567/view',
      hasTextContent: true,
      textContent: 'This text guide covers email marketing best practices, including list building, segmentation, automation, and campaign optimization techniques.'
    },
    { 
      id: 5, 
      title: 'Paid Advertising Campaigns', 
      videoUrl: 'https://drive.google.com/file/d/20def890/view',
      hasTextContent: false
    },
  ],
  'cryptocurrency-investing': [
    { 
      id: 1, 
      title: 'Blockchain Technology Basics', 
      videoUrl: 'https://drive.google.com/file/d/21ghi123/view',
      hasTextContent: true,
      textContent: 'This text course explains the fundamentals of blockchain technology, including distributed ledgers, consensus mechanisms, and smart contracts.'
    },
    { 
      id: 2, 
      title: 'Understanding Cryptocurrencies', 
      videoUrl: 'https://drive.google.com/file/d/22jkl456/view',
      hasTextContent: true,
      textContent: 'Learn about different types of cryptocurrencies, their use cases, and how they differ from traditional currencies in this comprehensive text guide.'
    },
    { 
      id: 3, 
      title: 'Crypto Wallets and Security', 
      videoUrl: 'https://drive.google.com/file/d/23mno789/view',
      hasTextContent: false
    },
    { 
      id: 4, 
      title: 'Investment Strategies', 
      videoUrl: 'https://drive.google.com/file/d/24pqr012/view',
      hasTextContent: true,
      textContent: 'This text course covers various cryptocurrency investment strategies, including dollar-cost averaging, portfolio allocation, and risk management techniques.'
    },
  ],
  'graphic-design-freelancing': [
    { 
      id: 1, 
      title: 'Setting Up Your Design Business', 
      videoUrl: 'https://drive.google.com/file/d/25stu345/view',
      hasTextContent: true,
      textContent: 'This text guide walks you through the process of setting up your graphic design freelance business, including legal requirements, branding, and business planning.'
    },
    { 
      id: 2, 
      title: 'Finding Design Clients', 
      videoUrl: 'https://drive.google.com/file/d/26vwx678/view',
      hasTextContent: false
    },
    { 
      id: 3, 
      title: 'Pricing Design Projects', 
      videoUrl: 'https://drive.google.com/file/d/27yz0901/view',
      hasTextContent: true,
      textContent: 'Learn how to price your graphic design services competitively while ensuring profitability. This text course covers different pricing models and negotiation strategies.'
    },
    { 
      id: 4, 
      title: 'Building a Design Portfolio', 
      videoUrl: 'https://drive.google.com/file/d/28abc234/view',
      hasTextContent: true,
      textContent: 'This comprehensive text guide explains how to create an effective design portfolio that showcases your skills and attracts potential clients.'
    },
    { 
      id: 5, 
      title: 'Client Management for Designers', 
      videoUrl: 'https://drive.google.com/file/d/29def567/view',
      hasTextContent: false
    },
  ],
};

export default function CoursePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [course, setCourse] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [courseFormat, setCourseFormat] = useState<'video' | 'text'>('video');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [expandedTextClass, setExpandedTextClass] = useState<number | null>(null);

  useEffect(() => {
    // Find the course by slug
    const foundCourse = courses.find((c: any) => c.slug === slug);
    if (foundCourse) {
      setCourse(foundCourse);
      // Set course format from course data
      setCourseFormat(foundCourse.format || 'video');
    }

    // Get classes for this course
    const courseClasses = classData[slug as keyof typeof classData] || [];
    setClasses(courseClasses);
  }, [slug]);

  // Function to get next class recommendation
  const getNextClass = (currentClassId: number) => {
    const nextClassId = currentClassId + 1;
    return classes.find(c => c.id === nextClassId);
  };

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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary">Course Content</h2>
            
            {/* Format Badge */}
            <div className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center ${
              courseFormat === 'video' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {courseFormat === 'video' ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  Video Course
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                  </svg>
                  Text Course
                </>
              )}
            </div>
          </div>

          {/* Class List */}
          <div className="space-y-4">
            {classes.map((classItem) => (
              <div 
                key={classItem.id} 
                className={`border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors ${
                  courseFormat === 'text' ? 'cursor-pointer' : ''
                }`}
                onClick={() => {
                  if (courseFormat === 'text') {
                    setExpandedTextClass(expandedTextClass === classItem.id ? null : classItem.id);
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-text">
                    {classItem.id}. {classItem.title}
                  </h3>
                  
                  {/* Content Access */}
                  <div>
                    {courseFormat === 'video' && classItem.videoUrl && (
                      <a 
                        href={classItem.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-accent"
                      >
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                        </svg>
                        Watch Video
                      </a>
                    )}
                    {courseFormat === 'text' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedTextClass(expandedTextClass === classItem.id ? null : classItem.id);
                        }}
                        className="inline-flex items-center text-primary hover:text-accent"
                      >
                        {expandedTextClass === classItem.id ? (
                          <>
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            Hide Content
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                            </svg>
                            Read Content
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Text Content Display for text courses */}
                {courseFormat === 'text' && expandedTextClass === classItem.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-neutral-700">{classItem.textContent || "Text content for this lesson is being prepared."}</p>
                    
                    {/* Next Class Recommendation */}
                    {getNextClass(classItem.id) && (
                      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white">
                        <h4 className="font-semibold text-primary mb-2">Next Recommended Class</h4>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4">
                            <span className="font-bold">{getNextClass(classItem.id)?.id}</span>
                          </div>
                          <div>
                            <p className="font-medium">{getNextClass(classItem.id)?.title}</p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTextClass(getNextClass(classItem.id)?.id || null);
                              }}
                              className="text-sm text-primary hover:text-accent mt-1 inline-flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                              </svg>
                              Continue to this class
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}