import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, GraduationCap, Sparkles, Star } from 'lucide-react';

const EDUCATION_PROGRAM_URL =
  'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTAxMjQyODU1OTcyMzg0?story_media_id=3864781642355770682_76708040164&igsh=eWxiZnAyc2x3bXVz';

function SectionBadge({
  children,
  icon = <Star className="h-3.5 w-3.5 fill-current" />,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D6B85A] bg-white/75 px-4 py-2 text-xs font-semibold text-[#5f4a14] shadow-sm backdrop-blur">
      <span className="text-[#B69133]">{icon}</span>
      {children}
    </div>
  );
}

export default function UmumSection() {
  return (
    <section id="umum" className="relative overflow-hidden py-14 md:py-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1fr] lg:gap-16">
          <div className="rounded-[2rem] bg-white/80 p-3 shadow-xl shadow-black/10 ring-1 ring-white">
            <div className="overflow-hidden rounded-[1.5rem]">
              <img
                src="/assets/building.png"
                alt="Raho Club Premier"
                loading="lazy"
                data-lightbox-image="true"
                data-lightbox-title="Raho Club Premier"
                className="h-72 w-full cursor-zoom-in object-cover sm:h-80 lg:h-[330px]"
              />
            </div>
          </div>

          <div>
            <SectionBadge>Tentang Raho Premier</SectionBadge>
            <h2 className="text-3xl font-bold leading-tight text-[#454545] sm:text-4xl lg:text-[42px]">
              Raho Club <span className="text-[#B69133]">Premier</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              Reverse Aging & Homeostasis Club adalah komunitas kesehatan yang berfokus pada pola
              hidup sehat, peningkatan kualitas hidup, dan keseimbangan tubuh melalui pendekatan
              wellness modern. Dipimpin oleh Bapak Ken Eddy sebagai Ketua Umum RAHO Club, komunitas
              ini menghadirkan berbagai kegiatan edukatif dan suportif untuk membantu anggota
              menjalani hidup lebih sehat, bertenaga, dan optimal secara berkelanjutan.
            </p>
            <a
              href="https://wa.link/h2uyet"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#B69133] to-[#D6B85A] px-8 text-sm font-semibold text-white shadow-lg shadow-[#B69133]/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#D6B85A] hover:to-[#B69133]"
            >
              Pelajari Selengkapnya
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="my-12 rounded-2xl bg-white p-5 shadow-lg shadow-black/5 ring-1 ring-[#eadfca] sm:p-7 lg:my-16 lg:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.78fr] lg:gap-12">
            <div>
              <SectionBadge icon={<GraduationCap className="h-4 w-4" />}>
                Komunitas dan Edukasi
              </SectionBadge>
              <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#454545] sm:text-4xl">
                Komunitas yang <span className="text-[#B69133]">Terus Bertumbuh</span>
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
                Melalui webinar, seminar, diskusi, dan berbagai program edukasi, Raho Premier
                menghadirkan ruang belajar bagi masyarakat, partner, dan praktisi kesehatan untuk
                bertukar wawasan serta mengikuti perkembangan ilmu kesehatan terkini.
              </p>
              <a
                href={EDUCATION_PROGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#B69133] to-[#D6B85A] px-8 text-sm font-semibold text-white shadow-lg shadow-[#B69133]/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#D6B85A] hover:to-[#B69133]"
              >
                Lihat Program Edukasi
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <a
              href={EDUCATION_PROGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[2rem] bg-[#fffaf0] p-4 shadow-xl shadow-black/10 ring-1 ring-[#eadfca] transition-transform duration-300 hover:-translate-y-1"
              aria-label="Lihat program edukasi Raho Premier di Instagram"
            >
              <div className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,184,90,0.22)_0,rgba(214,184,90,0)_30%),linear-gradient(135deg,#fffaf0_0%,#ffffff_52%,#f6e6b8_100%)]" />
                <div className="absolute left-6 top-6 z-10">
                  <p className="text-xl font-semibold uppercase tracking-[0.2em] text-gray-700">
                    Health Talk
                  </p>
                  <p className="mt-1 text-5xl font-extrabold uppercase leading-none text-[#B69133]">
                    Webinar
                  </p>
                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    bersama praktisi kesehatan
                  </p>
                </div>
                <div className="absolute bottom-5 left-6 z-10 max-w-[210px] rounded-xl bg-white/90 p-3 text-left shadow-md">
                  <p className="text-xs font-semibold text-[#B69133]">Wawasan Kesehatan</p>
                  <p className="mt-1 text-sm font-bold leading-snug text-gray-900">
                    Diskusi edukatif seputar kesehatan preventif dan inovasi teknologi.
                  </p>
                </div>
                <img
                  src="/assets/team-doctors.png"
                  alt="Program edukasi kesehatan Raho Premier"
                  loading="lazy"
                  data-lightbox-image="true"
                  data-lightbox-title="Program edukasi kesehatan Raho Premier"
                  className="absolute bottom-0 right-0 h-[86%] w-[62%] cursor-zoom-in object-cover object-center opacity-95 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </a>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1fr] lg:gap-16">
          <div className="rounded-[2rem] bg-white/80 p-3 shadow-xl shadow-black/10 ring-1 ring-white">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#eaf6ff]">
              <img
                src="/assets/technology.png"
                alt="Teknologi Nano Bubble"
                loading="lazy"
                data-lightbox-image="true"
                data-lightbox-title="Teknologi Nano Bubble"
                className="h-72 w-full cursor-zoom-in object-cover sm:h-80 lg:h-[330px]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100/10 via-transparent to-[#D6B85A]/10" />
            </div>
          </div>

          <div>
            <SectionBadge icon={<Sparkles className="h-4 w-4" />}>
              Teknologi Nano Bubble
            </SectionBadge>
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-[#454545] sm:text-4xl">
              Mengenal Teknologi <span className="text-[#B69133]">Nano Bubble</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              Nano Bubble merupakan teknologi berbasis gelembung gas berukuran nano yang memiliki
              karakteristik unik seperti stabilitas tinggi dan luas permukaan besar. Teknologi ini
              menjadi salah satu area penelitian yang terus berkembang dalam wawasan kesehatan,
              teknologi, dan inovasi.
            </p>
            <Link
              href="https://rahopremier.id/artikel-kesehatan/apa-itu-nanobubble-teknologi-cerdas-untuk-mengantarkan-oksigen-hingga-ke-tingkat-mikro"
              className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#B69133] to-[#D6B85A] px-8 text-sm font-semibold text-white shadow-lg shadow-[#B69133]/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#D6B85A] hover:to-[#B69133]"
            >
              Pelajari Nano Bubble
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
