import type { ReactNode } from 'react';
import CookieBanner from '@/components/shared/CookieBanner';
import Footer from '@/components/shared/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="pt-[73px]">
        {children}
      </div>
      <Footer />
      <CookieBanner />
    </div>
  );
}

