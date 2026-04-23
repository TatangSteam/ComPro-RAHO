# Components Structure

## Layout Components (`/layout`)
Komponen yang digunakan di semua halaman (global layout):
- `Navbar.tsx` - Navigation bar dengan menu utama
- `Footer.tsx` - Footer dengan links dan social media
- `CTASection.tsx` - Call-to-action section "Mulai Perjalanan Sehatmu"

## Home Components (`/home`)
Komponen khusus untuk homepage/dashboard:
- `HeroSection.tsx` - Hero section dengan badge dan CTA
- `TerapiPendukungSection.tsx` - Carousel artikel kategori penyakit
- `ProfessionalTeamSection.tsx` - Section tim profesional dengan stats
- `SolusiSection.tsx` - Section solusi (tindakan medis)
- `KisahPasienSection.tsx` - Testimonial/kisah kesembuhan pasien
- `ArtikelKesehatanSection.tsx` - Carousel artikel kesehatan terbaru

## Usage
```tsx
// Layout components (in layout.tsx)
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/layout/CTASection';

// Home components (in page.tsx)
import HeroSection from '@/components/home/HeroSection';
import TerapiPendukungSection from '@/components/home/TerapiPendukungSection';
```
