'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageLightbox from '@/components/Shared/ImageLightbox';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMicrosite = pathname === '/microsite';
  const isAdmin = pathname?.startsWith('/admin');
  const isHome = pathname === '/';

  // Microsite: no navbar, no CTA, no footer
  if (isMicrosite) {
    return (
      <>
        {children}
        <ImageLightbox />
      </>
    );
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

  // Home uses its own snap-scroll viewport, so avoid adding extra content below it.
  if (isHome) {
    return (
      <>
        <Navbar />
        {children}
        <ImageLightbox />
      </>
    );
  }

  // Regular pages: full layout
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ImageLightbox />
    </>
  );
}
