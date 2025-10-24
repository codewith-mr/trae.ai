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
  format?: 'video' | 'text';
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
  format = 'video',
}: CourseCardProps) => {
  // Generate level badge color
  const levelColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-purple-100 text-purple-800',
  }[level];
  
  // Format badge color and icon
  const formatColor = format === 'video' 
    ? 'bg-blue-100 text-blue-800' 
    : 'bg-amber-100 text-amber-800';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-1 transition-shadow hover:shadow-2 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative h-44 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized={imageUrl.endsWith('.svg')}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-primary">
            {category}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center ${formatColor}`}>
            {format === 'video' ? (
              <>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Video
              </>
            ) : (
              <>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                </svg>
                Text
              </>
            )}
          </span>
        </div>
        
        {/* Free Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd"></path>
            </svg>
            Free
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-heading font-bold text-text mb-2">{title}</h3>
        <p className="text-neutral-600 mb-4 text-sm line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <Image
              src="/user-avatar.svg"
              alt={instructor}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <span className="text-sm text-neutral-700">{instructor}</span>
          </div>

          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${levelColor}`}>
            {level}
          </span>
        </div>
      </div>

      {/* Call to Action */}
      <Link
        href={`/courses/${slug}`}
        className="block bg-primary text-white text-center py-3 font-semibold hover:bg-accent transition-colors"
      >
        Enroll Now
      </Link>
    </div>
  );
};

export default CourseCard;