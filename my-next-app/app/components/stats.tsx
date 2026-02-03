'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RSWStatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { value: 2.5, suffix: 'B+', prefix: '$', label: 'Assets Under Management', description: 'Total portfolio value across all ventures' },
    { value: 200, suffix: '+', prefix: '', label: 'Projects Completed', description: 'Successful deliveries across sectors' },
    { value: 150, suffix: '+', prefix: '', label: 'Global Partners', description: 'Strategic alliances worldwide' },
    { value: 22, suffix: '', prefix: '', label: 'Years of Excellence', description: 'Building trust since 2002' },
  ];

  const milestones = [
    { year: '2002', title: 'Foundation', description: 'RSW Investment established in Abu Dhabi' },
    { year: '2008', title: 'Expansion', description: 'Launched RSW Construction & Decoration division' },
    { year: '2015', title: 'Technology', description: 'Founded Hector Advance Technology for AI & IT' },
    { year: '2019', title: 'Innovation', description: 'Cortex 82 Technology joins the ecosystem' },
    { year: '2024', title: 'Milestone', description: 'Surpassed $2.5B in assets under management' },
    { year: '2026', title: 'Future', description: 'Digital transformation & global expansion' },
  ];

  // Animated counter component
  const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (isInView) {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      }
    }, [isInView, value]);

    return (
      <span>
        {prefix}{value >= 1 ? Math.floor(count).toLocaleString() : count.toFixed(1)}{suffix}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: '#f8f9fa' }}
    >
      {/* Background Elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(22, 59, 95, 0.02) 0%, transparent 50%, rgba(22, 59, 95, 0.02) 100%)'
        }}
      />
      
      {/* Large year watermark */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 -right-20 text-[300px] font-bold pointer-events-none select-none hidden lg:block"
        style={{ color: 'rgba(22, 59, 95, 0.03)' }}
      >
        2026
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Stats Grid */}
        <div className="mb-32">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span 
                className="text-xs tracking-[0.4em] uppercase mb-4 block"
                style={{ color: '#BFC7CD' }}
              >
                By The Numbers
              </span>
              <h2 
                className="text-4xl lg:text-5xl font-light"
                style={{ color: '#163b5f' }}
              >
                Proven track record of
                <span className="font-semibold block mt-1">exceptional results</span>
              </h2>
            </div>
            <p 
              className="text-base font-light max-w-md lg:text-right"
              style={{ color: 'rgba(22, 59, 95, 0.6)' }}
            >
              Two decades of strategic investments and partnerships 
              that have shaped industries across the UAE and beyond.
            </p>
          </div>

          {/* Stats Cards - Unique staggered layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-6 lg:p-8"
                style={{
                  background: index === 0 ? '#163b5f' : '#ffffff',
                  borderRadius: '24px',
                  border: index === 0 ? 'none' : '1px solid rgba(22, 59, 95, 0.08)',
                  marginTop: index % 2 === 1 ? '2rem' : '0'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Decorative corner */}
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full"
                  style={{ 
                    background: index === 0 
                      ? 'rgba(191, 199, 205, 0.15)' 
                      : 'rgba(22, 59, 95, 0.05)'
                  }}
                />
                
                <div className="relative">
                  <p 
                    className="text-4xl lg:text-5xl font-light mb-2"
                    style={{ color: index === 0 ? '#ffffff' : '#163b5f' }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </p>
                  <p 
                    className="text-sm font-medium mb-1"
                    style={{ color: index === 0 ? '#ffffff' : '#163b5f' }}
                  >
                    {stat.label}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: index === 0 ? 'rgba(191, 199, 205, 0.8)' : 'rgba(22, 59, 95, 0.5)' }}
                  >
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          {/* Timeline Header */}
          <div className="text-center mb-16">
            <span 
              className="text-xs tracking-[0.4em] uppercase mb-4 block"
              style={{ color: '#BFC7CD' }}
            >
              Our Journey
            </span>
            <h3 
              className="text-3xl lg:text-4xl font-light"
              style={{ color: '#163b5f' }}
            >
              Milestones that <span className="font-semibold">define us</span>
            </h3>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute top-[60px] left-0 right-0 h-px hidden lg:block"
              style={{ background: 'rgba(22, 59, 95, 0.1)' }}
            />
            
            {/* Progress Line */}
            <motion.div 
              className="absolute top-[60px] left-0 h-px hidden lg:block"
              style={{ background: '#163b5f' }}
              initial={{ width: 0 }}
              animate={isInView ? { width: '83%' } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Timeline Items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {/* Year Circle */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10"
                      style={{ 
                        background: index === milestones.length - 1 
                          ? 'rgba(22, 59, 95, 0.1)' 
                          : '#163b5f',
                        border: index === milestones.length - 1 
                          ? '2px dashed rgba(22, 59, 95, 0.3)' 
                          : 'none'
                      }}
                    >
                      <span 
                        className="text-xs font-medium"
                        style={{ 
                          color: index === milestones.length - 1 ? '#163b5f' : '#ffffff'
                        }}
                      >
                        {milestone.year.slice(2)}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center lg:text-left">
                      <p 
                        className="text-lg font-medium mb-1"
                        style={{ color: '#163b5f' }}
                      >
                        {milestone.title}
                      </p>
                      <p 
                        className="text-xs leading-relaxed"
                        style={{ color: 'rgba(22, 59, 95, 0.6)' }}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div 
          className="mt-24 pt-16 text-center"
          style={{ borderTop: '1px solid rgba(22, 59, 95, 0.08)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <blockquote 
            className="text-2xl lg:text-3xl font-light italic max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#163b5f' }}
          >
            "Building tomorrow's success through 
            <span className="font-medium not-italic"> strategic vision </span> 
            and 
            <span className="font-medium not-italic"> unwavering commitment </span> 
            to excellence."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div 
              className="w-10 h-px"
              style={{ background: '#BFC7CD' }}
            />
            <span 
              className="text-xs tracking-widest uppercase"
              style={{ color: '#BFC7CD' }}
            >
              RSW Group
            </span>
            <div 
              className="w-10 h-px"
              style={{ background: '#BFC7CD' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Vertical decoration */}
      <div className="absolute top-1/4 left-6 hidden lg:block">
        <span 
          className="text-xs tracking-[0.5em] uppercase"
          style={{ 
            color: 'rgba(22, 59, 95, 0.1)',
            writingMode: 'vertical-lr',
            textOrientation: 'mixed'
          }}
        >
          Since 2002
        </span>
      </div>
    </section>
  );
};

export default RSWStatsSection;