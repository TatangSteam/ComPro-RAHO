import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import CTASection from '@/components/layout/CTASection';
import Footer from '@/components/layout/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RAHO Club Premier - Ekosistem Riset Kesehatan & Pemulihan Seluler',
  description: 'RAHO Club Premier adalah ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler dengan Teknologi Nano Bubble untuk aging sehat & regenerasi tubuh alami.',
  keywords: ['RAHO Club', 'terapi nano bubble', 'pemulihan seluler', 'bioteknologi', 'kesehatan', 'regenerasi tubuh', 'wellness'],
  authors: [{ name: 'RAHO Club Premier' }],
  openGraph: {
    title: 'RAHO Club Premier - Ekosistem Riset Kesehatan & Pemulihan Seluler',
    description: 'Solusi aging sehat & regenerasi tubuh alami hingga akar masalah dengan teknologi nano bubble.',
    url: 'https://rahopremier.id',
    siteName: 'RAHO Club Premier',
    images: [
      {
        url: '/assets/icon.png',
        width: 1200,
        height: 630,
        alt: 'RAHO Club Premier Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAHO Club Premier',
    description: 'Ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler',
    images: ['/assets/icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RAHO Club Premier',
    description: 'Ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler dengan Teknologi Nano Bubble',
    url: 'https://rahopremier.id',
    logo: 'https://rahopremier.id/assets/icon.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-812-3456-7890',
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['id', 'en']
    },
    sameAs: [
      'https://www.linkedin.com/company/raho-premier/',
      'https://www.instagram.com/rahopremier/',
      'https://www.tiktok.com/@rahopremier?_r=1&_t=ZS-96s3j7lRpHb'
    ]
  };

  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans`}>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <CTASection />
        <Footer />
      </body>
    </html>
  );
}
