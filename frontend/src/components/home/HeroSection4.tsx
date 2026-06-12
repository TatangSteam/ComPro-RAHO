'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroSection4() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Wijaya',
      role: 'Founder, Klinik Sehat Bersama',
      avatar: '/assets/Hero2/Rectangle 158.png',
      text: 'Bergabung dengan Raho Premier telah mengubah cara kami melayani pasien. Teknologi Nano Bubble memberikan hasil yang luar biasa, dan dukungan tim Raho sangat profesional. Partnership ini benar-benar win-win solution.',
      rating: 5,
      bgColor: 'white',
    },
    {
      id: 2,
      name: 'Prof. Dr. Ahmad Hidayat',
      role: 'Direktur, Wellness Center Jakarta',
      avatar: '/assets/Hero2/Rectangle 159.png',
      text: 'Sebagai praktisi kesehatan holistik, saya sangat menghargai pendekatan inovatif Raho Premier. Edukasi yang diberikan sangat berkualitas dan membantu kami meningkatkan kualitas layanan kepada klien.',
      rating: 5,
      bgColor: 'red',
    },
    {
      id: 3,
      name: 'dr. Maria Angelina, Sp.GK',
      role: 'Owner, Nutrition & Health Clinic',
      avatar: '/assets/Hero2/Rectangle 161.png',
      text: 'Program partnership Raho Premier sangat mendukung pengembangan praktik saya. Dari harga khusus hingga dukungan marketing, semuanya dirancang untuk membantu partner tumbuh bersama.',
      rating: 5,
      bgColor: 'white',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="relative py-48 md:py-56 overflow-visible"
      style={{
        backgroundImage: 'url(/assets/Section4/Section4BG.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        display: 'block',
        marginTop: '-5px',
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/35 to-white/40"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-red-600 px-6 py-3 rounded-full shadow-lg">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Teknologi Inovatif untuk Kesehatan yang Lebih Baik</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
            Apa Kata{' '}
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Partner Kami?
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-16">
          <p className="text-xl text-gray-800 font-medium max-w-3xl mx-auto">
            Pengalaman nyata dari partner yang telah bergabung dan berkembang
          </p>
          <p className="text-xl text-gray-800 font-medium max-w-3xl mx-auto mb-4">
            bersama Raho Premier dalam edukasi dan pengembangan komunitas kesehatan.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-8">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Testimonial Cards */}
            <div className="flex-1 overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div 
                      className={`rounded-3xl p-8 shadow-lg ${
                        testimonial.bgColor === 'red' 
                          ? 'bg-red-50/90' 
                          : 'bg-white'
                      }`}
                    >
                      {/* Avatar and Info */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          {/* Quote */}
                          <p 
                            className={`text-base leading-relaxed mb-4 ${
                              testimonial.bgColor === 'red' 
                                ? 'text-red-700' 
                                : 'text-gray-700'
                            }`}
                          >
                            "{testimonial.text}"
                          </p>
                          
                          {/* Name and Role */}
                          <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                          
                          {/* Star Rating */}
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-10 bg-red-600' : 'w-3 bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-red-50/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left - Badge with Icon and Text */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  Kolaborasi hari ini, dampak untuk banyak orang.
                </h4>
                <p className="text-sm text-gray-700">
                  Mari menjadi bagian dari perubahan positif di masyarakat...
                </p>
              </div>
            </div>

            {/* Right - CTA Button */}
            <a
              href="https://wa.link/h2uyet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
            >
              Gabung Partnership
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
