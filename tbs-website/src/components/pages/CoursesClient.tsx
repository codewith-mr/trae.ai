'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCard, { CourseCardProps } from '@/components/cards/CourseCard';

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

export default function CoursesClient({ courses }: { courses: CourseCardProps[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('Most Popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredCourses, setFilteredCourses] = useState<CourseCardProps[]>(courses);
  const coursesPerPage = 4;
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newCategories = selectedCategories.includes('All')
        ? [category]
        : selectedCategories.includes(category)
          ? selectedCategories.filter(c => c !== category)
          : [...selectedCategories, category];
      setSelectedCategories(newCategories.length === 0 ? ['All'] : newCategories);
    }
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = () => {
    let result = [...courses];

    if (!selectedCategories.includes('All')) {
      result = result.filter(course => selectedCategories.includes(course.category));
    }

    if (selectedLevels.length > 0) {
      result = result.filter(course => selectedLevels.includes(course.level));
    }

    result = sortCourses(result, sortOption);

    setFilteredCourses(result);
    setCurrentPage(1);
  };

  const sortCourses = (coursesToSort: CourseCardProps[], option: string) => {
    switch (option) {
      case 'Newest':
        return [...coursesToSort].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)).reverse();
      case 'Rating':
        return [...coursesToSort].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return [...coursesToSort].sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedLevels, sortOption]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <>
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
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-1 p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold text-text mb-4">Filters</h2>

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
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-neutral-700 cursor-pointer hover:text-primary transition-colors">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

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
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-neutral-700 cursor-pointer hover:text-primary transition-colors">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-text">
                {filteredCourses.length} Courses Available
              </h2>
              <div className="flex items-center bg-white shadow-sm rounded-lg px-4 py-2">
                <label htmlFor="sort" className="mr-3 text-sm font-medium text-neutral-700 cursor-pointer hover:text-primary transition-colors">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border-none text-sm font-medium text-primary hover:text-accent focus:ring-0 focus:outline-none bg-transparent cursor-pointer transition-colors"
                >
                  <option className="text-neutral-800 hover:text-accent hover:bg-gray-50">Most Popular</option>
                  <option className="text-neutral-800 hover:text-accent hover:bg-gray-50">Newest</option>
                  <option className="text-neutral-800 hover:text-accent hover:bg-gray-50">Rating</option>
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
    </>
  );
}
