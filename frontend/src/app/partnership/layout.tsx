import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Partnership RAHO Premier',
  description:
    'Bangun kolaborasi kesehatan bersama RAHO Premier untuk dokter, klinik, instansi, rumah sakit, dan komunitas kesehatan.',
  path: '/partnership',
});

export default function PartnershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
