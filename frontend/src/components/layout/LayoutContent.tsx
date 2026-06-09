'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import CTASection from './CTASection';
import Footer from './Footer';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMicrosite = pathname === '/microsite';
  const isAdmin = pathname?.startsWith('/admin');

  // Microsite: no navbar, no CTA, no footer
  if (isMicrosite) {
    return <>{children}</>;
  }

  // Admin pages: no CTA section
  if (isAdmin) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  // Regular pages: full layout
  return (
    <>
      <Navbar />
      {children}
      <CTASection />
      <Footer />
    </>
  );
}
