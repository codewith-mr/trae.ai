import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundClass?: string;
}

const Hero = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundClass = 'bg-gradient-to-r from-primary to-accent',
}: HeroProps) => {
  return (
    <section className={`${backgroundClass} py-20 px-4`}>
      <div className="container mx-auto flex flex-col items-center text-center">
       
        <h1 className="text-white font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl">
          {title}
        </h1>
        <p className="text-secondary font-body text-xl md:text-2xl mb-4 max-w-2xl">
          {subtitle}
        </p>
        <img src="/tagline.png" alt="TBS Tagline" className="w-48 mb-6" />
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={ctaLink}
            className="px-8 py-3 bg-secondary text-primary rounded-md hover:bg-white transition-colors font-body font-bold text-lg"
          >
            {ctaText}
          </Link>
          {secondaryCtaText && secondaryCtaLink && (
            <Link
              href={secondaryCtaLink}
              className="px-8 py-3 bg-transparent border-2 border-secondary text-white rounded-md hover:bg-accent transition-colors font-body font-bold text-lg"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;