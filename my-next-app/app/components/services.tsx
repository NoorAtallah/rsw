'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const RSWServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      number: "01",
      title: "Real Estate Development",
      subtitle: "Premium Properties Across UAE",
      description: "Transforming skylines with architectural excellence. Our portfolio spans luxury residential towers, commercial complexes, and mixed-use developments that redefine modern living.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      stat: "2.5B",
      statLabel: "AED Development Value",
      accent: "#432c96"
    },
    {
      number: "02",
      title: "Construction Services",
      subtitle: "Building Tomorrow's Infrastructure",
      description: "Industry-leading construction expertise delivering projects on time and beyond expectations. From concept to completion, we build with precision and purpose.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      stat: "150+",
      statLabel: "Projects Completed",
      accent: "#5a3fb8"
    },
    {
      number: "03",
      title: "Technology Solutions",
      subtitle: "Innovation at the Core",
      description: "Pioneering smart building technologies and PropTech solutions that integrate seamlessly into modern developments, creating intelligent spaces for the future.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
      stat: "50+",
      statLabel: "Tech Integrations",
      accent: "#7856d9"
    },
    {
      number: "04",
      title: "Investment Management",
      subtitle: "Strategic Portfolio Growth",
      description: "Diversified investment strategies across real estate, infrastructure, and emerging markets. Building wealth through calculated risk and market insight.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      stat: "25%",
      statLabel: "Annual Growth Rate",
      accent: "#432c96"
    }
  ];

  return (
    <section 
      className="relative min-h-screen overflow-hidden py-16 lg:py-20"
      style={{ background: '#ffffff' }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        
        .editorial-number {
          font-family: 'Playfair Display', serif;
          font-weight: 300;
          font-style: italic;
        }
        
        .editorial-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .editorial-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
        
        .image-grain {
          position: relative;
        }
        
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="mb-12 lg:mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span 
                  className="editorial-body text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(67, 44, 150, 0.5)' }}
                >
                  Portfolio — 2024
                </span>
              </motion.div>
              
              <motion.h2 
                className="editorial-title text-4xl lg:text-5xl xl:text-6xl leading-[0.95] mb-4"
                style={{ color: '#432c96' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Building
                <span className="block mt-2">Excellence</span>
              </motion.h2>
              
              <motion.div 
                className="w-16 h-[2px]"
                style={{ background: '#432c96' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            
            <motion.p 
              className="editorial-body text-sm lg:text-base leading-relaxed max-w-xl lg:ml-auto"
              style={{ color: 'rgba(67, 44, 150, 0.7)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Four verticals united by a singular vision: to create lasting value through strategic investments, innovative development, and uncompromising quality.
            </motion.p>
          </div>
        </div>

        {/* Main Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
          
          {/* Left Navigation */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-1">
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="w-full text-left group relative py-4 px-5 transition-all duration-500"
                    style={{
                      background: isActive ? 'rgba(67, 44, 150, 0.03)' : 'transparent',
                      borderLeft: isActive ? '3px solid #432c96' : '3px solid transparent',
                    }}
                    whileHover={{ x: 8 }}
                  >
                    {/* Number */}
                    <div 
                      className="editorial-number text-2xl mb-2 transition-all duration-500"
                      style={{ 
                        color: isActive ? '#432c96' : 'rgba(67, 44, 150, 0.2)',
                      }}
                    >
                      {service.number}
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="editorial-body text-sm font-medium mb-1 transition-all duration-500"
                      style={{ 
                        color: isActive ? '#432c96' : 'rgba(67, 44, 150, 0.5)'
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p 
                      className="editorial-body text-[10px] transition-all duration-500"
                      style={{ 
                        color: isActive ? 'rgba(67, 44, 150, 0.6)' : 'rgba(67, 44, 150, 0.3)'
                      }}
                    >
                      {service.subtitle}
                    </p>

                    {/* Arrow indicator */}
                    <ArrowRight 
                      className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-500"
                      style={{
                        color: '#432c96',
                        opacity: isActive ? 1 : 0,
                        transform: isActive 
                          ? 'translateY(-50%) translateX(0)' 
                          : 'translateY(-50%) translateX(-10px)'
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Hero Image */}
                <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-2xl image-grain">
                  <img 
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'contrast(1.05) saturate(0.95)'
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${services[activeIndex].accent}dd 0%, transparent 50%)`
                    }}
                  />
                  
                  {/* Large number watermark */}
                  <div 
                    className="absolute bottom-6 left-6 editorial-number text-7xl lg:text-8xl leading-none"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.2)',
                      textShadow: '0 0 40px rgba(0,0,0,0.3)'
                    }}
                  >
                    {services[activeIndex].number}
                  </div>

                  {/* Stat Badge */}
                  <div 
                    className="absolute top-6 right-6 px-4 py-3 rounded-xl backdrop-blur-md"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.25)'
                    }}
                  >
                    <div className="editorial-title text-xl text-white mb-1">
                      {services[activeIndex].stat}
                    </div>
                    <div className="editorial-body text-[10px] text-white opacity-80">
                      {services[activeIndex].statLabel}
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  
                  {/* Left - Title & Description */}
                  <div>
                    <h3 
                      className="editorial-title text-2xl lg:text-3xl leading-tight mb-4"
                      style={{ color: '#432c96' }}
                    >
                      {services[activeIndex].title}
                    </h3>
                    
                    <div 
                      className="w-12 h-[2px] mb-4"
                      style={{ background: services[activeIndex].accent }}
                    />
                    
                    <p 
                      className="editorial-body text-sm leading-relaxed mb-6"
                      style={{ color: 'rgba(67, 44, 150, 0.7)' }}
                    >
                      {services[activeIndex].description}
                    </p>

                    <button 
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 hover:gap-3"
                      style={{
                        background: '#432c96',
                        color: '#ffffff'
                      }}
                    >
                      <span className="editorial-body text-xs font-medium tracking-wider">
                        Explore More
                      </span>
                      <ArrowUpRight 
                        className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Right - Details & Features */}
                  <div className="space-y-5">
                    {/* Key Features */}
                    <div>
                      <h4 
                        className="editorial-body text-[10px] tracking-[0.2em] uppercase mb-3"
                        style={{ color: 'rgba(67, 44, 150, 0.5)' }}
                      >
                        Key Highlights
                      </h4>
                      
                      <div className="space-y-2">
                        {['Award-Winning Projects', 'Sustainable Design', 'Global Partnerships', 'Client-Centric Approach'].map((feature, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2.5 py-2 border-b"
                            style={{ borderColor: 'rgba(67, 44, 150, 0.1)' }}
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: services[activeIndex].accent }}
                            />
                            <span 
                              className="editorial-body text-xs"
                              style={{ color: 'rgba(67, 44, 150, 0.8)' }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quote or Testimonial */}
                    <div 
                      className="p-5 rounded-xl mt-6"
                      style={{ 
                        background: 'rgba(67, 44, 150, 0.03)',
                        borderLeft: `4px solid ${services[activeIndex].accent}`
                      }}
                    >
                      <p 
                        className="editorial-body text-xs italic leading-relaxed"
                        style={{ color: 'rgba(67, 44, 150, 0.7)' }}
                      >
                        "Excellence is not a destination, it's a continuous journey of innovation, dedication, and unwavering commitment to quality."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-8 border-t"
          style={{ borderColor: 'rgba(67, 44, 150, 0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center lg:text-left">
            <div className="editorial-title text-3xl lg:text-4xl mb-1" style={{ color: '#432c96' }}>
              15+
            </div>
            <div className="editorial-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
              Years of Excellence
            </div>
          </div>
          
          <div className="text-center lg:text-left">
            <div className="editorial-title text-3xl lg:text-4xl mb-1" style={{ color: '#432c96' }}>
              200+
            </div>
            <div className="editorial-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
              Projects Delivered
            </div>
          </div>
          
          <div className="text-center lg:text-left">
            <div className="editorial-title text-3xl lg:text-4xl mb-1" style={{ color: '#432c96' }}>
              5B+
            </div>
            <div className="editorial-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
              AED Portfolio Value
            </div>
          </div>
          
          <div className="text-center lg:text-left">
            <div className="editorial-title text-3xl lg:text-4xl mb-1" style={{ color: '#432c96' }}>
              98%
            </div>
            <div className="editorial-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
              Client Satisfaction
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-30"
        style={{ background: 'rgba(67, 44, 150, 0.08)' }}
      />
      
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'rgba(67, 44, 150, 0.06)' }}
      />
    </section>
  );
};

export default RSWServicesSection;