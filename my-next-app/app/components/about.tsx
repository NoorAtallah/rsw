'use client';



'use client';

import React, { useEffect, useRef } from 'react';
import { Target, Eye, Diamond, Gem, Shield, Handshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RSWAboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const values: Value[] = [
    {
      icon: <Diamond className="w-6 h-6" strokeWidth={1.5} />,
      title: "Excellence",
      description: "Pursuing the highest standards in every endeavor"
    },
    {
      icon: <Shield className="w-6 h-6" strokeWidth={1.5} />,
      title: "Integrity",
      description: "Building trust through transparency and ethics"
    },
    {
      icon: <Handshake className="w-6 h-6" strokeWidth={1.5} />,
      title: "Partnership",
      description: "Creating lasting value through collaboration"
    }
  ];

  const stats = [
    { value: "$12B+", label: "Assets Under Management" },
    { value: "25+", label: "Years of Excellence" },
    { value: "40+", label: "Portfolio Companies" },
    { value: "12", label: "Global Offices" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats on scroll
      gsap.from(statsRef.current?.querySelectorAll('.stat-item') || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        }
      });

      // Animate values cards
      gsap.from(valuesRef.current?.querySelectorAll('.value-card') || [], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 75%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-24 lg:py-32">
        
        {/* Section Header */}
        <div className="text-center mb-20 px-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-xs tracking-[0.4em] text-white/60 font-light uppercase">About RSW</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/40" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Shaping Tomorrow's
            <br />
            <span className="text-white/40">Investment Landscape</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          
          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
            
            {/* Left - Large Statement */}
            <div className="space-y-8">
              <div className="relative">
                {/* Accent Line */}
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
                
                <p className="text-2xl lg:text-3xl text-white font-light leading-relaxed pl-8">
                  For over two decades, RSW has been at the forefront of 
                  <span className="text-white/50"> transformative investments</span>, 
                  partnering with visionary leaders to build enduring enterprises.
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                {/* Mission */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xs tracking-[0.2em] text-white/50 font-light uppercase mb-2">Our Mission</h4>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    To create sustainable value through strategic investments that drive innovation and growth.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Eye className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xs tracking-[0.2em] text-white/50 font-light uppercase mb-2">Our Vision</h4>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    To be the most trusted partner for ambitious enterprises seeking transformational growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Glassmorphism Image Card */}
            <div className="relative">
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                
                {/* Image */}
                <div className="relative h-80 lg:h-96">
                  <img
                    src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                    alt="RSW Headquarters"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </div>

                {/* Caption */}
                <div className="relative p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Gem className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    <span className="text-xs tracking-[0.2em] text-white/50 font-light uppercase">Established 1998</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    From our headquarters in New York, we've grown to serve clients across four continents, 
                    maintaining our founding commitment to excellence and integrity.
                  </p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-white/10 rounded-tr-2xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-white/10 rounded-bl-2xl" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                <span className="text-3xl font-bold text-white">25+</span>
                <p className="text-xs text-white/60 tracking-wider font-light">Years of Trust</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div 
            ref={statsRef}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-12 mb-24"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-item text-center lg:text-left"
                >
                  <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <p className="text-sm text-white/50 font-light mt-2 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div ref={valuesRef}>
            {/* Values Header */}
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-4">
                Our Core Values
              </h3>
              <p className="text-white/50 text-sm font-light max-w-xl mx-auto leading-relaxed">
                The principles that guide every decision we make and every partnership we build.
              </p>
            </div>

            {/* Values Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="value-card group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  
                  {/* Number */}
                  <span className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 text-white/80 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                      {value.icon}
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-xl font-bold text-white mb-3 tracking-wide">
                      {value.title}
                    </h4>
                    
                    {/* Divider */}
                    <div className="w-8 h-px bg-gradient-to-r from-white/40 to-transparent mb-4 group-hover:w-12 transition-all duration-500" />
                    
                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <span className="text-sm tracking-[0.15em] text-white/80 font-light">EXPLORE OUR JOURNEY</span>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RSWAboutSection;