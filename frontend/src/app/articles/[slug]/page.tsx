import { permanentRedirect } from 'next/navigation';

export default function LegacyArticlePage({ params }: { params: { slug: string } }) {
  permanentRedirect(`/artikel-kesehatan/${params.slug}`);
}
