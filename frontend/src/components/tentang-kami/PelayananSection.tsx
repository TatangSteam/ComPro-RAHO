export default function PelayananSection() {
  return (
    <section id="pelayanan" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Pelayanan Homecare</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Layanan homecare RAHO Club Premier menghadirkan solusi perawatan kesehatan langsung ke rumah dengan pendekatan wellness modern dan pemulihan seluler. Termasuk dukungan teknologi seperti monitoring kesehatan dan membuka kesempatan untuk berkonsultasi, energi, dan keseimbangan tubuh. Didukung tenaga profesional, layanan ini dirancang praktis, aman, dan personal untuk membantu Anda menjaga kesehatan, mempercepat pemulihan, serta menjalani gaya hidup sehat tanpa harus ke fasilitas kesehatan.
            </p>
            <a 
              href="https://wa.link/h2uyet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-colors text-sm md:text-base"
            >
              Konsultasi
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl order-2">
            <img 
              src="/assets/homecare.jpg" 
              alt="Homecare Service"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
