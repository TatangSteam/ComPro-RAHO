import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import LayoutContent from '@/components/layout/LayoutContent';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rahopremier.id'),
  title: {
    default: 'RAHO Premier - Ekosistem Riset Kesehatan & Pemulihan Seluler',
    template: '%s | RAHO Premier',
  },
  description: 'RAHO Club Premier adalah ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler dengan Teknologi Nano Bubble untuk aging sehat & regenerasi tubuh alami.',
  keywords: ['RAHO Club', 'terapi nano bubble', 'pemulihan seluler', 'bioteknologi', 'kesehatan', 'regenerasi tubuh', 'wellness'],
  authors: [{ name: 'RAHO Club Premier' }],
  creator: 'RAHO Premier',
  publisher: 'RAHO Premier',
  alternates: {
    canonical: 'https://rahopremier.id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/assets/icon.png',
    apple: '/assets/LOGORAHO.png',
  },
  openGraph: {
    title: 'RAHO Club Premier - Ekosistem Riset Kesehatan & Pemulihan Seluler',
    description: 'Solusi aging sehat & regenerasi tubuh alami hingga akar masalah dengan teknologi nano bubble.',
    url: 'https://rahopremier.id',
    siteName: 'RAHO Club Premier',
    images: [
      {
        url: '/assets/cta-background.jpg',
        width: 1200,
        height: 630,
        alt: 'RAHO Premier',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAHO Club Premier',
    description: 'Ekosistem riset kesehatan & pemulihan seluler berbasis bioteknologi molekuler',
    images: ['/assets/cta-background.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://rahopremier.id/#organization',
        name: 'RAHO Premier',
        description:
          'Ekosistem riset kesehatan dan pemulihan seluler berbasis bioteknologi molekuler dengan Teknologi Nano Bubble.',
        url: 'https://rahopremier.id',
        logo: {
          '@type': 'ImageObject',
          url: 'https://rahopremier.id/assets/LOGORAHO.png',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+62-851-3622-2772',
          contactType: 'customer service',
          areaServed: 'ID',
          availableLanguage: ['id'],
        },
        sameAs: [
          'https://www.linkedin.com/company/raho-premier/',
          'https://www.instagram.com/rahopremier/',
          'https://www.tiktok.com/@rahopremier_?is_from_webapp=1&sender_device=pc',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://rahopremier.id/#website',
        url: 'https://rahopremier.id',
        name: 'RAHO Premier',
        inLanguage: 'id-ID',
        publisher: { '@id': 'https://rahopremier.id/#organization' },
      },
    ],
  };

  return (
    <html lang="id">
      <body className={`${poppins.variable} font-sans`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EL5D2YY7PQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EL5D2YY7PQ');
          `}
        </Script>

        {/* Structured Data (Schema.org) */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
