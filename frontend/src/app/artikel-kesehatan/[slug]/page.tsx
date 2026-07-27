import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleDetailClient from '@/components/artikel/ArticleDetailClient';
import {
  createArticleMetadata,
  createPageMetadata,
  getPublishedArticle,
  getPublishedArticles,
} from '@/lib/seo';

type ArticlePageProps = {
  params: { slug: string };
};

export const revalidate = 300;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getPublishedArticle(params.slug);
  if (!article) {
    return createPageMetadata({
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel kesehatan yang Anda cari tidak ditemukan.',
      path: `/artikel-kesehatan/${params.slug}`,
      noIndex: true,
    });
  }
  return createArticleMetadata(article);
}

export default async function ArtikelDetailPage({ params }: ArticlePageProps) {
  const [article, articles] = await Promise.all([
    getPublishedArticle(params.slug),
    getPublishedArticles(),
  ]);

  if (!article) notFound();

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const categoryDifference =
        Number(b.category === article.category) - Number(a.category === article.category);
      return categoryDifference || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <ArticleDetailClient
      initialArticle={article}
      initialRelatedArticles={relatedArticles}
    />
  );
}
