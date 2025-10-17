import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Tips & Tricks | TBS',
  description: 'Learn how to access premium tools for free and other helpful tips and tricks.',
};

export default function TipsAndTricksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
      <main className="min-h-screen bg-background">
        {children}
      </main>
     
    </>
  );
}