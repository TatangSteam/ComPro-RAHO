import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Artikel Kesehatan, Teknologi, dan Kisah Inspiratif',
  description:
    'Temukan artikel kesehatan terpercaya tentang penyakit, tindakan medis, teknologi Nano Bubble, dan kisah inspiratif dari RAHO Premier.',
  path: '/artikel-kesehatan',
});

export default function ArtikelKesehatanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
