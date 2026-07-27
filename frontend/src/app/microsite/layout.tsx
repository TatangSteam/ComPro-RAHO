import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Profil Singkat RAHO Premier',
  description:
    'Akses informasi singkat RAHO Premier, layanan, lokasi, partnership, dan kanal komunikasi resmi.',
  path: '/microsite',
});

export default function MicrositeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
