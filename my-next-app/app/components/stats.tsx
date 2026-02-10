'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Award, Users, Calendar } from 'lucide-react';

const RSWStatsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { 
      icon: TrendingUp,
      value: 2.5, 
      suffix: 'B+', 
      prefix: 'AED ', 
      label: 'Assets Under Management', 
      description: 'Total portfolio value across all ventures' 
    },
    { 
      icon: Award,
      value: 200, 
      suffix: '+', 
      prefix: '', 
      label: 'Projects Completed', 
      description: 'Successful deliveries across sectors' 
    },
    { 
      icon: Users,
      value: 150, 
      suffix: '+', 
      prefix: '', 
      label: 'Global Partners', 
      description: 'Strategic alliances worldwide' 
    },
    { 
      icon: Calendar,
      value: 22, 
      suffix: '', 
      prefix: '', 
      label: 'Years of Excellence', 
      description: 'Building trust since 2002' 
    },
  ];

  const milestones = [
    { year: '2002', title: 'Foundation', description: 'RSW Investment established in Abu Dhabi' },
    { year: '2008', title: 'Expansion', description: 'Launched RSW Construction & Decoration division' },
    { year: '2015', title: 'Technology', description: 'Founded Hector Advance Technology for AI & IT' },
    { year: '2019', title: 'Innovation', description: 'Cortex 82 Technology joins the ecosystem' },
    { year: '2024', title: 'Milestone', description: 'Surpassed AED 2.5B in assets under management' },
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
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: '#ffffff' }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        
        .stats-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .stats-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
        
        {/* Stats Grid */}
        <div className="mb-16 lg:mb-20">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px" style={{ background: '#432c96' }} />
              <span 
                className="stats-body text-[10px] tracking-[0.25em] uppercase font-medium"
                style={{ color: 'rgba(67, 44, 150, 0.6)' }}
              >
                Our Impact
              </span>
              <div className="w-8 h-px" style={{ background: '#432c96' }} />
            </motion.div>
            
            <motion.h2 
              className="stats-title text-4xl lg:text-5xl leading-tight mb-4"
              style={{ color: '#432c96' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Numbers That Speak
            </motion.h2>

            <motion.p 
              className="stats-body text-sm max-w-2xl mx-auto"
              style={{ color: 'rgba(67, 44, 150, 0.6)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Two decades of strategic investments and exceptional results
            </motion.p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="relative p-5 rounded-xl"
                  style={{
                    background: index === 0 ? '#432c96' : 'rgba(67, 44, 150, 0.03)',
                    border: index === 0 ? 'none' : '1px solid rgba(67, 44, 150, 0.1)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ 
                      background: index === 0 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'rgba(67, 44, 150, 0.08)'
                    }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: index === 0 ? '#ffffff' : '#432c96' }} 
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  <div className="relative">
                    <p 
                      className="stats-title text-3xl mb-2"
                      style={{ color: index === 0 ? '#ffffff' : '#432c96' }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </p>
                    <p 
                      className="stats-body text-xs font-semibold mb-1"
                      style={{ color: index === 0 ? '#ffffff' : '#432c96' }}
                    >
                      {stat.label}
                    </p>
                    <p 
                      className="stats-body text-[10px] leading-relaxed"
                      style={{ color: index === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(67, 44, 150, 0.5)' }}
                    >
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          {/* Timeline Header */}
          <div className="text-center mb-12">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px" style={{ background: '#432c96' }} />
              <span 
                className="stats-body text-[10px] tracking-[0.25em] uppercase font-medium"
                style={{ color: 'rgba(67, 44, 150, 0.6)' }}
              >
                Our Journey
              </span>
              <div className="w-8 h-px" style={{ background: '#432c96' }} />
            </motion.div>
            
            <motion.h3 
              className="stats-title text-3xl lg:text-4xl"
              style={{ color: '#432c96' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Milestones That Define Us
            </motion.h3>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute top-6 left-0 right-0 h-px hidden lg:block"
              style={{ background: 'rgba(67, 44, 150, 0.1)' }}
            />
            
            {/* Progress Line */}
            <motion.div 
              className="absolute top-6 left-0 h-px hidden lg:block"
              style={{ background: '#432c96' }}
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
                  <div className="flex flex-col items-center lg:items-start">
                    {/* Year Circle */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10"
                      style={{ 
                        background: index === milestones.length - 1 
                          ? 'rgba(67, 44, 150, 0.08)' 
                          : '#432c96',
                        border: index === milestones.length - 1 
                          ? '2px dashed rgba(67, 44, 150, 0.3)' 
                          : 'none'
                      }}
                    >
                      <span 
                        className="stats-body text-xs font-bold"
                        style={{ 
                          color: index === milestones.length - 1 ? '#432c96' : '#ffffff'
                        }}
                      >
                        '{milestone.year.slice(2)}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center lg:text-left">
                      <p 
                        className="stats-body text-sm font-semibold mb-1"
                        style={{ color: '#432c96' }}
                      >
                        {milestone.title}
                      </p>
                      <p 
                        className="stats-body text-[10px] leading-relaxed"
                        style={{ color: 'rgba(67, 44, 150, 0.6)' }}
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
          className="mt-16 pt-12 text-center"
          style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <blockquote 
            className="stats-title text-xl lg:text-2xl italic max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#432c96' }}
          >
            "Building tomorrow's success through strategic vision and unwavering commitment to excellence."
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div 
              className="w-8 h-px"
              style={{ background: 'rgba(67, 44, 150, 0.3)' }}
            />
            <span 
              className="stats-body text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: 'rgba(67, 44, 150, 0.5)' }}
            >
              RSW Group
            </span>
            <div 
              className="w-8 h-px"
              style={{ background: 'rgba(67, 44, 150, 0.3)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSWStatsSection;