import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export const metadata = {
  title: 'Sitemap | TBS',
  description: 'Navigate our website with ease using our sitemap.',
};

const SitemapPage = () => {
  // (Removed legacy categories with icons — now using simplified sections below)

  // Cleaner sections aligned with footer links
  const sections = [
    {
      title: 'Main',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'Blog', path: '/blog' },
        { name: 'Tools', path: '/tools' },
        { name: 'Tips & Tricks', path: '/tips-tricks' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Community', path: '/community' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' },
      ],
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section (match Terms of Service palette) */}
      <div className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Sitemap</h1>
            <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Explore all key destinations across the site.
            </p>
            <div className="mt-8 inline-flex items-center justify-center px-4 py-2 bg-white bg-opacity-10 rounded-full text-secondary backdrop-blur-sm">
              Site Overview
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 -mt-16 relative z-20 border border-neutral-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-heading font-semibold text-primary mb-3">{section.title}</h2>
                <ul className="space-y-2" aria-label={section.title + ' links'}>
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link href={link.path} className="inline-flex items-center text-neutral-800 hover:text-primary transition-colors">
                        <span className="mr-2">→</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Navigation Help */}
          <div className="mt-10 bg-primary bg-opacity-5 rounded-lg p-6 border border-primary border-opacity-10">
            <h2 className="text-xl font-heading font-semibold text-primary mb-2">Need Help?</h2>
            <p className="text-neutral-700">
              Cannot find what you are looking for? Visit our <Link href="/faq" className="text-primary hover:underline">FAQ page</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SitemapPage;
