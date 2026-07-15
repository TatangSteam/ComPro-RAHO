import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  HeartHandshake,
  Star,
  Tags,
  UsersRound,
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.link/h2uyet';

const benefitCards = [
  {
    title: 'Harga Khusus Partner',
    description: 'Nikmati akses harga yang lebih kompetitif untuk produk tertentu.',
    image: '/assets/technology.jpg',
    Icon: Tags,
  },
  {
    title: 'Edukasi Berkelanjutan',
    description: 'Nikmati akses materi pembelajaran eksklusif.',
    image: '/assets/team-doctors.png',
    Icon: BookOpenCheck,
  },
  {
    title: 'Dukungan Bisnis',
    description: 'Pendampingan pengembangan komunitas dan aktivitas edukasi.',
    image: '/assets/UntukKlinik.png',
    Icon: Building2,
  },
  {
    title: 'Jaringan Komunitas',
    description: 'Terhubung dengan partner dan praktisi dari berbagai daerah.',
    image: '/assets/building.png',
    Icon: UsersRound,
  },
];

export default function PartnershipOverviewSection() {
  return (
    <section id="partnership-overview" className="relative overflow-hidden py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-white/[0.82] p-5 shadow-xl shadow-black/5 ring-1 ring-[#eadfca] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(239,38,38,0.1)_0,rgba(239,38,38,0)_24%),radial-gradient(circle_at_96%_92%,rgba(214,184,90,0.16)_0,rgba(214,184,90,0)_28%)]" />
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[28%] opacity-25 lg:block">
            <div className="h-full w-full bg-[radial-gradient(circle,rgba(239,38,38,0.18)_1px,transparent_1.8px)] bg-[length:18px_18px]" />
          </div>

          <div className="relative">
            <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-[#EF2626] bg-white/80 px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-[#EF2626] text-[#EF2626]" />
              Partnership
            </div>

            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-[44px] font-extrabold leading-none text-[#151515] sm:text-[58px] lg:text-[70px]">
                Bertumbuh Bersama,
                <br />
                <span className="text-[#EF2626]">Partner Kami</span>
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-sm leading-6 text-gray-600">
                Program partnership Raho Premier dirancang untuk mendukung pengembangan komunitas
                melalui akses edukasi, jaringan kolaborasi, dan berbagai manfaat eksklusif yang
                membantu partner berkembang secara berkelanjutan.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefitCards.map(({ title, description, image, Icon }) => (
                <div
                  key={title}
                  className="group overflow-hidden rounded-lg border border-[#eadfca] bg-white p-4 text-center shadow-md shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center text-[#EF2626]">
                    <Icon className="h-9 w-9 fill-current stroke-[1.8]" />
                  </div>
                  <h3 className="mx-auto min-h-[58px] max-w-[150px] text-lg font-bold leading-tight text-[#4b4b4b]">
                    {title}
                  </h3>
                  <div className="mx-auto my-3 h-0.5 w-16 rounded-full bg-[#EF2626]" />
                  <p className="mx-auto mb-4 min-h-[44px] max-w-[180px] text-xs leading-5 text-gray-500">
                    {description}
                  </p>
                  <div className="overflow-hidden rounded-md bg-[#f8f6f1]">
                    <img
                      src={image}
                      alt={title}
                      loading="lazy"
                      className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid items-center gap-9 lg:grid-cols-[0.86fr_1fr] lg:gap-16">
              <div className="rounded-[2rem] bg-white p-3 shadow-xl shadow-black/10 ring-1 ring-[#eadfca]">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/assets/team-doctors.png"
                    alt="Kolaborasi partner Raho Premier"
                    loading="lazy"
                    className="h-72 w-full object-cover sm:h-80 lg:h-[340px]"
                  />
                </div>
              </div>

              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D6B85A] bg-white/75 px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-[#EF2626] text-[#EF2626]" />
                  Lingkup Partnership
                </div>
                <h3 className="max-w-2xl text-3xl font-bold leading-tight text-[#4b4b4b] sm:text-4xl">
                  Untuk{' '}
                  <span className="text-[#EF2626]">
                    Dokter, Instansi, Klinik, atau Rumah Sakit
                  </span>
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
                  Program Partnership Raho Premier menghadirkan kolaborasi bagi dokter, klinik,
                  institusi kesehatan, dan praktisi yang ingin mengembangkan layanan kesehatan
                  berbasis edukasi, wellness modern, dan inovasi teknologi.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#EF2626] px-8 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d91f1f]"
                >
                  <HeartHandshake className="h-5 w-5" />
                  Gabung Partnership
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
