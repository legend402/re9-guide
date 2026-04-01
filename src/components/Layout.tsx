'use client';

import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}

export default function Layout({ children, isHomePage = false }: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${!isHomePage ? 'non-homepage-bg' : ''}`}>
      <Navbar isHomePage={isHomePage} />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-[70px]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
