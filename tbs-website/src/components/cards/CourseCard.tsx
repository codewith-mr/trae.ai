import Image from 'next/image';
import Link from 'next/link';

export interface CourseCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
}

const CourseCard = ({
  slug,
  title,
  description,
  instructor,
  level,
  duration,
  price,
  discountPrice,
  rating,
  reviewCount,
  imageUrl,
  category,
}: CourseCardProps) => {
  // Generate level badge color
  const levelColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  }[level];

  // Price and duration removed from UI based on design update

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-1 transition-shadow hover:shadow-2 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized={imageUrl.endsWith('.svg')}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-primary">
            {category}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelColor}`}>
            {level}
          </span>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-semibold text-text">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-heading font-bold text-text mb-1">{title}</h3>
        <p className="text-neutral-700 mb-3 text-sm line-clamp-2">{description}</p>

        <div className="flex items-center mb-4">
          <Image
            src="/user-avatar.svg"
            alt={instructor}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <span className="text-sm text-neutral-700">{instructor}</span>
        </div>
        {/* Price and duration section removed for cleaner design */}
      </div>

      {/* Call to Action */}
      <div className="px-5 pb-5">
        <Link
          href={`/courses/${slug}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors font-body font-semibold text-sm"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
