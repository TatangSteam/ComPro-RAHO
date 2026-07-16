import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: 'url("/assets/Footer Section.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a1a1a',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image 
              src="/assets/LOGORAHO.png" 
              alt="RAHO CLUB" 
              width={120} 
              height={60}
              className="object-contain mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Bukan sekadar meredakan gejala — kami menyelami akar masalah dan bekerja hingga tingkat sel.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/company/raho-premier/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/rahopremier/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@rahopremier?_r=1&_t=ZS-96s3j7lRpHb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Tentang Kami */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tentang Kami</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/tentang-kami" className="hover:text-yellow-500 transition-colors">
                  Pelayanan
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-yellow-500 transition-colors">
                  Teknologi
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-yellow-500 transition-colors">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-yellow-500 transition-colors">
                  Lokasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Artikel Kesehatan */}
          <div>
            <h3 className="font-bold text-lg mb-4">Artikel Kesehatan</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/artikel-kesehatan?category=penyakit" className="hover:text-yellow-500 transition-colors">
                  Kesehatan
                </Link>
              </li>
              <li>
                <Link href="/artikel-kesehatan?category=tindakan-medis" className="hover:text-yellow-500 transition-colors">
                  Teknologi
                </Link>
              </li>
              <li>
                <Link href="/artikel-kesehatan?category=kisah-pasien" className="hover:text-yellow-500 transition-colors">
                  Kisah Inspiratif
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h3 className="font-bold text-lg mb-4">Partnership</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/partnership" className="hover:text-yellow-500 transition-colors">
                  Untuk Dokter
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-yellow-500 transition-colors">
                  Untuk Klinik, RS dan Institusi
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <Link
                  href="/artikel-kesehatan"
                  className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors text-center"
                >
                  Pelajari
                </Link>
                <a
                  href="https://wa.link/h2uyet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors text-center"
                >
                  Konsultasi Gratis
                </a>
              </div>
              <p className="text-gray-400 text-xs">
                Pelajari artikel kesehatan atau hubungi kami untuk konsultasi gratis
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RAHO Club Premier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
