import type { Metadata } from 'next';
import type { Article } from '@/types';
import { getArticleSummary } from '@/lib/articleMeta';

export const SITE_URL = 'https://rahopremier.id';
export const SITE_NAME = 'RAHO Premier';
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? `${SITE_URL}/api`;
export const API_URL = process.env.API_URL ?? PUBLIC_API_URL;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/cta-background.jpg`;

export function absoluteImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${PUBLIC_API_URL.replace(/\/api\/?$/, '')}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/articles`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const articles = (await response.json()) as Article[];
    return articles.filter((article) => article.published);
  } catch {
    return [];
  }
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  const response = await fetch(`${API_URL}/articles/${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Gagal mengambil artikel dari API (status ${response.status})`);
  }

  const article = (await response.json()) as Article;
  return article.published ? article : null;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'id_ID',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function createArticleMetadata(article: Article): Metadata {
  const description = getArticleSummary(article).slice(0, 160);
  const canonical = `${SITE_URL}/artikel-kesehatan/${article.slug}`;
  const image = absoluteImageUrl(article.imageUrl);
  return {
    title: article.title,
    description,
    authors: [{ name: article.author || SITE_NAME }],
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'id_ID',
      type: 'article',
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author || SITE_NAME],
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [image],
    },
  };
}
