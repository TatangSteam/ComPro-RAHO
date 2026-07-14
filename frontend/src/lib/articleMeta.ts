import { stripHtml } from '@/lib/sanitizeHtml';

export const ARTICLE_CATEGORIES = [
  {
    value: 'semua',
    label: 'Semua',
    description: 'Seluruh artikel kesehatan',
  },
  {
    value: 'penyakit',
    label: 'Penyakit',
    description: 'Gejala, penyebab, dan pencegahan',
  },
  {
    value: 'tindakan-medis',
    label: 'Tindakan Medis',
    description: 'Informasi prosedur dan terapi',
  },
  {
    value: 'kisah-pasien',
    label: 'Kisah Pasien',
    description: 'Cerita pemulihan dan pengalaman pasien',
  },
] as const;

export type CategoryFilterType = (typeof ARTICLE_CATEGORIES)[number]['value'];

const ARTICLE_CATEGORY_LABELS: Record<string, string> = {
  semua: 'Semua',
  penyakit: 'Penyakit',
  'tindakan-medis': 'Tindakan Medis',
  'kisah-pasien': 'Kisah Pasien',
  umum: 'Umum',
};

export function parseCategoryFilter(value: string | null): CategoryFilterType {
  const category = ARTICLE_CATEGORIES.find((item) => item.value === value);
  return category?.value ?? 'semua';
}

export function getCategoryLabel(category: string): string {
  return ARTICLE_CATEGORY_LABELS[category] ?? 'Artikel';
}

export function getCategoryDescription(category: CategoryFilterType): string {
  return ARTICLE_CATEGORIES.find((item) => item.value === category)?.description ?? 'Artikel kesehatan';
}

export function formatArticleDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
) {
  return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
}

export function getReadingTime(content?: string | null) {
  const words = stripHtml(content ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function getArticleSummary(article: { excerpt?: string | null; content: string }) {
  const summary = article.excerpt?.trim() || stripHtml(article.content);
  return summary.length > 170 ? `${summary.slice(0, 167).trim()}...` : summary;
}
