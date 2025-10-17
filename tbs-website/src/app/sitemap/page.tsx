import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | TBS',
  description: 'Navigate our website with ease using our sitemap.',
};

const SitemapPage = () => {
  // Define categories with their icons
  const categories = [
    {
      title: "Main Pages",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Legal Pages",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms-of-service" }
      ]
    },
    {
      title: "Services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      links: [
        { name: "Business Consulting", path: "/services/business-consulting" },
        { name: "Financial Planning", path: "/services/financial-planning" },
        { name: "Marketing Strategy", path: "/services/marketing-strategy" },
        { name: "Digital Transformation", path: "/services/digital-transformation" }
      ]
    },
    {
      title: "Resources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Case Studies", path: "/resources/case-studies" },
        { name: "Downloads", path: "/resources/downloads" },
        { name: "FAQ", path: "/faq" }
      ]
    }
  ];

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-heading font-bold text-primary mb-4">Sitemap</h1>
            <p className="text-lg text-neutral-600 mb-6">
              Find everything you need on our website with this comprehensive sitemap
            </p>
            <div className="flex justify-center">
              <div className="bg-primary/20 w-24 h-1 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-primary/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-6 border border-neutral-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-heading font-semibold text-primary">{category.title}</h2>
                  </div>
                  
                  <ul className="space-y-3 pl-11">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="group">
                        <Link 
                          href={link.path} 
                          className="flex items-center text-text group-hover:text-primary transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional Navigation Help */}
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
            <div className="flex items-center mb-4">
              <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-heading font-semibold text-primary">Need Help?</h2>
            </div>
            <p className="text-neutral-700 pl-11">
              Can't find what you're looking for? Visit our <Link href="/faq" className="text-primary hover:underline">FAQ page</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SitemapPage;