import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Hubungi RAHO Premier',
  description:
    'Hubungi tim RAHO Premier untuk informasi layanan kesehatan, konsultasi, lokasi, dan peluang partnership.',
  path: '/hubungi-kami',
});

export default function HubungiKamiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
