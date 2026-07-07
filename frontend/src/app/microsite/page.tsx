'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaLinkedin, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaChevronRight, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { sortLocationsForDisplay } from '@/lib/locationSort';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  mapUrl: string;
  category?: string;
}

export default function MicrositePage() {
  const [showLocations, setShowLocations] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch locations from API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    fetch(`${apiUrl}/locations`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Locations loaded:', data);
        // Backend returns { success: true, locations: [...] }
        const locationData = data.locations || data;
        setLocations(sortLocationsForDisplay(locationData));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        // Fallback to dummy data if API fails
        setLocations([
          {
            id: '1',
            name: 'RAHO Club Ciputat',
            city: 'Tangerang Selatan',
            address: 'Jl. Ir. H. Juanda No. 123, Ciputat',
            phone: '021-1234-5678',
            mapUrl: 'https://maps.google.com/?q=RAHO+Club+Ciputat',
          },
          {
            id: '2',
            name: 'RAHO Club Jakarta Pusat',
            city: 'Jakarta Pusat',
            address: 'Jl. Sudirman No. 456, Jakarta',
            phone: '021-8765-4321',
            mapUrl: 'https://maps.google.com/?q=RAHO+Club+Jakarta',
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: 'radial-gradient(circle at 20% 20%, rgba(182,145,51,0.18), transparent 30%), radial-gradient(circle at 80% 70%, rgba(182,145,51,0.12), transparent 35%), #050505'
    }}>
      {/* Premium Gold Wave Background - Clean and Minimal */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#B69133', stopOpacity: 0.25 }} />
              <stop offset="50%" style={{ stopColor: '#D4AF37', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#B69133', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          
          {/* Top Left - Wave anchored to left edge */}
          <path 
            d="M 0,0 Q 25,15 0,30 Q 20,40 0,50 L 0,0 Z" 
            fill="url(#goldGradient)" 
            opacity="0.22"
            className="animate-wave-slow"
          />
          {/* Lines always start and end at x=0 (left edge) */}
          <path 
            d="M 0,3 Q 28,17 0,33 L 0,3 Z" 
            fill="none" 
            stroke="rgba(182,145,51,0.3)" 
            strokeWidth="0.2"
            className="animate-wave-line-1"
          />
          <path 
            d="M 0,7 Q 24,22 0,38 L 0,7 Z" 
            fill="none" 
            stroke="rgba(212,175,55,0.2)" 
            strokeWidth="0.15"
            className="animate-wave-line-2"
          />
          
          {/* Bottom Right - Different pattern, anchored to right edge */}
          <path 
            d="M 100,100 Q 78,88 100,75 Q 82,65 100,55 L 100,100 Z" 
            fill="url(#goldGradient)" 
            opacity="0.22"
            className="animate-wave-slow-reverse"
          />
          {/* Lines always start and end at x=100 (right edge) */}
          <path 
            d="M 100,96 Q 74,86 100,72 L 100,96 Z" 
            fill="none" 
            stroke="rgba(182,145,51,0.28)" 
            strokeWidth="0.18"
            className="animate-wave-line-5"
          />
          <path 
            d="M 100,92 Q 70,83 100,68 L 100,92 Z" 
            fill="none" 
            stroke="rgba(212,175,55,0.22)" 
            strokeWidth="0.15"
            className="animate-wave-line-6"
          />
        </svg>

        {/* Enhanced Radial Glows - Very subtle, almost invisible */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96" style={{ opacity: 0.03 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#B69133] via-yellow-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px]" style={{ opacity: 0.025 }}>
          <div className="absolute inset-0 bg-gradient-to-tl from-[#B69133] via-yellow-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Floating Gold Dust Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Layer 1 - Large particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`particle-large-${i}`}
              className="absolute w-2 h-2 bg-yellow-500/20 rounded-full animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
          
          {/* Layer 2 - Medium particles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`particle-medium-${i}`}
              className="absolute w-1.5 h-1.5 bg-yellow-400/15 rounded-full animate-float-medium"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
          
          {/* Layer 3 - Small particles */}
          {[...Array(35)].map((_, i) => (
            <div
              key={`particle-small-${i}`}
              className="absolute w-1 h-1 bg-yellow-300/10 rounded-full animate-float-fast"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 7}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
          
          {/* Layer 4 - Tiny sparkles */}
          {[...Array(45)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-0.5 h-0.5 bg-yellow-200/8 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-12 pb-32">
        <div className="max-w-[460px] w-full">
          {/* Logo - Sharp and prominent */}
          <div className="text-center mb-14">
            <Image
              src="/assets/LOGORAHO.png"
              alt="RAHO Club Premier"
              width={340}
              height={170}
              className="mx-auto"
              priority
              quality={100}
              style={{ filter: 'contrast(1.05) brightness(1.02)' }}
            />
          </div>

    

          {/* Decorative divider */}
          <div className="text-center mb-8 relative">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-600/50 to-yellow-600/50"></div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-600/70 rotate-45"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500/70 rotate-45"></div>
                <div className="w-1.5 h-1.5 bg-yellow-600/70 rotate-45"></div>
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-yellow-600/50 to-yellow-600/50"></div>
            </div>
          </div>

          {/* Primary CTA - WhatsApp with gradient */}
          <div className="mb-8 px-3">
            <a
              href="https://wa.link/h2uyet"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-6 py-4 rounded-[20px] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #B69133, #D6B85A, #9A7624)',
                boxShadow: '0 10px 30px rgba(182,145,51,0.25), 0 4px 12px rgba(0,0,0,0.3)',
                border: '1px solid rgba(212,175,55,0.4)'
              }}
            >
              <FaWhatsapp className="w-6 h-6 text-white drop-shadow-lg" />
              <span className="text-[17px] font-medium text-white drop-shadow-md">Hubungi Kami via WhatsApp</span>
            </a>
          </div>

   

          {/* Links Section - Tighter spacing */}
          <div className="space-y-3 px-3">
            {/* Website */}
            <Link
              href="/"
              className="group flex items-center justify-between px-6 h-[60px] rounded-[20px] transition-all duration-300"
              style={{
                background: '#F8F5EF',
                border: '1px solid rgba(182,145,51,0.55)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600/15 to-yellow-500/15 flex items-center justify-center">
                  <FaGlobe className="w-[17px] h-[17px] text-[#B69133]" />
                </div>
                <span className="text-[15px] font-normal text-gray-800">Website</span>
              </div>
              <FaChevronRight className="w-4 h-4 text-[#B69133] group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/rahopremier/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 h-[60px] rounded-[20px] transition-all duration-300"
              style={{
                background: '#F8F5EF',
                border: '1px solid rgba(182,145,51,0.55)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600/15 to-yellow-500/15 flex items-center justify-center">
                  <FaInstagram className="w-[17px] h-[17px] text-[#B69133]" />
                </div>
                <span className="text-[15px] font-normal text-gray-800">Instagram</span>
              </div>
              <FaChevronRight className="w-4 h-4 text-[#B69133] group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@rahopremier?_r=1&_t=ZS-96s3j7lRpHb"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 h-[60px] rounded-[20px] transition-all duration-300"
              style={{
                background: '#F8F5EF',
                border: '1px solid rgba(182,145,51,0.55)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600/15 to-yellow-500/15 flex items-center justify-center">
                  <FaTiktok className="w-[17px] h-[17px] text-[#B69133]" />
                </div>
                <span className="text-[15px] font-normal text-gray-800">Tiktok</span>
              </div>
              <FaChevronRight className="w-4 h-4 text-[#B69133] group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/raho-premier/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 h-[60px] rounded-[20px] transition-all duration-300"
              style={{
                background: '#F8F5EF',
                border: '1px solid rgba(182,145,51,0.55)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600/15 to-yellow-500/15 flex items-center justify-center">
                  <FaLinkedin className="w-[17px] h-[17px] text-[#B69133]" />
                </div>
                <span className="text-[15px] font-normal text-gray-800">LinkedIn</span>
              </div>
              <FaChevronRight className="w-4 h-4 text-[#B69133] group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* Email */}
            <a
              href="mailto:info@rahopremier.id"
              className="group flex items-center justify-between px-6 h-[60px] rounded-[20px] transition-all duration-300"
              style={{
                background: '#F8F5EF',
                border: '1px solid rgba(182,145,51,0.55)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600/15 to-yellow-500/15 flex items-center justify-center">
                  <FaEnvelope className="w-[17px] h-[17px] text-[#B69133]" />
                </div>
                <span className="text-[15px] font-normal text-gray-800">Email</span>
              </div>
              <FaChevronRight className="w-4 h-4 text-[#B69133] group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* Lokasi Kami - Moved to bottom */}
            <div className="pt-2">
              <button
                onClick={() => setShowLocations(!showLocations)}
                className="group w-full flex items-center justify-between px-6 h-[60px] rounded-[20px] transition-all duration-300 relative"
                style={{
                  background: '#F8F5EF',
                  border: '1px solid rgba(182,145,51,0.6)',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-[18px] h-[18px] text-[#B69133]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] font-medium text-gray-900">Lokasi Kami</span>
                    <span className="text-[11px] text-gray-500">Cabang & Partnership</span>
                  </div>
                </div>
                <FaChevronRight 
                  className={`w-4 h-4 text-[#B69133] transition-transform duration-300 ${showLocations ? 'rotate-90' : ''}`} 
                />
              </button>

              {/* Dropdown Content */}
              {showLocations && (
                <div className="mt-4 space-y-3 animate-[slideDown_0.3s_ease-out] px-1">
                  {loading ? (
                    <div className="text-center py-8 text-sm text-gray-500">
                      Memuat lokasi...
                    </div>
                  ) : locations.length > 0 ? (
                    locations.map((location) => (
                      <a
                        key={location.id}
                        href={location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-5 rounded-[18px] border transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: 'linear-gradient(135deg, rgba(248,245,239,0.95) 0%, rgba(245,240,230,0.95) 100%)',
                          border: '1.5px solid rgba(182,145,51,0.4)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 4px 20px rgba(182,145,51,0.15)'
                        }}
                      >
                        <h4 className="font-bold text-gray-900 mb-2 text-base text-center">{location.name}</h4>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                          <p className="text-sm text-gray-700 font-medium">{location.city}</p>
                          <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                        </div>
                        <p className="text-xs text-gray-600 text-center leading-relaxed mb-3">{location.address}</p>
                        {location.phone && (
                          <div className="flex items-center justify-center gap-2 pt-2 border-t border-yellow-600/20">
                            <FaPhone className="w-3.5 h-3.5 text-[#B69133]" />
                            <p className="text-sm text-[#B69133] font-semibold tracking-wide">
                              {location.phone}
                            </p>
                          </div>
                        )}
                      </a>
                    ))
                  ) : (
                    <div className="text-center py-8 text-sm text-gray-500">
                      Tidak ada data lokasi
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center max-w-md px-4">
          {/* Trust Badges with Icons */}
          <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
            {/* Aman & Terpercaya */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-[#B69133]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[10px] text-yellow-600/70 font-medium tracking-wide">Aman & Terpercaya</span>
            </div>

            {/* Berdasarkan Sains */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-[#B69133]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="text-[10px] text-yellow-600/70 font-medium tracking-wide">Berdasarkan Sains</span>
            </div>

            {/* Hasil Berkelanjutan */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-[#B69133]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-[10px] text-yellow-600/70 font-medium tracking-wide">Hasil Berkelanjutan</span>
            </div>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600/30"></div>
            <div className="w-1 h-1 bg-yellow-600/40 rounded-full"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600/30"></div>
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-yellow-600/40 tracking-wide">
            © {new Date().getFullYear()} Raho Premier
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }
        
        /* Gold Dust Particle Animations */
        @keyframes float-slow {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translate(10px, -30px) rotate(120deg);
            opacity: 0.15;
          }
          66% {
            transform: translate(-15px, -60px) rotate(240deg);
            opacity: 0.25;
          }
          100% {
            transform: translate(0, -80px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes float-medium {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translate(-20px, -25px) rotate(90deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(15px, -50px) rotate(180deg);
            opacity: 0.1;
          }
          75% {
            transform: translate(-10px, -75px) rotate(270deg);
            opacity: 0.18;
          }
          100% {
            transform: translate(0, -100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes float-fast {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-60px) translateX(20px);
            opacity: 0.15;
          }
          100% {
            transform: translateY(-120px) translateX(-10px);
            opacity: 0;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.05;
            transform: scale(0.8);
          }
          25% {
            opacity: 0.12;
            transform: scale(1.2);
          }
          50% {
            opacity: 0.08;
            transform: scale(1);
          }
          75% {
            opacity: 0.15;
            transform: scale(1.4);
          }
        }
        
        /* Wave and Line Flow Animations - NO translateX/Y to keep anchored */
        @keyframes wave-slow {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.22;
          }
          50% {
            transform: scaleX(1.08);
            opacity: 0.28;
          }
        }
        
        @keyframes wave-slow-alt {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.20;
          }
          50% {
            transform: scaleX(1.1);
            opacity: 0.26;
          }
        }
        
        @keyframes wave-slow-reverse {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.22;
          }
          50% {
            transform: scaleX(1.08);
            opacity: 0.28;
          }
        }
        
        @keyframes wave-line-1 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.3;
          }
          33% {
            transform: scaleX(1.12);
            opacity: 0.45;
          }
          66% {
            transform: scaleX(1.05);
            opacity: 0.35;
          }
        }
        
        @keyframes wave-line-2 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.2;
          }
          40% {
            transform: scaleX(1.15);
            opacity: 0.35;
          }
          80% {
            transform: scaleX(1.08);
            opacity: 0.25;
          }
        }
        
        @keyframes wave-line-3 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.3;
          }
          35% {
            transform: scaleX(1.1);
            opacity: 0.45;
          }
          70% {
            transform: scaleX(1.04);
            opacity: 0.35;
          }
        }
        
        @keyframes wave-line-4 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.2;
          }
          45% {
            transform: scaleX(1.12);
            opacity: 0.35;
          }
          85% {
            transform: scaleX(1.06);
            opacity: 0.25;
          }
        }
        
        /* Right Top Lines - Wave animations */
        @keyframes wave-line-8 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.28;
          }
          38% {
            transform: scaleX(1.1);
            opacity: 0.42;
          }
          72% {
            transform: scaleX(1.05);
            opacity: 0.33;
          }
        }
        
        @keyframes wave-line-9 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.22;
          }
          42% {
            transform: scaleX(1.12);
            opacity: 0.36;
          }
          78% {
            transform: scaleX(1.06);
            opacity: 0.27;
          }
        }
        
        /* Right Bottom Lines - Only scale, no translate */
        @keyframes wave-line-5 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.28;
          }
          30% {
            transform: scaleX(1.15);
            opacity: 0.42;
          }
          70% {
            transform: scaleX(1.08);
            opacity: 0.35;
          }
        }
        
        @keyframes wave-line-6 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.22;
          }
          40% {
            transform: scaleX(1.12);
            opacity: 0.36;
          }
          75% {
            transform: scaleX(1.05);
            opacity: 0.28;
          }
        }
        
        @keyframes wave-line-7 {
          0%, 100% {
            transform: scaleX(1);
            opacity: 0.2;
          }
          35% {
            transform: scaleX(1.1);
            opacity: 0.35;
          }
          80% {
            transform: scaleX(1.04);
            opacity: 0.25;
          }
        }
        
        /* Tailwind custom animation classes */
        .animate-float-slow {
          animation: float-slow linear infinite;
        }
        .animate-float-medium {
          animation: float-medium linear infinite;
        }
        .animate-float-fast {
          animation: float-fast linear infinite;
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }
        .animate-wave-slow-alt {
          animation: wave-slow-alt 9s ease-in-out infinite;
        }
        .animate-wave-slow-reverse {
          animation: wave-slow-reverse 8s ease-in-out infinite;
        }
        .animate-wave-line-1 {
          animation: wave-line-1 7s ease-in-out infinite;
        }
        .animate-wave-line-2 {
          animation: wave-line-2 8s ease-in-out infinite;
        }
        .animate-wave-line-3 {
          animation: wave-line-3 6s ease-in-out infinite;
        }
        .animate-wave-line-4 {
          animation: wave-line-4 7.5s ease-in-out infinite;
        }
        .animate-wave-line-5 {
          animation: wave-line-5 5.5s ease-in-out infinite;
        }
        .animate-wave-line-6 {
          animation: wave-line-6 6.5s ease-in-out infinite;
        }
        .animate-wave-line-7 {
          animation: wave-line-7 7s ease-in-out infinite;
        }
        .animate-wave-line-8 {
          animation: wave-line-8 6.8s ease-in-out infinite;
        }
        .animate-wave-line-9 {
          animation: wave-line-9 7.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
