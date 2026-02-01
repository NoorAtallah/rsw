'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, Globe, TrendingUp } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  companyName: string;
  tagline: string;
  link: string;
  image: string;
}

interface NavigationItem {
  label: string;
  href: string;
}

const RSWHeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const slides: Slide[] = [
    {
      title: "INVESTMENT",
      subtitle: "STRATEGIC GROWTH",
      companyName: "RSW",
      tagline: "Building tomorrow's success through strategic partnerships and visionary investments.",
      link: "DISCOVER OUR PORTFOLIO",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
    },
    {
      title: "EXCELLENCE",
      subtitle: "GLOBAL REACH",
      companyName: "RSW",
      tagline: "Transforming industries through innovation and strategic leadership.",
      link: "EXPLORE OUR VISION",
      image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1600&q=80"
    },
    {
      title: "INNOVATION",
      subtitle: "FUTURE FORWARD",
      companyName: "RSW",
      tagline: "Pioneering solutions that shape tomorrow's business landscape.",
      link: "LEARN MORE ABOUT RSW",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
    }
  ];

  const navigationItems: NavigationItem[] = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT US', href: '#' },
    { label: 'SERVICES', href: '#' },
    { label: 'CONTACT', href: '#' },
    { label: 'SIGN IN', href: '#' }
  ];

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Full Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide: Slide, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay on entire image */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-slate-900/50" />
          </div>
        ))}
      </div>

      {/* Navigation Menu - On top of everything */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex justify-end gap-6 lg:gap-8 p-6 lg:p-10">
        {navigationItems.map((item: NavigationItem) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs tracking-[0.2em] text-white/90 hover:text-white transition-colors duration-300 font-light"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Glassmorphism Panel - Overlaying the left side */}
      <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[45%] z-20">
        <div className="h-full bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between p-10 lg:p-16">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-transparent pointer-events-none" />
          
          {/* Top Section - Logo/Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 border border-slate-200/30 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-200" strokeWidth={1.5} />
              </div>
              <div className="text-xs tracking-[0.3em] text-slate-200 font-light">
                GLOBAL<br />INVESTMENT
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs tracking-[0.25em] text-slate-300 font-light uppercase">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-200 leading-tight tracking-wide">
                {slides[currentSlide].title}
              </h2>

              <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-transparent" />

              <p className="text-slate-300 text-sm leading-relaxed max-w-md font-light">
                {slides[currentSlide].tagline}
              </p>

              <button className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-slate-200 hover:text-white transition-colors duration-300 pt-4">
                {slides[currentSlide].link}
                <ChevronLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Bottom Section - Icons */}
          <div className="relative z-10 flex items-center gap-6">
            <div className="flex items-center gap-3 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer">
              <Globe className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs tracking-wider">GLOBAL</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer">
              <TrendingUp className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs tracking-wider">GROWTH</span>
            </div>
          </div>
        </div>
      </div>

      {/* RSW Text - Split across both panels */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-25 flex items-center justify-center pointer-events-none">
        <h1 className="text-[12rem] lg:text-[16rem] font-bold tracking-tight leading-none flex">
          {/* RS on glassmorphism side with image clip */}
          <span 
            className="bg-clip-text text-transparent drop-shadow-2xl"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            RS
          </span>
          {/* W on image side */}
          <span className="text-white drop-shadow-2xl">
            W
          </span>
        </h1>
      </div>

      {/* Arrow Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronLeft className="w-5 h-5 rotate-180 text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 z-30 flex items-center gap-2">
        {slides.map((_: Slide, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-1 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RSWHeroSection;