import Image from 'next/image';
import Link from 'next/link';

export interface ToolCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  toolUrl?: string;
}

const ToolCard = ({
  slug,
  title,
  description,
  category,
  imageUrl,
  isPopular = false,
  isNew = false,
  isFree = true,
  toolUrl,
}: ToolCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-1 transition-shadow hover:shadow-2 flex flex-col h-full">
      {/* Tool Image */}
      <div className="relative h-40 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized={imageUrl.endsWith('.svg')}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {isNew && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-white">
              New
            </span>
          )}
          {isPopular && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent text-white">
              Popular
            </span>
          )}
          {isFree && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-primary">
              Free
            </span>
          )}
        </div>
      </div>

      {/* Tool Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-semibold text-neutral-600">{category}</span>
        </div>
        
        <Link href={`/tools/${slug}`} prefetch={false} className="group">
          <h3 className="text-xl font-heading font-bold text-text mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 mb-6 text-sm line-clamp-3 flex-grow">{description}</p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between">
          <Link
            href={toolUrl || `/tools/${slug}`}
            prefetch={false}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors font-body font-semibold text-sm"
          >
            Use Tool
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
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
      </div>
    </div>
  );
};

export default ToolCard;
