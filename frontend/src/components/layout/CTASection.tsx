import Link from 'next/link';

export default function CTASection() {
  const whatsappLink = 'https://wa.link/h2uyet';

  return (
    <section 
      className="relative bg-cover bg-center py-16 md:py-24"
      style={{
        backgroundImage: 'url(/assets/cta-background.jpg)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Mulai Perjalanan Sehatmu dari Dalam Sekarang!
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
          >
            Hubungi Kami
          </a>
          <a
            href="https://wa.link/h2uyet"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-colors border-2 border-white flex items-center justify-center gap-2"
          >
            Pelajari
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
