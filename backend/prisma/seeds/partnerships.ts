import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPartnerships() {
  console.log('Seeding partnership articles...');

  const partnerships = [
    {
      title: 'Kisah Sukses Klinik Sehat Bersama dengan Raho Premier',
      slug: 'kisah-sukses-klinik-sehat-bersama',
      content: `
## Transformasi Pelayanan Kesehatan Holistik

Klinik Sehat Bersama di Jakarta Selatan telah menjadi mitra Raho Club Premier sejak tahun 2024. Dr. Sarah Wijaya, pendiri klinik, berbagi pengalamannya tentang bagaimana partnership ini mengubah cara mereka melayani pasien.

### Awal Perjalanan

"Kami selalu mencari inovasi untuk memberikan pelayanan terbaik kepada pasien. Ketika mengenal teknologi Nano Bubble dari Raho Premier, kami langsung tertarik untuk mempelajari lebih lanjut," ujar Dr. Sarah.

### Implementasi Teknologi

Setelah bergabung sebagai partner, Klinik Sehat Bersama mendapatkan:
- Pelatihan komprehensif tentang teknologi Nano Bubble
- Harga khusus untuk produk Raho Premier
- Dukungan marketing dan edukasi pasien
- Akses ke komunitas praktisi kesehatan

### Hasil yang Dicapai

Dalam 6 bulan pertama, klinik mengalami peningkatan:
- 40% peningkatan kepuasan pasien
- 30% pertumbuhan jumlah pasien baru
- Peningkatan signifikan dalam retention rate

"Partnership dengan Raho Premier bukan hanya tentang produk, tapi tentang pertumbuhan bersama dalam ekosistem kesehatan," tambah Dr. Sarah.
      `,
      excerpt: 'Bagaimana Klinik Sehat Bersama bertransformasi menjadi pusat kesehatan holistik terdepan melalui partnership dengan Raho Club Premier.',
      imageUrl: '/assets/Hero2/Rectangle 158.png',
      author: 'Tim Raho Premier',
      category: 'partnership',
      published: true,
    },
    {
      title: 'Wellness Center Jakarta: Integrasi Teknologi untuk Kesehatan Optimal',
      slug: 'wellness-center-jakarta-integrasi-teknologi',
      content: `
## Pendekatan Holistik dengan Teknologi Modern

Prof. Dr. Ahmad Hidayat memimpin Wellness Center Jakarta yang berfokus pada kesehatan preventif dan holistik. Partnership dengan Raho Premier membawa dimensi baru dalam pelayanan mereka.

### Visi Kesehatan Holistik

"Kami percaya bahwa kesehatan adalah keseimbangan tubuh, pikiran, dan lingkungan. Teknologi Nano Bubble dari Raho Premier melengkapi pendekatan holistik kami dengan sangat baik," jelas Prof. Ahmad.

### Program Edukasi Berkelanjutan

Sebagai partner Raho Premier, Wellness Center mendapatkan:
- Akses ke material edukasi eksklusif
- Webinar bulanan dengan expert
- Sertifikasi untuk tim medis
- Support system 24/7

### Impact ke Komunitas

Wellness Center kini melayani lebih dari 500 klien aktif dengan program kesehatan terintegrasi yang mencakup teknologi Nano Bubble.

"Kolaborasi ini memungkinkan kami memberikan value lebih kepada klien sambil terus belajar dan berkembang," kata Prof. Ahmad.
      `,
      excerpt: 'Prof. Dr. Ahmad Hidayat berbagi bagaimana Wellness Center Jakarta mengintegrasikan teknologi Nano Bubble dalam pendekatan kesehatan holistik.',
      imageUrl: '/assets/Hero2/Rectangle 159.png',
      author: 'Tim Raho Premier',
      category: 'partnership',
      published: true,
    },
    {
      title: 'Nutrition & Health Clinic: Mendukung Perjalanan Kesehatan Pasien',
      slug: 'nutrition-health-clinic-perjalanan-kesehatan',
      content: `
## Nutrisi dan Teknologi untuk Hasil Optimal

dr. Maria Angelina, Sp.GK mengelola Nutrition & Health Clinic yang fokus pada manajemen berat badan dan kesehatan metabolik. Partnership dengan Raho Premier memberikan tools tambahan untuk kesuksesan pasien.

### Mengapa Memilih Raho Premier

"Saya mencari partner yang tidak hanya menyediakan produk, tetapi juga mendukung pengembangan praktik. Raho Premier menawarkan keduanya," ungkap dr. Maria.

### Benefit Partnership

Yang membuat perbedaan:
- Harga kompetitif memungkinkan margin lebih baik
- Material edukasi membantu pasien memahami teknologi
- Support team yang responsif
- Network dengan praktisi lain

### Success Stories

Dengan pendekatan nutrisi plus teknologi Nano Bubble:
- 85% pasien mencapai target kesehatan
- Peningkatan compliance program
- Testimoni positif meningkat 60%

"Program partnership Raho Premier sangat mendukung pengembangan praktik saya. Ini bukan sekadar vendor-client relationship, tapi true partnership," tambah dr. Maria.
      `,
      excerpt: 'dr. Maria Angelina, Sp.GK berbagi pengalaman mengintegrasikan teknologi Nano Bubble dalam program nutrisi dan manajemen berat badan.',
      imageUrl: '/assets/Hero2/Rectangle 161.png',
      author: 'Tim Raho Premier',
      category: 'partnership',
      published: true,
    },
    {
      title: 'Gym & Wellness: Kombinasi Fitness dan Teknologi Kesehatan',
      slug: 'gym-wellness-fitness-teknologi',
      content: `
## Revolusi Fitness dengan Nano Bubble

Gym Bless, salah satu gym premium di Jakarta, telah mengintegrasikan teknologi Nano Bubble dalam program wellness mereka. Partnership dengan Raho Premier membuka peluang baru dalam industri fitness.

### Inovasi dalam Industri Fitness

"Kami ingin memberikan lebih dari sekedar tempat olahraga. Dengan teknologi dari Raho Premier, kami bisa menawarkan comprehensive wellness solution," kata Owner Gym Bless.

### Program Terintegrasi

Member gym kini mendapatkan:
- Akses ke teknologi Nano Bubble
- Konsultasi kesehatan berkala
- Program detox dan recovery
- Monitoring progress yang lebih baik

### Dampak Positif

Sejak partnership dimulai:
- Member retention meningkat 45%
- Referral meningkat signifikan
- Brand image sebagai wellness center terkemuka
- Revenue stream baru dari wellness program

"Raho Premier membantu kami transform dari gym biasa menjadi holistic wellness center," tambah Owner.
      `,
      excerpt: 'Bagaimana Gym Bless bertransformasi menjadi wellness center dengan mengintegrasikan teknologi Nano Bubble dari Raho Premier.',
      imageUrl: '/assets/Hero2/Rectangle 162.png',
      author: 'Tim Raho Premier',
      category: 'partnership',
      published: true,
    },
  ];

  for (const partnership of partnerships) {
    await prisma.article.upsert({
      where: { slug: partnership.slug },
      update: partnership,
      create: partnership,
    });
  }

  console.log('Partnership articles seeded successfully');
}
