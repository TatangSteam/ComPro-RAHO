import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Tentang Kami dan Partnership',
  description:
    'Kenali RAHO Premier, teknologi Nano Bubble, layanan kesehatan, jaringan partner, dan peluang partnership di berbagai wilayah Indonesia.',
  path: '/tentang-kami',
});

export default function TentangKamiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
