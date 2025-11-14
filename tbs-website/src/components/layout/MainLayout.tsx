import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { prisma } from '@/lib/prisma';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const settings = await prisma.siteSettings.findFirst({ where: { id: 1 } });
  const logoUrl = settings?.logoUrl || '/primary2.png';
  return (
    <div className="flex flex-col min-h-screen">
      <Header logoUrl={logoUrl} />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
