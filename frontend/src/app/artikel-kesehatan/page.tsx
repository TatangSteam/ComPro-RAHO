import type { Metadata } from 'next';
import ArticleListingClient from '@/components/artikel/ArticleListingClient';
import { createPageMetadata, getPublishedArticles } from '@/lib/seo';

export const revalidate = 300;

const categorySeo = {
  penyakit: {
    title: 'Artikel Penyakit dan Pencegahan',
    description:
      'Pelajari informasi penyakit, faktor risiko, pencegahan, dan pendekatan pemulihan kesehatan dari RAHO Premier.',
  },
  'tindakan-medis': {
    title: 'Teknologi dan Tindakan Medis',
    description:
      'Pelajari teknologi Nano Bubble, inovasi kesehatan, dan tindakan medis yang dibahas oleh RAHO Premier.',
  },
  'kisah-pasien': {
    title: 'Kisah Inspiratif Member RAHO Premier',
    description:
      'Baca pengalaman dan perjalanan kesehatan inspiratif dari member dan komunitas RAHO Premier.',
  },
} as const;

type ListingPageProps = {
  searchParams?: { category?: string };
};

export function generateMetadata({ searchParams }: ListingPageProps): Metadata {
  const category = searchParams?.category as keyof typeof categorySeo | undefined;
  const selected = category ? categorySeo[category] : undefined;
  return createPageMetadata({
    title: selected?.title ?? 'Artikel Kesehatan, Teknologi, dan Kisah Inspiratif',
    description:
      selected?.description ??
      'Temukan artikel kesehatan terpercaya tentang penyakit, tindakan medis, teknologi Nano Bubble, dan kisah inspiratif dari RAHO Premier.',
    path: selected ? `/artikel-kesehatan?category=${category}` : '/artikel-kesehatan',
  });
}

export default async function ArtikelKesehatanPage(_: ListingPageProps) {
  const articles = await getPublishedArticles();
  return <ArticleListingClient initialArticles={articles} />;
}
