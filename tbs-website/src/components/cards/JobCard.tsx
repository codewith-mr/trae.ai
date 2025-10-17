import Image from 'next/image';
import { useState } from 'react';

export interface JobCardProps {
  id: string;
  company: string;
  companyLogo: string;
  title: string;
  postedTime: string;
  tags: string[];
  salary: string;
  location: string;
  url: string;
}

const JobCard = ({
  company,
  companyLogo,
  title,
  postedTime,
  tags,
  salary,
  location,
  url,
}: JobCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-1 transition-shadow hover:shadow-2 p-6">
      <div className="flex justify-between items-start mb-4">
        {/* Company Logo - Circular */}
        <div className="flex items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
            <Image
              src={companyLogo}
              alt={`${company} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-neutral-700 font-body font-semibold">{company}</span>
              <span className="text-neutral-500 text-sm ml-2">{postedTime}</span>
            </div>
            <h3 className="text-lg font-heading font-bold text-text mt-1">{title}</h3>
          </div>
        </div>

        {/* Bookmark Button - Gray */}
        <button
          onClick={toggleSave}
          className="text-neutral-500 hover:text-primary transition-colors"
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
        >
          {isSaved ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          )}
        </button>
      </div>

      {/* Tags - Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Salary and Location */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-neutral-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-primary"
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
          <span className="font-semibold">{salary}</span>
        </div>
        <div className="flex items-center text-neutral-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{location}</span>
        </div>
      </div>

      {/* Apply Button - Black */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-text text-white text-center py-3 rounded-md font-semibold hover:bg-accent transition-colors"
      >
        Apply Now
      </a>
    </div>
  );
};

export default JobCard;