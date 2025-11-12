"use client";

import MainLayout from '@/components/layout/MainLayout';
import Calculator from '@/components/tools/Calculator';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '@/components/ui/ShareButton';

// Tool data mapping
const toolComponents: Record<string, React.ReactNode> = {
  'income-calculator': <Calculator />,
  'invoice-generator': <InvoiceGenerator />,
};

// Tool metadata
const toolMetadata: Record<string, { title: string; description: string; category: string }> = {
  'income-calculator': {
    title: 'Freelance Income Calculator',
    description: 'Calculate your potential freelance income based on your rates, hours, and expenses.',
    category: 'Calculators'
  },
  'invoice-generator': {
    title: 'Invoice Generator',
    description: 'Create professional invoices for your freelance business in seconds.',
    category: 'Freelancing'
  },
};

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const toolComponent = toolComponents[slug];
  const metadata = toolMetadata[slug] || {
    title: 'Tool Not Found',
    description: 'The requested tool could not be found.',
    category: 'Error'
  };

  if (!toolComponent) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Tool Not Found</h1>
            <p className="text-gray-600 mb-8">
              Sorry, the tool you're looking for doesn't exist or is still under development.
            </p>
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Back to Tools
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium mb-4">
              {metadata.category}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">
                {metadata.title}
              </h1>
              <ShareButton compact variant="ghost" showLabel={false} url={currentUrl} title={metadata.title} description={metadata.description} className="sm:self-end text-white hover:text-white/80" />
            </div>
            <p className="text-lg text-secondary-light">
              {metadata.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {toolComponent}
          
          <div className="mt-12 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Tools
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
