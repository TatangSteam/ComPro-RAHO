export default function UmumSection() {
  return (
    <section id="umum" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
            <img 
              src="/assets/building.png" 
              alt="RAHO Club Building"
              loading="lazy"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Raho Premier Club</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Reverse Aging & Homeostasis Club adalah komunitas kesehatan yang berfokus pada pola hidup sehat, peningkatan kualitas hidup, dan keseimbangan tubuh (homeostasis) melalui pendekatan wellness modern. Dipimpin oleh Bapak Ken Eddy sebagai Ketua Umum RAHO Club, komunitas ini menghadirkan berbagai kegiatan edukasi dan suportif untuk membantu anggota menjalani hidup lebih sehat, bertenaga, dan optimal secara berkelanjutan.
            </p>
            <a 
              href="https://wa.link/h2uyet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-colors text-sm md:text-base"
            >
              Pelajari
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
