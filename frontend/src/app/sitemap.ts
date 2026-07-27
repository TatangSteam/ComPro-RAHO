import { MetadataRoute } from 'next';
import { absoluteImageUrl, getPublishedArticles, SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();
  const latestArticleUpdate = articles.reduce<Date | undefined>((latest, article) => {
    const updatedAt = new Date(article.updatedAt);
    return !latest || updatedAt > latest ? updatedAt : latest;
  }, undefined);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: latestArticleUpdate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tentang-kami`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/artikel-kesehatan`,
      lastModified: latestArticleUpdate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/artikel-kesehatan?category=penyakit`,
      lastModified: latestArticleUpdate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/artikel-kesehatan?category=tindakan-medis`,
      lastModified: latestArticleUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/artikel-kesehatan?category=kisah-pasien`,
      lastModified: latestArticleUpdate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/hubungi-kami`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/artikel-kesehatan/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: article.imageUrl ? [absoluteImageUrl(article.imageUrl)] : undefined,
  }));

  return [...staticPages, ...articlePages];
}
