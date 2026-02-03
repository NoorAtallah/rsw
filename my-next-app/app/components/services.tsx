'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, LineChart, Shield, Users, ArrowUpRight, ChevronRight } from 'lucide-react';

const RSWServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Briefcase,
      number: "01",
      title: "Strategic Investments",
      description: "Identifying high-potential opportunities across diverse sectors with meticulous due diligence and strategic foresight that drives sustainable growth.",
      stats: "500M+",
      statsLabel: "Assets Managed",
    },
    {
      icon: LineChart,
      number: "02",
      title: "Portfolio Management",
      description: "Comprehensive oversight and optimization of investment portfolios to maximize returns while managing risk effectively across all market conditions.",
      stats: "25%",
      statsLabel: "Avg. Annual Returns",
    },
    {
      icon: Shield,
      number: "03",
      title: "Risk Assessment",
      description: "Advanced analytical frameworks to evaluate and mitigate investment risks, ensuring your portfolio remains resilient in any economic climate.",
      stats: "150+",
      statsLabel: "Risk Models",
    },
    {
      icon: Users,
      number: "04",
      title: "Partnership Development",
      description: "Building lasting relationships with industry leaders and emerging innovators to create mutual value and unlock new opportunities.",
      stats: "80+",
      statsLabel: "Global Partners",
    }
  ];

  return (
    <section 
      className="relative min-h-screen overflow-hidden py-24 lg:py-32"
      style={{ background: '#f8f9fa' }}
    >
      
      {/* Ambient glows */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(22, 59, 95, 0.04)' }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(191, 199, 205, 0.3)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px" style={{ background: 'rgba(22, 59, 95, 0.3)' }} />
            <span 
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: 'rgba(22, 59, 95, 0.6)' }}
            >
              Our Services
            </span>
          </div>
          <h2 
            className="text-4xl lg:text-6xl font-light leading-tight max-w-2xl"
            style={{ color: '#163b5f' }}
          >
            Excellence in every
            <span className="block font-semibold mt-2">investment</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Left - Service Navigation */}
          <div className="lg:col-span-5">
            <div className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeService === index;
                
                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveService(index)}
                    className="relative p-6 cursor-pointer transition-all duration-500"
                    style={{
                      background: isActive 
                        ? '#ffffff' 
                        : 'transparent',
                      borderRadius: '20px',
                      border: isActive 
                        ? '1px solid rgba(22, 59, 95, 0.1)' 
                        : '1px solid transparent',
                      boxShadow: isActive 
                        ? '0 10px 40px rgba(22, 59, 95, 0.08)' 
                        : 'none'
                    }}
                    whileHover={{
                      background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {/* Left accent line */}
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] transition-all duration-500"
                      style={{
                        height: isActive ? '50%' : '0%',
                        background: 'linear-gradient(180deg, #163b5f 0%, rgba(191, 199, 205, 0.5) 100%)',
                        borderRadius: '2px'
                      }}
                    />
                    
                    <div className="flex items-center gap-5">
                      {/* Number */}
                      <span 
                        className="text-3xl font-extralight transition-colors duration-500"
                        style={{ 
                          color: isActive ? '#163b5f' : 'rgba(22, 59, 95, 0.2)'
                        }}
                      >
                        {service.number}
                      </span>

                      {/* Icon */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: isActive 
                            ? '#163b5f' 
                            : 'rgba(22, 59, 95, 0.06)',
                        }}
                      >
                        <Icon 
                          className="w-5 h-5 transition-colors duration-500" 
                          style={{ color: isActive ? '#ffffff' : 'rgba(22, 59, 95, 0.5)' }}
                          strokeWidth={1.5}
                        />
                      </div>
                      
                      {/* Title */}
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-medium transition-colors duration-500"
                          style={{ color: isActive ? '#163b5f' : 'rgba(22, 59, 95, 0.5)' }}
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Arrow */}
                      <ChevronRight 
                        className="w-5 h-5 transition-all duration-500"
                        style={{ 
                          color: '#163b5f',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateX(0)' : 'translateX(-10px)'
                        }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Stats */}
            <div 
              className="flex items-center gap-8 mt-12 pt-8"
              style={{ borderTop: '1px solid rgba(22, 59, 95, 0.1)' }}
            >
              <div>
                <span className="text-3xl font-light" style={{ color: '#163b5f' }}>$2.5B</span>
                <span className="text-xs block mt-1" style={{ color: 'rgba(22, 59, 95, 0.5)' }}>Total AUM</span>
              </div>
              <div className="w-px h-10" style={{ background: 'rgba(22, 59, 95, 0.1)' }} />
              <div>
                <span className="text-3xl font-light" style={{ color: '#163b5f' }}>98%</span>
                <span className="text-xs block mt-1" style={{ color: 'rgba(22, 59, 95, 0.5)' }}>Client Retention</span>
              </div>
            </div>
          </div>

          {/* Right - Active Service Detail Card */}
          <div className="lg:col-span-7">
            <motion.div 
              className="relative h-full min-h-[500px] p-10 lg:p-14 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #163b5f 0%, #1e4a6f 100%)',
                borderRadius: '32px',
              }}
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative elements */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(191, 199, 205, 0.15) 0%, transparent 60%)'
                }}
              />
              <div 
                className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)'
                }}
              />
              
              {/* Large number watermark */}
              <div 
                className="absolute top-6 right-8 text-[150px] font-bold pointer-events-none leading-none"
                style={{ color: 'rgba(255, 255, 255, 0.05)' }}
              >
                {services[activeService].number}
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {React.createElement(services[activeService].icon, {
                    className: "w-7 h-7",
                    style: { color: '#ffffff' },
                    strokeWidth: 1.5
                  })}
                </div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-medium mb-6 text-white">
                  {services[activeService].title}
                </h3>

                {/* Description */}
                <p 
                  className="text-lg leading-relaxed mb-10 max-w-md font-light"
                  style={{ color: 'rgba(191, 199, 205, 0.9)' }}
                >
                  {services[activeService].description}
                </p>

                {/* Stats */}
                <div 
                  className="inline-flex items-end gap-3 p-6 rounded-2xl mb-10"
                  style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <span className="text-5xl font-light text-white">
                    {services[activeService].stats}
                  </span>
                  <span 
                    className="text-sm pb-2"
                    style={{ color: 'rgba(191, 199, 205, 0.7)' }}
                  >
                    {services[activeService].statsLabel}
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <button 
                    className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:bg-white/20"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span className="text-sm tracking-wider text-white">Explore Service</span>
                    <ArrowUpRight 
                      className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>

              {/* Corner decorative lines */}
              <div 
                className="absolute bottom-8 right-8 w-20 h-px"
                style={{ background: 'linear-gradient(to left, rgba(191, 199, 205, 0.3), transparent)' }}
              />
              <div 
                className="absolute bottom-8 right-8 w-px h-20"
                style={{ background: 'linear-gradient(to top, rgba(191, 199, 205, 0.3), transparent)' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-20 lg:mt-28 text-center">
          <p 
            className="text-lg font-light max-w-2xl mx-auto"
            style={{ color: 'rgba(22, 59, 95, 0.6)' }}
          >
            Trusted by leading institutions worldwide to deliver exceptional results 
            through strategic investment solutions.
          </p>
        </div>
      </div>

      {/* Vertical text decoration */}
      <div className="absolute bottom-[20%] left-6 hidden lg:block">
        <span 
          className="text-xs tracking-[0.5em] uppercase"
          style={{ 
            color: 'rgba(22, 59, 95, 0.15)',
            writingMode: 'vertical-lr',
            textOrientation: 'mixed'
          }}
        >
          Investment Excellence
        </span>
      </div>
    </section>
  );
};

export default RSWServicesSection;