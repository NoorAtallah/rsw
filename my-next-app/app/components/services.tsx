'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  num: string;
  title: string;
  description: string;
  image: string;
}

const RSWServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const services: Service[] = [
    {
      num: "01",
      title: "Private Equity",
      description: "Transforming businesses through strategic capital and operational excellence",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
    },
    {
      num: "02",
      title: "Real Estate",
      description: "Developing landmark properties that redefine urban landscapes",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
    },
    {
      num: "03",
      title: "Venture Capital",
      description: "Backing visionary founders building tomorrow's industry leaders",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
    },
    {
      num: "04",
      title: "Strategic Advisory",
      description: "Guiding enterprises through complex transformations and market expansions",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80"
    }
  ];

  const animateToItem = (index: number) => {
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        if (imageRef.current) {
          imageRef.current.src = services[index].image;
        }
        gsap.to(imageRef.current, { 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      services.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `top+=${index * (100 / services.length)}% top`,
          end: () => `top+=${(index + 1) * (100 / services.length)}% top`,
          onEnter: () => {
            setActiveIndex(index);
            animateToItem(index);
          },
          onEnterBack: () => {
            setActiveIndex(index);
            animateToItem(index);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-900">
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-16">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-xs tracking-[0.3em] text-white/70 font-light uppercase">Our Expertise</span>
            </div>
            <span className="text-xs tracking-[0.2em] text-white/50 font-light">
              {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            </span>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left - Service List */}
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div
                    key={service.num}
                    className={`group cursor-pointer transition-all duration-500 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-30 hover:opacity-50'
                    }`}
                    onClick={() => {
                      setActiveIndex(index);
                      animateToItem(index);
                    }}
                  >
                    <div className="flex items-baseline gap-6 py-4">
                      <span className={`text-sm font-light tracking-wider transition-colors duration-300 ${
                        index === activeIndex ? 'text-white/80' : 'text-white/40'
                      }`}>
                        {service.num}
                      </span>
                      <h3 className={`text-3xl lg:text-5xl font-bold tracking-tight transition-all duration-500 ${
                        index === activeIndex ? 'text-white translate-x-2' : 'text-white/60'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    <div className={`h-px transition-all duration-500 ${
                      index === activeIndex 
                        ? 'bg-gradient-to-r from-white/50 via-white/20 to-transparent' 
                        : 'bg-white/10'
                    }`} />
                  </div>
                ))}
              </div>

              {/* Right - Glassmorphism Card with Image Frame */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  {/* Glass Card */}
                  <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 lg:p-10">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
                    
                    {/* Corner accent */}
                    <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/20 rounded-tr-xl" />
                    
                    <div className="relative z-10 space-y-8">
                      {/* Image Frame */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                        <img
                          ref={imageRef}
                          src={services[0].image}
                          alt={services[0].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/30" />
                      </div>

                      {/* Large Number */}
                      <span className="text-6xl lg:text-7xl font-bold text-white/10 leading-none">
                        {services[activeIndex].num}
                      </span>
                      
                      {/* Title */}
                      <div>
                        <p className="text-xs tracking-[0.25em] text-white/50 font-light uppercase mb-3">
                          Service Focus
                        </p>
                        <h4 className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
                          {services[activeIndex].title}
                        </h4>
                      </div>

                      {/* Divider */}
                      <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />

                      {/* Description */}
                      <p className="text-white/70 text-sm lg:text-base leading-relaxed font-light">
                        {services[activeIndex].description}
                      </p>

                      {/* CTA */}
                      <button className="group flex items-center gap-3 pt-4">
                        <span className="text-xs tracking-[0.2em] text-white/80 font-light group-hover:text-white transition-colors">
                          LEARN MORE
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Floating accent behind card */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-white/5 backdrop-blur-sm rounded-3xl -z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between">
            {/* Progress Indicators */}
            <div className="flex items-center gap-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    animateToItem(index);
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'w-10 bg-white' 
                      : index < activeIndex 
                        ? 'w-6 bg-white/40' 
                        : 'w-3 bg-white/20 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] text-white/40 font-light hidden sm:block">SCROLL TO EXPLORE</span>
              <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center pt-2">
                <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RSWServicesSection;