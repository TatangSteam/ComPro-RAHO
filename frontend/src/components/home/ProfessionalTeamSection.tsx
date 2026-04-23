import Image from 'next/image';

export default function ProfessionalTeamSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/assets/team-doctors.jpg"
                alt="Professional Medical Team"
                width={600}
                height={400}
                className="object-cover w-full h-64 md:h-80 lg:h-[400px]"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-xs md:text-sm font-medium">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Ditangani oleh tenaga kesehatan profesional
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Bukan sekadar meredakan gejala — kami menyelami akar masalah dan bekerja hingga tingkat sel.
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-4 md:pt-6">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">40+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Dokter Profesional</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">5K+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Jumlah pasien per tahun</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
