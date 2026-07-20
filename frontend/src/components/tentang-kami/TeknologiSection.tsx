export default function TeknologiSection() {
  return (
    <section id="teknologi" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
            <img 
              src="/assets/technology.png" 
              alt="Nano Bubble Technology"
              loading="lazy"
              data-lightbox-image="true"
              data-lightbox-title="Nano Bubble Technology"
              className="w-full h-64 cursor-zoom-in object-cover md:h-80 lg:h-96"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Teknologi</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Nano Bubble Treatment adalah metode terapi alternatif berbasis teknologi nano yang memanfaatkan gelembung gas berukuran sangat kecil (+300 nm) dengan stabilitas tinggi dan muatan permukaan khusus, sehingga mampu menembus kapiler dan interaksi hingga tingkat sel. Menggabungkan kombinasi oksigen, hidrogen, dan gas bermanfaat lainnya, terapi nano bubble dirancang untuk membantu meningkatkan sirkulasi darah, membukung metabolisme sel, serta mengurangi stres oksidatif sebagai bagian dari pendekatan kesehatan modern dan pemulihan tubuh secara alami.
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
