import { ArrowRight, Users } from 'lucide-react';

export default function CTASection() {
  const contactUrl =
    'https://api.whatsapp.com/send?phone=6285136222772&text=Halo%2C%20saya%20mendapatkan%20informasi%20tentang%20Raho%20Premier%20dari%20website.%20Saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20layanan%20yang%20tersedia.%20Bisa%20dibantu%20penjelasannya%3F';

  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-cover bg-center py-16 md:py-24"
      style={{
        backgroundImage: 'url(/assets/cta-background.jpg)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/55" />

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
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[258px] items-center justify-center gap-4 rounded-full border border-[#F8D977] bg-white/5 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-white/10"
          >
            Hubungi Kami
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
