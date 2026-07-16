import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/raho-premier/',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
  },
  {
    href: 'https://www.instagram.com/rahopremier/',
    label: 'Instagram',
    Icon: FaInstagram,
  },
  {
    href: 'https://www.tiktok.com/@rahopremier?_r=1&_t=ZS-96s3j7lRpHb',
    label: 'TikTok',
    Icon: FaTiktok,
  },
];

export default function Footer() {
  return (
    <footer
      className="relative min-h-[451px] overflow-hidden bg-[#232323] text-white"
      style={{
        backgroundImage: 'url("/assets/Footer Section.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a1a1a',
      }}
    >
      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 mx-auto flex min-h-[451px] max-w-[1440px] items-start px-6 py-16 sm:px-10 md:py-[92px] lg:px-[60px]">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[minmax(260px,300px)_minmax(260px,300px)_minmax(260px,300px)_minmax(190px,220px)] lg:justify-between lg:gap-8">
          <div>
            <div className="mb-7">
              <Image
                src="/assets/LOGORAHO.png"
                alt="Raho Club Premier"
                width={104}
                height={66}
                className="object-contain"
              />
            </div>
            <p className="max-w-[310px] text-base leading-[1.8] text-white/65">
              Bukan sekadar meredakan gejala - kami menyelami akar masalah dan bekerja hingga tingkat sel.
            </p>

            <div className="mt-9 flex items-center gap-6">
              {socialLinks.map((item) => {
                const Icon = item.Icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C7A130] text-white transition-colors hover:bg-[#D6B85A]"
                    aria-label={item.label}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-7">
              <Image
                src="/assets/logo-imi-new.png"
                alt="IMI - Inovasi Molekuler Indonesia"
                width={92}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="max-w-[315px] text-base leading-[1.8] text-white/65">
              Mitra kolaborasi Raho Premier dalam pengembangan edukasi, inovasi kesehatan, dan penguatan
              ekosistem berbasis sains.
            </p>
          </div>

          <div>
            <h3 className="mb-7 text-xl font-medium text-white">Tentang Kami dan Partnership</h3>
            <ul className="space-y-5 text-base">
              <li>
                <Link href="/tentang-kami" className="text-white/65 transition-colors hover:text-[#D6B85A]">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-white/65 transition-colors hover:text-[#D6B85A]">
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="/#locations" className="text-white/65 transition-colors hover:text-[#D6B85A]">
                  Lokasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-7 text-xl font-medium text-white">Artikel Kesehatan</h3>
            <ul className="space-y-5 text-base">
              <li>
                <Link
                  href="/artikel-kesehatan?category=penyakit"
                  className="text-white/65 transition-colors hover:text-[#D6B85A]"
                >
                  Topik Kesehatan
                </Link>
              </li>
              <li>
                <Link
                  href="/artikel-kesehatan?category=tindakan-medis"
                  className="text-white/65 transition-colors hover:text-[#D6B85A]"
                >
                  Teknologi dan Inovasi
                </Link>
              </li>
              <li>
                <Link
                  href="/artikel-kesehatan?category=kisah-pasien"
                  className="text-white/65 transition-colors hover:text-[#D6B85A]"
                >
                  Kisah Inspiratif
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
