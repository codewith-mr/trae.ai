"use client";

import MainLayout from '@/components/layout/MainLayout';
import { tipsAndTricks } from '../tipsData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TipPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tip, setTip] = useState<any>(null);
  
  useEffect(() => {
    // Find the tip with the matching slug
    const foundTip = tipsAndTricks.find(tip => tip.slug === slug);
    setTip(foundTip);
  }, [slug]);

  if (!tip) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Tip Not Found</h1>
            <p className="text-gray-600 mb-8">
              Sorry, the tip you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/tips-tricks"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Back to Tips & Tricks
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-sm text-gray-700 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link href="/tips-tricks" className="text-sm text-gray-700 hover:text-primary ml-1 md:ml-2">
                    Tips & Tricks
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="text-sm text-gray-500 ml-1 md:ml-2">{tip.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Tip Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-medium mr-3">
              {tip.category}
            </span>
            <span className="text-sm text-gray-500">{tip.readTime}</span>
          </div>
          <h1 className="text-4xl font-heading font-bold text-text mb-6">{tip.title}</h1>
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={tip.imageUrl}
              alt={tip.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tip Content */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-lg prose-p:leading-relaxed prose-li:text-lg prose-li:my-1 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: tip.content }}
          />
        </div>

        {/* Related Tips */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold text-text mb-6">Related Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(() => {
              // First try to get tips from the same category
              let relatedTips = tipsAndTricks
                .filter(relatedTip => relatedTip.slug !== tip.slug && relatedTip.category === tip.category);
              
              // If we don't have enough tips from the same category, add other tips
              if (relatedTips.length < 3) {
                const otherTips = tipsAndTricks
                  .filter(relatedTip => relatedTip.slug !== tip.slug && relatedTip.category !== tip.category)
                  .slice(0, 3 - relatedTips.length);
                
                relatedTips = [...relatedTips, ...otherTips];
              }
              
              return (
                <>
                  {relatedTips.slice(0, 3).map(relatedTip => (
                    <Link 
                      key={relatedTip.id} 
                      href={`/tips-tricks/${relatedTip.slug}`}
                      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={relatedTip.imageUrl}
                          alt={relatedTip.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-medium mb-3">
                          {relatedTip.category}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-text mb-2">{relatedTip.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{relatedTip.description}</p>
                        <span className="text-sm text-gray-500">{relatedTip.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}