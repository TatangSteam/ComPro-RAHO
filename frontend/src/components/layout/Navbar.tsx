'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang-kami', label: 'Tentang Kami dan Partnership' },
    { href: '/partnership', label: 'Partnership' },
    { href: '/artikel-kesehatan', label: 'Artikel Kesehatan' },
  ];

  return (
    <nav className="relative text-white sticky top-0 z-50">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/assets/Navbar.png" 
          alt="Navbar Background" 
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navbar Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2 z-10">
            <Image 
              src="/assets/LOGORAHO.png" 
              alt="RAHO CLUB" 
              width={100} 
              height={20}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 z-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-[#D6B85A] relative ${
                  pathname === link.href ? 'text-[#D6B85A]' : 'text-gray-100'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#D6B85A]"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button with Phone Icon */}
          <a
            href="https://wa.link/h2uyet"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 z-10"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            Hubungi Kami
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-2 z-10 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 relative">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 mt-2">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-[#D6B85A] py-2 px-3 rounded-lg hover:bg-white/5 ${
                      pathname === link.href ? 'text-[#D6B85A] bg-white/10' : 'text-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://wa.link/h2uyet"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B69133] to-[#D6B85A] hover:from-[#D6B85A] hover:to-[#B69133] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
