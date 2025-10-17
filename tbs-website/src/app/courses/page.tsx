"use client";

import MainLayout from '@/components/layout/MainLayout';
import CourseCard from '@/components/cards/CourseCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { courses } from './coursesData';

// Categories for filtering
const categories = [
  'All',
  'Freelancing',
  'Content Creation',
  'Trading',
  'Marketing',
  'Investing',
];

// Levels for filtering
const levels = ['Beginner', 'Intermediate', 'Advanced'];
export default function CoursesPage() {
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(300);
  const [sortOption, setSortOption] = useState<string>('Most Popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const coursesPerPage = 4;

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      // If 'All' is selected, clear other selections
      setSelectedCategories(['All']);
    } else {
      // If 'All' was previously selected, remove it
      const newCategories = selectedCategories.includes('All')
        ? [category]
        : selectedCategories.includes(category)
          ? selectedCategories.filter(c => c !== category)
          : [...selectedCategories, category];
      
      // If no categories are selected, default to 'All'
      setSelectedCategories(newCategories.length === 0 ? ['All'] : newCategories);
    }
  };

  // Handle level filter change
  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  // Handle price range change
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(parseInt(e.target.value));
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply filters
  const applyFilters = () => {
    let result = [...courses];

    // Apply category filter
    if (!selectedCategories.includes('All')) {
      result = result.filter(course => selectedCategories.includes(course.category));
    }

    // Apply level filter
    if (selectedLevels.length > 0) {
      result = result.filter(course => selectedLevels.includes(course.level));
    }

    // Apply price filter
    result = result.filter(course => {
      const coursePrice = course.discountPrice || course.price;
      return coursePrice <= priceRange;
    });

    // Apply sorting
    result = sortCourses(result, sortOption);

    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Sort courses based on selected option
  const sortCourses = (coursesToSort: any[], option: string) => {
    switch (option) {
      case 'Newest':
        return [...coursesToSort].sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case 'Price: Low to High':
        return [...coursesToSort].sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
      case 'Price: High to Low':
        return [...coursesToSort].sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
      case 'Rating':
        return [...coursesToSort].sort((a, b) => b.rating - a.rating);
      default: // Most Popular
        return [...coursesToSort].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedLevels, priceRange, sortOption]);

  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <MainLayout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Courses That Create Real Results
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Practical, action-oriented courses designed to help you earn more income through freelancing, content creation, and investing.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-1 p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold text-text mb-4">Filters</h2>
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-text mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-neutral-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level filter */}
              <div className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-text mb-2">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`level-${level}`}
                        checked={selectedLevels.includes(level)}
                        onChange={() => handleLevelChange(level)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-neutral-700">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="text-lg font-heading font-semibold text-text mb-2">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-neutral-700">$0</span>
                  <span className="text-sm text-neutral-700">${priceRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content with courses */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text">
                {filteredCourses.length} Courses Available
              </h2>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-neutral-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md text-sm p-2 focus:ring-primary focus:border-primary"
                >
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {currentCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {currentCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-neutral-700">No courses match your filters. Try adjusting your criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md border border-gray-300 text-sm font-medium ${currentPage === 1 ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 hover:bg-gray-50'}`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-md ${currentPage === pageNum ? 'bg-primary text-white' : 'border border-gray-300 text-neutral-700 hover:bg-gray-50'} text-sm font-medium`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-3 py-2 text-sm text-neutral-700">...</span>
                  )}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-neutral-700 hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  )}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md border border-gray-300 text-sm font-medium ${currentPage === totalPages ? 'text-neutral-400 cursor-not-allowed' : 'text-neutral-700 hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}