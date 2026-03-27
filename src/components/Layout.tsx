'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isHomePage={isHomePage} />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-[70px]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
