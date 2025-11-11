"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
// Import course data from the coursesData.ts file
import { courses } from '@/app/courses/coursesData';

// Import the class data (same as in the course page)
// Ensure this includes ALL course slugs present on the course page to avoid redirects
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
      videoUrl: 'https://drive.google.com/file/d/10abc890/view',
      textContent: 'This comprehensive guide explains how stock markets work, including exchanges, market participants, and trading mechanisms.'
    },
    { 
      id: 2, 
      title: 'Technical Analysis Basics', 
      videoUrl: 'https://drive.google.com/file/d/11def123/view',
      textContent: 'Learn the fundamentals of technical analysis, including chart patterns, indicators, and how to use them to make trading decisions.'
    },
    { 
      id: 3, 
      title: 'Fundamental Analysis', 
      videoUrl: 'https://drive.google.com/file/d/12ghi456/view',
      textContent: 'This guide covers fundamental analysis techniques for evaluating stocks, including financial statements, ratios, and company valuation methods.'
    },
    { 
      id: 4, 
      title: 'Risk Management Strategies', 
      videoUrl: 'https://drive.google.com/file/d/13jkl789/view',
      textContent: 'Learn essential risk management strategies to protect your capital and maximize returns in stock trading.'
    },
    { 
      id: 5, 
      title: 'Building a Diversified Portfolio', 
      videoUrl: 'https://drive.google.com/file/d/14mno012/view',
      textContent: 'This text guide explains the principles of portfolio diversification, asset allocation, and risk management to help you build a resilient investment portfolio.'
    },
    { 
      id: 6, 
      title: 'Advanced Trading Techniques', 
      videoUrl: 'https://drive.google.com/file/d/15pqr345/view',
      textContent: 'Explore advanced trading techniques and strategies used by professional traders to identify opportunities and maximize profits.'
    },
  ],
  'digital-marketing-essentials': [
    { 
      id: 1, 
      title: 'Digital Marketing Overview', 
      videoUrl: 'https://drive.google.com/file/d/16stu678/view',
      textContent: 'This comprehensive text guide provides an overview of digital marketing channels, strategies, and metrics to help you build an effective online presence.'
    },
    { 
      id: 2, 
      title: 'SEO Fundamentals', 
      videoUrl: 'https://drive.google.com/file/d/17vwx901/view',
      textContent: 'Learn the basics of search engine optimization, including keyword research, on-page optimization, and link building strategies in this detailed text course.'
    },
    { 
      id: 3, 
      title: 'Social Media Marketing', 
      videoUrl: 'https://drive.google.com/file/d/18yz0234/view',
      textContent: 'This guide covers social media marketing strategies across different platforms, content creation, and audience engagement techniques.'
    },
    { 
      id: 4, 
      title: 'Email Marketing Strategies', 
      videoUrl: 'https://drive.google.com/file/d/19abc567/view',
      textContent: 'This text guide covers email marketing best practices, including list building, segmentation, automation, and campaign optimization techniques.'
    },
    { 
      id: 5, 
      title: 'Paid Advertising Campaigns', 
      videoUrl: 'https://drive.google.com/file/d/20def890/view',
      textContent: 'Learn how to create and optimize paid advertising campaigns across different platforms to drive traffic and conversions.'
    },
  ],
  'cryptocurrency-investing': [
    { 
      id: 1, 
      title: 'Blockchain Technology Basics', 
      videoUrl: 'https://drive.google.com/file/d/21ghi123/view',
      textContent: 'This text course explains the fundamentals of blockchain technology, including distributed ledgers, consensus mechanisms, and smart contracts.'
    },
    { 
      id: 2, 
      title: 'Understanding Cryptocurrencies', 
      videoUrl: 'https://drive.google.com/file/d/22jkl456/view',
      textContent: 'Learn about different types of cryptocurrencies, their use cases, and how they differ from traditional currencies in this comprehensive text guide.'
    },
    { 
      id: 3, 
      title: 'Crypto Wallets and Security', 
      videoUrl: 'https://drive.google.com/file/d/23mno789/view',
      textContent: 'This guide explains different types of cryptocurrency wallets, security best practices, and how to protect your digital assets.'
    },
    { 
      id: 4, 
      title: 'Investment Strategies', 
      videoUrl: 'https://drive.google.com/file/d/24pqr012/view',
      textContent: 'This text course covers various cryptocurrency investment strategies, including dollar-cost averaging, portfolio allocation, and risk management techniques.'
    },
  ],
  'graphic-design-freelancing': [
    { 
      id: 1, 
      title: 'Setting Up Your Design Business', 
      videoUrl: 'https://drive.google.com/file/d/25stu345/view',
      textContent: 'This text guide walks you through the process of setting up your graphic design freelance business, including legal requirements, branding, and business planning.'
    },
    { 
      id: 2, 
      title: 'Finding Design Clients', 
      videoUrl: 'https://drive.google.com/file/d/26vwx678/view',
      textContent: 'Learn effective strategies for finding and attracting graphic design clients, including portfolio building, networking, and online platforms.'
    },
    { 
      id: 3, 
      title: 'Pricing Your Design Services', 
      videoUrl: 'https://drive.google.com/file/d/27yz0901/view',
      textContent: 'This guide covers different pricing models for graphic design services, how to calculate your rates, and communicating value to clients.'
    },
    { 
      id: 4, 
      title: 'Client Management for Designers', 
      videoUrl: 'https://drive.google.com/file/d/28abc234/view',
      textContent: 'Learn how to effectively manage client relationships, handle revisions, and deliver exceptional design services that lead to repeat business.'
    },
  ],
  // Added missing course slugs to keep class pages from redirecting back
  'google-digital-marketing': [
    { 
      id: 1, 
      title: 'The Digital Marketing Framework', 
      videoUrl: 'https://www.youtube.com/embed/wHJQ83kAJlM',
      textContent: 'This module introduces you to the basic concepts of digital marketing and how businesses use online tools to develop a digital marketing strategy. Learn about the main pillars of digital marketing and how to get started.'
    },
    { 
      id: 2, 
      title: 'Search Engine Optimization (SEO)', 
      videoUrl: 'https://www.youtube.com/embed/hF515-0Tduk',
      textContent: 'Learn how search engines work and how to make your website more visible in search results. This module covers keyword research, on-page optimization, and link building strategies to improve your organic search rankings.'
    },
    { 
      id: 3, 
      title: 'Search Engine Marketing (SEM)', 
      videoUrl: 'https://www.youtube.com/embed/cOTMWqwUXPU',
      textContent: 'Discover how to create effective search ad campaigns to reach potential customers. Learn about keyword selection, ad creation, bidding strategies, and campaign optimization techniques.'
    },
    { 
      id: 4, 
      title: 'Social Media Marketing', 
      videoUrl: 'https://www.youtube.com/embed/4LhDXH81whk',
      textContent: 'Explore how to use social media platforms to connect with your audience, build your brand, and drive business results. This module covers content strategy, community management, and paid social advertising.'
    },
    { 
      id: 5, 
      title: 'Analytics and Data Insights', 
      videoUrl: 'https://www.youtube.com/embed/Zn7JFZ1eDuI',
      textContent: 'Learn how to measure the success of your digital marketing efforts using analytics tools. This module covers key metrics, reporting, and how to use data to optimize your marketing strategy.'
    },
  ],
  'google-data-analytics': [
    { 
      id: 1, 
      title: 'Foundations: Data, Data, Everywhere', 
      videoUrl: 'https://www.youtube.com/embed/qcRlYt28WPM',
      textContent: 'This course is the first step in your data analytics journey. Learn how data analysts use tools like spreadsheets, SQL, R programming, and Tableau to process, analyze, and visualize data.'
    },
    { 
      id: 2, 
      title: 'Ask Questions to Make Data-Driven Decisions', 
      videoUrl: 'https://www.youtube.com/embed/FxQEwLJ5ahw',
      textContent: 'Learn how to ask effective questions and define problems to solve with data. This course covers the data analysis process and how to use structured thinking to approach data problems.'
    },
    { 
      id: 3, 
      title: 'Data Cleaning and Preparation', 
      videoUrl: 'https://www.youtube.com/embed/6gR_OP7r_5I',
      textContent: 'Discover techniques for cleaning and preparing data for analysis. This course covers data integrity, identifying and handling missing data, and transforming data for analysis.'
    },
    { 
      id: 4, 
      title: 'Data Analysis with R Programming', 
      videoUrl: 'https://www.youtube.com/embed/KlLEE-J7TxA',
      textContent: 'Learn how to use R programming for data analysis. This course covers R syntax, data structures, packages, and creating visualizations with ggplot2.'
    },
    { 
      id: 5, 
      title: 'Data Visualization and Dashboards', 
      videoUrl: 'https://www.youtube.com/embed/q2q_rP5-NJE',
      textContent: 'Master the art of data visualization and learn how to create effective dashboards. This course covers visualization principles, design thinking, and using Tableau for interactive visualizations.'
    },
  ],
  'nvidia-deep-learning': [
    { 
      id: 1, 
      title: 'Introduction to Deep Learning', 
      videoUrl: 'https://www.youtube.com/embed/6M5VXKLf4D4',
      textContent: 'This module introduces the fundamental concepts of deep learning, including neural networks, training methodologies, and applications. Learn about the history of deep learning and its recent advancements.'
    },
    { 
      id: 2, 
      title: 'Neural Network Basics', 
      videoUrl: 'https://www.youtube.com/embed/uXb3xbhPJtM',
      textContent: 'Learn about the building blocks of neural networks, including neurons, activation functions, forward and backward propagation, and optimization algorithms.'
    },
    { 
      id: 3, 
      title: 'Convolutional Neural Networks', 
      videoUrl: 'https://www.youtube.com/embed/Qwkf688-KoU',
      textContent: 'Explore convolutional neural networks (CNNs) and their applications in computer vision. This module covers convolution operations, pooling layers, and CNN architectures like AlexNet, VGG, and ResNet.'
    },
    { 
      id: 4, 
      title: 'Recurrent Neural Networks', 
      videoUrl: 'https://www.youtube.com/embed/LHXXI4-IEns',
      textContent: 'Discover recurrent neural networks (RNNs) and their applications in sequence modeling. This module covers LSTM, GRU, and attention mechanisms for natural language processing tasks.'
    },
    { 
      id: 5, 
      title: 'Generative Adversarial Networks', 
      videoUrl: 'https://www.youtube.com/embed/Sw9r8CL98N0',
      textContent: 'Learn about generative adversarial networks (GANs) and their applications in generating realistic images, videos, and other content. This module covers GAN architecture, training challenges, and recent advancements.'
    },
  ],
  'microsoft-azure-fundamentals': [
    { 
      id: 1, 
      title: 'Introduction to Cloud Computing', 
      videoUrl: 'https://www.youtube.com/embed/QYzJl0Zrc4M',
      textContent: 'This module introduces the fundamental concepts of cloud computing, including cloud service models (IaaS, PaaS, SaaS) and deployment models (public, private, hybrid). Learn about the benefits and challenges of cloud adoption.'
    },
    { 
      id: 2, 
      title: 'Azure Core Services', 
      videoUrl: 'https://www.youtube.com/embed/NKEFWyqJ5XA',
      textContent: 'Explore the core services offered by Microsoft Azure, including compute, storage, networking, and databases. This module provides an overview of virtual machines, app services, storage accounts, and Azure SQL Database.'
    },
    { 
      id: 3, 
      title: 'Azure Security and Compliance', 
      videoUrl: 'https://www.youtube.com/embed/OAbeIx9xPfU',
      textContent: 'Learn about Azure security features, identity services, and compliance offerings. This module covers Azure Active Directory, role-based access control, Azure Security Center, and compliance certifications.'
    },
    { 
      id: 4, 
      title: 'Azure Pricing and Support', 
      videoUrl: 'https://www.youtube.com/embed/NdqncsMtryY',
      textContent: 'Understand Azure pricing models, service level agreements (SLAs), and support options. This module covers subscription types, cost management tools, and Azure support plans.'
    },
    { 
      id: 5, 
      title: 'Getting Started with Azure', 
      videoUrl: 'https://www.youtube.com/embed/wG0OIz-JTbE',
      textContent: 'Learn how to create and manage resources in Azure using the Azure portal, Azure CLI, and Azure PowerShell. This module provides hands-on guidance for deploying your first resources in Azure.'
    },
  ],
};

// Function to get related courses
const getRelatedCourses = (currentCourseSlug: string) => {
  const currentCourse = courses.find(course => course.slug === currentCourseSlug);
  if (!currentCourse) return [];
  
  // Find courses in the same category
  return courses
    .filter(course => 
      course.category === currentCourse.category && 
      course.slug !== currentCourseSlug
    )
    .slice(0, 2); // Limit to 2 related courses
};

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [classItem, setClassItem] = useState<any>(null);
  const [nextClass, setNextClass] = useState<any>(null);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  
  useEffect(() => {
    if (!params.slug || !params.classId) return;
    
    // Get the course slug and class ID from the URL
    const slug = params.slug as string;
    const classId = parseInt(params.classId as string);
    
    // Find the course
    const foundCourse = courses.find(c => c.slug === slug);
    if (!foundCourse) {
      // Use replace instead of push to avoid adding to history stack
      router.replace('/courses');
      return;
    }
    setCourse(foundCourse);
    
    // Find the class
    const courseClasses = classData[slug as keyof typeof classData] || [];
    const foundClass = courseClasses.find(c => c.id === classId);
    if (!foundClass) {
      // Use replace instead of push to avoid adding to history stack
      router.replace(`/courses/${slug}`);
      return;
    }
    setClassItem(foundClass);
    
    // Find the next class
    const nextClassItem = courseClasses.find(c => c.id === classId + 1);
    setNextClass(nextClassItem);
    
    // Get related courses if this is the last class
    if (!nextClassItem) {
      setRelatedCourses(getRelatedCourses(slug));
    }
  }, [params.slug, params.classId, router]);
  
  if (!course || !classItem) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8 text-gray-500 bg-gray-50 py-3 px-4 rounded-md">
          <Link href="/courses" className="hover:text-primary transition-colors">
            Courses
          </Link>
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link href={`/courses/${course.slug}`} className="hover:text-primary transition-colors">
            {course.title}
          </Link>
          <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-primary font-medium">Class {classItem.id}</span>
        </div>
        
        {/* Class Header */}
        <div className="bg-white border-b border-gray-200 mb-8 rounded-lg shadow-sm overflow-hidden">
          <div className="max-w-4xl mx-auto py-6 px-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                Class {classItem.id} of {classData[course.slug as keyof typeof classData]?.length || 0}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{classItem.title}</h1>
            <div className="flex items-center text-gray-600">
              <Image
                src="/user-avatar.svg"
                alt={course.instructor}
                width={32}
                height={32}
                className="rounded-full mr-3"
              />
              <span className="font-medium">{course.instructor}</span>
            </div>
          </div>
        </div>
        
        {/* Class Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm mb-8">
          {/* Text Content */}
          <div className="prose max-w-none p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              {classItem.textContent}
            </p>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {nextClass ? 'Continue Learning' : 'Recommended Courses'}
          </h2>
          
          {nextClass ? (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:bg-gray-50 transition-all">
              <Link href={`/courses/${course.slug}/${nextClass.id}`} className="block">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary rounded-full p-3 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">Next: {nextClass.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Class {nextClass.id} of {classData[course.slug as keyof typeof classData]?.length || 0}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <div key={relatedCourse.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <Link href={`/courses/${relatedCourse.slug}`} className="block">
                    <div className="relative h-40">
                      <Image
                        src={relatedCourse.imageUrl || '/placeholder-course.svg'}
                        alt={relatedCourse.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-3 w-full">
                        <span className="bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-sm">
                          {relatedCourse.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{relatedCourse.title}</h3>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{relatedCourse.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-medium">
                          {relatedCourse.discountPrice ? (
                            <>
                              <span className="line-through text-gray-400 text-xs mr-1">${relatedCourse.price.toFixed(2)}</span>
                              ${relatedCourse.discountPrice.toFixed(2)}
                            </>
                          ) : (
                            `$${relatedCourse.price.toFixed(2)}`
                          )}
                        </span>
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{relatedCourse.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Back to Course Button */}
        <div className="mt-8 text-center">
          <Link 
            href={`/courses/${course.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Course
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
