"use client";

import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for tips and tricks
const tipsAndTricks = [
  {
    id: '1',
    title: 'How to Access Premium Tools for Free',
    description: 'Learn the legitimate ways to access premium tools without paying full price, including free trials, student discounts, and open-source alternatives.',
    category: 'Tools',
    imageUrl: '/placeholder-blog.svg',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Maximize Your Productivity with These Simple Hacks',
    description: 'Discover productivity techniques that can help you get more done in less time, including time blocking, the Pomodoro technique, and effective task prioritization.',
    category: 'Productivity',
    imageUrl: '/placeholder-blog.svg',
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'SEO Tips That Actually Work in 2023',
    description: 'Cut through the noise and focus on SEO strategies that deliver real results, based on the latest algorithm updates and industry best practices.',
    category: 'SEO',
    imageUrl: '/placeholder-blog.svg',
    readTime: '10 min read',
  },
  {
    id: '4',
    title: 'Hidden Features in Popular Design Tools',
    description: 'Uncover powerful but lesser-known features in tools like Figma, Adobe XD, and Sketch that can dramatically improve your design workflow.',
    category: 'Design',
    imageUrl: '/placeholder-blog.svg',
    readTime: '6 min read',
  },
  {
    id: '5',
    title: 'Tax Deductions Every Freelancer Should Know',
    description: 'Don\'t leave money on the table! Learn about tax deductions that can save freelancers thousands of dollars each year.',
    category: 'Finance',
    imageUrl: '/placeholder-blog.svg',
    readTime: '8 min read',
  },
  {
    id: '6',
    title: 'Build a Professional Portfolio Website for Free',
    description: 'Step-by-step guide to creating an impressive portfolio website without spending a dime, using free tools and platforms.',
    category: 'Web Development',
    imageUrl: '/placeholder-blog.svg',
    readTime: '12 min read',
  },
];

// Categories for filtering
const categories = [
  'All',
  'Tools',
  'Productivity',
  'SEO',
  'Design',
  'Finance',
  'Web Development',
];

export default function TipsAndTricksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTips, setFilteredTips] = useState(tipsAndTricks);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      setFilteredTips(
        tipsAndTricks.filter(tip => 
          tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          tip.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTips(
        tipsAndTricks.filter(tip => 
          tip.category === category && 
          (tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          tip.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    }
  };

  // Handle search (submit-only)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    if (selectedCategory === 'All') {
      setFilteredTips(
        tipsAndTricks.filter(tip => 
          tip.title.toLowerCase().includes(query) || 
          tip.description.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredTips(
        tipsAndTricks.filter(tip => 
          tip.category === selectedCategory && 
          (tip.title.toLowerCase().includes(query) || 
          tip.description.toLowerCase().includes(query))
        )
      );
    }
  };

  return (
    <MainLayout>
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-r from-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl text-secondary md:text-5xl font-heading font-bold mb-6">
              Tips & Tricks to Accelerate Your Success
            </h1>
            <p className="text-xl text-secondary-light mb-8">
              Practical advice, insider knowledge, and clever hacks to help you work smarter, not harder.
            </p>
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for tips..."
                className="w-full px-6 py-4 rounded-full text-text border-none focus:ring-2 focus:ring-secondary"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent text-white p-3 rounded-full hover:bg-secondary-dark transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Grid Card Section with 4 cards per row */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-heading font-bold text-center mb-8 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Featured Tips & Tricks</span>
          <div className="absolute w-24 h-1 bg-secondary mx-auto bottom-0 left-1/2 transform -translate-x-1/2 -mb-2"></div>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tipsAndTricks.slice(0, 4).map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/30 z-10"></div>
                <Image
                  src={tip.imageUrl}
                  alt={tip.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {tip.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-text mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {tip.title}
                </h3>
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {tip.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-neutral-500">{tip.readTime}</span>
                  <Link 
                    href={`/tips-tricks/${tip.id}`}
                    className="text-primary font-semibold hover:text-secondary transition-colors flex items-center group"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Tip */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-text mb-8 text-center">Featured Tip</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src="/placeholder-blog.svg"
                  alt="Featured tip"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-medium mb-4">
                  {tipsAndTricks[0].category}
                </span>
                <h3 className="text-2xl font-heading font-bold text-text mb-4">
                  {tipsAndTricks[0].title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {tipsAndTricks[0].description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">{tipsAndTricks[0].readTime}</span>
                  <Link
                    href={`/tips-tricks/${tipsAndTricks[0].id}`}
                    className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Tips Grid */}
        <div>
          <h2 className="text-3xl font-heading font-bold text-text mb-8 text-center">All Tips & Tricks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={tip.imageUrl}
                    alt={tip.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-medium mb-3">
                    {tip.category}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-text mb-3 line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {tip.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">{tip.readTime}</span>
                    <Link
                      href={`/tips-tricks/${tip.id}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-neutral-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Get Weekly Tips & Tricks</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
            Subscribe to our newsletter and receive the latest tips, tricks, and exclusive content directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:ring-primary focus:border-primary"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
