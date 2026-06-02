import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rahopremier.id';
  
  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel-kesehatan`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lokasi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partnership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Note: In production, you would fetch actual articles from your API
  // For now, we'll just include the article listing page
  // To add dynamic article URLs, you would do something like:
  // const articles = await fetch(`${baseUrl}/api/articles`).then(r => r.json());
  // const articlePages = articles.map(article => ({
  //   url: `${baseUrl}/artikel-kesehatan/${article.slug}`,
  //   lastModified: new Date(article.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }));

  return staticPages;
}
