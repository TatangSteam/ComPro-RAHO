'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';
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

function ImiFallbackLogo({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className={`inline-flex items-center ${compact ? 'gap-2' : 'gap-4'}`}>
      <div className={`relative flex-shrink-0 ${compact ? 'h-10 w-14' : 'h-14 w-20'}`}>
        <span
          className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[#e30613] ${
            compact ? 'h-5 w-5' : 'h-7 w-7'
          }`}
        />
        <span
          className={`absolute bottom-0 left-1 rounded-full bg-gradient-to-br from-[#3e66b1] to-[#162a6b] ${
            compact ? 'h-5 w-5' : 'h-7 w-7'
          }`}
        />
        <span
          className={`absolute bottom-0 right-1 rounded-full bg-gradient-to-br from-[#3e66b1] to-[#162a6b] ${
            compact ? 'h-5 w-5' : 'h-7 w-7'
          }`}
        />
        <span className="absolute bottom-4 left-5 h-[3px] w-7 -rotate-45 rounded-full bg-white/80" />
        <span className="absolute bottom-4 right-5 h-[3px] w-7 rotate-45 rounded-full bg-white/80" />
      </div>
      <div className="text-left leading-none">
        <div className={`font-extrabold text-[#e30613] ${compact ? 'text-4xl' : 'text-6xl'}`}>
          IMI
        </div>
        <div className={`mt-1 text-[7px] font-semibold leading-tight ${onDark ? 'text-white/50' : 'text-gray-500'}`}>
          INOVASI MOLEKULER
          <br />
          INDONESIA
        </div>
      </div>
    </div>
  );
}

export default function IMICollaborationSection() {
  const [imiLogoError, setImiLogoError] = useState(false);
  const [bgImageError, setBgImageError] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative flex min-h-[435px] items-center py-12 md:py-14"
        style={{
          backgroundImage: 'url("/assets/FOOTER1.png")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-5">
            <div className="mx-auto mb-5 inline-flex w-full max-w-[650px] justify-center rounded-full bg-[#FBECEC] px-8 py-3">
              <h3 className="text-base font-medium text-[#F3181E] md:text-xl">
                Kolaborasi untuk Mendorong Inovasi Kesehatan
              </h3>
            </div>
            <h2 className="mb-9 text-4xl font-bold text-[#4A4A4A] md:text-5xl lg:text-[48px]">
              In Collaboration With
            </h2>
          </div>

          <div className="mb-9 flex justify-center">
            {!imiLogoError ? (
              <div className="relative h-24 w-52 md:h-28 md:w-60">
                <Image
                  src="/assets/logo-imi-new.png"
                  alt="IMI - Inovasi Molekuler Indonesia"
                  fill
                  data-lightbox-image="true"
                  data-lightbox-src="/assets/logo-imi-new.png"
                  data-lightbox-title="IMI - Inovasi Molekuler Indonesia"
                  className="cursor-zoom-in object-contain"
                  priority
                  onError={() => setImiLogoError(true)}
                />
              </div>
            ) : (
              <ImiFallbackLogo />
            )}
          </div>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Raho Premier menjalin kolaborasi dengan Inovasi Molekuler Indonesia (IMI) dalam mendukung
            pengembangan edukasi kesehatan, inovasi berbasis sains, serta pemahaman teknologi kesehatan
            modern untuk masyarakat dan komunitas.
          </p>
        </div>
      </div>

      <div className="relative flex h-[500px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {!bgImageError ? (
            <Image
              src="/assets/cta-background.jpg"
              alt="Partnership Background"
              fill
              className="object-cover object-center"
              priority
              onError={() => setBgImageError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#B69133] via-[#8B6F2E] to-[#6B5423]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-10 text-4xl font-bold leading-tight md:text-6xl lg:text-[78px]">
            <span className="text-white">Siap Bertumbuh</span>
            <br />
            <span className="text-white">Bersama </span>
            <span className="bg-gradient-to-r from-[#F4D98A] via-[#FFE8A3] to-[#C8A540] bg-clip-text text-transparent">
              Raho Premier?
            </span>
          </h2>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="https://wa.link/tuwrxr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[288px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#C59B2F] to-[#D7AF36] px-8 py-4 text-lg font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#D6B85A] hover:to-[#B69133] hover:shadow-2xl"
            >
              <Users className="h-6 w-6" />
              Gabung Partnership
            </a>
            <Link
              href="/hubungi-kami"
              className="inline-flex min-w-[258px] items-center justify-center gap-4 rounded-full border border-[#F8D977] bg-white/5 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-white/10"
            >
              Hubungi Kami
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative min-h-[451px] overflow-hidden bg-[#232323]">
        <Image
          src="/assets/Footer Section.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
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
                {!imiLogoError ? (
                  <Image
                    src="/assets/logo-imi-new.png"
                    alt="IMI - Inovasi Molekuler Indonesia"
                    width={92}
                    height={50}
                    className="object-contain"
                    onError={() => setImiLogoError(true)}
                  />
                ) : (
                  <ImiFallbackLogo compact onDark />
                )}
              </div>
              <p className="max-w-[315px] text-base leading-[1.8] text-white/65">
                Mitra kolaborasi Raho Premier dalam pengembangan edukasi, inovasi kesehatan, dan
                penguatan ekosistem berbasis sains.
              </p>
            </div>

            <div>
              <h4 className="mb-7 text-xl font-medium text-white">Tentang Kami dan Partnership</h4>
              <ul className="space-y-5 text-base">
                <li>
                  <Link href="/tentang-kami" className="text-white/65 transition-colors hover:text-[#D6B85A]">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/tentang-kami#partnership-overview" className="text-white/65 transition-colors hover:text-[#D6B85A]">
                    Partnership
                  </Link>
                </li>
                <li>
                  <Link href="/tentang-kami#partner-network" className="text-white/65 transition-colors hover:text-[#D6B85A]">
                    Lokasi
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-7 text-xl font-medium text-white">Artikel Kesehatan</h4>
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
      </div>
    </section>
  );
}
