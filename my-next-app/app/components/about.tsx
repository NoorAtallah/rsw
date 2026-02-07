'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Cpu, HardHat, Shield, Play, ArrowUpRight } from 'lucide-react';

const RSWAboutSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Building2,
      title: "Real Estate Excellence",
      description: "Comprehensive investment, development, and management solutions across UAE.",
      stat: "4",
      statLabel: "Business Verticals"
    },
    {
      icon: Cpu,
      title: "Tech Innovation",
      description: "AI research, cybersecurity, and cloud computing at the forefront of digital transformation.",
      stat: "100%",
      statLabel: "UAE Compliant"
    },
    {
      icon: HardHat,
      title: "Construction Power",
      description: "End-to-end building solutions from oil & gas facilities to interior design.",
      stat: "Full",
      statLabel: "Service Suite"
    },
    {
      icon: Shield,
      title: "Abu Dhabi HQ",
      description: "Strategically positioned in the heart of UAE's business capital.",
      stat: "24/7",
      statLabel: "Operations"
    }
  ];

  return (
    <section 
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: '#f8f9fa' }}
    >
      {/* Ambient elements */}
      <div 
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -translate-y-1/2"
        style={{ background: 'rgba(22, 59, 95, 0.03)' }}
      />
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(191, 199, 205, 0.2)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left - Image & Video */}
          <div className="relative">
            {/* Main Image with unique shape */}
            <div 
              className="relative rounded-[40px] overflow-hidden"
              style={{ 
                aspectRatio: '4/5',
                maxHeight: '600px'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="Abu Dhabi Business District"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(22, 59, 95, 0.4) 0%, transparent 50%)' }}
              />

              {/* Play Button */}
              <button 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 20px 60px rgba(22, 59, 95, 0.3)'
                }}
              >
                <Play className="w-7 h-7 ml-1" style={{ color: '#163b5f' }} fill="#163b5f" />
              </button>

              {/* Bottom Info Card */}
              <div 
                className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#163b5f' }}>Discover RSW Group</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(22, 59, 95, 0.5)' }}>Our Journey in Abu Dhabi</p>
                  </div>
                  <div 
                    className="px-4 py-2 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(22, 59, 95, 0.08)', color: '#163b5f' }}
                  >
                    EST. UAE
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Divisions Card */}
            <motion.div 
              className="absolute -right-8 top-12 p-6 rounded-2xl hidden lg:block"
              style={{
                background: '#ffffff',
                boxShadow: '0 20px 60px rgba(22, 59, 95, 0.1)',
                border: '1px solid rgba(22, 59, 95, 0.05)'
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(22, 59, 95, 0.08)' }}
                >
                  <Building2 className="w-6 h-6" style={{ color: '#163b5f' }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-3xl font-light" style={{ color: '#163b5f' }}>4</p>
                  <p className="text-xs" style={{ color: 'rgba(22, 59, 95, 0.5)' }}>Business Divisions</p>
                </div>
              </div>
            </motion.div>

            {/* Location Badge */}
            <motion.div 
              className="absolute -left-4 bottom-32 p-5 rounded-2xl hidden lg:block"
              style={{
                background: '#163b5f',
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-medium text-white">Abu Dhabi</p>
              <p className="text-xs text-white/60 mt-1">Headquarters</p>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px" style={{ background: 'rgba(22, 59, 95, 0.3)' }} />
              <span 
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: 'rgba(22, 59, 95, 0.6)' }}
              >
                About RSW Group
              </span>
            </div>

            {/* Title */}
            <h2 
              className="text-4xl lg:text-5xl font-light leading-tight mb-6"
              style={{ color: '#163b5f' }}
            >
              A unified ecosystem of
              <span className="block font-semibold mt-2">investment excellence</span>
            </h2>

            {/* Description */}
            <p 
              className="text-lg font-light leading-relaxed mb-10"
              style={{ color: 'rgba(22, 59, 95, 0.7)' }}
            >
              Headquartered in Abu Dhabi, RSW Group operates through four specialized divisions 
              delivering comprehensive solutions across real estate investment, advanced technology, 
              construction services, and software innovation—all with full UAE regulatory compliance.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isHovered = hoveredFeature === index;
                
                return (
                  <motion.div
                    key={index}
                    className="p-5 rounded-2xl cursor-pointer transition-all duration-300"
                    style={{
                      background: isHovered ? '#ffffff' : 'transparent',
                      border: '1px solid',
                      borderColor: isHovered ? 'rgba(22, 59, 95, 0.1)' : 'rgba(22, 59, 95, 0.08)',
                      boxShadow: isHovered ? '0 10px 40px rgba(22, 59, 95, 0.08)' : 'none'
                    }}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                        style={{ 
                          background: isHovered ? '#163b5f' : 'rgba(22, 59, 95, 0.08)'
                        }}
                      >
                        <Icon 
                          className="w-5 h-5 transition-colors duration-300" 
                          style={{ color: isHovered ? '#ffffff' : '#163b5f' }} 
                          strokeWidth={1.5} 
                        />
                      </div>
                      <div>
                        <p 
                          className="text-2xl font-light mb-1"
                          style={{ color: '#163b5f' }}
                        >
                          {feature.stat}
                        </p>
                        <p 
                          className="text-sm font-medium mb-1"
                          style={{ color: '#163b5f' }}
                        >
                          {feature.title}
                        </p>
                        <p 
                          className="text-xs leading-relaxed"
                          style={{ color: 'rgba(22, 59, 95, 0.5)' }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <button 
                className="group flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{
                  background: '#163b5f',
                }}
              >
                <span className="text-sm tracking-wider text-white">Explore Our Divisions</span>
                <ArrowUpRight 
                  className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                  strokeWidth={1.5}
                />
              </button>
              
              <a 
                href="#" 
                className="group flex items-center gap-2 transition-colors"
                style={{ color: 'rgba(22, 59, 95, 0.6)' }}
              >
                <span className="text-sm tracking-wider group-hover:text-[#163b5f] transition-colors">Contact Us</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Certifications/Compliance Section */}
        <div className="mt-24 lg:mt-32 pt-16" style={{ borderTop: '1px solid rgba(22, 59, 95, 0.08)' }}>
          <div className="text-center mb-12">
            <p 
              className="text-sm tracking-wider"
              style={{ color: 'rgba(22, 59, 95, 0.5)' }}
            >
              FULLY LICENSED & COMPLIANT IN THE UAE
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { title: 'Real Estate', subtitle: 'Investment & Brokerage' },
              { title: 'Technology', subtitle: 'AI & Cybersecurity' },
              { title: 'Construction', subtitle: 'Full Contracting' },
              { title: 'Software', subtitle: 'Development & Systems' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(22, 59, 95, 0.06)' }}
                >
                  <Shield className="w-7 h-7" style={{ color: '#163b5f' }} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: '#163b5f' }}>
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: 'rgba(22, 59, 95, 0.5)' }}>
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 hidden lg:block">
        <span 
          className="text-xs tracking-[0.5em] uppercase"
          style={{ 
            color: 'rgba(22, 59, 95, 0.1)',
            writingMode: 'vertical-lr',
            textOrientation: 'mixed'
          }}
        >
          Abu Dhabi Excellence
        </span>
      </div>
    </section>
  );
};

export default RSWAboutSection;